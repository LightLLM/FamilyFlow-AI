# FamilyFlow deployment status

**Date:** 2026-10-23  
**GitHub:** https://github.com/LightLLM/FamilyFlow-AI  
**AWS account:** `134553439892` (us-east-1)

## Automated verification (this machine)

| Suite | Result |
|-------|--------|
| Unit (domain, api, fire-tv, alexa, alexa-plus-mcp) | **PASS 28/28** |
| E2E Fire TV device session + Alexa local | **PASS 17/17** |
| Vega Virtual Device / physical Fire TV | **NOT EXECUTED** (VDT not on Windows host) |
| Alexa Developer Console simulator | **NOT EXECUTED** (needs `ask configure` + browser login) |

## AWS sandbox (CDK) — DEPLOYED

Stack: `FamilyFlowSandbox`

| Output | Value |
|--------|-------|
| ApiUrl | `https://tyyke5nlm3.execute-api.us-east-1.amazonaws.com` |
| UserPoolId | `us-east-1_0ifoFYaCz` |
| UserPoolClientId | `2osuui7r8vsnrbv6l9lhkdtugl` |
| Health | `GET /health` → `{"ok":true,"mode":"aws",...}` |

Production-aligned settings in Lambda:

- `FAMILYFLOW_MODE=aws`
- `ALLOW_LOCAL_DEV_AUTH=false`
- Cognito JWT authorizer on parent routes
- Device session routes (`/devices/*`, mission request/complete) left open at API Gateway; device bearer verified in Lambda (Amazon Fire TV guideline: no parent passwords on TV)

Reviewer Cognito parent (created in pool): `parent@familyflow.demo` — password set separately by operator (do not commit).

## Amazon Developer Console — remaining owner steps

Follow official docs; policies change. High-level checklist from `docs/AMAZON_PUBLISH_GUIDE.md`:

### Alexa custom skill

1. Open https://developer.amazon.com/alexa/console/ask and sign in with the Amazon Developer account.
2. Create a custom skill; set invocation name to **family flow**.
3. Upload interaction model from `apps/alexa/skill-package/interactionModels/custom/en-US.json`.
4. Endpoint: host ASK SDK Lambda (or adapter) with `FAMILYFLOW_API_BASE_URL` = ApiUrl above.
5. **Account linking** to Cognito OAuth (same User Pool / Client) — never authenticate by spoken child name.
6. Test in Console simulator → confirm pending approval in parent web.
7. Submit for certification only after privacy policy URL + account linking pass Alexa checklist.

Local CLI (after browser login):

```bash
ask configure
```

### Fire TV / Vega (Appstore)

1. Complete developer identity / tax / payout in https://developer.amazon.com/
2. Install Vega Developer Tools on **Apple Silicon** (official VVD path).
3. Package a Vega/Fire OS binary pointing at ApiUrl; use pairing codes — never embed parent passwords.
4. Test on VVD + physical Fire TV Stick before Appstore submission.
5. Provide privacy policy URL, age-band disclosures, reviewer test accounts + pairing notes.

The browser 10-ft shell (`apps/fire-tv`) is for API/D-pad validation only — **do not list it as a Vega Appstore binary**.

### Parent web

Host `apps/parent-web` on HTTPS with Cognito Hosted UI; set `API_BASE_URL` / Cognito IDs from stack outputs. CORS currently allows localhost — extend for your production origin before public use.

## Cost / teardown

See `docs/AWS_COSTS_AND_TEARDOWN.md`. Monthly budget alert is $25 (`FamilyFlowSandboxBudget`).
