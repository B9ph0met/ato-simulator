export const geoDB: Record<string, any> = {
  "1.1.1.1": { country: "US", lat: 37.751, lon: -97.822 },
  "5.5.5.5": { country: "FR", lat: 48.8566, lon: 2.3522 },
  "8.8.8.8": { country: "US", lat: 37.3861, lon: -122.0839 },
  "123.123.123.123": { country: "CN", lat: 39.9042, lon: 116.4074 }
};

// default unknown IP location (minimal info)
export const unknownGeo = {
  country: "UNKNOWN",
  lat: 0,
  lon: 0
};
