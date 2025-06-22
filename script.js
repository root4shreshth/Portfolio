document.addEventListener('DOMContentLoaded', function() {
  // ===== Typing Effect =====
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const words = ["Developer", "Designer", "Innovator"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      typingText.textContent = currentChar;
      
      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
      }
    }
    setTimeout(type, 1000);
  }

  // ===== Header Scroll Effect =====
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ===== Hero SVG Tilt Effect =====
  const heroSvg = document.querySelector('.hero-image');
  if (heroSvg) {
    heroSvg.addEventListener('mousemove', (e) => {
      const { left, top, width, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      heroSvg.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${y * -10}deg) scale(1.05)`;
    });

    heroSvg.addEventListener('mouseleave', () => {
      heroSvg.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
      heroSvg.style.animation = 'none';
      setTimeout(() => {
        heroSvg.style.animation = 'float 6s ease-in-out infinite';
      }, 100);
    });

    heroSvg.addEventListener('click', () => {
      heroSvg.style.transform = 'scale(0.95)';
      setTimeout(() => {
        heroSvg.style.transform = 'scale(1.05)';
      }, 200);
    });
  }

  // ===== Mobile Menu =====
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // ===== Smooth Scrolling =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== Intersection Observer (Fade-in Effects) =====
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // ===== Contact Form =====
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      console.log({ name, email, message });
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }

  // ===== Projects Section - Category Cards & Modal =====
  const categoryCards = document.querySelectorAll('.category-card');
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close-modal');
  const modalTitle = document.querySelector('.modal-title');
  const modalGrid = document.querySelector('.modal-projects-grid');
  

  if (categoryCards.length && modal) {
    // Project data (could be fetched from JSON)
    const projectsData = {
      web: [

        {
          title: "Sample gym Website",          // Project name
          image: "images/gym2.png",  // Path to image
          description: "Modern gym website with responsive design and interactive features.", // Short description
          tech: ["HTML", "CSS", "JavaScript", "Gsap Animation"],       // Technologies used
          link: "https://fit4.netlify.app/"  // Live demo URL
        },
        {
          title: "Sample gym Website",          // Project name
          image: "images/gym.png",  // Path to image
          description: "Modern gym website with responsive design and interactive features.", // Short description
          tech: ["HTML", "CSS", "JavaScript"],       // Technologies used
          link: "https://right2fitness.netlify.app/"  // Live demo URL
        },
        
        {
          title: "STEP – Shoe E-commerce",
          image: "images/shoes.png",
          description: "Modern product showcase page for footwear brand...",
          tech: ["HTML", "CSS", "JavaScript"],
          link: "https://stepshoe.netlify.app/"
        },


        {
          title: "Navisphere",
          image: "images/navisphere.png",
          description: "Smart indoor navigation solution for hospitals...",
          tech: ["HTML", "CSS", "JavaScript"],
          link: "https://navispheres.netlify.app/"
        },
        
        
        
    
      ],
      ui: [
        {
          title: "Snowvia UI",
          image: "images/Snowvia ui.png",
          description: "Figma design system",
          tech: ["Figma", "Prototyping"],
          link: "#"
        },
        {
          title: "Astro A50 X UI",
          image: "images/Astro A50 X UI.png",
          description: "Headset companion app design",
          tech: ["Figma", "UI/UX"],
          link: "#"
        }
      ]
    };

    // Open modal with category projects
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const category = card.dataset.category;
        const categoryName = card.querySelector('h3').textContent;
        
        modalTitle.textContent = categoryName;
        modalGrid.innerHTML = '';
        
        // Inject projects
        projectsData[category].forEach(project => {
          const projectCard = `
            <div class="project-card glass-card">
              <div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy">
              </div>
              <h3 class="project-title">${project.title}</h3>
              <p class="project-description">${project.description}</p>
              <div class="project-tech">
                ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
              </div>
              <a href="${project.link}" class="project-link" target="_blank">View Project <i class="fas fa-external-link-alt"></i></a>
            </div>
          `;
          modalGrid.insertAdjacentHTML('beforeend', projectCard);
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside content
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ===== Image Hover Effects for UI Projects =====
  document.querySelectorAll('.project-image').forEach(imageContainer => {
    const secondImage = imageContainer.querySelector('.second-image');
    if (secondImage) {
      imageContainer.addEventListener('mouseenter', () => {
        imageContainer.querySelector('img:first-child').style.opacity = '0';
      });
      
      imageContainer.addEventListener('mouseleave', () => {
        imageContainer.querySelector('img:first-child').style.opacity = '1';
      });
    }
  });
  // Inside your category card click handler:
projectsData[category].forEach(project => {
  const projectCard = `
    <div class="project-card">
      <div class="project-image">
        <img src="${project.image}" alt="${project.title}" style="object-fit: cover; height: 100%; width: 100%;">
      </div>
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tech">
        ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
      </div>
      <a href="${project.link}" class="project-link" target="_blank">View Project</a>
    </div>
  `;
  modalGrid.insertAdjacentHTML('beforeend', projectCard);
});
// Add this after modal content injection
document.querySelectorAll('.ui-project .project-image').forEach(container => {
  const mainImg = container.querySelector('img:first-child');
  const hoverImg = container.querySelector('.second-image');
  
  if (hoverImg) {
    container.addEventListener('mouseenter', () => {
      mainImg.style.opacity = '0';
      hoverImg.style.display = 'block';
      hoverImg.style.opacity = '1';
    });
    
    container.addEventListener('mouseleave', () => {
      mainImg.style.opacity = '1';
      hoverImg.style.display = 'none';
    });
  }
});
});