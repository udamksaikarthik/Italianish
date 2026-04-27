/* =============================================================
   ITALIANISH — interactions
   ============================================================= */
(function () {
    "use strict";

    // ---------- 1. Navbar scroll state ----------
    const navbar = document.getElementById("navbar");
    const onScroll = () => {
        if (window.scrollY > 24) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // ---------- 2. Mobile menu ----------
    const navToggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    const closeMenu = () => {
        navToggle.classList.remove("open");
        mobileMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
        mobileMenu.setAttribute("aria-hidden", "true");
    };

    navToggle.addEventListener("click", () => {
        const isOpen = navToggle.classList.toggle("open");
        mobileMenu.classList.toggle("open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    });

    // Close on link click
    mobileMenu.querySelectorAll("a").forEach((a) => {
        a.addEventListener("click", closeMenu);
    });

    // Close on resize past breakpoint
    let lastW = window.innerWidth;
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 960 && lastW < 960) closeMenu();
        lastW = window.innerWidth;
    });

    // ---------- 3. Menu tabs ----------
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".menu-grid");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = tab.dataset.tab;

            tabs.forEach((t) => {
                const active = t === tab;
                t.classList.toggle("active", active);
                t.setAttribute("aria-selected", String(active));
            });

            panels.forEach((p) => {
                p.classList.toggle("active", p.dataset.panel === target);
            });
        });
    });

    // ---------- 4. Card click — sticky selected state ----------
    // Cards already change colour on hover & focus via CSS.
    // Clicking toggles a 'selected' state so it stays coloured.
    const interactiveCards = document.querySelectorAll(".menu-card, .review-card");
    interactiveCards.forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("selected");
        });
        // Keyboard support — Enter / Space
        card.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                card.classList.toggle("selected");
            }
        });
    });

    // ---------- 5. Scroll reveal ----------
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("in-view"));
    }

    // ---------- 6. Booking form — opens mailto ----------
    const form = document.getElementById("bookingForm");
    const success = document.getElementById("formSuccess");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const data = new FormData(form);
            const name = (data.get("name") || "").trim();
            const phone = (data.get("phone") || "").trim();
            const email = (data.get("email") || "").trim();
            const guests = data.get("guests") || "";
            const date = data.get("date") || "";
            const time = data.get("time") || "";
            const notes = (data.get("notes") || "").trim();

            // Required
            if (!name || !phone || !guests || !date || !time) {
                alert("Please fill in your name, phone, guests, date and time.");
                return;
            }

            const subject = `Booking request — ${name} for ${guests} on ${date} at ${time}`;
            const body =
                `Hi Italianish,\n\n` +
                `I'd like to book a table.\n\n` +
                `Name:    ${name}\n` +
                `Phone:   ${phone}\n` +
                `Email:   ${email || "—"}\n` +
                `Guests:  ${guests}\n` +
                `Date:    ${date}\n` +
                `Time:    ${time}\n` +
                `Notes:   ${notes || "—"}\n\n` +
                `Thank you!`;

            const mail =
                "mailto:alelelara@gmail.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            window.location.href = mail;

            success.hidden = false;
            form.reset();
            setTimeout(() => { success.hidden = true; }, 8000);
        });
    }

    // ---------- 7. Footer year ----------
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---------- 8. Smooth-scroll anchor offset for fixed nav ----------
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", (e) => {
            const id = a.getAttribute("href");
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });

    // ---------- 9. Menu images slider ----------
    (function () {
        const slides = document.querySelectorAll("#menuImgSlider .mi-slide");
        const dotsWrap = document.getElementById("miDots");
        const prevBtn = document.getElementById("miPrev");
        const nextBtn = document.getElementById("miNext");
        if (!slides.length || !dotsWrap) return;

        let current = 0;

        // Build dots
        slides.forEach(function (_, i) {
            const dot = document.createElement("button");
            dot.className = "mi-dot" + (i === 0 ? " active" : "");
            dot.setAttribute("aria-label", "Menu page " + (i + 1));
            dot.addEventListener("click", function () { go(i); });
            dotsWrap.appendChild(dot);
        });
        const dots = dotsWrap.querySelectorAll(".mi-dot");

        function go(index) {
            slides[current].classList.remove("active");
            dots[current].classList.remove("active");
            current = (index + slides.length) % slides.length;
            slides[current].classList.add("active");
            dots[current].classList.add("active");
        }

        if (prevBtn) prevBtn.addEventListener("click", function () { go(current - 1); });
        if (nextBtn) nextBtn.addEventListener("click", function () { go(current + 1); });

        // Touch swipe
        var touchStartX = 0;
        var track = document.querySelector("#menuImgSlider .mi-track");
        if (track) {
            track.addEventListener("touchstart", function (e) {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            track.addEventListener("touchend", function (e) {
                var diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) go(diff > 0 ? current + 1 : current - 1);
            });
        }
    }());

    // ---------- 10. Photo gallery slider ----------
    (function () {
        var slides = document.querySelectorAll("#galleryTrack .g-slide");
        var dotsWrap = document.getElementById("gDots");
        var prevBtn = document.getElementById("gPrev");
        var nextBtn = document.getElementById("gNext");
        var counterEl = document.getElementById("galleryCounter");
        if (!slides.length || !dotsWrap) return;

        var current = 0;
        var total = slides.length;
        var timer;

        // Build dots
        slides.forEach(function (_, i) {
            var dot = document.createElement("button");
            dot.className = "g-dot" + (i === 0 ? " active" : "");
            dot.setAttribute("aria-label", "Photo " + (i + 1));
            dot.addEventListener("click", function () { go(i); });
            dotsWrap.appendChild(dot);
        });
        var dots = dotsWrap.querySelectorAll(".g-dot");

        function updateCounter() {
            if (counterEl) {
                counterEl.innerHTML = "<strong>" + (current + 1) + "</strong> / " + total;
            }
        }

        function go(index) {
            slides[current].classList.remove("active");
            dots[current].classList.remove("active");
            current = (index + total) % total;
            slides[current].classList.add("active");
            dots[current].classList.add("active");
            updateCounter();
            resetTimer();
        }

        function resetTimer() {
            clearInterval(timer);
            timer = setInterval(function () { go(current + 1); }, 5000);
        }

        updateCounter();
        resetTimer();

        if (prevBtn) prevBtn.addEventListener("click", function () { go(current - 1); });
        if (nextBtn) nextBtn.addEventListener("click", function () { go(current + 1); });

        // Pause on hover
        var wrap = document.querySelector(".gallery-wrap");
        if (wrap) {
            wrap.addEventListener("mouseenter", function () { clearInterval(timer); });
            wrap.addEventListener("mouseleave", resetTimer);
        }

        // Touch swipe
        var touchX = 0;
        var track = document.getElementById("galleryTrack");
        if (track) {
            track.addEventListener("touchstart", function (e) {
                touchX = e.touches[0].clientX;
            }, { passive: true });
            track.addEventListener("touchend", function (e) {
                var diff = touchX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) go(diff > 0 ? current + 1 : current - 1);
            });
        }

        // Keyboard navigation when gallery is focused
        var gallerySection = document.getElementById("gallery");
        if (gallerySection) {
            gallerySection.addEventListener("keydown", function (e) {
                if (e.key === "ArrowLeft")  { e.preventDefault(); go(current - 1); }
                if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
            });
        }
    }());

})();
