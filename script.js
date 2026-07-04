const galleryTrack = document.querySelector(".facility__slider-track");
const gallerySlides = document.querySelectorAll(".facility__slide");
const galleryPrev = document.querySelector(".facility__slider-button--prev");
const galleryNext = document.querySelector(".facility__slider-button--next");
const galleryDots = document.querySelector(".facility__dots");

let galleryIndex = 0;
const visibleSlides = 1;
const maxIndex = gallerySlides.length - visibleSlides;

for (let i = 0; i <= maxIndex; i++) {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.classList.add("facility__dot");

    if (i === 0) {
        dot.classList.add("is-active");
    }

    dot.addEventListener("click", function () {
        galleryIndex = i;
        updateGallery();
    });

    galleryDots.appendChild(dot);
}

const galleryDotButtons = document.querySelectorAll(".facility__dot");

function updateGallery() {
    const slideWidth = gallerySlides[0].offsetWidth;
    const gap = 12;
    const moveX = (slideWidth + gap) * galleryIndex;

    galleryTrack.style.transform = `translateX(-${moveX}px)`;

    for (let i = 0; i < galleryDotButtons.length; i++) {
        galleryDotButtons[i].classList.remove("is-active");
    }

    galleryDotButtons[galleryIndex].classList.add("is-active");
}

galleryNext.addEventListener("click", function () {
    if (galleryIndex < maxIndex) {
        galleryIndex++;
    } else {
        galleryIndex = 0;
    }

    updateGallery();
});

galleryPrev.addEventListener("click", function () {
    if (galleryIndex > 0) {
        galleryIndex--;
    } else {
        galleryIndex = maxIndex;
    }

    updateGallery();
});

window.addEventListener("resize", updateGallery);

const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");

    question.addEventListener("click", () => {
        item.classList.toggle("is-open");

        if (item.classList.contains("is-open")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

const contactForm = document.querySelector(".contact__form");

if (contactForm) {
    const nameInput = document.querySelector("#contact-name");
    const emailInput = document.querySelector("#contact-email");
    const messageInput = document.querySelector("#contact-message");
    const successText = document.querySelector(".contact__form-success");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let isValid = true;

        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);
        successText.textContent = "";

        if (nameInput.value.trim() === "") {
            setError(nameInput, "お名前を入力してください。");
            isValid = false;
        }

        if (emailInput.value.trim() === "") {
            setError(emailInput, "メールアドレスを入力してください。");
            isValid = false;
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
        ) {
            setError(emailInput, "メールアドレスの形式で入力してください。");
            isValid = false;
        }

        if (messageInput.value.trim() === "") {
            setError(messageInput, "お問い合わせ内容を入力してください。");
            isValid = false;
        }

        if (isValid) {
            successText.textContent =
                "送信が完了しました。お問い合わせありがとうございます。";
            contactForm.reset();
        }
    });

    function setError(input, message) {
        input.classList.add("is-error");
        input.nextElementSibling.textContent = message;
    }

    function clearError(input) {
        input.classList.remove("is-error");
        input.nextElementSibling.textContent = "";
    }
}

const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("active");
});

const dummyLinks = document.querySelectorAll(".js-dummy-link");
const dummyModal = document.querySelector(".dummy-modal");
const dummyTitle = document.querySelector(".dummy-modal__title");
const dummyClose = document.querySelector(".dummy-modal__close");

dummyLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        dummyTitle.textContent = link.dataset.title + "ページ";
        dummyModal.classList.add("is-open");
    });
});

dummyClose.addEventListener("click", () => {
    dummyModal.classList.remove("is-open");
});

dummyModal.addEventListener("click", (e) => {
    if (e.target === dummyModal) {
        dummyModal.classList.remove("is-open");
    }
});