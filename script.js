const btn = document.getElementById("menuToggle");
  const nav = document.getElementById("mobileNav");

  btn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });


//carrossel
 // carrossel com arrastar
document.querySelectorAll("[data-carousel]").forEach(carousel => {
  const images = carousel.querySelector(".carousel-images");
  const total = images.children.length;
  let index = 0;

  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");

  function updateCarousel() {
    images.style.transition = "transform 0.5s ease";
    images.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener("click", () => {
    index = (index - 1 + total) % total;
    updateCarousel();
  });

  nextBtn.addEventListener("click", () => {
    index = (index + 1) % total;
    updateCarousel();
  });

  // === SUPORTE A ARRASTAR ===
  let startX = 0;
  let isDragging = false;
  let currentTranslate = 0;

  images.addEventListener("mousedown", startDrag);
  images.addEventListener("touchstart", startDrag);

  images.addEventListener("mousemove", dragMove);
  images.addEventListener("touchmove", dragMove);

  images.addEventListener("mouseup", endDrag);
  images.addEventListener("mouseleave", endDrag);
  images.addEventListener("touchend", endDrag);

  function getX(e) {
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
  }

  function startDrag(e) {
    isDragging = true;
    startX = getX(e);
    images.style.transition = "none"; // desativa transição enquanto arrasta
  }

  function dragMove(e) {
    if (!isDragging) return;
    const currentX = getX(e);
    const diff = currentX - startX;
    const percent = diff / carousel.offsetWidth * 100;
    images.style.transform = `translateX(${-index * 100 + percent}%)`;
  }

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;

    const endX = getX(e);
    const diff = endX - startX;

    // sensibilidade mínima pra trocar de imagem
    if (Math.abs(diff) > 50) {
      if (diff < 0) index = (index + 1) % total;
      else index = (index - 1 + total) % total;
    }

    updateCarousel();
  }
});
