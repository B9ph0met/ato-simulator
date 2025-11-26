export function evaluateHeadlessRisk(fingerprint: any) {
  let score = 0;
  const reasons: string[] = [];

  const ua: string = fingerprint?.userAgent || "";

  // Classic headless indicator
  if (/HeadlessChrome/i.test(ua)) {
    score += 40;
    reasons.push("Headless Chrome user agent");
  }

  // Synthetic webdriver flag from frontend
  if (fingerprint?.webdriver === true) {
    score += 30;
    reasons.push("navigator.webdriver = true");
  }

  // No plugins is common in automation
  if (fingerprint && Array.isArray(fingerprint.plugins) && fingerprint.plugins.length === 0) {
    score += 10;
    reasons.push("No browser plugins (automation-like)");
  }

  return { score, reasons };
}
