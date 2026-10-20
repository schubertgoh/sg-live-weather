/* Reusable live-code lab: edit a function, run it against LIVE data.gov.sg data,
   get automatic pass/fail checks.

   Usage:
     <div class="lab" id="lab1"></div>
     <script src="../assets/lab.js"></script>
     <script>Lab.mount("#lab1", {
       title: "nearestForecast()",
       starter: "function nearestForecast(json, lat, lng) {\n  ...\n}",
       fnName: "nearestForecast",
       endpoint: "two-hr-forecast",          // v2 real-time endpoint, fetched once and cached
       solution: "function ... { ... }",     // optional: revealed on request
       checks: async (fn, json, t) => {      // t.pass(msg) / t.fail(msg) / t.info(msg)
         ...
       },
     });</script>

   Live responses are cached per endpoint for 60 s, so re-running your code does not
   burn the no-key rate limit (6 calls / 10 s). */
(function () {
  const BASE = "https://api-open.data.gov.sg/v2/real-time/api/";
  const cache = {};

  async function getLive(endpoint) {
    const hit = cache[endpoint];
    if (hit && Date.now() - hit.at < 60_000) return hit.json;
    const res = await fetch(BASE + endpoint);
    const json = await res.json();
    if (res.ok && json.code === 0) cache[endpoint] = { at: Date.now(), json };
    return { __status: res.status, ...json };
  }

  function mount(sel, cfg) {
    const root = document.querySelector(sel);
    const key = "lab:" + location.pathname + ":" + cfg.fnName;
    let saved = null;
    try { saved = localStorage.getItem(key); } catch (e) {}

    root.innerHTML = `
      <div class="lab-head"><span>Lab · ${cfg.title}</span><span>live: /${cfg.endpoint}</span></div>
      <textarea spellcheck="false" aria-label="Code editor"></textarea>
      <div class="lab-bar">
        <button type="button" data-run>Run against live API</button>
        <button type="button" class="ghost" data-reset>Reset</button>
        ${cfg.solution ? '<button type="button" class="ghost" data-sol>Show a solution</button>' : ""}
      </div>
      <ul class="lab-out" aria-live="polite"></ul>`;
    const ta = root.querySelector("textarea");
    const out = root.querySelector(".lab-out");
    const runBtn = root.querySelector("[data-run]");
    ta.value = saved || cfg.starter;

    ta.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const s = ta.selectionStart;
        ta.setRangeText("  ", s, ta.selectionEnd, "end");
      }
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) runBtn.click();
    });
    ta.addEventListener("input", () => { try { localStorage.setItem(key, ta.value); } catch (e) {} });

    const line = (cls, msg) => {
      const li = document.createElement("li");
      li.className = cls;
      li.textContent = (cls === "pass" ? "✓ " : cls === "fail" ? "✗ " : "· ") + msg;
      out.appendChild(li);
    };

    runBtn.addEventListener("click", async () => {
      out.innerHTML = "";
      runBtn.disabled = true;
      let fails = 0;
      const t = { pass: (m) => line("pass", m), fail: (m) => { fails++; line("fail", m); }, info: (m) => line("info", m) };
      try {
        const fn = new Function(ta.value + `\n;return typeof ${cfg.fnName} === "function" ? ${cfg.fnName} : undefined;`)();
        if (!fn) { t.fail(`No function named ${cfg.fnName} found.`); return; }
        const json = await getLive(cfg.endpoint);
        if (json.__status === 429) { t.info("The API answered 429: you hit the no-key rate limit. Wait 10 s and run again."); return; }
        await cfg.checks(fn, json, t);
        if (!fails) t.info("All checks passed. Nice!");
      } catch (err) {
        t.fail("Threw: " + (err && err.message ? err.message : err));
      } finally {
        runBtn.disabled = false;
      }
    });

    root.querySelector("[data-reset]").addEventListener("click", () => {
      ta.value = cfg.starter;
      try { localStorage.removeItem(key); } catch (e) {}
      out.innerHTML = "";
    });
    const sol = root.querySelector("[data-sol]");
    if (sol) sol.addEventListener("click", () => {
      if (confirm("Try for a few minutes first. Struggling is where the learning happens. Show anyway?")) {
        ta.value = cfg.solution;
      }
    });
  }

  window.Lab = { mount, getLive };
})();
