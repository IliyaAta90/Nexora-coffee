"use strict";

/* Custom Cursor */
const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");

if (cursor && cursorRing && window.innerWidth > 980) {
  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function moveRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(moveRing);
  }

  moveRing();

  document
    .querySelectorAll("a, button, .product-card, .coffee-orb, .experience-card, .subscription-box")
    .forEach((item) => {
      item.addEventListener("mouseenter", () => {
        document.body.classList.add("cursor-hover");
      });

      item.addEventListener("mouseleave", () => {
        document.body.classList.remove("cursor-hover");
      });
    });
}

/* Smooth Scroll */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

/* Header active links */
const sections = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  let currentId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 160;

    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);
window.addEventListener("load", setActiveLink);

/* Fake product selection */
/* Fake product selection */
const productButtons = document.querySelectorAll(".product-bottom button");

productButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("clicked")) return;

    const oldText = button.textContent;

    button.classList.add("clicked");
    button.textContent = "✓ انتخاب شد";

    setTimeout(() => {
      button.classList.add("selected");
    }, 180);

    setTimeout(() => {
      button.textContent = oldText;
      button.classList.remove("clicked", "selected");
    }, 1500);
  });
});

/* Fake subscribe */
const subscribeForm = document.querySelector(".subscribe-form");

if (subscribeForm) {
  subscribeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const button = subscribeForm.querySelector("button");
    const input = subscribeForm.querySelector("input");

    button.textContent = "ثبت شد";
    input.value = "";

    setTimeout(() => {
      button.textContent = "عضویت";
    }, 1600);
  });
}

/* Liquid Glass Nav Indicator */
const nav = document.querySelector(".nav-links");
const indicator = document.querySelector(".nav-indicator");
const links = document.querySelectorAll(".nav-links a");

function moveNavIndicator(activeLink) {
  if (!nav || !indicator || !activeLink) return;

  const navRect = nav.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();

  indicator.style.width = `${linkRect.width}px`;
  indicator.style.left = `${linkRect.left - navRect.left}px`;
}

function setActiveNavLink() {
  let currentId = "hero";

  document.querySelectorAll("section[id], footer[id]").forEach((section) => {
    const sectionTop = section.offsetTop - 180;

    if (window.scrollY >= sectionTop) {
      currentId = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
      moveNavIndicator(link);
    }
  });
}

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
    moveNavIndicator(link);
  });
});

window.addEventListener("load", setActiveNavLink);
window.addEventListener("scroll", setActiveNavLink);
window.addEventListener("resize", setActiveNavLink);

/* Liquid hover light */
document.querySelectorAll(".glass").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  });

  el.addEventListener("mouseleave", () => {
    el.style.setProperty("--mx", "50%");
    el.style.setProperty("--my", "50%");
  });
});

/* Email liquid focus light */
const subscribeBox = document.querySelector(".subscribe-form");

if (subscribeBox) {
  subscribeBox.addEventListener("mousemove", (e) => {
    const rect = subscribeBox.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    subscribeBox.style.setProperty("--email-x", `${x}%`);
  });

  subscribeBox.addEventListener("focusin", () => {
    subscribeBox.style.setProperty("--email-x", "50%");
  });
}

/* Mobile dock active state */
const mobileDockLinks = document.querySelectorAll(".mobile-dock a");

function setMobileDockActive() {
  let currentId = "hero";

  document.querySelectorAll("section[id], footer[id]").forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) {
      currentId = section.id;
    }
  });

  mobileDockLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${currentId}`
    );
  });
}

window.addEventListener("load", setMobileDockActive);
window.addEventListener("scroll", setMobileDockActive);