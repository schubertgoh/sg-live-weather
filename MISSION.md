# Mission: data.gov.sg Real-Time APIs in a Real App

## Why
Ship a working weather & air-quality web app in Next.js for a course project: one that answers "what's it like near me right now — rain, temperature, haze?" using Singapore's live data.gov.sg real-time APIs, built the way a production app would be.

## Success looks like
- Call any data.gov.sg v2 real-time endpoint and turn its response into clean, typed app data (joining metadata to readings).
- Keep the API key server-side in a Next.js Route Handler, with caching tuned to each feed's update frequency.
- Handle the real failure modes gracefully: `429` rate limits, error envelopes, stale or missing readings.
- Show readings for the user's location (nearest area / region / station) in a polished UI, ideally on a map.
- Demo and explain the architecture confidently for the course assessment.

## Constraints
- Already a comfortable developer: skip generic HTTP/JSON/React basics.
- Stack: React / Next.js (App Router).
- Course project, so there's a deadline (date not yet given). Favour shippable increments.
- Rate limit without a key: 6 calls / 10 s for real-time APIs.

## Out of scope
- Transport feeds (carparks, taxis, traffic cameras) for now.
- Collection / Dataset (non-real-time) APIs, except if needed later for static geodata.
- Native mobile apps.
