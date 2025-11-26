export const users = [
  {
    username: "test",
    password: "test123",

    knownDevices: ["dev-1"],
    knownIps: ["1.1.1.1"],

    // Geo-based tracking
    lastLoginGeo: { country: "US", lat: 37.751, lon: -97.822 },
    lastLoginAt: 0
  },

  {
    username: "alice",
    password: "hello123",

    knownDevices: ["dev-9"],
    knownIps: ["2.2.2.2"],

    // Geo-based tracking
    lastLoginGeo: { country: "US", lat: 37.751, lon: -97.822 },
    lastLoginAt: 0
  }
];
