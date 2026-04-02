document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Hamburger Menü İşlevi
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // 2. Sayfa Kaydırdıkça Beliren Elementler (Fade-in Animation)
    const observerOptions = {
        threshold: 0.1 // Elementin %10'u göründüğünde tetikle
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Yetenek Barları Animasyonu (CV Sayfası)
    const skillLevels = document.querySelectorAll('.skill-level');
    if (skillLevels.length > 0) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }
            });
        }, { threshold: 0.5 });
        
        skillLevels.forEach(skill => skillObserver.observe(skill));
    }

    // 4. Gelişmiş Modal Galeri (Hem 2D Hem 3D İçin - Projeler Sayfası)
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const modalModel = document.getElementById("modalModel"); // 3D model için
    const closeBtn = document.querySelector(".modal-close");
    
    const galleryImages = document.querySelectorAll(".lightbox-trigger"); // 2D resimler
    const modelTriggers = document.querySelectorAll(".model-trigger"); // 3D modeller

    if (modal && closeBtn) {
        // 2D Resimlere Tıklandığında
        galleryImages.forEach(img => {
            img.addEventListener("click", function(e) {
                e.preventDefault();
                modal.style.display = "flex";
                if (modalModel) modalModel.style.display = "none"; // Modeli gizle
                if (modalImg) {
                    modalImg.style.display = "block"; // Resmi göster
                    modalImg.src = this.src;
                }
            });
        });

        // 3D Modellere Tıklandığında
        if (modelTriggers) {
            modelTriggers.forEach(trigger => {
                trigger.addEventListener("click", function(e) {
                    e.preventDefault();
                    modal.style.display = "flex";
                    if (modalImg) modalImg.style.display = "none"; 
                    if (modalModel) {
                        modalModel.style.display = "block"; 
                        modalModel.poster = this.src; // ANINDA RESMİ GÖSTERİR
                        modalModel.src = this.getAttribute("data-model"); // ARKADA 3D'Yİ YÜKLER
                    }
                });
            });
        }

        // Kapatma İşlevi
        const closeModal = () => {
            modal.style.display = "none";
            if (modalImg) modalImg.src = "";
            if (modalModel) modalModel.src = ""; // Kapatınca modeli durdur
        };

        closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if(e.target === modal) closeModal(); // Arka plana tıklayınca kapat
        });
    }

    // 5. Yukarı Çık (Back to Top) Butonu
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // 6. Konami Code (Easter Egg)
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        // Tuşa basıldığında harfleri küçük harfe çevirerek (b, a) kontrol et
        const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        
        if (key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Şifre doğru girilirse temayı değiştir
                document.body.classList.toggle('easter-egg-theme');
                alert("Easter Egg'i Bulldunuz!"); 
                konamiIndex = 0; // Sıfırla
            }
        } else {
            konamiIndex = 0; // Yanlış tuşa basılırsa sıfırla
        }
    });

});