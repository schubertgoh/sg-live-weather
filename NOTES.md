# Notes

## Learner preferences
- Comfortable developer. Don't re-teach HTTP, JSON, fetch, async/await, React basics.
- Stack: Next.js (App Router). Code examples in TypeScript/JS.
- Course project with a deadline, so bias toward lessons that each leave a shippable piece of the app.

## Empirical findings (verified 2026-10-20 with live calls)
- v2 base: `https://api-open.data.gov.sg/v2/real-time/api/{endpoint}`. Verified 200: two-hr-forecast, twenty-four-hr-forecast, air-temperature, rainfall, psi, pm25, uv.
- Transport feeds are NOT on v2 (404); they're on v1 `https://api.data.gov.sg/v1/transport/...` (carpark-availability, taxi-availability, traffic-images all 200).
- Envelope: `{code, errorMsg, data}`; success code 0. Bad date: code 4 `ERROR_PARAMS`; rate limited: HTTP 429, code 24 `TOO_MANY_REQUESTS`, `data: null`.
- Burst test with no key: 3×200 then 429s. The limit counts calls made just before, so effective headroom can be < 6.
- CORS: `access-control-allow-origin: *`, so browser-direct calls work (no key). Used in Lesson 1 lab.
- **429 responses carry NO CORS header**, so in the browser a rate limit surfaces as `TypeError: Failed to fetch`, not status 429. A strong argument for the server-side proxy in Lesson 2 (and a good debugging story).
- Rate limit is per IP and shared across tabs: the map + lesson lab + curl all draw from the same 6/10 s.
- `?date=` responses list items newest-first (psi on 2026-10-20: 13:00 … 00:00), which confirms "never blind items[0]/[-1]".
- OneMap tiles (`https://www.onemap.gov.sg/maps/tiles/{Default|Grey|Night}/{z}/{x}/{y}.png`) work keyless; CARTO tiles showed an API-key watermark.

- Pagination: `?date=` pages hold 25 entries and go backwards in time; pass `&paginationToken=`. Rainfall (5-min) = 2 h/page; two-hr-forecast ≈ 12 h/page; air-temperature (1-min) = 25 min/page (too costly for history, so fetch point-in-time with `date=YYYY-MM-DDTHH:mm:ss`).
- OneMap search `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=…&returnGeom=Y&getAddrDetails=Y&pageNum=1` works keyless with CORS `*`, but returns an "Authentication token missing" warning. It may need a token later.
- Learner said "ACN AQI" = interpreted as aqicn.org (US EPA AQI). Computed locally from NEA PSI-feed concentrations with the 2024 EPA breakpoints (verified on Wikipedia's AQI table). Confirm with the learner.

## Built
- `apps/live-map/index.html` (2026-10-20): Leaflet + OneMap live map of PSI/PM2.5, 2-hr forecast, temp, rain, plus the 24-hr outlook and UV. Includes a client-side rate-limit queue (4/10 s) and a retry on "Failed to fetch". It's the browser-only prototype; port it to Next.js in Lessons 2–5.
- v2 of the map (same day): rain radar (IDW canvas overlay of past-hour totals), 12-h time slider with play, PSI / US AQI / PM2.5 toggle, "Should I go out?" planner (OneMap search or pick on map, time, activity, sensitive group → verdict + drier-window suggestion), theme toggle, collapsible panel / mobile bottom sheet, forecast icons only at zoom ≥ 12 (dominant forecast badge on region circles when zoomed out).
- Four shape families: area (two-hr-forecast, snake_case), region (psi/pm25, camelCase), station (air-temp/rainfall: stations + readings[].data[{stationId,value}] + readingType/readingUnit), records (24h forecast, uv).
- On 2026-10-20 PSI west was 133 (unhealthy), a real haze day and a nice demo motivator.

## Planned arc
1. Envelope + metadata join + nearest area (browser lab). ← 0001
2. Next.js Route Handler proxy: `x-api-key` server-side, `revalidate` matched to update cadence, 429 handling.
3. Normalising the four shape families into one typed `Reading` model.
4. Location → nearest area/region/station; UI.
5. Map view (regionMetadata/label_location coordinates).
6. Historical `date` queries + `paginationToken` (charts), plus resilience/stale-data UX.
