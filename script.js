(function () {
  const LS_KEY = "cookie_consent_v1";

  function saveConsent(value) {
    try {
      localStorage.setItem(LS_KEY, value);
    } catch (e) {}
  }
  function getConsent() {
    try {
      return localStorage.getItem(LS_KEY);
    } catch (e) {
      return null;
    }
  }

  const banner = document.getElementById("cookieBanner");


  function showBanner() {
    banner.style.display = "";
    requestAnimationFrame(() =>
      requestAnimationFrame(() => banner.classList.add("show")),
    );
  }
  function hideBanner() {
    banner.classList.remove("show");
    banner.addEventListener(
      "transitionend",
      () => {
        banner.style.display = "none";
      },
      { once: true },
    );
  }

  if (!getConsent()) {
    showBanner();
  } else {
    banner.style.display = "none";
  }

  document.getElementById("cookieAccept").addEventListener("click", () => {
    saveConsent("accepted");
    hideBanner();
  });
  document.getElementById("cookieReject").addEventListener("click", () => {
    saveConsent("rejected");
    hideBanner();
  });

  /* Modal aç/kapat */
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Banner butonları
  document
    .getElementById("openKvkk")
    .addEventListener("click", () => openModal("kvkkModal"));
  document
    .getElementById("openCookiePolicy")
    .addEventListener("click", () => openModal("cookiePolicyModal"));

  // Footer butonları
  document
    .getElementById("footerKvkk")
    .addEventListener("click", () => openModal("kvkkModal"));
  document
    .getElementById("footerCookiePolicy")
    .addEventListener("click", () => openModal("cookiePolicyModal"));

  // KVKK kapat
  document
    .getElementById("closeKvkk")
    .addEventListener("click", () => closeModal("kvkkModal"));
  document
    .getElementById("closeKvkkBtn")
    .addEventListener("click", () => closeModal("kvkkModal"));

  // Çerez politikası kapat + butonlar
  document
    .getElementById("closeCookiePolicy")
    .addEventListener("click", () => closeModal("cookiePolicyModal"));
  document
    .getElementById("cookiePolicyAccept")
    .addEventListener("click", () => {
      saveConsent("accepted");
      hideBanner();
      closeModal("cookiePolicyModal");
    });
  document
    .getElementById("cookiePolicyReject")
    .addEventListener("click", () => {
      saveConsent("rejected");
      hideBanner();
      closeModal("cookiePolicyModal");
    });

  // Overlay tıklama
  ["kvkkModal", "cookiePolicyModal"].forEach((id) => {
    document.getElementById(id).addEventListener("click", function (e) {
      if (e.target === this) closeModal(id);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal("kvkkModal");
      closeModal("cookiePolicyModal");
    }
  });
})();

/* ── 1. SCROLL TOP BTN ──────────────────────────────────────*/
const scrollTopBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = Math.max(1, document.documentElement.scrollHeight - document.documentElement.clientHeight);
  const scrollPercent = scrollTop / docHeight;
  
  if (scrollTopBtn) {
    scrollTopBtn.style.setProperty('--scroll-value', `${scrollPercent * 100}%`);
    if (scrollTop > 300) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  }
});
scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ── 2. HERO SLIDER ─────────────────────────────────────────*/
const slideImages = [
  "https://plus.unsplash.com/premium_photo-1661490182399-62c7de4a07b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1673429451048-08db61259eac?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1684466198117-f589d2a4edde?q=80&w=1329&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const fallbackImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&fit=crop",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&q=80&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&fit=crop",
];

function loadSlideImage(slide, src, fallback) {
  const img = new Image();
  img.onload = () => {
    slide.style.backgroundImage = `url('${src}')`;
    slide.style.backgroundSize = "cover";
    slide.style.backgroundPosition = "center";
  };
  img.onerror = () => {
    const fb = new Image();
    fb.onload = () => {
      slide.style.backgroundImage = `url('${fallback}')`;
      slide.style.backgroundSize = "cover";
      slide.style.backgroundPosition = "center";
    };
    fb.onerror = () => {
      slide.style.background = "linear-gradient(135deg, #111 0%, #1a1a1a 100%)";
    };
    fb.src = fallback;
  };
  img.src = src;
}
document
  .querySelectorAll(".slide")
  .forEach((slide, i) =>
    loadSlideImage(slide, slideImages[i], fallbackImages[i]),
  );

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function goSlide(n) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  dots[currentSlide].setAttribute("aria-selected", "false");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
  dots[currentSlide].setAttribute("aria-selected", "true");
}
setInterval(() => goSlide(currentSlide + 1), 5000);

