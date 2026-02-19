const mainSlider = document.getElementById("slider");
const mainNext = document.querySelector(".next");
const mainPrev = document.querySelector(".prev");

let autoSlideInterval;

function slideNext() {
    const maxScroll = mainSlider.scrollWidth - mainSlider.clientWidth;


    if (mainSlider.scrollLeft >= maxScroll - 10) {

        mainSlider.scrollTo({ left: 0, behavior: "smooth" });
    } else {

        mainSlider.scrollBy({ left: 300, behavior: "smooth" });
    }
}

function slidePrev() {

    if (mainSlider.scrollLeft <= 10) {
        mainSlider.scrollTo({ left: mainSlider.scrollWidth, behavior: "smooth" });
    } else {

        mainSlider.scrollBy({ left: -300, behavior: "smooth" });
    }
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        slideNext();
    }, 1000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}


function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}


if (mainNext) {
    mainNext.onclick = function() {
        slideNext();
        restartAutoSlide();
    };
}


if (mainPrev) {
    mainPrev.onclick = function() {
        slidePrev();
        restartAutoSlide();
    };
}


mainSlider.addEventListener("mouseenter", stopAutoSlide);
mainSlider.addEventListener("mouseleave", startAutoSlide);


mainSlider.addEventListener("touchstart", stopAutoSlide);
mainSlider.addEventListener("touchend", restartAutoSlide);


startAutoSlide();



const brandSlider = document.getElementById("brandSlider");

if (brandSlider) {
    const cardWidth = brandSlider.querySelector(".brand-card").offsetWidth + 32; // 32px gap from CSS
    let brandAutoSlide;


    function slideNextBrand() {
        const maxScroll = brandSlider.scrollWidth - brandSlider.clientWidth;

        if (brandSlider.scrollLeft >= maxScroll - 10) {
            // Loop back to start
            brandSlider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            // Scroll to next card
            brandSlider.scrollBy({
                left: cardWidth,
                behavior: "smooth"
            });
        }
    }


    function startBrandAutoSlide() {
        brandAutoSlide = setInterval(function() {
            slideNextBrand();
        }, 1000);
    }


    function stopBrandAutoSlide() {
        clearInterval(brandAutoSlide);
    }


    function restartBrandAutoSlide() {
        stopBrandAutoSlide();
        startBrandAutoSlide();
    }



    brandSlider.onmouseenter = function() {
        stopBrandAutoSlide();
    };

    brandSlider.onmouseleave = function() {
        startBrandAutoSlide();
    };



    brandSlider.addEventListener("touchstart", stopBrandAutoSlide);
    brandSlider.addEventListener("touchend", restartBrandAutoSlide);



    startBrandAutoSlide();
}

const desktopSlider = document.querySelector(".desktop-slider");
const desktopCards = document.querySelectorAll(".testimonial-card-desktop");
const sliderDots = document.querySelector(".slider-dots");

if (desktopSlider && desktopCards.length && sliderDots) {
    let desktopIndex = 0;
    let desktopAutoSlide = null;
    const desktopDelay = 5000;

    // Create dots
    desktopCards.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");

        dot.addEventListener("click", () => {
            desktopIndex = index;
            scrollToDesktopSlide(index);
            updateDesktopDots();
            stopDesktopAutoSlide();
            startDesktopAutoSlide();
        });

        sliderDots.appendChild(dot);
    });

    const dots = sliderDots.querySelectorAll(".dot");

    function scrollToDesktopSlide(index) {
        const slideWidth = desktopSlider.offsetWidth;
        desktopSlider.scrollTo({
            left: slideWidth * index,
            behavior: "smooth"
        });
    }

    function updateDesktopDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === desktopIndex);
        });
    }

    function startDesktopAutoSlide() {
        if (desktopAutoSlide) return;

        desktopAutoSlide = setInterval(() => {
            desktopIndex = (desktopIndex + 1) % desktopCards.length;
            scrollToDesktopSlide(desktopIndex);
            updateDesktopDots();
        }, desktopDelay);
    }

    function stopDesktopAutoSlide() {
        clearInterval(desktopAutoSlide);
        desktopAutoSlide = null;
    }


    desktopSlider.addEventListener("mouseenter", stopDesktopAutoSlide);
    desktopSlider.addEventListener("mouseleave", startDesktopAutoSlide);


    startDesktopAutoSlide();
}



