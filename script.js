document.addEventListener('DOMContentLoaded', function() {
    // Typing Effect
    const typingText = document.querySelector('.typing-text');
    const words = ["Developer", "Designer", "Innovator"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(type, 50);
        } else {
            // Change word
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }
    
    // Start typing effect after 1 second
    setTimeout(type, 1000);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    document.addEventListener('DOMContentLoaded', function() {
        const heroSvg = document.querySelector('.hero-image');
        
        // Tilt effect on mouse move
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
      });
    
    
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
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
    
    
    const observerOptions = {
        threshold: 0.1
    };
    
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
    
    
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Here you would typically send the form data to a server
            console.log({ name, email, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
});