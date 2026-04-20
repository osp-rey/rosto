(() => {
    "use strict";
    function burger() {
        const burger = document.querySelector("#burger");
        if (burger) {
            const btnOpen = document.querySelector("#burger-open");
            const btnClose = document.querySelector("#burger-close");
            const burgerOverlay = document.querySelector("#burger-overlay");
            const navItems = burger.querySelectorAll(".burger__list a");
            navItems.forEach(item => {
                item.addEventListener("click", handleClose);
            });
            burgerOverlay.addEventListener("click", handleClose);
            btnOpen.addEventListener("click", handleOpen);
            btnClose.addEventListener("click", handleClose);
            function handleOpen() {
                document.body.classList.add("body-hidden");
                burger.classList.add("_open");
                burgerOverlay.classList.add("_active");
            }
            function handleClose() {
                document.body.classList.remove("body-hidden");
                burger.classList.remove("_open");
                burgerOverlay.classList.remove("_active");
            }
            function updateHeightBurger() {
                burger.style.maxHeight = `${window.visualViewport.height}px`;
            }
            window.visualViewport.addEventListener("resize", updateHeightBurger);
            window.visualViewport.addEventListener("scroll", updateHeightBurger);
            updateHeightBurger();
        }
    }
    function countLines(element) {
        const clone = element.cloneNode(true);
        clone.style.position = "absolute";
        clone.style.visibility = "hidden";
        clone.style.top = "-9999px";
        clone.style.left = "-9999px";
        clone.style.width = window.getComputedStyle(element.parentElement).width;
        clone.style.display = "block";
        document.body.appendChild(clone);
        const styles = window.getComputedStyle(clone);
        const lineHeight = parseFloat(styles.lineHeight);
        const height = clone.clientHeight;
        document.body.removeChild(clone);
        if (lineHeight && lineHeight > 0) return Math.round(height / lineHeight);
        return element.innerText.split("\n").length;
    }
    function createScript(url, type) {
        if (!url) return;
        return new Promise((resolve, reject) => {
            const script = document.querySelector(`script[src="${url}"]`);
            if (script) resolve(script); else {
                const htmlScript = document.createElement("script");
                htmlScript.src = url;
                if (type) htmlScript.type = type;
                htmlScript.onload = () => {
                    resolve(htmlScript);
                };
                htmlScript.onerror = () => {
                    reject(new Error(`Не удалось загрузить скрипт: ${url}`));
                };
                document.head.appendChild(htmlScript);
            }
        });
    }
    function slideUp(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = `${target.offsetHeight}px`;
            target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout(() => {
                target.hidden = !showmore ? true : false;
                !showmore ? target.style.removeProperty("height") : null;
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                !showmore ? target.style.removeProperty("overflow") : null;
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideUpDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function slideDown(target, duration = 500, showmore = 0) {
        if (!target.classList.contains("_slide")) {
            target.classList.add("_slide");
            target.hidden = target.hidden ? false : null;
            showmore ? target.style.removeProperty("height") : null;
            let height = target.offsetHeight;
            target.style.overflow = "hidden";
            target.style.height = showmore ? `${showmore}px` : `0px`;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + "ms";
            target.style.height = height + "px";
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            window.setTimeout(() => {
                target.style.removeProperty("height");
                target.style.removeProperty("overflow");
                target.style.removeProperty("transition-duration");
                target.style.removeProperty("transition-property");
                target.classList.remove("_slide");
                document.dispatchEvent(new CustomEvent("slideDownDone", {
                    detail: {
                        target
                    }
                }));
            }, duration);
        }
    }
    function createEl(tag, classes) {
        const item = document.createElement(tag);
        classes.split(" ").forEach(c => {
            item.classList.add(c);
        });
        return item;
    }
    function burgerAddList() {
        const spollers = document.querySelectorAll(".burger__add-list .menu-item-has-children");
        if (spollers.length) spollers.forEach(spoller => {
            const btn = spoller.querySelector(".main-menu-link");
            const menu = spoller.querySelector(".sub-menu");
            const wrapperMenu = createEl("div", "wrapper-sub-menu");
            wrapperMenu.appendChild(menu);
            spoller.appendChild(wrapperMenu);
            slideUp(wrapperMenu);
            btn.addEventListener("click", e => {
                e.preventDefault();
                if (btn.classList.contains("_active")) {
                    btn.classList.remove("_active");
                    slideUp(wrapperMenu);
                } else {
                    btn.classList.add("_active");
                    slideDown(wrapperMenu);
                }
            });
        });
    }
    function buttonsNote() {
        const butons = document.querySelectorAll("[data-btn-note]");
        if (butons.length) butons.forEach(btn => {
            btn.addEventListener("click", () => {
                const selectorTarget = btn.dataset.targetNote;
                const target = document.querySelector(selectorTarget);
                const value = btn.dataset.btnNote;
                if (target) target.value = value;
            });
        });
    }
    function cardCaseMore() {
        const cards = document.querySelectorAll(".card-case");
        if (cards.length) cards.forEach(card => {
            const btnMore = card.querySelector(".card-case__btn-more");
            const btnMoreText = btnMore.querySelector("span");
            const content = card.querySelector(".card-case__content");
            const lines = countLines(content);
            if (lines > 6) content.classList.add("_hide"); else btnMore.remove();
            btnMore.addEventListener("click", () => {
                if (content.classList.contains("_hide")) {
                    btnMore.classList.add("_active");
                    content.classList.remove("_hide");
                    btnMoreText.textContent = "Свернуть";
                } else {
                    btnMore.classList.remove("_active");
                    content.classList.add("_hide");
                    btnMoreText.textContent = "Подробнее";
                }
            });
        });
    }
    function copy() {
        const buttons = document.querySelectorAll("[data-copy]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const value = btn.dataset.copy;
                const tooltip = tippy(btn, {
                    content: "Скопировано",
                    trigger: "manual"
                });
                tooltip.show();
                setTimeout(() => {
                    tooltip.hide();
                }, 1e3);
                navigator.clipboard.writeText(value).then(() => {
                    tooltip.show();
                    setTimeout(() => {
                        tooltip.hide();
                    }, 1e3);
                });
            });
        });
    }
    function decisionsGallery() {
        const galleries = document.querySelectorAll(".s-decisions__gallery");
        if (galleries.length) galleries.forEach(gal => {
            const img = gal.querySelector(".s-decisions__gallery-img");
            window.addEventListener("resize", handlerResize);
            handlerResize();
            function handlerResize() {
                if (window.matchMedia("(min-width: 1200px)").matches) gal.style.height = img.clientHeight + "px";
            }
        });
    }
    function formSearch() {
        const forms = document.querySelectorAll(".form-search");
        if (forms.length) {
            document.addEventListener("click", () => {
                const currentForms = document.querySelectorAll(".form-search._open");
                if (currentForms.length) currentForms.forEach(f => f.classList.remove("_open"));
            });
            forms.forEach(form => {
                const toggle = form.querySelector(".form-search__toggle");
                if (toggle) {
                    form.addEventListener("click", e => e.stopPropagation());
                    toggle.addEventListener("click", () => {
                        form.classList.toggle("_open");
                    });
                }
            });
        }
    }
    function headerScroll() {
        const header = document.querySelector(".header");
        if (header) {
            let lastScrollTop = 0;
            window.addEventListener("scroll", () => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                if (scrollTop > lastScrollTop && scrollTop > header.clientHeight) header.classList.add("_scroll"); else header.classList.remove("_scroll");
                lastScrollTop = scrollTop;
            });
        }
    }
    function inputmask() {
        const inputs = document.querySelectorAll('input[type="tel"]');
        const im = new Inputmask("+7 (999) 999-99-99");
        im.mask(inputs);
    }
    function map() {
        const maps = document.querySelectorAll(".map");
        if (maps.length) {
            maps.forEach(map => {
                const options = {
                    root: null,
                    rootMargin: "0px",
                    scrollMargin: "0px",
                    threshold: .01
                };
                function callback(entries, observer) {
                    entries.forEach(entry => {
                        const target = entry.target;
                        if (entry.isIntersecting) {
                            createScript("https://api-maps.yandex.ru/2.1/?apikey=b46e9249-4925-4460-b11c-3aaf76ad0115&lang=ru_RU", "text/javascript").then(() => handlerCreateMap(target));
                            observer.unobserve(target);
                        }
                    });
                }
                const observer = new IntersectionObserver(callback, options);
                observer.observe(map);
            });
            function handlerCreateMap(map) {
                const center = JSON.parse(map.dataset.center);
                const zoom = Number(map.dataset.zoom);
                const iconHref = map.dataset.icon;
                let objectMark = {};
                if (iconHref) objectMark = {
                    iconLayout: "default#image",
                    iconImageHref: iconHref,
                    iconImageSize: [ 60, 60 ],
                    iconImageOffset: [ -25, -60 ]
                };
                function init() {
                    const htmlMap = new ymaps.Map(map, {
                        center,
                        zoom
                    });
                    const placemark = new ymaps.Placemark(center, {}, objectMark);
                    htmlMap.geoObjects.add(placemark);
                    htmlMap.controls.remove("geolocationControl");
                    htmlMap.controls.remove("searchControl");
                    htmlMap.controls.remove("trafficControl");
                    htmlMap.controls.remove("typeSelector");
                    htmlMap.controls.remove("fullscreenControl");
                    htmlMap.controls.remove("rulerControl");
                }
                ymaps.ready(init);
            }
        }
    }
    function mediaAdaptive() {
        function DynamicAdapt(type) {
            this.type = type;
        }
        DynamicAdapt.prototype.init = function() {
            const _this = this;
            this.оbjects = [];
            this.daClassname = "_dynamic_adapt_";
            this.nodes = document.querySelectorAll("[data-da]");
            for (let i = 0; i < this.nodes.length; i++) {
                const node = this.nodes[i];
                const data = node.dataset.da.trim();
                const dataArray = data.split(",");
                const оbject = {};
                оbject.element = node;
                оbject.parent = node.parentNode;
                оbject.destination = document.querySelector(dataArray[0].trim());
                оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
                оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.оbjects.push(оbject);
            }
            this.arraySort(this.оbjects);
            this.mediaQueries = Array.prototype.map.call(this.оbjects, function(item) {
                return "(" + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
            }, this);
            this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function(item, index, self) {
                return Array.prototype.indexOf.call(self, item) === index;
            });
            for (let i = 0; i < this.mediaQueries.length; i++) {
                const media = this.mediaQueries[i];
                const mediaSplit = String.prototype.split.call(media, ",");
                const matchMedia = window.matchMedia(mediaSplit[0]);
                const mediaBreakpoint = mediaSplit[1];
                const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function(item) {
                    return item.breakpoint === mediaBreakpoint;
                });
                matchMedia.addListener(function() {
                    _this.mediaHandler(matchMedia, оbjectsFilter);
                });
                this.mediaHandler(matchMedia, оbjectsFilter);
            }
        };
        DynamicAdapt.prototype.mediaHandler = function(matchMedia, оbjects) {
            if (matchMedia.matches) for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            } else for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        };
        DynamicAdapt.prototype.moveTo = function(place, element, destination) {
            element.classList.add(this.daClassname);
            if (place === "last" || place >= destination.children.length) {
                destination.insertAdjacentElement("beforeend", element);
                return;
            }
            if (place === "first") {
                destination.insertAdjacentElement("afterbegin", element);
                return;
            }
            destination.children[place].insertAdjacentElement("beforebegin", element);
        };
        DynamicAdapt.prototype.moveBack = function(parent, element, index) {
            element.classList.remove(this.daClassname);
            if (parent.children[index] !== void 0) parent.children[index].insertAdjacentElement("beforebegin", element); else parent.insertAdjacentElement("beforeend", element);
        };
        DynamicAdapt.prototype.indexInParent = function(parent, element) {
            const array = Array.prototype.slice.call(parent.children);
            return Array.prototype.indexOf.call(array, element);
        };
        DynamicAdapt.prototype.arraySort = function(arr) {
            if (this.type === "min") Array.prototype.sort.call(arr, function(a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) return 0;
                    if (a.place === "first" || b.place === "last") return -1;
                    if (a.place === "last" || b.place === "first") return 1;
                    return a.place - b.place;
                }
                return a.breakpoint - b.breakpoint;
            }); else {
                Array.prototype.sort.call(arr, function(a, b) {
                    if (a.breakpoint === b.breakpoint) {
                        if (a.place === b.place) return 0;
                        if (a.place === "first" || b.place === "last") return 1;
                        if (a.place === "last" || b.place === "first") return -1;
                        return b.place - a.place;
                    }
                    return b.breakpoint - a.breakpoint;
                });
                return;
            }
        };
        const da = new DynamicAdapt("max");
        da.init();
    }
    class Scrollable {
        constructor(selector, options) {
            let defaultOptions = {
                wheelScrolling: false
            };
            this.container = null;
            if (typeof selector === "string") this.container = document.querySelector(selector); else this.container = selector;
            this.options = Object.assign(defaultOptions, options);
            if (!this.container) return;
            this.container.classList.add("_scrollable");
            this.container.style = "cursor: grab";
            this.isDragging = false;
            this.startX = null;
            this.scrollLeft = null;
            this.events();
        }
        events() {
            if (this.container) {
                this.container.addEventListener("mousedown", e => {
                    this.isDragging = true;
                    this.startX = e.pageX - this.container.offsetLeft;
                    this.scrollLeft = this.container.scrollLeft;
                    this.container.classList.add("_pressed");
                    this.container.style = "cursor: grabbing";
                });
                this.container.addEventListener("mouseup", e => {
                    this.isDragging = false;
                    this.container.classList.remove("_pressed");
                    this.container.style = "cursor: grab";
                });
                this.container.addEventListener("mousemove", e => {
                    if (!this.isDragging) return;
                    const x = e.pageX - this.container.offsetLeft;
                    const walkX = (x - this.startX) * 1;
                    this.container.scrollLeft = this.scrollLeft - walkX;
                });
                this.container.addEventListener("mouseleave", e => {
                    if (this.isDragging) this.isDragging = false;
                    this.container.style = "cursor: grab";
                });
                if (this.options.wheelScrolling) this.container.addEventListener("mousewheel", e => {
                    e.preventDefault();
                    this.container.scrollLeft += e.deltaY;
                });
            }
        }
    }
    function scrollable() {
        new Scrollable(".s-comparison__table", {});
    }
    function selectHandler() {
        const selects = document.querySelectorAll(".select");
        if (selects.length) {
            document.body.addEventListener("click", () => {
                const openSelects = document.querySelectorAll(".select._open");
                if (openSelects.length) openSelects.forEach(s => s.classList.remove("_open"));
            });
            selects.forEach(select => {
                select.addEventListener("click", e => e.stopPropagation());
                const items = select.querySelectorAll(".select-item");
                const btn = select.querySelector(".select-btn");
                const input = select.querySelector(".select-input");
                btn.addEventListener("click", () => {
                    select.classList.toggle("_open");
                });
                items.forEach(item => {
                    item.addEventListener("click", () => {
                        handlerChange(item);
                    });
                });
                function handlerChange(item) {
                    const value = item.textContent.trim();
                    input.value = value;
                    select.classList.remove("_open");
                    items.forEach(i => i.classList.remove("_active"));
                    item.classList.add("_active");
                }
            });
        }
    }
    function sliders() {
        const heroSlider = document.querySelector(".s-hero__slider");
        if (heroSlider) {
            new Swiper(heroSlider, {
                speed: 900,
                effect: "fade",
                navigation: {
                    prevEl: ".s-hero .slider-arrow._prev",
                    nextEl: ".s-hero .slider-arrow._next"
                },
                pagination: {
                    el: ".s-hero .slider-pagination",
                    clickable: true
                }
            });
        }
        const tasksSlider = document.querySelector(".s-tasks__slider");
        if (tasksSlider) {
            new Swiper(tasksSlider, {
                speed: 900,
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: {
                    delay: 5e3
                },
                navigation: {
                    prevEl: ".s-tasks .slider-arrow._prev",
                    nextEl: ".s-tasks .slider-arrow._next"
                },
                pagination: {
                    el: ".s-tasks .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    576: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            });
        }
        const sectNavSliders = document.querySelectorAll(".sect-nav");
        if (sectNavSliders.length) sectNavSliders.forEach(nav => {
            new Swiper(nav, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 25,
                breakpoints: {
                    992: {
                        slidesPerView: "auto",
                        spaceBetween: 50
                    },
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 30
                    }
                }
            });
        });
        const casesSliders = document.querySelectorAll(".s-cases__slider");
        if (casesSliders.length) {
            const arrows = Array.from(document.querySelectorAll(".s-cases .slider-arrows"));
            casesSliders.forEach((slider, index) => {
                new Swiper(slider, {
                    speed: 900,
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    autoplay: {
                        delay: 5500
                    },
                    navigation: {
                        prevEl: arrows[index].querySelector(".slider-arrow._prev"),
                        nextEl: arrows[index].querySelector(".slider-arrow._next")
                    },
                    pagination: {
                        el: slider.nextElementSibling,
                        clickable: true
                    },
                    breakpoints: {
                        1366: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        }
                    }
                });
            });
        }
        const partnersSlider = document.querySelector(".slider-partners");
        if (partnersSlider) {
            new Swiper(partnersSlider, {
                slidesPerView: "auto",
                spaceBetween: 30,
                speed: 12e3,
                watchOverflow: true,
                loop: true,
                allowTouchMove: false,
                watchSlidesProgress: true,
                centeredSlides: true,
                a11y: false,
                autoplay: {
                    delay: 0
                },
                breakpoints: {
                    1200: {
                        slidesPerView: "auto",
                        spaceBetween: 65
                    },
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 40
                    }
                }
            });
        }
        const blogSlider = document.querySelector(".s-blog__slider");
        if (blogSlider) {
            new Swiper(blogSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 5e3
                },
                navigation: {
                    prevEl: ".s-blog .slider-arrow._prev",
                    nextEl: ".s-blog .slider-arrow._next"
                },
                pagination: {
                    el: ".s-blog .slider-pagination",
                    clickable: true
                }
            });
        }
        const tariffsSlider = document.querySelector(".s-tariffs__slider");
        if (tariffsSlider) {
            new Swiper(tariffsSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 5e3
                },
                navigation: {
                    prevEl: ".s-tariffs .slider-arrow._prev",
                    nextEl: ".s-tariffs .slider-arrow._next"
                },
                pagination: {
                    el: ".s-tariffs .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1540: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }
            });
        }
        const recSlider = document.querySelector(".s-rec__slider");
        if (recSlider) {
            new Swiper(recSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 5500
                },
                navigation: {
                    prevEl: ".s-rec .slider-arrow._prev",
                    nextEl: ".s-rec .slider-arrow._next"
                },
                pagination: {
                    el: ".s-rec .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    1540: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            });
        }
        const gallerySlider = document.querySelector(".s-gallery__slider");
        if (gallerySlider) {
            new Swiper(gallerySlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 5500
                },
                navigation: {
                    prevEl: ".s-gallery .slider-arrow._prev",
                    nextEl: ".s-gallery .slider-arrow._next"
                },
                pagination: {
                    el: ".s-gallery .slider-pagination",
                    clickable: true
                }
            });
        }
        const previewSlider = document.querySelector(".s-preview__slider");
        if (previewSlider) {
            new Swiper(previewSlider, {
                speed: 900,
                slidesPerView: "auto",
                spaceBetween: 20,
                autoplay: {
                    delay: 5e3
                },
                navigation: {
                    prevEl: ".s-preview .slider-arrow._prev",
                    nextEl: ".s-preview .slider-arrow._next"
                },
                pagination: {
                    el: ".s-preview .slider-pagination",
                    clickable: true
                },
                breakpoints: {
                    992: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
        }
        const teamSlider = document.querySelector(".s-team__slider");
        if (teamSlider) {
            new Swiper(teamSlider, {
                speed: 900,
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: {
                    delay: 5500
                },
                navigation: {
                    prevEl: ".s-team .slider-arrow._prev",
                    nextEl: ".s-team .slider-arrow._next"
                },
                scrollbar: {
                    el: ".s-team .slider-scrollbar",
                    draggable: true
                },
                breakpoints: {
                    1365: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                }
            });
        }
    }
    function spoller() {
        const spollersArray = document.querySelectorAll("[data-spollers]");
        if (spollersArray.length > 0) {
            const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
                return !item.dataset.spollers.split(",")[0];
            });
            if (spollersRegular.length) initSpollers(spollersRegular);
            let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
            if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach(mdQueriesItem => {
                mdQueriesItem.matchMedia.addEventListener("change", function() {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
            function initSpollers(spollersArray, matchMedia = false) {
                spollersArray.forEach(spollersBlock => {
                    spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                    if (matchMedia.matches || !matchMedia) {
                        spollersBlock.classList.add("_spoller-init");
                        initSpollerBody(spollersBlock);
                        spollersBlock.addEventListener("click", setSpollerAction);
                    } else {
                        spollersBlock.classList.remove("_spoller-init");
                        initSpollerBody(spollersBlock, false);
                        spollersBlock.removeEventListener("click", setSpollerAction);
                    }
                });
            }
            function initSpollerBody(spollersBlock, hideSpollerBody = true) {
                let spollerTitles = spollersBlock.querySelectorAll("[data-spoller]");
                if (spollerTitles.length) {
                    spollerTitles = Array.from(spollerTitles).filter(item => item.closest("[data-spollers]") === spollersBlock);
                    spollerTitles.forEach(spollerTitle => {
                        if (hideSpollerBody) {
                            spollerTitle.removeAttribute("tabindex");
                            if (!spollerTitle.classList.contains("_spoller-active")) spollerTitle.nextElementSibling.hidden = true;
                        } else {
                            spollerTitle.setAttribute("tabindex", "-1");
                            spollerTitle.nextElementSibling.hidden = false;
                        }
                    });
                }
            }
            function setSpollerAction(e) {
                const el = e.target;
                if (el.closest("[data-spoller]")) {
                    const spollerTitle = el.closest("[data-spoller]");
                    const spollersBlock = spollerTitle.closest("[data-spollers]");
                    const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    if (!spollersBlock.querySelectorAll("._slide").length) {
                        if (oneSpoller && !spollerTitle.classList.contains("_spoller-active")) hideSpollersBody(spollersBlock);
                        spollerTitle.classList.toggle("_spoller-active");
                        _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                    }
                    e.preventDefault();
                }
            }
            function hideSpollersBody(spollersBlock) {
                const spollerActiveTitle = spollersBlock.querySelector("[data-spoller]._spoller-active");
                const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                if (spollerActiveTitle && !spollersBlock.querySelectorAll("._slide").length) {
                    spollerActiveTitle.classList.remove("_spoller-active");
                    _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
                }
            }
            const spollersClose = document.querySelectorAll("[data-spoller-close]");
            if (spollersClose.length) document.addEventListener("click", function(e) {
                const el = e.target;
                if (!el.closest("[data-spollers]")) spollersClose.forEach(spollerClose => {
                    const spollersBlock = spollerClose.closest("[data-spollers]");
                    const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                    spollerClose.classList.remove("_spoller-active");
                    _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                });
            });
        }
        function dataMediaQueries(array, dataSetValue) {
            const media = Array.from(array).filter(function(item, index, self) {
                if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
            });
            if (media.length) {
                const breakpointsArray = [];
                media.forEach(item => {
                    const params = item.dataset[dataSetValue];
                    const breakpoint = {};
                    const paramsArray = params.split(",");
                    breakpoint.value = paramsArray[0];
                    breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                    breakpoint.item = item;
                    breakpointsArray.push(breakpoint);
                });
                let mdQueries = breakpointsArray.map(function(item) {
                    return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
                });
                mdQueries = uniqArray(mdQueries);
                const mdQueriesArray = [];
                if (mdQueries.length) {
                    mdQueries.forEach(breakpoint => {
                        const paramsArray = breakpoint.split(",");
                        const mediaBreakpoint = paramsArray[1];
                        const mediaType = paramsArray[2];
                        const matchMedia = window.matchMedia(paramsArray[0]);
                        const itemsArray = breakpointsArray.filter(function(item) {
                            if (item.value === mediaBreakpoint && item.type === mediaType) return true;
                        });
                        mdQueriesArray.push({
                            itemsArray,
                            matchMedia
                        });
                    });
                    return mdQueriesArray;
                }
            }
        }
        let _slideUp = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = `${target.offsetHeight}px`;
                target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                window.setTimeout(() => {
                    target.hidden = !showmore ? true : false;
                    !showmore ? target.style.removeProperty("height") : null;
                    target.style.removeProperty("padding-top");
                    target.style.removeProperty("padding-bottom");
                    target.style.removeProperty("margin-top");
                    target.style.removeProperty("margin-bottom");
                    !showmore ? target.style.removeProperty("overflow") : null;
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideUpDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideDown = (target, duration = 500, showmore = 0) => {
            if (!target.classList.contains("_slide")) {
                target.classList.add("_slide");
                target.hidden = target.hidden ? false : null;
                showmore ? target.style.removeProperty("height") : null;
                let height = target.offsetHeight;
                target.style.overflow = "hidden";
                target.style.height = showmore ? `${showmore}px` : `0px`;
                target.style.paddingTop = 0;
                target.style.paddingBottom = 0;
                target.style.marginTop = 0;
                target.style.marginBottom = 0;
                target.offsetHeight;
                target.style.transitionProperty = "height, margin, padding";
                target.style.transitionDuration = duration + "ms";
                target.style.height = height + "px";
                target.style.removeProperty("padding-top");
                target.style.removeProperty("padding-bottom");
                target.style.removeProperty("margin-top");
                target.style.removeProperty("margin-bottom");
                window.setTimeout(() => {
                    target.style.removeProperty("height");
                    target.style.removeProperty("overflow");
                    target.style.removeProperty("transition-duration");
                    target.style.removeProperty("transition-property");
                    target.classList.remove("_slide");
                    document.dispatchEvent(new CustomEvent("slideDownDone", {
                        detail: {
                            target
                        }
                    }));
                }, duration);
            }
        };
        let _slideToggle = (target, duration = 500) => {
            if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
        };
        function uniqArray(array) {
            return array.filter(function(item, index, self) {
                return self.indexOf(item) === index;
            });
        }
    }
    function tab() {
        const buttons = document.querySelectorAll("[data-tab-btn]");
        if (buttons.length) buttons.forEach(btn => {
            btn.addEventListener("click", () => {
                const container = btn.closest(".tabs");
                const tabId = btn.dataset.tabBtn;
                const allButtons = container.querySelector(".tabs-nav").querySelectorAll("[data-tab-btn]");
                const allTabs = Array.from(container.querySelector(".tabs-content").children).filter(child => child.hasAttribute("data-tab"));
                const containerAddedTabs = container.querySelector(".tabs-content-added");
                const currentTab = container.querySelector(`.tabs-content [data-tab="${tabId}"]`);
                allTabs.forEach(t => {
                    t.classList.remove("_show");
                    t.classList.remove("_active");
                });
                currentTab.classList.add("_active");
                setTimeout(() => {
                    currentTab.classList.add("_show");
                }, 150);
                allButtons.forEach(b => b.classList.remove("_active"));
                btn.classList.add("_active");
                if (containerAddedTabs) {
                    const addedTabs = Array.from(containerAddedTabs.children).filter(child => child.hasAttribute("data-tab"));
                    const currentTabAdded = container.querySelector(`.tabs-content-added [data-tab="${tabId}"]`);
                    addedTabs.forEach(t => {
                        t.classList.remove("_show");
                        t.classList.remove("_active");
                    });
                    currentTabAdded.classList.add("_active");
                    setTimeout(() => {
                        currentTabAdded.classList.add("_show");
                    }, 150);
                }
            });
        });
    }
    function videoPlayer() {
        const players = document.querySelectorAll(".video-player");
        if (players.length) players.forEach(player => {
            const video = player.querySelector(".video");
            const btnPlay = player.querySelector(".btn-p");
            player.addEventListener("click", () => {
                if (!player.classList.contains("_active")) {
                    player.classList.add("_active");
                    if (!video.src) video.src = video.dataset.src;
                    video.play();
                    if (btnPlay) btnPlay.classList.add("_active");
                }
            });
            video.addEventListener("ended", () => {
                player.classList.remove("_active");
                video.pause();
                if (btnPlay) btnPlay.classList.remove("_active");
            });
        });
    }
    document.addEventListener("DOMContentLoaded", () => {
        spoller();
        burgerAddList();
        burger();
        sliders();
        tab();
        inputmask();
        buttonsNote();
        cardCaseMore();
        videoPlayer();
        map();
        headerScroll();
        formSearch();
        mediaAdaptive();
        decisionsGallery();
        scrollable();
        selectHandler();
        copy();
        Fancybox.bind("[data-fancybox]", {
            closeButton: false
        });
    });
})();