const mobileSlider = document.querySelector(".mobile-slider");
const mobileCards = document.querySelectorAll(".testimonial-card-mobile");

if (mobileSlider && mobileCards.length) {
    let mobileIndex = 0;
    let mobileAutoSlide = null;
    const mobileDelay = 5000;

    function scrollToMobileSlide(index) {
        const slideWidth = mobileSlider.offsetWidth;
        mobileSlider.scrollTo({
            left: slideWidth * index,
            behavior: "smooth"
        });
    }

    function startMobileAutoSlide() {
        if (mobileAutoSlide || window.innerWidth > 768) return;

        mobileAutoSlide = setInterval(() => {
            mobileIndex = (mobileIndex + 1) % mobileCards.length;
            scrollToMobileSlide(mobileIndex);
        }, mobileDelay);
    }

    function stopMobileAutoSlide() {
        clearInterval(mobileAutoSlide);
        mobileAutoSlide = null;
    }

    function handleMobileSlider() {
        if (window.innerWidth <= 768) {
            startMobileAutoSlide();
        } else {
            stopMobileAutoSlide();
            mobileSlider.scrollLeft = 0;
            mobileIndex = 0;
        }
    }


    mobileSlider.addEventListener("touchstart", stopMobileAutoSlide);
    mobileSlider.addEventListener("touchend", startMobileAutoSlide);


    handleMobileSlider();
    window.addEventListener("resize", handleMobileSlider);
}


const faqItems = document.querySelectorAll('.faq-item');


faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {

        const isActive = item.classList.contains('active');


        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });


        if (isActive) {
            item.classList.remove('active');
        } else {
            item.classList.add('active');
        }
    });
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');


hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});


document.addEventListener('click', function(event) {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);

    if (!isClickInsideMenu && !isClickOnHamburger && mobileMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});


const menuLinks = mobileMenu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});


let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    }, 250);
});



(function() {
    'use strict';

    const config = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px',
        animateOnce: false,
    };

    const autoDetectSelectors = [
        'section',
        'header',
        '.container',
        '.hero',
        '.card',
        '.feature',
        '.service',
        '.product',
        '.testimonial',
        '.pricing',
        '.about',
        '.team',
        '.portfolio',
        '.gallery',
        '.blog',
        '.stats',
        'article',
        '.content-block'
    ];

    // Simplified animation types - removed bounce and elastic effects
    const animationTypes = [
        'fade-up',
        'fade-down',
        'slide-left',
        'slide-right',
        'zoom-in'
    ];

    function initScrollAnimations() {
        let elementIndex = 0;

        autoDetectSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);

            elements.forEach((element, index) => {
                if (!element.hasAttribute('data-scroll')) {
                    const animationType = animationTypes[elementIndex % animationTypes.length];
                    element.setAttribute('data-scroll', animationType);

                    // Reduced delay for smoother feel
                    const delay = (index % 4) * 80;
                    if (delay > 0) {
                        element.setAttribute('data-delay', delay);
                    }

                    elementIndex++;
                }
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');

                    if (config.animateOnce) {
                        observer.unobserve(entry.target);
                    }
                } else {
                    if (!config.animateOnce) {
                        entry.target.classList.remove('is-visible');
                    }
                }
            });
        }, {
            threshold: config.threshold,
            rootMargin: config.rootMargin
        });

        const animatedElements = document.querySelectorAll('[data-scroll]');
        animatedElements.forEach(element => {
            observer.observe(element);
        });

        console.log(`🎬 ${animatedElements.length} elements ko smooth scroll animation mili!`);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }

    window.refreshScrollAnimations = initScrollAnimations;

})();