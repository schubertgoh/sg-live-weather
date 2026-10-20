/* Reusable retrieval-practice quiz.
   Usage:
     <div class="quiz" id="q1"></div>
     <script src="../assets/quiz.js"></script>
     <script>Quiz.mount("#q1", [
       { q: "Question (HTML ok)", opts: ["A","B","C","D"], answer: 2, why: "Explanation (HTML ok)" },
     ]);</script>
   One attempt per question: the first click locks in, which makes the retrieval effortful. */
(function () {
  function mount(sel, questions) {
    const root = document.querySelector(sel);
    let answered = 0, correct = 0;
    const score = document.createElement("p");
    score.className = "score";
    const update = () => (score.textContent = `${correct} / ${answered} correct · ${questions.length - answered} left`);

    questions.forEach((item, qi) => {
      const box = document.createElement("div");
      box.className = "q";
      box.innerHTML = `<p>${qi + 1}. ${item.q}</p><div class="opts"></div><p class="why">${item.why || ""}</p>`;
      const opts = box.querySelector(".opts");
      item.opts.forEach((label, oi) => {
        const b = document.createElement("button");
        b.className = "opt";
        b.type = "button";
        b.innerHTML = label;
        b.addEventListener("click", () => {
          answered++;
          if (oi === item.answer) correct++;
          [...opts.children].forEach((el, i) => {
            el.disabled = true;
            if (i === item.answer) el.classList.add("right");
            else if (i === oi) el.classList.add("wrong");
          });
          box.classList.add("done");
          update();
        });
        opts.appendChild(b);
      });
      root.appendChild(box);
    });
    update();
    root.appendChild(score);
  }
  window.Quiz = { mount };
})();
