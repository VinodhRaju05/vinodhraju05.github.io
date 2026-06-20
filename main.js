// EmailJS initialization
emailjs.init("dxAW-OuhKi6pJ2GfY");

// Navbar scroll effect
const mainNav = document.getElementById("mainNav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    mainNav.classList.add("scrolled");
  } else {
    mainNav.classList.remove("scrolled");
  }
});

// Active nav link on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Fade in on scroll
const fadeInObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeInObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
);

document
  .querySelectorAll(".project-card, .timeline-card, .stat-item, .skill-group")
  .forEach((el) => {
    el.classList.add("fade-in");
    fadeInObserver.observe(el);
  });

// Project filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
const noProjects = document.getElementById("noProjects");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    let visibleCount = 0;

    projectItems.forEach((item) => {
      const tags = item.getAttribute("data-tags");
      if (filter === "all" || tags.includes(filter)) {
        item.style.display = "block";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    if (noProjects) {
      noProjects.style.display = visibleCount === 0 ? "block" : "none";
    }
  });
});

// Contact form with EmailJS
const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add("was-validated");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending... <i class="bi bi-hourglass-split"></i>';

    const templateParams = {
      name: document.getElementById("contactName").value,
      email: document.getElementById("contactEmail").value,
      subject: document.getElementById("contactSubject").value,
      message: document.getElementById("contactMessage").value,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send("service_nnkl7a8", "template_vbpt3kr", templateParams)
      .then(() => {
        contactForm.style.display = "none";
        successMessage.style.display = "block";
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send Message <i class="bi bi-send"></i>';
        alert("Something went wrong. Please try again or email directly.");
      });
  });
}

// Typing effect
const typedText = document.getElementById("typedText");

if (typedText) {
  const roles = [
    "Network & Security Engineer",
    "Cloud & DevOps Engineer",
    "M.S. CS @ Portland State",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const current = roles[roleIndex];

    if (isDeleting) {
      typedText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => {
        isDeleting = true;
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 60 : 100);
  };

  setTimeout(type, 1000);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Scroll progress bar
const progressBar = document.createElement("div");
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 0%;
  height: 3px;
  background: linear-gradient(90deg, #1d4ed8, #6d28d9);
  z-index: 9999;
  transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = `${scrollPercent}%`;
});

// Counter animation for stats
const counters = document.querySelectorAll(".stat-number");

const countUp = (el) => {
  const target = el.textContent.trim();
  const isPercent = target.includes("%");
  const isK = target.includes("K");
  const isPlus = target.includes("+");

  const num = parseFloat(target.replace(/[^0-9.]/g, ""));
  let start = 0;
  const duration = 2000;
  const step = 16;
  const increment = num / (duration / step);

  el.textContent = "0";

  const timer = setInterval(() => {
    start += increment;
    if (start >= num) {
      start = num;
      clearInterval(timer);
    }

    let display = Math.floor(start).toString();
    if (isK) display = display + "K";
    if (isPlus) display = display + "+";
    if (isPercent) display = display + "%";
    el.textContent = display;
  }, step);
};

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// Skill tags stagger animation
const skillGroups = document.querySelectorAll(".skill-group");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll(".skill-tags span");
        tags.forEach((tag, index) => {
          tag.style.opacity = "0";
          tag.style.transform = "translateY(10px)";
          tag.style.transition = `opacity 0.3s ease ${index * 0.05}s, transform 0.3s ease ${index * 0.05}s`;
          setTimeout(() => {
            tag.style.opacity = "1";
            tag.style.transform = "translateY(0)";
          }, 50);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

skillGroups.forEach((group) => {
  skillObserver.observe(group);
});

// Hero text stagger animation
const heroElements = document.querySelectorAll(
  ".hero-title, .hero-subtitle, .hero-desc, .hero-badges, .hero-cta, .hero-social",
);

heroElements.forEach((el, index) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
  setTimeout(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, 100);
});

// Project card tilt effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "transform 0.1s ease";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
    card.style.transition = "transform 0.5s ease";
  });
});

// Section title animation
const sectionTitles = document.querySelectorAll(
  ".section-title, .section-label",
);

const titleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateX(-30px)";
        entry.target.style.transition =
          "opacity 0.6s ease, transform 0.6s ease";
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateX(0)";
        }, 100);
        titleObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

sectionTitles.forEach((title) => {
  titleObserver.observe(title);
});

// Accordion hover glow effect
document.querySelectorAll(".achieve-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.boxShadow = "0 4px 20px rgba(29,78,216,0.15)";
    item.style.transition = "box-shadow 0.3s ease";
  });
  item.addEventListener("mouseleave", () => {
    item.style.boxShadow = "";
  });
});

// Network grid animation
const canvas = document.getElementById("networkCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let width, height, dots;
  const DOT_COUNT = 60;
  const MAX_DIST = 150;
  const DOT_COLOR = "29, 78, 216";

  const resize = () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  };

  const createDots = () => {
    dots = Array.from({ length: DOT_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2.5 + 1.5,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    dots.forEach((dot) => {
      dot.x += dot.vx;
      dot.y += dot.vy;
      if (dot.x < 0 || dot.x > width) dot.vx *= -1;
      if (dot.y < 0 || dot.y > height) dot.vy *= -1;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${DOT_COLOR}, 0.8)`;
      ctx.fill();
    });

    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = 1 - dist / MAX_DIST;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(${DOT_COLOR}, ${alpha * 0.5})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  };

  window.addEventListener("resize", () => {
    resize();
    createDots();
  });

  resize();
  createDots();
  draw();
}
