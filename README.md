# 🛡️ Enhanced ATO Login Simulator

*A visual, educational Risk Engine for Account Takeover detection*

This project is an **interactive Account Takeover (ATO) simulation environment** designed to demonstrate how modern anti-fraud and anti-automation engines evaluate login risk.

The simulator lets you replay attacker patterns (impossible travel, credential stuffing, password spray, bot-like automation) and see **real-time risk scoring, heuristics, and decisions**, as well as how different **protection levels** affect outcomes.

It is inspired by real-world risk engines used at companies like Google, Meta, Amazon, and Stripe.

---

# 🌐 Live Demo (Local)

Run:

```sh
npm install
npm run dev
```

Then visit:

```
http://localhost:3001/login.html
```

---

# 🎯 Project Goals

This project is designed to:

* Demonstrate **practical understanding of ATO attack patterns**
* Show how **risk scoring** combines heuristics into final decisions
* Visualize how companies detect:

  * new devices
  * new IPs
  * bot-like behavior
  * headless browser signals
  * impossible travel
  * credential stuffing / spray patterns
* Show how **user telemetry**, **device ID**, **geo-IP**, and **browser fingerprinting** influence login security
* Provide a clean UI that allows hands-on experimentation with attack flows

This is not intended to “block” attacks—it's an **educational model** for showcasing security intuition and adversarial thinking.

---

# 🚀 Features

### 🔐 **Risk Engine (ATO Detection)**

The backend evaluates login attempts using:

* 📍 **Geo-velocity / Impossible Travel**
* 🌎 **New country login detection**
* 🖥 **New and risky device IDs**
* 🧭 **Headless browser + automation fingerprint**
* 🧪 **Telemetry signals** (typing speed, mouse entropy)
* 🌀 **IP rotation detection** (residential proxy behavior)
* 📊 **Weighted scoring across multiple signals**
* 🔒 **Decision policies:**

  * `ALLOW`
  * `MFA_REQUIRED`
  * `DENY`

---

### 🧪 **Attack Scenarios (Fully Automated)**

| Scenario                   | Description                                                       |
| -------------------------- | ----------------------------------------------------------------- |
| **Normal Login**           | Standard login from known IP & device                             |
| **Impossible Travel**      | Two logins from geographically impossible locations minutes apart |
| **Password Spray x5**      | Multiple usernames or guesses from rotating IPs                   |
| **Credential Stuffing x5** | Compromised accounts tested with high IP entropy                  |

---

### 🧬 **Protection Level Slider**

You can dynamically adjust how strict the risk engine is:

| Level | Description                      |
| ----- | -------------------------------- |
| **0** | Raw login, no checks             |
| **1** | Username + password only         |
| **2** | IP reputation + device sanity    |
| **3** | Geo heuristics enabled           |
| **4** | Scoring engine enabled           |
| **5** | Full enterprise-grade risk model |

This provides a **visual explanation** of how risk models escalate in complexity.

---

### 🖥 **Frontend (login.html)**

A clean interface modeled after modern fraud-platform dashboards:

* Username
* Password
* Device ID
* Country/IP
* Rotating IP simulation
* Protection level
* Scenario selector
* Real-time JSON response viewer

---

### 📊 **Event Dashboard**

A separate page displays:

* timestamp
* username
* IP
* device
* score
* decision
* reasons
* success

Perfect for demoing how abuse patterns show up in risk logs.

---

# 🏗 Project Structure

```
/backend
  /src
    /api
      login.ts
      logins.ts
    /risk
      ato.ts            # main risk engine logic
    /fingerprint
      headlessDetection.ts
      telemetry.ts
    /storage
      users.ts
      geoDB.ts
      loginEvents.ts
  public/
    login.html
    dashboard.html

README.md
```

---

# ⚙️ Running Locally

### Install dependencies

```sh
cd backend
npm install
```

### Start development server

```sh
npm run dev
```

Backend runs on:

```
http://localhost:3001
```

The UI is served from:

```
/backend/public/login.html
```

---

# 🧠 What This Project Demonstrates (For Recruiters)

This project shows that you understand:

### ✔ How attackers behave

* bot behavior
* proxy rotation
* credential stuffing patterns
* geo-IP evasion
* device + browser manipulation

### ✔ How defenders detect them

* multipoint scoring
* signals correlation
* impossible travel math
* high-entropy IPs and devices
* browser fingerprinting
* telemetry-based automation detection

### ✔ How to build simulation tools

* Express backend
* Frontend UI
* JSON logs
* state-driven UIs
* replayable attack sequences

This is extremely relevant to teams at:
**Google, Meta, Amazon, Stripe, Coinbase, Cloudflare, Akamai, F5, TikTok, and anti-fraud / anti-bot orgs.**

---

# 🔮 Future Enhancements (optional ideas)

* ⏱ Real-time risk heatmaps
* 🌍 IP-to-geo live lookup via API
* 🧩 Plugin system for adding custom heuristics
* 🧪 “Attacker profiles” that auto-simulate full campaigns
* 📉 Visual scoring breakdown bar
* 🧱 Machine learning scoring (educational)

---

# 📜 License

MIT License — free to use, modify, and share.

---

# 🙌 Acknowledgements

This project was created as a learning and demonstration tool to explore modern ATO detection heuristics, adversarial thinking, and risk-based authentication design.

