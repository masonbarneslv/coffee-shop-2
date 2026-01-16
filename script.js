/* ============================
   ACTIVE NAV LINK
   ============================ */
(function () {
  const current =
    window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("active");
    }
  });
})();

/* ============================
   SMOOTH SCROLL FOR ANCHORS
   ============================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* ============================
   MENU FILTERING (OPTIONAL)
   Add data-category="espresso"
   ============================ */
const filterButtons = document.querySelectorAll("[data-filter]");
const menuItems = document.querySelectorAll("[data-menu-item]");

if (filterButtons.length && menuItems.length) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      menuItems.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

/* ============================
   NEWSLETTER / SUBSCRIBE FORM
   GitHub Pages–safe
   ============================ */
const subscribeForm = document.querySelector("[data-subscribe]");

if (subscribeForm) {
  subscribeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = this.querySelector("input[type='email']");
    if (!emailInput.value) return;

    alert("Thanks for subscribing! 🚀");
    this.reset();
  });
}

/* ============================
   IMAGE LOADED FADE-IN
   ============================ */
document.querySelectorAll("img").forEach((img) => {
  img.style.opacity = 0;
  img.addEventListener("load", () => {
    img.style.transition = "opacity .4s ease";
    img.style.opacity = 1;
  });
});

/* ============================
   FOOTER YEAR
   ============================ */
const yearEl = document.getElementById("y");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
