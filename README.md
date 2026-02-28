# Lares.AI — AI Workforce Platform

> **Built for India · Kerala AI Mission Hackathon 2026**
> AI employees for Indian SMBs. Deploy in 60 seconds. From ₹2,000/agent/month.

Lares.AI lets businesses hire and deploy AI agents that handle customer support, sales, and DevOps — autonomously, around the clock. Multiple agents collaborate with each other, hand off tasks between themselves, and report everything to a live audit trail.

**🚀 Live Demo: [https://kvk6hc.csb.app/](https://kvk6hc.csb.app/)**

---

## What You'll See

When you open the app, you land on a dashboard with three AI agents already running — a **Support Agent**, a **Sales Agent**, and a **DevOps Agent**. You can watch them collaborate, chat with them directly, hire new ones, and connect them to real communication channels.

---

## How to Test

### 1. Watch the Multi-Agent Demo

This is the best place to start. It shows how the three agents work together to resolve a real incident — a payment gateway failure — without any human intervention.

1. Open [https://kvk6hc.csb.app/](https://kvk6hc.csb.app/)
2. Scroll down to the **Agent Collaboration** panel
3. Click **Run Demo**

You'll see a live feed of messages between agents:

- A customer reports a payment failure
- The **Support Agent** finds 47 matching errors in Sentry
- It hands the issue off to the **DevOps Agent**
- DevOps traces it to a bad commit, files a P0 ticket in Linear
- Support sends the customer a response with an ETA
- The **Sales Agent** flags the customer as high-value in HubSpot
- Ticket closed, incident logged

The whole sequence plays out in about 20 seconds.

---

### 2. Chat with an Agent

1. In the **Agent Collaboration** panel, click the **Chat** tab
2. Pick an agent from the buttons at the top — Support, Sales, DevOps, or All Agents
3. Type a message and press Enter

Each agent knows its role, its tools, and what it can and can't do. Try these:

```
Support:  "We have a customer reporting a 502 error on checkout. What should I do?"
Sales:    "Draft a follow-up email for a lead who went cold after a demo"
DevOps:   "Our API response times spiked 3x in the last hour. Where do I start?"
```

These are real AI responses — not scripted.

---

### 3. Hire a New Agent

1. Click **+ Hire Agent** in the top-right corner
2. Pick a preset role or choose **Custom Agent**
3. For a custom agent, fill in a name, a persona description, pick a model, and optionally set up a background task schedule
4. Click **Hire AI Employee** — the agent appears on your dashboard

---

### 4. Browse Agent Templates

Click **Agents → Templates** in the sidebar to see pre-built agents for HR, Finance, Marketing, Legal, Data, and Onboarding. Any of them can be deployed in one click.

---

## Testing on Slack (Recommended)

The agents are also connected to live Slack workspaces. This gives a more realistic picture of how they'd work in a real business environment — responding to natural messages, not just button clicks.

---

### Support Agent

**Join the workspace:**
👉 [Join Lares.AI Support Slack](https://join.slack.com/share/enQtMTA1OTkzNTI2MTI1OTctYTE2MDg3YjA3NTkxMTg2ZTFkNGRlNmI1ZmI1MGJlMzQxZDM2OGRhNTc5ZTA4MjE2ZWQwNGNhNzNmNzI2MTRlMg?entry_point=default_oauth)

Once you're in, go to the **#support** channel and send this message:

```
our payment gateway has been failing for 30 minutes. Orders stuck at checkout. @lares-support
```

The `@lares-support` bot will respond within seconds — it will triage the issue, reference the relevant tools (Sentry, Zendesk), and escalate to engineering if needed. You can keep the conversation going naturally from there.

---

### DevOps Agent

**Join the workspace:**
👉 [Join Lares.AI Engineering Slack](https://join.slack.com/share/enQtMTA2MDA3MTgyNDE4OTQtMDI3NzI3ZjI2MzQwMmU0MTQ2MTk2NGVjMjI3OTdiZGZhZTI1NjAyOWYxODUyMWI3N2Y4YzNmMDM1MmIwYWE1OA?entry_point=default_oauth)

Go to the **#engineering** channel and send:

```
@lares-devops our API response times are 3x normal since the last deploy. Can you investigate?
```

The `@lares-devops` bot will walk through an investigation — checking CloudWatch logs, reviewing recent commits, suggesting a fix or rollback, and offering to file a Linear ticket.

---

### Full Sequence (5 minutes)

To see the multi-agent handoff play out live across both workspaces:

1. **Support Slack → #support** — Report the payment failure to `@lares-support`
2. **Support Slack** — Read the response; it will escalate to engineering
3. **Engineering Slack → #engineering** — Follow up with `@lares-devops` on the same incident
4. **Engineering Slack** — Ask it to create a ticket and propose a fix
5. **Support Slack → #support** — Ask `@lares-support` for a customer-facing status update

This mirrors the in-app demo exactly — just with real bots, live responses, and natural conversation.

---

## Architecture

```
┌──────────────────────────────────────────┐
│            Lares.AI Dashboard            │
│      (React · Claude API · DM Sans)      │
└─────────────────┬────────────────────────┘
                  │
          ┌───────┴────────┐
          │  Collab Bus    │  ← Slack channels
          └───────┬────────┘
     ┌────────────┼─────────────┐
     │            │             │
 ┌───┴───┐   ┌────┴───┐   ┌────┴───┐
 │Support│   │ Sales  │   │DevOps  │
 │ Agent │   │ Agent  │   │ Agent  │
 └───────┘   └────────┘   └────────┘
                  │
          ┌───────┴────────┐
          │ Lares Runtime  │
          │ (Isolated VMs) │
          └────────────────┘
```

Every agent action is logged to the audit trail with a risk rating (Low / Medium / High). You can see this under the **Audit Log** tab on the dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| AI | Claude Sonnet 4.6 (Anthropic API) |
| Live Bots | lares-support , lares-devops
| Channels | Slack (Support / Engineering workspaces) |
|Supported Platforms| Slack, Telegram, WhatsApp, Gmail, Discord, X, Notion, HubSpot |

---

## Team

**Team Lares.AI** · Kerala AI Mission Hackathon 2026

---


