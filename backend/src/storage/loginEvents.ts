let events: any[] = [];

export function storeLoginEvent(event: any) {
  events.push(event);
  if (events.length > 1000) events.shift();
}

export function getLoginEvents() {
  return [...events].reverse(); // newest first
}

export function clearLoginEvents() {
  events = [];
}
