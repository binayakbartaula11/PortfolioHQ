// Blog Data and Rendering Module
const blogData = [
  {
    title: "Interactive Simulation System for Maze Generation and Pathfinding Algorithms",
    author: "Binayak Bartaula",
    published: "July 06, 2025",
    readTime: "13 min read",
    teaser:
      "This paper presents an interactive Python-Pygame platform for real-time visualization and comparison of six classical maze generation and pathfinding algorithms. Its modular design supports extensibility and 60FPS performance, serving as a tool for education and research.",
    link: "https://is.gd/mlfcyl",
    ctaText: "Read Full Research",
    thumbnail: "assets/images/interactive_maze_pathfinding_simulator.png",
  },
  {
    title: "ImageGlitch: A Developer's Journey Through Deployment Hell (And How I Survived It)",
    author: "Binayak Bartaula",
    published: "August 4, 2025",
    readTime: "10 min read",
    teaser:
      "Ever pushed an app to production only to watch it crash again and again? Join me on a wild ride through deployment disasters, memory crashes, and over 30 frantic commits, all to bring ImageGlitch to life. Spoiler: it wasn't pretty, but every struggle was worth it in the end.",
    link: "https://medium.com/@binayakbartaula/imageglitch-a-developers-journey-through-deployment-hell-and-how-i-survived-it-2b280ed9454c",
    ctaText: "Read Devlog",
    thumbnail: "assets/images/imageglitch-deployment-chaos.png",
  },
  {
    title: "The Quiet Art of Claiming: From Name to Network, Your Free .com.np Domain Awaits",
    author: "Binayak Bartaula",
    published: "June 25, 2025",
    readTime: "11 min read",
    teaser:
      "Unlock your professional online presence with a free .com.np domain with no cost and no hassle. Learn how students and entrepreneurs across Nepal are claiming their space on the web before upcoming policy changes take effect. Don't wait. Start building your digital future today!",
    link: "https://medium.com/@binayakbartaula/the-quiet-art-of-claiming-from-name-to-network-your-free-com-np-domain-awaits-73c31206297e",
    ctaText: "Read More",
    thumbnail: "assets/images/free-com-np-domain.png",
  },
  {
    title: "The Missing Middle: Why GitHub Needs Unlisted Repositories",
    author: "Binayak Bartaula",
    published: "August 16, 2025",
    readTime: "9 min read",
    teaser:
      "Why does GitHub only offer \"public\" or \"private\" with no middle ground? Developers juggle cryptic repo names and messy permissions just to share work in progress code. Unlisted repositories could fix this, making sharing easier, less stressful, and more collaborative.",
    link: "https://medium.com/@binayakbartaula/the-missing-middle-why-github-needs-unlisted-repositories-and-why-im-tired-of-pretending-it-41113f0676b5",
    ctaText: "Read on Medium",
    thumbnail: "assets/images/3am-developer-dilemma.png",
  }
];

// Performance monitoring
const blogPerformance = {
  startTime: performance.now(),
  logMetric(name, value) {
    // Performance metric logged
  },
  measureRenderTime() {
    const endTime = performance.now();
    this.logMetric("Blog Render Time", Math.round(endTime - this.startTime));
  },
};

// Enhanced Blog rendering class
class BlogRenderer {
  constructor() {
    this.blogContainer = document.getElementById("blog-grid");
    // BlogRenderer initialized
  }

  init() {
    try {
      if (this.blogContainer) {
        // Starting blog rendering
        this.renderBlogCards();
        this.setupInteractions();
        this.setupLazyLoading();
      } else {
        console.warn("Blog container #blog-grid not found!");
      }
    } catch (error) {
      console.warn("Blog initialization failed:", error.message);
    }
  }

  renderBlogCards() {
    try {
      // Rendering blog cards
      // Show loading skeleton first
      this.showLoadingSkeleton();
      
      // Simulate loading delay for better UX
      setTimeout(() => {
        try {
          this.blogContainer.innerHTML = "";
          blogData.forEach((blog, index) => {
            const blogCard = this.createBlogCard(blog, index);
            this.blogContainer.appendChild(blogCard);
            // Blog card added
          });
          
          // Enhanced AOS initialization with error handling
          if (window.AOS) {
            // AOS animations refreshed
            setTimeout(() => {
              try {
                window.AOS.refresh();
              } catch (error) {
                console.warn("AOS refresh failed:", error.message);
              }
            }, 100);
          }
          
          this.addRippleStyles();
        } catch (error) {
          console.warn("Blog card rendering failed:", error.message);
        }
      }, 800);
    } catch (error) {
      console.warn("Blog cards initialization failed:", error.message);
    }
  }

