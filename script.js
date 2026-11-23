(() => {
  // Light / Dark theme toggle
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

  // Publication category filters
  const filterBtns = document.querySelectorAll(".filter-btn");
  const pubItems = document.querySelectorAll(".pub-item");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      pubItems.forEach((item) => {
        const cat = item.getAttribute("data-cat");
        if (target === "all" || cat === target) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  // 1-click Copy helpers (pip install & BibTeX)
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

  async function copyText(text, btn, originalLabel) {
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "Copied";
      setTimeout(() => { btn.textContent = originalLabel; }, 1800);
    } catch {
      btn.textContent = "Copy failed";
      setTimeout(() => { btn.textContent = originalLabel; }, 1800);
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
