// ===== 施設ギャラリー =====
const galleryTrack = document.querySelector(".facility__slider-track");
const gallerySlides = document.querySelectorAll(".facility__slide");
const galleryPrev = document.querySelector(".facility__slider-button--prev");
const galleryNext = document.querySelector(".facility__slider-button--next");
const galleryDots = document.querySelector(".facility__dots");

if (
    galleryTrack &&
    gallerySlides.length > 0 &&
    galleryPrev &&
    galleryNext &&
    galleryDots
) {
    let galleryIndex = 0;
    const maxIndex = gallerySlides.length - 1;
    const dotButtons = [];

    galleryPrev.setAttribute("aria-label", "前の施設画像へ");
    galleryNext.setAttribute("aria-label", "次の施設画像へ");
    galleryDots.replaceChildren();

    gallerySlides.forEach((slide, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "facility__dot";
        dot.setAttribute("aria-label", `${index + 1}枚目の施設画像を表示`);

        dot.addEventListener("click", () => {
            galleryIndex = index;
            updateGallery();
        });

        galleryDots.appendChild(dot);
        dotButtons.push(dot);
    });

    function updateGallery() {
        const slideWidth = gallerySlides[0].getBoundingClientRect().width;
        const gap = parseFloat(getComputedStyle(galleryTrack).columnGap) || 0;
        const moveX = (slideWidth + gap) * galleryIndex;

        galleryTrack.style.transform = `translateX(-${moveX}px)`;

        dotButtons.forEach((dot, index) => {
            const isActive = index === galleryIndex;
            dot.classList.toggle("is-active", isActive);
            dot.setAttribute("aria-pressed", String(isActive));
        });

        gallerySlides.forEach((slide, index) => {
            slide.setAttribute("aria-hidden", String(index !== galleryIndex));
        });
    }

    galleryNext.addEventListener("click", () => {
        galleryIndex = galleryIndex < maxIndex ? galleryIndex + 1 : 0;
        updateGallery();
    });

    galleryPrev.addEventListener("click", () => {
        galleryIndex = galleryIndex > 0 ? galleryIndex - 1 : maxIndex;
        updateGallery();
    });

    window.addEventListener("resize", updateGallery);
    updateGallery();
}

// ===== FAQ =====
const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item, index) => {
    const question = item.querySelector(".faq__question");
    const answer = item.querySelector(".faq__answer");

    if (!question || !answer) return;

    question.type = "button";
    answer.id = `faq-answer-${index + 1}`;
    question.setAttribute("aria-controls", answer.id);

    function updateFaq() {
        const isOpen = item.classList.contains("is-open");
        question.setAttribute("aria-expanded", String(isOpen));
        answer.setAttribute("aria-hidden", String(!isOpen));
        answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : "";
    }

    question.addEventListener("click", () => {
        item.classList.toggle("is-open");
        updateFaq();
    });

    window.addEventListener("resize", updateFaq);
    updateFaq();
});

// ===== コンタクトフォーム（送信しないデモ） =====
const contactForm = document.querySelector(".contact__form");

if (contactForm) {
    const nameInput = contactForm.querySelector("#contact-name");
    const emailInput = contactForm.querySelector("#contact-email");
    const messageInput = contactForm.querySelector("#contact-message");
    const successText = contactForm.querySelector(".contact__form-success");

    if (nameInput && emailInput && messageInput && successText) {
        const inputs = [nameInput, emailInput, messageInput];

        successText.setAttribute("role", "status");

        inputs.forEach((input) => {
            input.required = true;
            const error = input.nextElementSibling;
            error.id = `${input.id}-error`;
            error.setAttribute("aria-live", "polite");
            input.setAttribute("aria-describedby", error.id);
        });

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            inputs.forEach(clearError);
            successText.textContent = "";

            if (nameInput.value.trim() === "") {
                setError(nameInput, "お名前を入力してください。");
            }

            const email = emailInput.value.trim();

            if (email === "") {
                setError(emailInput, "メールアドレスを入力してください。");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError(emailInput, "メールアドレスの形式で入力してください。");
            }

            if (messageInput.value.trim() === "") {
                setError(messageInput, "お問い合わせ内容を入力してください。");
            }

            const firstInvalidInput = inputs.find((input) =>
                input.classList.contains("is-error")
            );

            if (firstInvalidInput) {
                firstInvalidInput.focus();
                return;
            }

            successText.textContent =
                "入力内容を確認しました。デモのため、実際には送信されていません。";
            contactForm.reset();
        });

        function setError(input, message) {
            input.classList.add("is-error");
            input.setAttribute("aria-invalid", "true");
            input.nextElementSibling.textContent = message;
        }

        function clearError(input) {
            input.classList.remove("is-error");
            input.removeAttribute("aria-invalid");
            input.nextElementSibling.textContent = "";
        }
    }
}