/* ── 3. NAVBAR SCROLL ───────────────────────────────────────*/
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () =>
  navbar.classList.toggle("scrolled", window.scrollY > 60),
);

/* ── 4. MOBİL MENÜ ──────────────────────────────────────────*/
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.textContent = isOpen ? "✕" : "☰";
  navToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.textContent = "☰";
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* ── 5. SMOOTH SCROLL ───────────────────────────────────────*/
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ── 6. SCROLL REVEAL ───────────────────────────────────────*/
const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.1 },
);
document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ── 7. SAYAÇ ANİMASYONU ────────────────────────────────────*/
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const start = Date.now();
  const tick = () => {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = target === 24 ? "7/24" : Math.floor(ease * target) + "+";
    if (progress < 1) requestAnimationFrame(tick);
  };
  tick();
}

const statsBar = document.querySelector(".stats-bar");
let counterStarted = false;
const statsObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting && !counterStarted) {
      counterStarted = true;
      document.querySelectorAll("[data-target]").forEach(animateCounter);
    }
  },
  { threshold: 0.5 },
);
if (statsBar) statsObserver.observe(statsBar);
const WHATSAPP_NUMBER = "905352681166";

const contactForm = document.getElementById("contactForm");
const warningMessage = document.querySelector(".warning");
const phoneInput = document.getElementById("f-tel");

if (contactForm) {
  contactForm.addEventListener("submit", handleSubmit);
}

if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").slice(0, 11);
  });
}

let formMessageTimer = null;

function clearFormMessage() {
  if (!warningMessage) return;
  clearTimeout(formMessageTimer);
  formMessageTimer = null;
  warningMessage.hidden = true;
  warningMessage.textContent = "";
  warningMessage.removeAttribute("data-type");
}

/** type: 'error' | 'success' | '' — autoHideMs: ms sonra gizle (0 = kalıcı, sadece loading vb.) */
function setFormMessage(message, type, autoHideMs) {
  if (!warningMessage) return;
  clearTimeout(formMessageTimer);
  formMessageTimer = null;

  if (!message) {
    clearFormMessage();
    return;
  }

  warningMessage.textContent = message;
  warningMessage.hidden = false;
  if (type) warningMessage.dataset.type = type;
  else warningMessage.removeAttribute("data-type");

  let ms = autoHideMs;
  if (ms === undefined) {
    ms = type === "error" || type === "success" ? 4500 : 0;
  }
  if (ms > 0) {
    formMessageTimer = setTimeout(clearFormMessage, ms);
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const adSoyad = form.querySelector("#f-ad").value.trim();
  const telefon = form.querySelector("#f-tel").value.replace(/\D/g, "").trim();
  const eposta = form.querySelector("#f-mail").value.trim();
  const hizmet = form.querySelector("#f-hizmet").value;
  const mesaj = form.querySelector("#f-mesaj").value.trim();
  const btn = form.querySelector(".btn-submit");
  const consent = form.querySelector("#f-consent").checked;

  if (!adSoyad || !telefon || !eposta || !hizmet || !mesaj) {
    setFormMessage("Lütfen tüm zorunlu alanları doldurun.", "error");
    return;
  }

  if (telefon.length < 10) {
    setFormMessage("Telefon numarası en az 10 haneli olmalı.", "error");
    return;
  }

  if (!consent) {
    setFormMessage("Devam etmek için KVKK onay kutusunu işaretleyin.", "error");
    return;
  }

  const text = [
    "🔔 *27 İstanbul Asansör - Yeni Teklif Talebi*",
    "",
    `👤 *Ad Soyad:* ${adSoyad}`,
    `📞 *Telefon:* ${telefon}`,
    `✉️ *E-Posta:* ${eposta || "-"}`,
    `🔧 *Hizmet:* ${hizmet}`,
    `💬 *Mesaj:* ${mesaj || "-"}`,
  ].join("\n");

  btn.disabled = true;
  btn.classList.add("loading");
  clearFormMessage();

  setTimeout(() => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
    setTimeout(() => {
      btn.classList.remove("loading");
      btn.disabled = false;
      form.reset();
      setFormMessage(
        "Talebiniz alındı. WhatsApp penceresinden gönderimi tamamlayın.",
        "success",
        4500,
      );
    }, 2000);
  }, 500);
}
