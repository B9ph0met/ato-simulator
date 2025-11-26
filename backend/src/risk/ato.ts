import { RISK_THRESHOLDS } from "./config";
import { geoDB, unknownGeo } from "../storage/geoDB";
import { haversineDistance } from "../utils/geo";
import { evaluateFingerprintRisk } from "../fingerprint/fingerprint";

export function evaluateAtoRisk(ctx: any) {
  const level: number = ctx.protectionLevel ?? 5;

  let score = 0;
  const reasons: string[] = [];

  const user = ctx.user;
  const ip = ctx.ip;
  const deviceId = ctx.deviceId;

  // -----------------------
  // LEVEL 1+: CREDENTIAL SIGNALS
  // -----------------------
  if (level >= 1) {
    if (!user) {
      score += 30;
      reasons.push("Unknown username");
    }

    if (user && !ctx.passwordCorrect) {
      score += 20;
      reasons.push("Incorrect password");
    }
  }

  // -----------------------
  // LEVEL 2+: IP + GEO SIGNALS
  // -----------------------
  if (level >= 2) {
    // New IP
    if (user && !user.knownIps.includes(ip)) {
      score += 25;
      reasons.push("New IP");
    }

    // GEO-IP LOOKUP & IMPOSSIBLE TRAVEL
    const geo = geoDB[ip] || unknownGeo;

    if (user && user.lastLoginAt > 0 && user.lastLoginGeo) {
      const last = user.lastLoginGeo;
      const distanceKm = haversineDistance(last.lat, last.lon, geo.lat, geo.lon);
      const timeHours = (Date.now() - user.lastLoginAt) / (1000 * 60 * 60);

      if (timeHours > 0) {
        const speed = distanceKm / timeHours; // km/h

        if (speed > 900) {
          score += 40;
          reasons.push(`Impossible travel detected (${speed.toFixed(0)} km/h)`);
        }

        if (last.country !== geo.country) {
          score += 15;
          reasons.push(`New country login: ${geo.country}`);
        }
      }
    }
  }

  // -----------------------
  // LEVEL 3+: DEVICE SIGNALS
  // -----------------------
  if (level >= 3) {
    if (user && !user.knownDevices.includes(deviceId)) {
      score += 25;
      reasons.push("New device");
    }
  }

  // -----------------------
  // LEVEL 3–4+: FINGERPRINT & TELEMETRY SIGNALS
  // (gated inside evaluateFingerprintRisk as well)
  // -----------------------
  if (level >= 3) {
    const fpResult = evaluateFingerprintRisk({
      fingerprint: ctx.fingerprint,
      telemetry: ctx.telemetry,
      protectionLevel: level
    });

    score += fpResult.score;
    reasons.push(...fpResult.reasons);
  }

  // -----------------------
  // DECISION LOGIC
  // -----------------------
  let decision = "ALLOW";

  // Level 0 = no protection: always ALLOW (even if score somehow > 0)
  if (level === 0) {
    decision = "ALLOW";
  } else {
    if (score >= RISK_THRESHOLDS.CAPTCHA) {
      decision = "DENY";
    } else if (score >= RISK_THRESHOLDS.MFA) {
      decision = "CAPTCHA";
    } else if (score >= RISK_THRESHOLDS.ALLOW) {
      decision = "MFA_REQUIRED";
    } else {
      decision = "ALLOW";
    }
  }

  return { score, decision, reasons };
}