// ===== スマホメニュー =====
const burger = document.querySelector(".header__burger");
const nav = document.querySelector(".header__nav");
const mobileMedia = window.matchMedia("(max-width: 1024px)");

function setMenuOpen(isOpen) {
    if (!burger || !nav) return;

    burger.classList.toggle("active", isOpen);
    nav.classList.toggle("active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute(
        "aria-label",
        isOpen ? "メニューを閉じる" : "メニューを開く"
    );

    // PCでは常にナビゲーションを操作できるようにする
    nav.inert = mobileMedia.matches && !isOpen;
}

if (burger && nav) {
    burger.type = "button";
    nav.id = "header-navigation";
    burger.setAttribute("aria-controls", nav.id);

    burger.addEventListener("click", () => {
        setMenuOpen(!burger.classList.contains("active"));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            setMenuOpen(false);
        });
    });

    mobileMedia.addEventListener("change", () => {
        setMenuOpen(false);
    });

    document.addEventListener("click", (event) => {
        if (
            burger.classList.contains("active") &&
            !burger.contains(event.target) &&
            !nav.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    setMenuOpen(false);
}

// ===== デモ案内モーダル =====
const dummyLinks = document.querySelectorAll(".js-dummy-link");
const dummyModal = document.querySelector(".dummy-modal");
const dummyTitle = document.querySelector(".dummy-modal__title");
const dummyClose = document.querySelector(".dummy-modal__close");

let modalTrigger = null;
const modalBackground = document.querySelectorAll("header, main");
const previousInertStates = new Map();

function closeDummyModal() {
    if (!dummyModal) return;

    dummyModal.classList.remove("is-open");
    dummyModal.setAttribute("aria-hidden", "true");

    previousInertStates.forEach((wasInert, element) => {
        element.inert = wasInert;
    });
    previousInertStates.clear();

    const triggerIsInClosedNav =
        modalTrigger &&
        nav &&
        nav.contains(modalTrigger) &&
        mobileMedia.matches &&
        !nav.classList.contains("active");

    if (triggerIsInClosedNav && burger) {
        burger.focus();
    } else if (modalTrigger) {
        modalTrigger.focus();
    }
}

if (dummyModal && dummyTitle && dummyClose) {
    dummyLinks.forEach((link) => {
        // 現在divになっている料金カードにもキーボード操作を付ける
        if (!link.matches("a, button")) {
            link.setAttribute("role", "button");
            link.tabIndex = 0;

            link.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    link.click();
                }
            });
        }

        link.addEventListener("click", (event) => {
            event.preventDefault();
            modalTrigger = link;

            setMenuOpen(false);
            dummyTitle.textContent = `${link.dataset.title || "ご案内"}ページ`;
            dummyModal.classList.add("is-open");
            dummyModal.setAttribute("aria-hidden", "false");
            dummyClose.focus();

            modalBackground.forEach((element) => {
                previousInertStates.set(element, element.inert);
                element.inert = true;
            });
        });
    });

    dummyClose.addEventListener("click", closeDummyModal);

    dummyModal.addEventListener("click", (event) => {
        if (event.target === dummyModal) {
            closeDummyModal();
        }
    });

    dummyModal.addEventListener("keydown", (event) => {
        // 現在のモーダル内の操作要素は閉じるボタンのみ
        if (event.key === "Tab") {
            event.preventDefault();
            dummyClose.focus();
        }
    });
}

// ===== Escapeキー =====
document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (dummyModal && dummyModal.classList.contains("is-open")) {
        closeDummyModal();
    } else if (burger && burger.classList.contains("active")) {
        setMenuOpen(false);
        burger.focus();
    }
});