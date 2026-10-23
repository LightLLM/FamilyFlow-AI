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

## Amazon Developer Console — Alexa skill (in progress)

**Skill created:** `amzn1.ask.skill.ffe35052-4f43-45e1-96b1-836ac69ff352`  
**Name:** FamilyFlow · Custom · Provision your own  
**Invocation:** `family flow`  
**Endpoint Lambda:** `FamilyFlowSandbox-AlexaSkillFn2AEF2519-n5kQoGba5n5o` (skill-ID-scoped invoke permission)  
**Interaction model:** uploaded from repo JSON; build triggered in Console  

Console: https://developer.amazon.com/alexa/console/ask/build/custom/amzn1.ask.skill.ffe35052-4f43-45e1-96b1-836ac69ff352/development/en_US/dashboard

### Remaining Alexa steps (owner click-through)

1. **Test tab** → set skill testing to **Development**.
2. **Account linking** (Build → Account linking):
   - Auth Code Grant
   - Authorization URI: `{CognitoDomain}/oauth2/authorize`
   - Access Token URI: `{CognitoDomain}/oauth2/token`
   - Client ID: `UserPoolClientId` above (no secret)
   - Scopes: `openid email profile`
   - Copy Alexa **Redirect URLs** into Cognito app client Callback URLs (plus `http://localhost:3000/auth/callback`)
3. Simulator: `open family flow` → link account with `parent@familyflow.demo` → `suggest an adventure` / `request the adventure`
4. Confirm pending approval in parent dashboard against live API.

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
