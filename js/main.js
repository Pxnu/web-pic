document.addEventListener('DOMContentLoaded', function() {
    // Menu Toggle functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let isMenuOpen = false;

    // ตั้งค่าเริ่มต้นสำหรับ animation
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }

    menuBtn.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        // Change menu icon
        const menuIcon = menuBtn.querySelector('i');
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');

        // Toggle menu with animation
        if (isMenuOpen) {
            navLinks.style.display = 'flex';
            // รอให้ display: flex ทำงานก่อนเริ่ม animation
            setTimeout(() => {
                navLinks.classList.add('active');
                navLinks.style.animation = 'slideDown 0.3s ease forwards';
            }, 10);
        } else {
            navLinks.style.animation = 'slideUp 0.3s ease forwards';
            // รอให้ animation เล่นจบก่อนซ่อน
            setTimeout(() => {
                navLinks.classList.remove('active');
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                }
            }, 300);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnMenuBtn = menuBtn.contains(event.target);

        if (!isClickInsideNav && !isClickOnMenuBtn && isMenuOpen) {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            isMenuOpen = false;
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            // Desktop view
            navLinks.style.display = 'flex';
            navLinks.style.animation = 'none';
            navLinks.classList.remove('active');
            if (menuBtn.querySelector('i').classList.contains('fa-times')) {
                menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }
            isMenuOpen = false;
        } else {
            // Mobile view
            if (!isMenuOpen) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('active');
            }
        }
    });

    // Handle initial state based on window width
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    }

    // Add active class to current page link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    navLinksItems.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('current-page');
        }
    });
});
