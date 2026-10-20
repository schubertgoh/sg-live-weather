# Singapore Live Air & Weather

A live, interactive map of Singapore's haze and weather built on the [data.gov.sg real-time APIs](https://guide.data.gov.sg/developer-guide/real-time-apis), plus the course notes used to build it.

## Live map (`apps/live-map/`)

- **Air quality by region:** NEA 24-hr PSI, US EPA AQI (computed from NEA pollutant concentrations, 2024 breakpoints), or 1-hr PM2.5
- **Rain radar:** past-hour rainfall interpolated between NEA's rain gauges
- **12-hour replay:** time slider with play/pause across air, rain and forecasts
- **2-hr area forecasts**, station temperatures, 24-hr outlook and UV index
- **"Should I go out?" planner:** origin and destination (OneMap search or pick on map), time, activity and sensitive-group flag give a verdict with reasons and a drier-window suggestion
- Light/dark theme, collapsible panel, mobile bottom sheet

It's a single static HTML file (Leaflet + OneMap tiles) that calls the public APIs directly from the browser with no API key. Requests are queued to stay under the no-key limit (6 calls / 10 s), and the page retries rate-limited calls. A `429` arrives without CORS headers, so browsers report it as "Failed to fetch".

## Course material

| Path | What |
|---|---|
| `assets/` | Shared stylesheet, quiz and lab components |
| `MISSION.md`, `RESOURCES.md`, `NOTES.md`, `learning-records/` | Learning workspace state |

## Run locally

```bash
python -m http.server 8791 --bind 127.0.0.1
```

Then open http://localhost:8791/.

## Data & attribution

Weather and air-quality data: [data.gov.sg](https://data.gov.sg/datasets?formats=API) (NEA). Basemap and search: [OneMap](https://www.onemap.gov.sg/) © Singapore Land Authority. For guidance only: follow official [NEA advisories](https://www.haze.gov.sg/).
