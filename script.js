'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const logo = document.querySelector('.nav__logo');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsCaontainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
const imgTarget = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotCantainer = document.querySelector('.dots');
const message = document.createElement('div');


const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// console.log(document.documentElement); // весь документ
// console.log(document.head);
// console.log(document.body);
// message.textContent = 'We use cookies for impoved functionality and analytics.'
// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
// console.log(allButtons);
// console.log(getComputedStyle(message).color);

// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//creating and inserting elements
// .inserAdjacentHTML

message.classList.add('cookie-message');

message.innerHTML = 'We use cookies for impoved functionality and analytics. <button class="btn btn--close-cookie">Got it</button>';


header.after(message);

//delete
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.remove();
})

// styles
message.style.backgroundColor = '#37383d';
// attributes
logo.alt = 'Beautiful minimalist logo';
// console.log(logo.getAttribute('src'));

// data attributes
// console.log(logo.dataset.wersionNumber);
// classes
// logo.classList.add('c', 'j');
// logo.classList.remove('c', 'j');
// logo.classList.toggle('c');
// logo.classList.contains('c');

btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();

    // window.scrollTo({
    //     left: section1.clientLeft,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });

    section1.scrollIntoView({ behavior: 'smooth' })
    console.log('height/width', document.documentElement.clientHeight, window.pageXOffset);
});

// 1. Add event listener to common parent element
// 2. Determine what element origineted the event

document.querySelector('.nav__links').addEventListener(
    'click', function (e) {
        e.preventDefault();
        console.log(e.target);

        // Matching strategy
        if (e.target.classList.contains('nav__link')) {
            const id = e.target.getAttribute('href');
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
    }
);

tabsCaontainer.addEventListener('click', function (e) {
    e.preventDefault();

    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;

    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    clicked.classList.add('operations__tab--active');

    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

})

function handleHverNavBtn(e, opacity) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = opacity;
            logo.style.opacity = opacity;
        })
    }
}

// menu fade animation
nav.addEventListener('mouseover', function (e) {
    handleHverNavBtn(e, 0.5)
})

nav.addEventListener('mouseout', function (e) {
    handleHverNavBtn(e, 1)
})

// sticky navigation
// window.addEventListener('scroll', function (e) {
//     if (this.window.scrollY >= section1.getBoundingClientRect().top) {
//         nav.classList.add('sticky');
//     } else nav.classList.remove('sticky');
// })

// const onbCallback = function (entries, obsorver) {
//     entries.forEach(entry => {

//     })
// }

// const onbOptions = {
//     root: null,
//     threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(onbCallback, onbOptions);
// observer.observe(section1);

function stickyNav(entries) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

function revealSection(entries, observer) {
    const [entry] = entries;
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('section--hidden');
        observer.unobserve(entry.target);
    })
}

//reveal section
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})
allSection.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
})

function loadImage(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loadImage, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
})
imgTarget.forEach(img => {
    imageObserver.observe(img);
})

function sliderChange(curSlide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - curSlide)}%)`);
}
function createDots() {
    slides.forEach(function (_, i) {
        dotCantainer.insertAdjacentHTML('beforeend',
            `<button class='dots__dot' data-slide='${i}'></button>`
        )
    });
}

let currentSlide = 0;
const maxSlides = slides.length;

sliderChange(0);
createDots();
dotColorChange(0);

btnRight.addEventListener('click', function () {
    nextSlide();
})

btnLeft.addEventListener('click', function () {
    prewSlide();
})

document.addEventListener('keydown', function (e) {
    e.preventDefault();
    if (e.key === 'ArrowLeft') {
        prewSlide();
    }
    if (e.key === 'ArrowRight') {
        nextSlide();
    }
})


function prewSlide() {
    if (currentSlide === 0) {
        currentSlide = maxSlides - 1;
    }
    else currentSlide--;
    sliderChange(currentSlide);
    dotColorChange(currentSlide)
}

function nextSlide() {
    if (currentSlide === maxSlides - 1) {
        currentSlide = 0;
    }
    else currentSlide++;
    sliderChange(currentSlide);
    dotColorChange(currentSlide);
}

function dotColorChange(curSlide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${curSlide}"]`).classList.add('dots__dot--active');
}

dotCantainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        currentSlide = Number(e.target.dataset.slide);
        sliderChange(currentSlide);
        dotColorChange(currentSlide);
    }
})

// function alertH1() {
//     alert('You are watching here');

//     document.querySelector('h1').removeEventListener('mousemove', alertH1);
// }

// document.querySelector('h1').addEventListener('mousemove', alertH1);

//
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min - 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//     e.preventDefault();
//     this.style.backgroundColor = randomColor();
//     e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//     e.preventDefault();
//     this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//     e.preventDefault();
//     this.style.backgroundColor = randomColor();
// });

///
// document.querySelectorAll('.nav__link').forEach(function (el) {
//     el.addEventListener('click', function (e) {
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//     })
// });