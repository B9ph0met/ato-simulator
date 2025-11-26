import { evaluateHeadlessRisk } from "./headlessDetection";
import { evaluateTelemetryRisk } from "./telemetry";

export function evaluateFingerprintRisk(ctx: any) {
  const fingerprint = ctx.fingerprint || {};
  const telemetry = ctx.telemetry || {};
  const level = ctx.protectionLevel ?? 5;

  let score = 0;
  const reasons: string[] = [];

  // Level 3+: enable fingerprint/headless checks
  if (level >= 3) {
    const headless = evaluateHeadlessRisk(fingerprint);
    score += headless.score;
    reasons.push(...headless.reasons);
  }

  // Level 4+: enable behavioral telemetry checks
  if (level >= 4) {
    const tele = evaluateTelemetryRisk(telemetry);
    score += tele.score;
    reasons.push(...tele.reasons);
  }

  return { score, reasons };
}
