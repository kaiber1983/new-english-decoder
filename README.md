# Logic English Decoder

Turn elite English into people's English.

This MVP uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Mock AI by default
- OpenAI-ready API route
- Server API for New English social words

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Environment

`.env.local` starts in mock mode:

```bash
USE_MOCK_AI=true
OPENAI_API_KEY=
```

Set `USE_MOCK_AI=false` and add `OPENAI_API_KEY` when you are ready to call the real API.

## Routes

- `/` home page
- `/new` create a share challenge
- `/challenge` guess a shared word
- `/board` week, month, and all-time rankings
- `/decode` focused decoder page
- `/about` product idea
- `/words/[slug]` static transparent dictionary pages
- `/api/decode` POST API route
- `/api/social-words` social word API route

## Social data

The current social API keeps a demo server store so the UI no longer writes
directly to browser storage. The next production step is to connect the service
layer in `lib/socialWordService.ts` to Supabase.

The starter table is in:

```bash
supabase/social-schema.sql
```