  showLoadingSkeleton() {
    // Loading skeleton shown
    this.blogContainer.innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const skeleton = document.createElement("div");
      skeleton.className = "blog-card blog-card-skeleton";
      skeleton.style.height = "500px";
      this.blogContainer.appendChild(skeleton);
    }
  }

  createBlogCard(blog, index) {
    const article = document.createElement("article");
    article.className = "blog-card";
    article.setAttribute("data-aos", "fade-up");
    article.setAttribute("data-aos-duration", "800");
    article.setAttribute("data-aos-delay", (index * 200).toString());
    article.setAttribute("role", "article");
    article.setAttribute("tabindex", "0");

    const publishedDate = new Date(blog.published).toISOString().split("T")[0];

    article.innerHTML = `
      <div class="blog-card-header">
        <div class="blog-thumbnail">
          <img src="${blog.thumbnail}" alt="${blog.title}" loading="lazy" width="400" height="240">
        </div>
      </div>
      <div class="blog-card-content">
        <h3 class="blog-title">${blog.title}</h3>
        <div class="blog-meta">
          <span class="blog-author">
            <i class="fas fa-user" aria-hidden="true"></i>
            ${blog.author}
          </span>
          <span class="blog-date">
            <i class="fas fa-calendar" aria-hidden="true"></i>
            <time datetime="${publishedDate}">${blog.published}</time>
          </span>
          <span class="blog-read-time">
            <i class="fas fa-clock" aria-hidden="true"></i>
            ${blog.readTime}
          </span>
        </div>
        <p class="blog-teaser">${blog.teaser}</p>
        <a href="${blog.link}" class="blog-cta btn btn-primary" target="_blank" rel="noopener noreferrer" aria-label="Read article: ${blog.title}">
          <span>${blog.ctaText}</span>
          <i class="fas fa-arrow-right" aria-hidden="true"></i>
        </a>
      </div>
    `;

    return article;
  }

  setupInteractions() {
    // Blog interactions setup
    // Enhanced hover effects with single-card glow behavior
    let currentHoveredCard = null;
    let hoverTimeout;

    document.addEventListener("mouseover", (e) => {
      const blogCard = e.target.closest(".blog-card");
      if (blogCard && !blogCard.classList.contains("blog-card-skeleton")) {
        clearTimeout(hoverTimeout);
        // Remove hover effect from previously hovered card
        if (currentHoveredCard && currentHoveredCard !== blogCard) {
          this.removeHoverEffect(currentHoveredCard);
        }
        // Add hover effect to current card
        this.addHoverEffect(blogCard);
        currentHoveredCard = blogCard;
      }
    });

    document.addEventListener("mouseout", (e) => {
      const blogCard = e.target.closest(".blog-card");
      if (blogCard && !blogCard.classList.contains("blog-card-skeleton")) {
        hoverTimeout = setTimeout(() => {
          this.removeHoverEffect(blogCard);
          if (currentHoveredCard === blogCard) {
            currentHoveredCard = null;
          }
        }, 100);
      }
    });

    // Enhanced ripple effect for CTA buttons
    document.addEventListener("click", (e) => {
      const ctaButton = e.target.closest(".blog-cta");
      if (ctaButton) {
        // Ripple effect created
        this.createRippleEffect(e, ctaButton);
      }
    });

    // Keyboard navigation support
    document.addEventListener("keydown", (e) => {
      const blogCard = e.target.closest(".blog-card");
      if (blogCard && (e.key === "Enter" || e.key === " ")) {
        e.preventDefault();
        const ctaButton = blogCard.querySelector(".blog-cta");
        if (ctaButton) {
          ctaButton.click();
        }
      }
    });
  }

  addHoverEffect(card) {
    // Remove hover class from all other blog cards
    document.querySelectorAll('.blog-card.hover-active').forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.classList.remove('hover-active');
      }
    });
    // Add hover class to current card
    card.classList.add('hover-active');
  }

  removeHoverEffect(card) {
    card.classList.remove('hover-active');
  }

  createRippleEffect(event, button) {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("blog-ripple");

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    }, 800);
  }

  addRippleStyles() {
    if (!document.getElementById("blog-ripple-styles")) {
      const blogRippleStyle = document.createElement("style");
      blogRippleStyle.id = "blog-ripple-styles";
      blogRippleStyle.textContent = `
        .blog-ripple {
          position: absolute;
          background: rgba(255, 255, 255, 0.3);
          transform: scale(0);
          border-radius: 50%;
          animation: blog-ripple-animation 0.8s linear;
          pointer-events: none;
          z-index: 1;
        }
        @keyframes blog-ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(blogRippleStyle);
      // Ripple styles added
    }
  }

  setupLazyLoading() {
    try {
      // Lazy loading setup
      // Enhanced lazy loading with Intersection Observer
      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              try {
                if (entry.isIntersecting) {
                  const img = entry.target;
                  img.src = img.dataset.src || img.src;
                  img.classList.remove("lazy");
                  observer.unobserve(img);
                  // Image lazy loaded
                }
              } catch (error) {
                console.warn("Lazy loading failed for image:", error.message);
              }
            });
          },
          {
            rootMargin: "50px 0px",
            threshold: 0.1,
          },
        );

        // Observe all blog images with error handling
        setTimeout(() => {
          try {
            const blogImages = document.querySelectorAll(".blog-thumbnail img");
            // Blog images observed for lazy loading
            blogImages.forEach((img) => {
              imageObserver.observe(img);
            });
          } catch (error) {
            console.warn("Failed to setup image observation:", error.message);
          }
        }, 1000);
      } else {
        console.warn("IntersectionObserver not supported, lazy loading disabled");
      }
    } catch (error) {
      console.warn("Lazy loading setup failed:", error.message);
    }
  }

  formatDateForDateTime(dateString) {
    // Convert "July 06, 2025" to "2025-07-06"
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}

// Initialize blog functionality when DOM is ready with error handling
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Blog renderer initializing
    const blogRenderer = new BlogRenderer();
    blogRenderer.init();
    
    // Measure performance with error handling
    setTimeout(() => {
      try {
        blogPerformance.measureRenderTime();
      } catch (error) {
        console.warn("Blog performance measurement failed:", error.message);
      }
    }, 1000);
  } catch (error) {
    console.warn("Failed to initialize blog renderer:", error.message);
  }
});

// Export for potential external use
if (typeof module !== "undefined" && module.exports) {
  module.exports = { blogData, BlogRenderer };
}
