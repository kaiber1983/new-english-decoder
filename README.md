# Logic English Decoder

Turn elite English into people's English.

This MVP uses:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Mock AI by default
- OpenAI-ready API route

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

- `/` home page and decoder
- `/decode` focused decoder page
- `/about` product idea
- `/words/[slug]` static transparent dictionary pages
- `/api/decode` POST API route
