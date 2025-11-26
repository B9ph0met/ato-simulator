export function evaluateTelemetryRisk(telemetry: any) {
  let score = 0;
  const reasons: string[] = [];

  if (telemetry?.mouseEntropy !== undefined && telemetry.mouseEntropy < 0.2) {
    score += 25;
    reasons.push("Low mouse entropy (bot-like cursor)");
  }

  if (telemetry?.typingSpeed && telemetry.typingSpeed > 350) {
    score += 20;
    reasons.push("Unrealistic typing speed before login");
  }

  if (telemetry?.interactions !== undefined && telemetry.interactions < 2) {
    score += 15;
    reasons.push("Very low interaction count before login");
  }

  return { score, reasons };
}
