(() => {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelectorAll(".nav-links a");
  const sections = [...document.querySelectorAll("main section[id]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };

  toggle?.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setMenu(false);
  });

  const setActive = () => {
    const y = window.scrollY + (nav?.offsetHeight || 72) + 40;
    let current = sections[0]?.id;
    for (const section of sections) {
      if (section.offsetTop <= y) current = section.id;
    }
    links.forEach((link) => {
      const match = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("is-active", match);
    });
  };
  setActive();
  window.addEventListener("scroll", setActive, { passive: true });

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();
