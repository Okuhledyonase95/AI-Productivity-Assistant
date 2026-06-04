# AI Workplace Productivity Assistant

A modern, responsive SaaS-style web app that helps professionals automate everyday workplace tasks with AI. It bundles five focused AI tools behind a clean dashboard with sidebar navigation, structured prompts, and fully editable outputs.

## Project Overview

The AI Workplace Productivity Assistant gives knowledge workers a single place to draft communication, digest meetings, plan work, run quick research, and chat with an AI assistant. Every tool uses structured prompts under the hood and returns editable output, so users stay in control of the final result. A Responsible AI disclaimer is shown throughout the app to remind users to review AI-generated content before relying on it.

## Features

- **Smart Email Generator** – Turn a short brief into a polished email with selectable tone and recipient context. Output is editable and copyable.
- **Meeting Notes Summarizer** – Paste raw notes or a transcript and get an executive summary, key decisions, action items, and follow-ups.
- **AI Task Planner** – Convert a goal into a prioritized, milestone-based plan with suggested timelines.
- **AI Research Assistant** – Generate structured briefings with key findings, opportunities, risks, and recommendations.
- **AI Chatbot Interface** – A conversational assistant for brainstorming, writing help, and productivity questions.
- **Modern Dashboard UI** – Sidebar navigation and a responsive layout for desktop, tablet, and mobile.
- **Editable AI Outputs** – Every generated response can be edited, copied, or regenerated.
- **Responsible AI Disclaimer** – Persistent reminders that AI output should be reviewed before business use.

## Tools & Technologies

- **Framework**: TanStack Start v1 (React 19, SSR, file-based routing)
- **Build Tool**: Vite 7
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with OKLCH design tokens in `src/styles.css`
- **UI Components**: shadcn/ui + Radix primitives
- **Animation**: Framer Motion
- **Backend**: Lovable Cloud (managed Postgres, auth, storage)
- **Server Logic**: TanStack `createServerFn` (`src/lib/ai.functions.ts`)
- **AI**: Lovable AI Gateway using `google/gemini-3-flash-preview` — no API key required
- **Tooling**: ESLint, Prettier, Bun

## Project Structure

```text
src/
├── components/
│   ├── app-sidebar.tsx       # Sidebar navigation
│   ├── tool-shell.tsx        # Shared layout for AI tools
│   └── ui/                   # shadcn/ui primitives
├── integrations/supabase/    # Auto-generated Lovable Cloud clients
├── lib/
│   ├── ai.functions.ts       # Server function calling the AI Gateway
│   └── use-ai.ts             # Client hook for AI calls + loading state
├── routes/
│   ├── __root.tsx            # Root layout (sidebar + outlet)
│   ├── index.tsx             # Dashboard home
│   ├── email.tsx             # Smart Email Generator
│   ├── meetings.tsx          # Meeting Notes Summarizer
│   ├── tasks.tsx             # AI Task Planner
│   ├── research.tsx          # AI Research Assistant
│   └── chat.tsx              # AI Chatbot
└── styles.css                # Design tokens + Tailwind theme
```

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 18+

### Install dependencies

```bash
bun install
```

### Run the dev server

```bash
bun run dev
```

The app will be available at `http://localhost:8080`.

### Build for production

```bash
bun run build
```

### Environment

This project runs on **Lovable Cloud**, which provisions the backend (database, auth, AI Gateway) automatically. The `.env` file is generated and managed for you — do not edit it manually. The following variables are provided:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`

AI calls go through the Lovable AI Gateway, so no third-party API key is required.

## Responsible AI Disclaimer

AI-generated content may contain inaccuracies, omissions, biases, or outdated information. Always review and verify outputs before using them for business communications, legal, financial, compliance, or strategic decisions. This application assists professionals — it does not replace human judgment.

## License

MIT
