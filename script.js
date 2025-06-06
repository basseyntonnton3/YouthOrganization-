// Mobile Navigation
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  // Toggle Nav
  nav.classList.toggle("nav-active");

  // Animate Links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Burger Animation
  burger.classList.toggle("toggle");
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active");
        burger.classList.remove("toggle");
        navLinks.forEach((link) => {
          link.style.animation = "";
        });
      }
    }
  });
});

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
});

// Accessibility Features
const accessibilityControls = document.querySelector(".accessibility-controls");
const fontSizeButtons = accessibilityControls.querySelectorAll(
  'button[aria-label*="font size"]'
);
const contrastButton = accessibilityControls.querySelector(
  'button[aria-label="High contrast"]'
);
const screenReaderButton = accessibilityControls.querySelector(
  'button[aria-label="Screen reader"]'
);

// Font Size Controls
fontSizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentSize = parseInt(
      window.getComputedStyle(document.body).fontSize
    );
    const newSize = button.getAttribute("aria-label").includes("Increase")
      ? currentSize + 2
      : currentSize - 2;

    if (newSize >= 12 && newSize <= 24) {
      document.body.style.fontSize = `${newSize}px`;
    }
  });
});

// High Contrast Toggle
contrastButton.addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
});

// Screen Reader Support
screenReaderButton.addEventListener("click", () => {
  const elements = document.querySelectorAll(
    'a, button, input, [role="button"]'
  );
  elements.forEach((element) => {
    if (!element.getAttribute("aria-label")) {
      element.setAttribute("aria-label", element.textContent.trim());
    }
  });
});

// Search Functionality
const searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const searchableElements = document.querySelectorAll("h1, h2, h3, p, a");

  searchableElements.forEach((element) => {
    const text = element.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      element.style.backgroundColor = "var(--light-green)";
    } else {
      element.style.backgroundColor = "";
    }
  });
});

// Form Submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Here you would typically send the data to a server
    console.log("Form submitted:", formObject);

    // Show success message
    alert("Thank you for your message! We will get back to you soon.");
    this.reset();
  });
}

// Scroll to Top Button
const createScrollTopButton = () => {
  const button = document.createElement("button");
  button.innerHTML = "↑";
  button.className = "scroll-top";
  button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-green);
        color: var(--white);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        display: none;
        font-size: 20px;
        z-index: 1000;
        transition: background-color 0.3s ease;
    `;

  document.body.appendChild(button);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      button.style.display = "block";
    } else {
      button.style.display = "none";
    }
  });

  button.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  button.addEventListener("mouseover", () => {
    button.style.backgroundColor = "var(--dark-green)";
  });

  button.addEventListener("mouseout", () => {
    button.style.backgroundColor = "var(--primary-green)";
  });
};

// Initialize scroll to top button
createScrollTopButton();

// Add animation to stats when they come into view
const animateStats = () => {
  const stats = document.querySelectorAll(".stat-item h3");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "countUp 2s ease-out forwards";
        }
      });
    },
    { threshold: 0.5 }
  );

  stats.forEach((stat) => observer.observe(stat));
};

// Initialize stats animation
animateStats();
