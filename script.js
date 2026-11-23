(() => {
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    root.setAttribute("data-theme", "dark");
    if (themeBtn) themeBtn.textContent = "Light";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "Dark";
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "Light";
      }
    });
  }

  const filterTabs = document.querySelectorAll(".filter-tab");
  const pubRows = document.querySelectorAll(".pub-row");
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-filter");
      filterTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      pubRows.forEach((row) => {
        const cat = row.getAttribute("data-cat");
        if (target === "all" || cat === target) {
          row.classList.remove("hidden");
        } else {
          row.classList.add("hidden");
        }
      });
    });
  });

  const BIBTEX = `@book{sharukh2026firstline,
  author    = {Sharukh, Mezanur Rahman},
  title     = {From First Line to First Paper: Mastering Python,
               Statistical Data Science, and Applied Deep Learning},
  edition   = {1st},
  year      = {2026},
  publisher = {Open Scientific Edition / Zenodo},
  doi       = {10.5281/zenodo.24446563},
  url       = {https://doi.org/10.5281/zenodo.24446563}
}`;

  async function copyText(text, btn, label) {
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied";
      setTimeout(() => { btn.textContent = label; }, 1600);
    } catch {
      btn.textContent = "Copy failed";
      setTimeout(() => { btn.textContent = label; }, 1600);
    }
  }

  const pipBtn = document.getElementById("copy-pip");
  if (pipBtn) {
    pipBtn.addEventListener("click", () =>
      copyText("pip install sharukh-tutor", pipBtn, "Copy")
    );
  }

  const bibBtn = document.getElementById("copy-bibtex");
  if (bibBtn) {
    bibBtn.addEventListener("click", () =>
      copyText(BIBTEX, bibBtn, "Copy BibTeX")
    );
  }
})();
