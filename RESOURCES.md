# data.gov.sg Real-Time APIs Resources

## Knowledge

- [data.gov.sg Developer Guide: Real Time APIs](https://guide.data.gov.sg/developer-guide/real-time-apis)
  The official page. The visible page is thin, but the [Markdown version](https://guide.data.gov.sg/developer-guide/real-time-apis.md) embeds the OpenAPI spec (e.g. PM2.5: `date`, `paginationToken`, error messages). Use for: endpoint params and response schemas.
- [data.gov.sg: API overview](https://guide.data.gov.sg/developer-guide/api-overview)
  Real-time vs Collection/Dataset APIs; keys are optional for testing but recommended for production. Use for: big-picture orientation.
- [data.gov.sg: API Rate Limits](https://guide.data.gov.sg/developer-guide/api-overview/api-rate-limits)
  Per-10-second limits: real-time 6 (no key) / 12 (dev) / 30 (prod); exceeding returns `429`. Use for: caching and polling design.
- [data.gov.sg: How to use your API key](https://guide.data.gov.sg/developer-guide/api-overview/how-to-use-your-api-key) and [How to request one](https://guide.data.gov.sg/developer-guide/api-overview/how-to-request-an-api-key)
  `x-api-key` header; Dev vs Prod keys; "do not expose it in client-side code". Use for: the server-side proxy lesson.
- [data.gov.sg dataset catalogue, filtered to APIs](https://data.gov.sg/datasets?formats=API)
  The full list of real-time APIs, each with an interactive OpenAPI explorer. Use for: discovering endpoints and checking schemas.
- [data.gov.sg docs index (llms.txt)](https://guide.data.gov.sg/llms.txt)
  Machine-readable index of every guide page; append `.md` to any page URL for raw Markdown. Use for: fast lookup.
- [Next.js docs: Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) and [Caching / fetch](https://nextjs.org/docs/app/api-reference/functions/fetch)
  Official docs for server-side proxying and `revalidate`. Use for: Lesson 2 onward.
- [datagovsg/dgs-exploration Colab notebook](https://colab.research.google.com/github/datagovsg/dgs-exploration/blob/master/DataGovSG.ipynb)
  Official GovTech example notebook. Use for: worked examples of calling the APIs.

## Wisdom (Communities)

- [data.gov.sg support (support@data.gov.sg)](mailto:support@data.gov.sg) / [Contact form](https://form.gov.sg/6449e5c3664c1b001249acf1)
  The team actively asks for use cases and rate-limit feedback. Use for: production-key requests, data issues.
- [r/singapore](https://www.reddit.com/r/singapore/) and [r/nextjs](https://www.reddit.com/r/nextjs/)
  r/nextjs for architecture critique; r/singapore for feedback from real users of a weather/haze app.
- [GitHub: datagovsg org](https://github.com/datagovsg)
  GovTech's public repos; issues there show what other developers hit.

## Gaps

- No official changelog per real-time endpoint (schema/casing differences are undocumented; discovered empirically).
- No documented response headers for rate-limit remaining/reset.
