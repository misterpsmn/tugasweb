// ===== DEBUGGING =====
console.log("✅ Script.js loaded successfully!");

// ===== SLIDER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ DOM fully loaded!");
    
    // Ambil elemen slider
    const slides = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const playPauseBtn = document.querySelector('.play-pause-btn');
    const currentSlideElement = document.querySelector('.current-slide');
    const totalSlidesElement = document.querySelector('.total-slides');
    
    // Debug: Cek elemen
    console.log("Slider elements:", {
        slides: !!slides,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dots: dots.length,
        playPauseBtn: !!playPauseBtn
    });
    
    // Variabel kontrol slider
    let currentSlide = 0;
    let slideInterval;
    let isPlaying = true;
    const slideElements = document.querySelectorAll('.slide');
    const slideCount = slideElements.length;
    
    // Set total slides di counter
    if (totalSlidesElement) {
        totalSlidesElement.textContent = slideCount;
    }
    
    // Fungsi update slider
    function updateSlider() {
        // Geser slider
        if (slides) {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
        
        // Update counter
        if (currentSlideElement) {
            currentSlideElement.textContent = currentSlide + 1;
        }
        
        // Efek fade
        slideElements.forEach((slide, index) => {
            slide.style.opacity = index === currentSlide ? '1' : '0.7';
        });
        
        console.log(`🔄 Slider updated to slide ${currentSlide + 1}`);
    }
    
    // Fungsi next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }
    
    // Fungsi prev slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }
    
    // Fungsi go to slide tertentu
    function goToSlide(index) {
        if (index >= 0 && index < slideCount) {
            currentSlide = index;
            updateSlider();
        }
    }
    
    // Fungsi start autoplay
    function startAutoplay() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 4000); // 4 detik
        isPlaying = true;
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        console.log("▶️ Autoplay started");
    }
    
    // Fungsi stop autoplay
    function stopAutoplay() {
        if (slideInterval) clearInterval(slideInterval);
        isPlaying = false;
        if (playPauseBtn) {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
        console.log("⏸️ Autoplay stopped");
    }
    
    // Fungsi toggle autoplay
    function toggleAutoplay() {
        if (isPlaying) {
            stopAutoplay();
        } else {
            startAutoplay();
        }
    }
    
    // Event listeners untuk slider
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            if (isPlaying) {
                stopAutoplay();
                startAutoplay();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            if (isPlaying) {
                stopAutoplay();
                startAutoplay();
            }
        });
    }
    
    // Event listeners untuk dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
            if (isPlaying) {
                stopAutoplay();
                startAutoplay();
            }
        });
    });
    
    // Event listener untuk play/pause
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', toggleAutoplay);
    }
    
    // Inisialisasi slider
    updateSlider();
    startAutoplay();
    console.log("✅ Slider initialized!");
    
    // ===== LOGO CLICK -> BACK TO HOME =====
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll ke home section
            const homeSection = document.getElementById('home');
            if (homeSection) {
                window.scrollTo({
                    top: homeSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            
            // Reset slider ke slide pertama
            currentSlide = 0;
            updateSlider();
            console.log("🏠 Logo clicked - Back to home");
        });
    }
    
    // ===== MOBILE NAVIGATION =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log("📱 Mobile menu toggled");
        });
        
        // Tutup menu saat klik link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===== ORDER MODAL FUNCTIONALITY =====
    function createOrderModal() {
        const modalHTML = `
        <div class="order-modal" id="orderModal">
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <h2>Pesan Online</h2>
                <div class="modal-body">
                    <div class="order-options">
                        <div class="option active" data-app="gofood">
                            <i class="fas fa-motorcycle"></i>
                            <span>GoFood</span>
                        </div>
                        <div class="option" data-app="grabfood">
                            <i class="fas fa-car"></i>
                            <span>GrabFood</span>
                        </div>
                        <div class="option" data-app="shopee">
                            <i class="fas fa-shopping-bag"></i>
                            <span>ShopeeFood</span>
                        </div>
                    </div>
                    
                    <div class="order-links">
                        <a href="https://gofood.link/a/KOPINUSANTARA" target="_blank" class="order-link gofood">
                            <i class="fas fa-external-link-alt"></i>
                            Pesan via GoFood
                        </a>
                        <a href="https://food.grab.com/id/restaurant/kopi-nusantara" target="_blank" class="order-link grabfood hidden">
                            <i class="fas fa-external-link-alt"></i>
                            Pesan via GrabFood
                        </a>
                        <a href="https://food.shopee.co.id/restaurant/kopi-nusantara" target="_blank" class="order-link shopee hidden">
                            <i class="fas fa-external-link-alt"></i>
                            Pesan via ShopeeFood
                        </a>
                    </div>
                    
                    <div class="order-instruction">
                        <p><i class="fas fa-info-circle"></i> Pilih platform delivery, lalu klik link untuk langsung ke halaman kami</p>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        // Tambahkan modal ke body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        console.log("🛒 Order modal created");
        
        // Setup event listeners untuk modal
        setupOrderModal();
    }
    
    function setupOrderModal() {
        const modal = document.getElementById('orderModal');
        const closeBtn = modal.querySelector('.close-modal');
        const options = modal.querySelectorAll('.option');
        const links = modal.querySelectorAll('.order-link');
        
        // Function to show modal
        window.showOrderModal = function() {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            console.log("📱 Order modal opened");
        };
        
        // Function to hide modal
        function hideOrderModal() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            console.log("📱 Order modal closed");
        }
        
        // Close modal when clicking X
        closeBtn.addEventListener('click', hideOrderModal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideOrderModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                hideOrderModal();
            }
        });
        
        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                options.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                const app = this.getAttribute('data-app');
                
                // Hide all links
                links.forEach(link => link.classList.add('hidden'));
                
                // Show selected link
                const selectedLink = modal.querySelector(`.order-link.${app}`);
                if (selectedLink) {
                    selectedLink.classList.remove('hidden');
                }
                
                console.log(`📱 Selected delivery app: ${app}`);
            });
        });
    }
    
    // ===== ORDER BUTTON EVENT LISTENER =====
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            // Create modal if it doesn't exist
            if (!document.getElementById('orderModal')) {
                createOrderModal();
            }
            
            // Show modal
            if (window.showOrderModal) {
                window.showOrderModal();
            }
        });
    }
    
    // ===== ADD TO CART BUTTONS (UNTUK MENU & DESSERT) =====
    function setupAddToCartButtons() {
        const addButtons = document.querySelectorAll('.btn-add');
        addButtons.forEach(button => {
            button.addEventListener('click', function() {
                const item = this.closest('.menu-item, .dessert-item');
                const itemName = item.querySelector('.menu-title, .dessert-title').textContent;
                const itemPrice = item.querySelector('.menu-price, .dessert-price').textContent;
                
                // Simpan teks asli
                const originalText = this.textContent;
                
                // Ubah tampilan tombol
                this.textContent = 'Ditambahkan!';
                this.style.backgroundColor = '#4CAF50';
                this.style.cursor = 'default';
                
                // Tampilkan notifikasi
                console.log(`🛒 Added to cart: ${itemName} - ${itemPrice}`);
                
                // Kembalikan ke semula setelah 2 detik
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = '';
                    this.style.cursor = 'pointer';
                }, 2000);
            });
        });
        console.log(`✅ ${addButtons.length} add to cart buttons initialized`);
    }
    
    // Setup add to cart buttons
    setupAddToCartButtons();
    
    // ===== FORM VALIDATION =====
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const outlet = this.querySelector('select').value;
            
            // Validasi
            if (!name || !email || !phone || !outlet) {
                alert('❌ Harap lengkapi semua field yang wajib diisi!');
                return;
            }
            
            // Validasi email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('❌ Format email tidak valid!');
                return;
            }
            
            // Validasi nomor telepon
            const phoneRegex = /^[0-9+\-\s]+$/;
            if (!phoneRegex.test(phone)) {
                alert('❌ Format nomor telepon tidak valid!');
                return;
            }
            
            // Jika semua valid, tampilkan pesan sukses
            alert(`✅ Terima kasih ${name}!\n\nReservasi Anda di outlet ${outlet} telah diterima.\nKami akan menghubungi Anda di ${phone} dalam waktu 1x24 jam.`);
            
            // Reset form
            this.reset();
            console.log("📋 Reservation form submitted successfully");
        });
    }
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPos = window.scrollY + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
    
    console.log("✅ All JavaScript functionality loaded!");
});

// ===== ADDITIONAL FEATURES =====
// Function untuk back to top (opsional)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Tambahkan tombol back to top jika diinginkan
window.addEventListener('scroll', function() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        if (scrollTop > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
});

console.log("🎉 Website Kopi Nusantara ready!");
