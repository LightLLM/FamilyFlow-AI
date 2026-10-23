# FamilyFlow AI

**Less scrolling. More living together.**

FamilyFlow is a family coordination and adventure product for the [Amazon Devices Hackathon 2026](https://amazonappdev2026.devpost.com/). Parents and kids browse age-banded adventures on the living-room screen, request them by Fire TV / Vega or Alexa, and parents approve every sensitive step in one **unified web dashboard**. Completions unlock **non-purchasable** family rewards. Optional **Amazon Bedrock** suggestions stay parent-reviewable and never bypass approval.

**Privacy boundary:** Parents see **FamilyFlow activity only** — not unrelated Alexa conversations, Amazon purchases, or third-party Fire TV apps.

**GitHub (public):** https://github.com/LightLLM/FamilyFlow-AI  
**Landing page:** https://familyflow-ecru.vercel.app  
**Owner:** LightLLM · **Last status update:** 2026-10-23

---

## Amazon developer services used

FamilyFlow is built on **Amazon Developer** and **AWS** products end to end. These are the services this app uses today:

| Amazon / AWS service | How FamilyFlow uses it |
|----------------------|------------------------|
| **Amazon Alexa** (Alexa Skills Kit / Developer Console) | Custom skill **FamilyFlow** (`amzn1.ask.skill.ffe35052-4f43-45e1-96b1-836ac69ff352`), invocation **family flow** — suggest / request adventures and check status with parent approval |
| **Alexa+ / MCP (preview)** | `apps/alexa-plus-mcp` Streamable HTTP MCP server for agentic / Alexa+ hackathon track |
| **Amazon Fire TV / Vega OS** | Living-room client target; Appstore publish path + Vega Virtual Device; interim 10-ft browser shell for API/D-pad |
| **Amazon Cognito** | Parent identity (User Pool + Hosted UI); JWT authorizer for parent API; intended Alexa **account linking** OAuth |
| **Amazon API Gateway** | HTTP API front door to the FamilyFlow backend |
| **AWS Lambda** | Node.js 22 runtimes for FamilyFlow **API** and **Alexa skill** adapters |
| **Amazon DynamoDB** | Single-table household / missions / approvals / pairing / audit store (on-demand) |
| **Amazon Bedrock** | Optional structured adventure suggestions (`Converse` + JSON schema); curated library fallback when disabled |
| **AWS CDK** | Infrastructure as code for the sandbox stack (`FamilyFlowSandbox`) |
| **Amazon CloudWatch** | Lambda / API logs (short retention in sandbox) |
| **AWS Budgets** | Cost guardrail (~$25/month alert on the sandbox stack) |
| **Amazon Developer Console** | Skill creation, interaction model, simulator testing, and (planned) Fire TV / Appstore submission |

Official consoles:

- [Amazon Developer](https://developer.amazon.com/) · [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask) · [AWS Console](https://console.aws.amazon.com/)

Publish checklist: [`docs/AMAZON_PUBLISH_GUIDE.md`](docs/AMAZON_PUBLISH_GUIDE.md)

---

## What’s finished (live status)

### Repository & marketing site

- Public repo pushed: https://github.com/LightLLM/FamilyFlow-AI (`main`)
- Customer landing (Vercel): https://familyflow-ecru.vercel.app — source `apps/landing`
- Monorepo: parent web, landing, Fire TV shell, Alexa skill, Alexa+ MCP, API, domain/shared packages, CDK infra

### Automated tests (2026-10-23)

| Suite | Result |
|-------|--------|
| Unit — domain, API, fire-tv, alexa, alexa-plus-mcp | **PASS 28/28** |
| E2E — API + Fire TV device session + Alexa local handlers | **PASS 17/17** (`scripts/e2e-fire-tv-alexa.sh`) |
| Vega Virtual Device / physical Fire TV | **Not executed** (needs Apple Silicon + VDT) |
| Alexa Console simulator (launch) | **PASS** — `open family flow` returns Welcome speech |

### AWS sandbox — deployed (`FamilyFlowSandbox`, us-east-1, account `134553439892`)

| Output | Value |
|--------|-------|
| API | https://tyyke5nlm3.execute-api.us-east-1.amazonaws.com |
| Health | `GET /health` → `{"ok":true,"mode":"aws","product":"FamilyFlow AI"}` |
| Cognito User Pool | `us-east-1_0ifoFYaCz` |
| Cognito App Client | `2osuui7r8vsnrbv6l9lhkdtugl` |
| Cognito Hosted UI | https://familyflow-134553439892.auth.us-east-1.amazoncognito.com |
| DynamoDB table | `FamilyFlowSandbox-FamilyFlowTable9CF27E1C-WP4DTW24L7GN` |
| API Lambda | Node 22 · `FAMILYFLOW_MODE=aws` · `ALLOW_LOCAL_DEV_AUTH=false` |
| Alexa skill Lambda | `arn:aws:lambda:us-east-1:134553439892:function:FamilyFlowSandbox-AlexaSkillFn2AEF2519-n5kQoGba5n5o` |
| Budget alert | $25/month (`FamilyFlowSandboxBudget`) |

Production-aligned API Gateway:

- Cognito JWT on parent routes
- Device session routes (`/devices/*`, mission request/complete) open at gateway; **device bearer verified in Lambda** (no parent passwords on TV)

Reviewer Cognito parent user: `parent@familyflow.demo` (password held by operator — not committed).

### Alexa Developer Console — skill created

| Field | Value |
|-------|--------|
| Skill name | FamilyFlow |
| Skill ID | `amzn1.ask.skill.ffe35052-4f43-45e1-96b1-836ac69ff352` |
| Type | Custom · Provision your own |
| Invocation | `family flow` |
| Endpoint | Alexa skill Lambda above (invoke permission scoped to this skill ID) |
| Interaction model | Uploaded from `apps/alexa/skill-package/interactionModels/custom/en-US.json` |
| Console | [Open skill](https://developer.amazon.com/alexa/console/ask/build/custom/amzn1.ask.skill.ffe35052-4f43-45e1-96b1-836ac69ff352/development/en_US/dashboard) |
| Simulator check | Development testing on · launch utterance succeeded |

### Still remaining (owner)

1. **Alexa account linking** (Build → Account linking) → Cognito OAuth  
   - Auth: `{CognitoHostedUI}/oauth2/authorize`  
   - Token: `{CognitoHostedUI}/oauth2/token`  
   - Client ID: `2osuui7r8vsnrbv6l9lhkdtugl` · scopes `openid email profile`  
   - Copy Alexa Redirect URLs into Cognito app client callbacks  
2. Linked-account simulator: `suggest an adventure` / `request the adventure` → parent approve on web  
3. **Fire TV / Vega Appstore** binary on Apple Silicon + device test (browser shell is not an Appstore binary)  
4. Host parent web on HTTPS; extend CORS beyond localhost  

Full checklist: [`docs/DEPLOYMENT_STATUS.md`](docs/DEPLOYMENT_STATUS.md) · publish guide: [`docs/AMAZON_PUBLISH_GUIDE.md`](docs/AMAZON_PUBLISH_GUIDE.md)

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Parent unified web | Next.js App Router, Tailwind CSS, TypeScript |
| Living-room client | Fire TV / Vega OS target; browser 10-ft shell for API/D-pad integration; official VVD for simulator demo |
| Voice | Alexa custom skill (ASK SDK) + Alexa+ MCP preview server |
| API | AWS API Gateway HTTP API → Lambda (Node.js 22) |
| Auth | Amazon Cognito (parents); hashed TV pairing codes + device session tokens |
| Data | DynamoDB single-table (on-demand) |
| AI | Amazon Bedrock Converse (JSON schema + safety checks) + curated fallback library |
| Infra | AWS CDK v2, CloudWatch logs, AWS Budgets |
| Monorepo | pnpm workspaces, TypeScript |
| Local demo | In-memory or DynamoDB Local; `Bearer local:…` **dev only** |

---

## Amazon architecture & data workflow

FamilyFlow is an **Amazon Developer + AWS** product. Clients on Amazon devices/voice hit AWS APIs; household state lives in DynamoDB; optional AI is Bedrock.

### System map (Amazon services)

```mermaid
flowchart TB
  subgraph AmazonDev["Amazon Developer surfaces"]
    FTV["Amazon Fire TV / Vega OS<br/>device pairing + missions"]
    ASK["Amazon Alexa custom skill<br/>ASK · invocation: family flow"]
    MCP["Alexa+ MCP preview<br/>Streamable HTTP tools"]
    CONSOLE["Amazon Developer Console<br/>skill · Appstore path"]
  end

  subgraph ParentSide["Parent experience"]
    WEB["Parent web dashboard<br/>approvals · planner · privacy"]
  end

  subgraph AWS["AWS account — FamilyFlowSandbox"]
    COG["Amazon Cognito<br/>User Pool + Hosted UI<br/>parent JWT / account linking"]
    APIGW["Amazon API Gateway<br/>HTTP API"]
    APIL["AWS Lambda<br/>FamilyFlow API · Node 22"]
    AXL["AWS Lambda<br/>Alexa skill adapter"]
    DDB[("Amazon DynamoDB<br/>single-table FamilyFlow")]
    BR["Amazon Bedrock<br/>Converse · optional suggestions"]
    CW["Amazon CloudWatch Logs"]
    BUD["AWS Budgets · $25 alert"]
    CDK["AWS CDK · infra as code"]
  end

  CONSOLE -.-> ASK
  CONSOLE -.-> FTV
  WEB -->|Cognito JWT| APIGW
  FTV -->|device session Bearer| APIGW
  ASK --> AXL
  AXL -->|linked access token| APIGW
  MCP -->|access token| APIGW
  APIGW --> COG
  APIGW --> APIL
  APIL --> DDB
  APIL -.->|optional| BR
  APIL --> CW
  AXL --> CW
  CDK --> AWS
  BUD -.-> AWS
```

### App data in Amazon DynamoDB

Single-table design (`PK` / `SK` + GSIs). Parents only ever see **FamilyFlow** rows for their household—not Alexa history or Amazon retail data.

```mermaid
erDiagram
  HOUSEHOLD ||--o{ MEMBER : contains
  HOUSEHOLD ||--o{ MISSION : catalogs
  HOUSEHOLD ||--o{ DEVICE_SESSION : pairs
  HOUSEHOLD ||--o{ AUDIT_EVENT : records
  MEMBER ||--o{ MISSION_REQUEST : requests
  MISSION ||--o{ MISSION_REQUEST : targets
  MISSION_REQUEST ||--o| COMPLETION : may_complete
  HOUSEHOLD ||--o{ REWARD : unlocks

  HOUSEHOLD {
    string id PK
    string ownerId "Cognito sub"
    string timezone
    object settings "voice AI rewards pairing flags"
  }
  MEMBER {
    string id
    string role "parent|child"
    string ageBand "not birth date"
    bool visibilityNoticeAck
  }
  MISSION {
    string id
    string title
    string status "available|pending|approved|..."
    string source "curated|bedrock"
  }
  MISSION_REQUEST {
    string id
    string status "pending|approved|rejected"
    string source "fire_tv|alexa"
  }
  COMPLETION {
    string id
    string status
    int pointsAwarded "exactly once"
  }
  DEVICE_SESSION {
    string id
    string pairingHash
    string sessionTokenHash
  }
  REWARD {
    string id
    int pointsThreshold
    string title "non-purchasable"
  }
  AUDIT_EVENT {
    string type
    string actorType
    object metadata "sanitized allowlist"
  }
```

| Data | Stored on | Notes |
|------|-----------|--------|
| Parent identity | **Amazon Cognito** | Email sign-in; JWT to API Gateway |
| Household, children, missions, approvals, rewards, audit | **Amazon DynamoDB** | On-demand single table |
| TV pairing sessions | **DynamoDB** (hashed codes / tokens) | No parent password on Fire TV |
| Optional adventure AI JSON | **Amazon Bedrock** → then DynamoDB | Never auto-bypasses parent approval |
| Skill utterance handling | **Alexa** → **Lambda** → API | Account-linked Cognito token in production |
| Logs / cost guard | **CloudWatch** / **Budgets** | Sandbox observability |

### Happy-path sequence (Amazon-named)

```mermaid
sequenceDiagram
  actor Parent as Parent web
  actor Kid as Fire TV / Alexa
  participant Cog as Amazon Cognito
  participant APIGW as API Gateway
  participant L as Lambda API
  participant DDB as DynamoDB
  participant BR as Bedrock optional
  participant ASK as Alexa skill Lambda

  Parent->>Cog: Sign in Hosted UI
  Cog-->>Parent: JWT
  Parent->>APIGW: Create household + child age band
  APIGW->>L: authorize JWT
  L->>DDB: put Household Member Missions
  Parent->>APIGW: Generate TV pairing code
  L->>DDB: store hashed code
  Kid->>APIGW: POST /devices/pair
  L->>DDB: create DeviceSession
  Parent->>APIGW: Suggest adventure
  L->>BR: Converse structured JSON
  BR-->>L: plan or curated fallback
  L->>DDB: save Mission source bedrock|curated
  Kid->>ASK: Alexa open family flow / request adventure
  ASK->>APIGW: Bearer linked Cognito token
  L->>DDB: MissionRequest pending
  Parent->>APIGW: Approve request
  L->>DDB: mission approved + audit
  Kid->>APIGW: complete-request device Bearer
  Parent->>APIGW: Verify completion
  L->>DDB: points once + reward unlock check
```

---

## Monorepo layout

```
apps/landing          Public marketing site (Vercel)
apps/parent-web       Unified parent dashboard (approvals, planner, Bedrock suggest, privacy)
apps/fire-tv          10-foot TV shell + Vega publish notes
apps/alexa            ASK custom skill + local simulator
apps/alexa-plus-mcp   MCP server for Alexa+ / agentic preview
services/api          HTTP API (local + Lambda)
packages/shared       Types, Zod schemas, DynamoDB keys
packages/domain       Approvals, pairing, points-once, AI safety, audit sanitize
infra                 CDK: Cognito, DynamoDB, HTTP API, Lambda, budget
curated-missions      Safe fallback adventure library
docs/                 Architecture, security, privacy, publish, Bedrock, testing
scripts/              verify-environment, run-tests, e2e-fire-tv-alexa
```

---

## Quick start (local)

```bash
./.tools/pnpm-bin install          # or: pnpm install
./.tools/pnpm-bin --filter @familyflow/shared build
./.tools/pnpm-bin --filter @familyflow/domain build

# Terminal 1 — API
./.tools/pnpm-bin --filter @familyflow/api start

# Terminal 2 — Parent web  → http://localhost:3000
./.tools/pnpm-bin --filter @familyflow/parent-web dev

# Terminal 3 — TV shell     → http://127.0.0.1:3200
./.tools/pnpm-bin --filter @familyflow/fire-tv start
```

Local auth (development only): `Authorization: Bearer local:local-parent-001`

---

## Testing Fire TV / Vega / Alexa

| Path | How |
|------|-----|
| Automated E2E | `bash scripts/e2e-fire-tv-alexa.sh` (API + device session + Alexa handlers) |
| Unit / domain | `bash scripts/run-tests.sh` |
| Fire TV browser shell | `:3200` after pair code from dashboard |
| **Vega Virtual Device** | Install VDT → `vega virtual-device start` → run Vega-packaged app (see below) |
| **Alexa Developer Console** | Skill live (see status above); finish Cognito account linking, then simulator |
| Alexa local | `pnpm --filter @familyflow/alexa simulate:local RequestAdventure` |
| Alexa+ MCP | `pnpm --filter @familyflow/alexa-plus-mcp start` → `http://127.0.0.1:3300/mcp` |
| Bedrock | Enable model access → `BEDROCK_ENABLED=true` → Suggest in planner |

Full guide: [`docs/TESTING_FIRE_TV_VEGA_ALEXA.md`](docs/TESTING_FIRE_TV_VEGA_ALEXA.md)

### Vega Virtual Device (official Fire TV simulator)

```bash
curl -fsSL https://sdk-installer.vega.labcollab.net/get_vvm.sh | bash && source ~/vega/env
vega virtual-device start --display-res=1920,1080
```

Port FamilyFlow TV UI from Amazon RN-TV / Vega samples; call the same pairing + mission APIs. Details: [`docs/AMAZON_PUBLISH_GUIDE.md`](docs/AMAZON_PUBLISH_GUIDE.md).

---

## Amazon Bedrock (valuable family suggestions)

1. AWS Console → Bedrock → request model access (e.g. Nova Lite in your region).  
2. Set `BEDROCK_ENABLED=true`, `BEDROCK_MODEL_ID`, `BEDROCK_REGION`.  
3. Parent planner → **Suggest an adventure** → labeled AI or curated fallback.  
4. Child still needs **request + parent approval**; rewards need **completion approval**.

Guide: [`docs/BEDROCK_SETUP.md`](docs/BEDROCK_SETUP.md)

---

## AWS deploy (your account)

**Already deployed** for LightLLM sandbox — see [What’s finished](#whats-finished-live-status). To redeploy or recreate:

```bash
pnpm --filter @familyflow/api build
pnpm --filter @familyflow/alexa build
cd infra && npx cdk synth
npx cdk deploy FamilyFlowSandbox -c budgetEmail=you@example.com
```

Costs / teardown: [`docs/AWS_COSTS_AND_TEARDOWN.md`](docs/AWS_COSTS_AND_TEARDOWN.md)  
**Do not deploy without reviewing budget.** Default alarm: $25/month.

---

## Publish to Amazon Developer

| Product | Doc |
|---------|-----|
| Fire TV / Vega Appstore | [`docs/AMAZON_PUBLISH_GUIDE.md`](docs/AMAZON_PUBLISH_GUIDE.md) §A |
| Alexa ASK skill | §B |
| Alexa+ MCP | §C |
| Parent web hosting | §D |

---

## Documentation index

| Doc | Purpose |
|-----|---------|
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | System design |
| [`docs/SECURITY.md`](docs/SECURITY.md) | AuthZ, pairing, threats |
| [`docs/PRIVACY_AND_CHILD_SAFETY.md`](docs/PRIVACY_AND_CHILD_SAFETY.md) | Visibility & child safety |
| [`docs/IMPLEMENTATION_STATUS.md`](docs/IMPLEMENTATION_STATUS.md) | 30-step status |
| [`docs/TEST_MATRIX.md`](docs/TEST_MATRIX.md) | Automated vs not executed |
| [`docs/E2E_FIRE_TV_ALEXA_RESULTS.md`](docs/E2E_FIRE_TV_ALEXA_RESULTS.md) | Latest E2E results |
| [`docs/KNOWN_LIMITATIONS.md`](docs/KNOWN_LIMITATIONS.md) | Honest gaps |
| [`docs/HACKATHON_SUBMISSION.md`](docs/HACKATHON_SUBMISSION.md) | Devpost package |
| [`docs/DEPLOYMENT_STATUS.md`](docs/DEPLOYMENT_STATUS.md) | Live AWS + Alexa Console status |
| [`docs/AMAZON_PUBLISH_GUIDE.md`](docs/AMAZON_PUBLISH_GUIDE.md) | Appstore / Alexa / web publish |

---

## Privacy (product commitments)

- No ads, data sales, public child profiles, or child-to-stranger chat  
- Age bands only (no exact birth dates)  
- Export / delete / feature flags / session revocation  
- **Not** a COPPA or legal certification claim without counsel review  
- Do not onboard real children before privacy/security/legal readiness review  

---

## License

MIT — see [`LICENSE`](LICENSE).
