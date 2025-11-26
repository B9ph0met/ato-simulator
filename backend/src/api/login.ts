import { Request, Response } from "express";
import { evaluateAtoRisk } from "../risk/ato";
import { users } from "../storage/users";
import { storeLoginEvent } from "../storage/loginEvents";
import { geoDB, unknownGeo } from "../storage/geoDB";

export default function loginHandler(req: Request, res: Response) {
  const {
    username,
    password,
    ip,
    deviceId,
    userAgent,
    fingerprint,
    telemetry,
    protectionLevel
  } = req.body;

  // Look up user
  const user = users.find(u => u.username === username);

  // Always boolean
  const passwordCorrect = user ? user.password === password : false;

  // Evaluate risk (now aware of protectionLevel)
  const { score, decision, reasons } = evaluateAtoRisk({
    username,
    passwordCorrect,
    ip,
    deviceId,
    userAgent,
    user,
    fingerprint,
    telemetry,
    protectionLevel
  });

  // Update user geo + last login time only on successful login
  if (passwordCorrect && user) {
    user.lastLoginAt = Date.now();

    const geo = geoDB[ip] || unknownGeo;
    user.lastLoginGeo = geo;
  }

  // Store the login event
  storeLoginEvent({
    timestamp: Date.now(),
    username,
    ip,
    deviceId,
    score,
    decision,
    reasons,
    success: passwordCorrect,
    protectionLevel: protectionLevel ?? 5
  });

  // Respond to frontend
  res.json({
    success: passwordCorrect,
    decision,
    score,
    reasons,
    protectionLevel: protectionLevel ?? 5
  });
}
