/* =========================================
   script.js (UPDATED)
   Works with .links OR <nav>, GitHub Pages safe
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* -----------------------------
     1) ACTIVE NAV LINK (robust)
     ----------------------------- */
  const currentFile = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  // Works for either <nav a> or your ".links a"
  const navLinks = document.querySelectorAll("nav a, .links a");

  navLinks.forEach((a) => {
    const href = (a.getAttribute("href") || "").split("#")[0].toLowerCase();
    if (!href) return;
    if (href === currentFile) a.classList.add("active");
  });

  /* ---------------------------------------
     2) SMOOTH SCROLL (sticky header offset)
     --------------------------------------- */
  const header = document.querySelector(".header, header");
  const headerOffset = header ? header.offsetHeight + 10 : 0;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();

      const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });

  /* ---------------------------------------
     3) MENU FILTERING (optional)
     Supports:
       - Buttons: [data-filter="espresso"]
       - Items:   [data-menu-item data-category="espresso"]
     Also supports a <select data-menu-filter>
     --------------------------------------- */
  const menuItems = Array.from(document.querySelectorAll("[data-menu-item]"));
  const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
  const filterSelect = document.querySelector("[data-menu-filter]"); // optional

  function applyFilter(category) {
    const cat = (category || "all").toLowerCase();

    menuItems.forEach((item) => {
      const itemCat = (item.dataset.category || "").toLowerCase();
      const show = cat === "all" || itemCat === cat;
      item.style.display = show ? "" : "none";
    });
  }

  if (menuItems.length) {
    // Buttons
    if (filterButtons.length) {
      filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const cat = btn.dataset.filter || "all";
          filterButtons.forEach((b) => b.classList.remove("active"));
          btn.classList.add("active");
          applyFilter(cat);

          // Keep select in sync if it exists
          if (filterSelect) filterSelect.value = cat;
        });
      });
    }

    // Select dropdown
    if (filterSelect) {
      filterSelect.addEventListener("change", () => applyFilter(filterSelect.value));
    }
  }

  /* ---------------------------------------
     4) SUBSCRIBE FORM (GitHub Pages safe)
     Use: <form data-subscribe>...</form>
     --------------------------------------- */
  const subscribeForm = document.querySelector("[data-subscribe]");
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = subscribeForm.querySelector("input[type='email']")?.value?.trim();
      if (!email) return alert("Please enter an email address.");
      alert("Thanks for subscribing! 🚀");
      subscribeForm.reset();
    });
  }

  /* ---------------------------------------
     5) IMAGE FADE-IN (handles cached images)
     --------------------------------------- */
  const imgs = document.querySelectorAll("img");
  imgs.forEach((img) => {
    // Only apply if it's not already styled
    img.style.opacity = "0";
    img.style.transition = "opacity .35s ease";

    const reveal = () => (img.style.opacity = "1");

    // If cached and already complete, show immediately
    if (img.complete && img.naturalWidth > 0) {
      reveal();
    } else {
      img.addEventListener("load", reveal, { once: true });
      img.addEventListener("error", () => {
        // If an image fails, don't leave an empty invisible box
        img.style.opacity = "1";
      }, { once: true });
    }
  });

  /* ---------------------------------------
     6) FOOTER YEAR
     Needs: <span id="y"></span>
     --------------------------------------- */
  const yearEl = document.getElementById("y");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------
     7) OPTIONAL MOBILE MENU TOGGLE
     If you add:
       <button class="menuToggle" data-menu-toggle>Menu</button>
       <div class="links" data-menu-links>...</div>
     --------------------------------------- */
  const toggle = document.querySelector("[data-menu-toggle]");
  const links = document.querySelector("[data-menu-links]") || document.querySelector(".links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }
});
