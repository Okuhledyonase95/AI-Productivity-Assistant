# AI Workplace Productivity Assistant

A modern, responsive SaaS-style web app that helps professionals automate everyday workplace tasks using AI. Built on TanStack Start with Lovable Cloud and the Lovable AI Gateway.

## Project Overview

The AI Workplace Productivity Assistant brings five focused AI tools into one clean dashboard with sidebar navigation. Every AI output is editable, copyable, and regenerable, and a Responsible AI disclaimer is shown throughout to remind users to verify generated content before business use.

## Features

- **Smart Email Generator** — Generate professional emails from a short brief with tone and recipient controls.
- **Meeting Notes Summarizer** — Turn raw notes/transcripts into Executive Summary, Key Decisions, Action Items, and Risks.
- **AI Task Planner** — Break goals into prioritized milestones with suggested timelines.
- **AI Research Assistant** — Produce structured briefings: findings, opportunities, risks, recommendations.
- **AI Chatbot Interface** — Conversational assistant for writing, brainstorming, and productivity help.
- **Modern Dashboard UI** with sidebar navigation, fully responsive (desktop, tablet, mobile).
- **Editable AI outputs** with copy and regenerate actions.
- **Responsible AI disclaimer** across the app.

## Tools & Technologies

- **Framework:** TanStack Start v1 (React 19, file-based routing, server functions)
- **Build:** Vite 7
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui components
- **State/Data:** TanStack Query
- **Backend:** Lovable Cloud (managed Postgres, Auth, Storage)
- **AI:** Lovable AI Gateway (`google/gemini-3-flash-preview`)
- **Server logic:** `createServerFn` (TanStack server functions) — no separate API server needed
- **Package manager:** Bun

## Project Structure

```
src/
├── components/
│   ├── app-sidebar.tsx        # Sidebar navigation
│   ├── tool-shell.tsx         # Shared layout for AI tools
│   └── ui/                    # shadcn/ui primitives
├── integrations/supabase/     # Auto-generated Lovable Cloud client
├── lib/
│   ├── ai.functions.ts        # Server function calling Lovable AI Gateway
│   └── use-ai.ts              # Client hook for AI calls
├── routes/
│   ├── __root.tsx             # App shell + sidebar
│   ├── index.tsx              # Dashboard
│   ├── email.tsx              # Smart Email Generator
│   ├── meetings.tsx           # Meeting Notes Summarizer
│   ├── tasks.tsx              # AI Task Planner
│   ├── research.tsx           # AI Research Assistant
│   └── chat.tsx               # AI Chatbot
└── styles.css                 # Design tokens (OKLCH)
```

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh) (or Node.js 20+)
- A Lovable project with Lovable Cloud enabled (this repo already includes the configuration)

### 1. Install dependencies

```bash
bun install
```

### 2. Environment variables

Lovable Cloud auto-generates `.env` with:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

The server-side `LOVABLE_API_KEY` (used by the AI Gateway) is provisioned automatically in the Lovable runtime — no manual setup required.

### 3. Run the dev server

```bash
bun run dev
```

Open the preview URL printed in the terminal.

### 4. Build for production

```bash
bun run build
```

## Responsible AI Disclaimer

AI-generated content may contain inaccuracies, omissions, biases, or outdated information. Always review and verify outputs before using them for business communications, legal, financial, compliance, or strategic decisions. This app assists professionals — it does not replace human judgment.

## License

MIT