// Tunggu hingga seluruh konten halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', function() {

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
        }

        themeToggle.addEventListener('click', () => {
            const theme = body.getAttribute('data-theme');
            if (theme === 'dark') {
                body.removeAttribute('data-theme');
                themeIcon.className = 'fas fa-moon';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeIcon.className = 'fas fa-sun';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    // --- SCROLL PROGRESS BAR ---
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // --- HEADER SCROLL EFFECT ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- MOBILE MENU TOGGLE ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.className = navLinks.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    // --- TYPING ANIMATION (Hanya untuk index.html) ---
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const typingTexts = [
            'Student Developer',
            'Network Enthusiast',
            'Lifelong Learner',
            'Tech Explorer',
            'Future Engineer'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseTime = 2000;

        function typeText() {
            const currentText = typingTexts[textIndex];
            
            if (!isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(typeText, pauseTime);
                    return;
                }
            } else {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % typingTexts.length;
                }
            }
            
            setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
        }
        typeText();
    }

    // --- ACTIVE NAVIGATION LINK ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            });
        });
    }

    // --- PROJECT FILTERING (SATU VERSI YANG BENAR) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // --- FORM SUBMISSION (Hanya untuk index.html) ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showFormMessage('Mohon lengkapi semua field!', 'error');
                return;
            }
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Mohon masukkan email yang valid!', 'error');
                return;
            }
            
            showFormMessage(`Terima kasih ${name}! Pesan Anda telah terkirim. Saya akan segera membalasnya.`, 'success');
            contactForm.reset();
        });

        function showFormMessage(msg, type) {
            formMessage.textContent = msg;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // --- BACK TO TOP BUTTON ---
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- FADE IN ANIMATION ON SCROLL ---
    const fadeElements = document.querySelectorAll('.fade-in');
    if (fadeElements.length > 0) {
        const fadeInOnScroll = () => {
            fadeElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < window.innerHeight - elementVisible) {
                    element.classList.add('visible');
                }
            });
        };

        window.addEventListener('scroll', fadeInOnScroll);
        fadeInOnScroll(); // Check on load
    }

    // --- TESTIMONIAL SLIDER (Hanya untuk index.html) ---
    const dots = document.querySelectorAll('.dot');
    if (dots.length > 0) {
        let currentDot = 0;
        const testimonials = [
            {
                text: "Kubio adalah siswa yang sangat antusias dan cepat belajar. Dia selalu bertanya dengan baik dan tidak takut untuk mencoba hal-hal baru. Proyek network analysis-nya sangat detail dan menunjukkan pemahaman yang baik.",
                author: "Budi Santoso",
                position: "Guru Teknik Komputer",
                image: "teacher1"
            },
            {
                text: "Saya terkesan dengan proyek website portfolio Kubio. Untuk seorang siswa, dia sudah menunjukkan pemahaman yang baik tentang responsive design dan clean code. Potensinya sangat besar.",
                author: "Siti Nurhaliza",
                position: "Mentor Web Development",
                image: "teacher2"
            },
            {
                text: "Kubio aktif dalam diskusi networking di kelas. Dia mampu menjelaskan konsep yang kompleks dengan cara yang sederhana. Saya yakin dia akan sukses di bidang ini.",
                author: "Ahmad Wijaya",
                position: "Koord. Lab Komputer",
                image: "teacher3"
            }
        ];

        function updateTestimonial(index) {
            const testimonialCard = document.querySelector('.testimonial-card');
            if (testimonialCard) {
                const testimonial = testimonials[index];
                testimonialCard.innerHTML = `
                    <p class="testimonial-text">${testimonial.text}</p>
                    <div class="testimonial-author">
                        <img src="https://picsum.photos/seed/${testimonial.image}/60/60.jpg" alt="${testimonial.author}" class="author-image">
                        <div class="author-info">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.position}</p>
                        </div>
                    </div>
                `;
            }
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentDot = index;
                updateTestimonial(currentDot);
            });
        });

        // Auto-rotate testimonials
        setInterval(() => {
            currentDot = (currentDot + 1) % testimonials.length;
            updateTestimonial(currentDot);
        }, 5000);
    }
});// --- Skill Bar with Dynamic Color and Indicator Circle ---
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    const circle = item.querySelector('.skill-indicator-circle');
    const bar = item.querySelector('.skill-bar');
    
    if (circle && bar) {
        // Dapatkan persentase dari atribut data
        const percent = item.getAttribute('data-percent');
        
        // Terapkan gradien warna ke bar
        // Warna pertama (var(--primary-color)) adalah bagian yang telah dilewati
        // Warna kedua (#e9ecef) adalah bagian yang belum dilewati (sama dengan background)
        bar.style.background = `linear-gradient(90deg, var(--primary-color) ${percent}%, #e9ecef ${percent}%)`;
        
        // Dapatkan lebar dari bar
        const barWidth = bar.offsetWidth;
        
        // Hitung posisi lingkaran
        const circlePosition = (percent / 100) * barWidth - 16; // 16 adalah setengah lebar lingkaran
        
        // Set posisi lingkaran
        setTimeout(() => {
            circle.style.left = `${circlePosition}px`;
        }, 100);
    }
});
