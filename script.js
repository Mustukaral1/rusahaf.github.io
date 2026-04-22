(() => {
  const navbar = document.getElementById("navbar");
  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  const slides = Array.from(document.querySelectorAll(".review-slide"));
  const dots = Array.from(document.querySelectorAll("[data-review-dot]"));
  const prevBtn = document.getElementById("reviews-prev");
  const nextBtn = document.getElementById("reviews-next");
  let index = 0;

  const renderReview = () => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  };

  const prev = () => {
    index = (index - 1 + slides.length) % slides.length;
    renderReview();
  };
  const next = () => {
    index = (index + 1) % slides.length;
    renderReview();
  };

  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      index = i;
      renderReview();
    });
  });
  setInterval(next, 6500);
  renderReview();

  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
})();
