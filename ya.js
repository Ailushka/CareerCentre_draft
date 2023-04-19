(() => {
    var ye = Object.defineProperty,
        Pe = Object.defineProperties;
    var Fe = Object.getOwnPropertyDescriptors;
    var Se = Object.getOwnPropertySymbols;
    var Ue = Object.prototype.hasOwnProperty,
        Ve = Object.prototype.propertyIsEnumerable;
    var Ee = (s, e, t) => (e in s ? ye(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : (s[e] = t)),
        N = (s, e) => {
            for (var t in e || (e = {})) Ue.call(e, t) && Ee(s, t, e[t]);
            if (Se) for (var t of Se(e)) Ve.call(e, t) && Ee(s, t, e[t]);
            return s;
        },
        K = (s, e) => Pe(s, Fe(e));
    var se = (s, e) => () => (s && (e = s((s = 0))), e);
    var $e = (s, e) => {
        for (var t in e) ye(s, t, { get: e[t], enumerable: !0 });
    };
    var U = (s, e, t) =>
        new Promise((n, o) => {
            var r = (l) => {
                    try {
                        a(t.next(l));
                    } catch (d) {
                        o(d);
                    }
                },
                i = (l) => {
                    try {
                        a(t.throw(l));
                    } catch (d) {
                        o(d);
                    }
                },
                a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(r, i));
            a((t = t.apply(s, e)).next());
        });
    var j,
        L,
        O = se(() => {
            j = class extends EventTarget {
                emit(e, t) {
                    this.dispatchEvent(new CustomEvent(e, { detail: t }));
                }
            };
            Object.assign(j.prototype, { on: EventTarget.prototype.addEventListener, off: EventTarget.prototype.removeEventListener });
            L = j;
        });
    var P,
        C,
        X = se(() => {
            (P = class {
                static get constants() {
                    return { animationStateClass: "logo__image--animation", animationName: "logoAnimation" };
                }
                constructor() {
                    let e = Array.from(document.querySelectorAll(".logo")).pop();
                    (this.refs = { rootElement: e, image: e.querySelector(".logo__image"), symbols: e.querySelector(".logo__symbols") }), (this._isAnimation = !1);
                }
                setFocusOnElement() {
                    this.refs.symbols.innerHTML = 'U<span class="logo__eye">&gt;</span><span class="logo__nose">\u1D25</span><span class="logo__eye">&lt;</span>U';
                }
                unsetFocusOnElement() {
                    this.refs.symbols.innerHTML = 'U<span class="logo__eye">\u2022</span><span class="logo__nose">\u1D25</span><span class="logo__eye">\u2022</span>U';
                }
                startAnimation() {
                    this._isAnimation || ((this._isAnimation = !0), this.refs.image.classList.add(P.constants.animationStateClass));
                }
                endAnimation() {
                    var o, r;
                    let e = window.location.pathname.indexOf("/search/") > -1,
                        t,
                        n;
                    e
                        ? ((t = document.querySelector(".logo__image")), (n = (o = document == null ? void 0 : document.querySelector(".search-hit")) == null ? void 0 : o.getAttribute("style")))
                        : ((t = document.querySelectorAll(".logo__image")[1]), (n = (r = document == null ? void 0 : document.querySelector(".suggestion-list__item")) == null ? void 0 : r.getAttribute("style"))),
                        n ? t.setAttribute("style", `${n}`) : t.removeAttribute("style"),
                        this.refs.image.addEventListener(
                            "animationiteration",
                            (i) => {
                                i.animationName === P.constants.animationName && ((this._isAnimation = !1), this.refs.image.classList.remove(P.constants.animationStateClass));
                            },
                            { once: !0 }
                        );
                }
            }),
                (C = new P());
        });
    var Le = {};
    $e(Le, { default: () => at });
    function ve(s) {
        return s.getBoundingClientRect();
    }
    function ot(s, e, t) {
        return Math.max(s, Math.min(e, t));
    }
    function rt() {
        C.setFocusOnElement();
    }
    function it() {
        C.unsetFocusOnElement();
    }
    var ae,
        at,
        be = se(() => {
            O();
            X();
            (ae = class extends L {
                constructor({ rootElement: e }) {
                    super(),
                        (this.refs = {
                            rootElement: e,
                            input: e.querySelector(".search__input"),
                            suggestionContainer: e.querySelector(".search__suggestion"),
                            suggestionContent: e.querySelector(".search__suggestion-content"),
                            suggestionList: e.querySelector(".suggestion-list"),
                        }),
                        (this.state = { highlightedIndex: -1 }),
                        ["enter", "exit", "openSuggestion", "closeSuggestion", "closeSuggestionOnKeyUp", "closeSuggestionOnOutSideClick", "onSearch", "onCursorChange"].forEach((t) => (this[t] = this[t].bind(this))),
                        document.addEventListener("click", this.closeSuggestionOnOutSideClick),
                        this.refs.rootElement.addEventListener("keyup", this.closeSuggestionOnKeyUp),
                        this.refs.rootElement.addEventListener("submit", (t) => {
                            this.refs.input.value.trim() === "" && t.preventDefault(), this.state.highlightedIndex >= 0 && this.isSuggestionOpen && t.preventDefault();
                        }),
                        this.refs.input.addEventListener("input", this.onSearch),
                        this.refs.input.addEventListener("focus", rt, !0),
                        this.refs.input.addEventListener("blur", it, !0),
                        document.addEventListener("keydown", (t) => {
                            t.code === "Slash" && document.activeElement !== this.refs.input && t.preventDefault();
                        }),
                        document.addEventListener("keyup", (t) => {
                            t.code === "Slash" &&
                                setTimeout(() => {
                                    this.enter();
                                });
                        });
                }
                enter() {
                    var e;
                    (e = this.refs.input) == null || e.focus();
                }
                exit() {
                    let { input: e } = this.refs;
                    e && ((e.value = ""), e.blur()), (this.state.highlightedIndex = -1);
                }
                openSuggestion() {
                    let { suggestionContainer: e } = this.refs;
                    e == null || e.classList.remove("search__suggestion--hide"), document.addEventListener("keydown", this.onCursorChange), document.addEventListener("keydown", this.preventEscape);
                }
                closeSuggestion() {
                    let { suggestionContainer: e } = this.refs;
                    e == null || e.classList.add("search__suggestion--hide"), document.removeEventListener("keydown", this.onCursorChange), document.removeEventListener("keydown", this.preventEscape);
                }
                get isSuggestionOpen() {
                    let { suggestionContainer: e } = this.refs;
                    return !(e != null && e.classList.contains("search__suggestion--hide"));
                }
                preventEscape(e) {
                    e.code === "Escape" && e.preventDefault();
                }
                closeSuggestionOnKeyUp(e) {
                    e.code === "Escape" && this.isSuggestionOpen && (e.stopPropagation(), this.closeSuggestion());
                }
                closeSuggestionOnOutSideClick(e) {
                    let { rootElement: t } = this.refs;
                    t.contains(e.target) || this.closeSuggestion();
                }
                onSearch(e) {
                    this.emit("search", e.target.value);
                }
                onCursorChange(e) {
                    switch (e.code) {
                        case "ArrowDown": {
                            this.moveCursor(1), e.preventDefault();
                            break;
                        }
                        case "ArrowUp": {
                            this.moveCursor(-1), e.preventDefault();
                            break;
                        }
                        case "Enter": {
                            this.selectHighlightedElement();
                            break;
                        }
                    }
                }
                selectHighlightedElement() {
                    let { suggestionList: e } = this.refs,
                        t = e.querySelectorAll(".suggestion-list__link");
                    if (t.length === 0) return;
                    let n = this.state.highlightedIndex;
                    n < 0 || t[n].click();
                }
                moveCursor(e) {
                    var c;
                    let { suggestionList: t, suggestionContent: n } = this.refs,
                        o = t.querySelectorAll(".suggestion-list__link");
                    if (o.length === 0) return;
                    (c = t.querySelector(".suggestion-list__link--highlighted")) == null || c.classList.remove("suggestion-list__link--highlighted");
                    let r = this.state.highlightedIndex,
                        i = ot(0, r + e, o.length - 1);
                    (this.state.highlightedIndex = i), o[i].classList.add("suggestion-list__link--highlighted");
                    let a = ve(n),
                        l = ve(o[i]),
                        d = parseFloat(window.getComputedStyle(n).paddingTop) || 0;
                    l.top < a.top && (n.scrollTop += l.top - a.top - d), l.bottom > a.bottom && (n.scrollTop += l.bottom - a.bottom + d);
                }
                clearOutput() {
                    let { suggestionList: e } = this.refs;
                    (e.innerHTML = ""), (this.state.highlightedIndex = -1);
                }
                renderResults(e) {
                    let { suggestionList: t } = this.refs,
                        n =
                            !e || e.length === 0
                                ? "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E"
                                : e
                                      .map((o) => {
                                          let r = o.originalTitle.replace(/`(.*?)`/g, '<code class="suggestion-list__code font-theme font-theme--code">$1</code>');
                                          return `
                <li class="suggestion-list__item" style="--accent-color: var(--color-${o.category});">
                  <a class="suggestion-list__link link" href="${o.url}">${r.replace(/<[/]*mark>/gi, "")}</a>
                </li>
              `;
                                      })
                                      .join("");
                    t.innerHTML = n;
                }
            }),
                (at = new ae({ rootElement: document.querySelector(".search") }));
        });
    function Ke() {
        let e = document.querySelector("[data-relative-time]");
        if (!e) return;
        function t(i) {
            return Math.abs((new Date() - i) / 1e3);
        }
        function n(i) {
            let a = [
                    ["hour", 3600],
                    ["minute", 60],
                    ["second", 1],
                ],
                l = new Intl.RelativeTimeFormat("ru", { localeMatcher: "best fit", numeric: "always", style: "long" }),
                [d, c] = a.find(([, f]) => f <= i),
                u = Math.round(i / c);
            return l.format(-u, d);
        }
        let o = new Date(e.dateTime),
            r = t(o);
        r < 86400 && (e.textContent = n(r));
    }
    try {
        Ke();
    } catch (s) {
        console.error(
            `\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u0447\u0438\u0441\u043B\u0438\u0442\u044C, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0448\u043B\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0441 \u043C\u043E\u043C\u0435\u043D\u0442\u0430 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438: ${s}`
        );
    }
    function We() {
        let s = document.querySelector(".articles-gallery");
        if (!s) return;
        let e = s.querySelector(".articles-gallery__more-button");
        if (!e) return;
        let t = s.querySelector(".featured-articles-list"),
            n = Array.from((t == null ? void 0 : t.querySelectorAll(".featured-articles-list__item")) || []);
        if (n.length === 0) return;
        let o = "featured-articles-list__item--active",
            r = ".featured-article__link",
            i = parseInt(getComputedStyle(t).getPropertyValue("--page-size"), 10) || 1,
            a = i;
        function l() {
            n.slice(a, a + i).forEach((d, c) => {
                d.classList.add(o), c === 0 && d.querySelector(r).focus();
            }),
                (a += i),
                a >= n.length && (e.hidden = !0);
        }
        e.addEventListener("click", l);
    }
    try {
        We();
    } catch (s) {
        console.error(s);
    }
    document.querySelectorAll(".persons-list").forEach((s) => {
        let e = s.querySelectorAll(".persons-list__item[hidden]"),
            t = s.querySelector(".persons-list__button"),
            n = s.querySelector(".persons-list__extra");
        t == null ||
            t.addEventListener("click", () => {
                e.forEach((o) => {
                    o.hidden = !1;
                }),
                    n && (n.hidden = !0);
            });
    });
    function ze() {
        let s = document.querySelector(".article-nav");
        if (!s) return;
        let e = s.querySelector(".article-nav__button"),
            t = s.querySelector(".article-nav__content");
        e.addEventListener("click", () => {
            s.classList.toggle("article-nav--open");
        }),
            t.addEventListener("click", (n) => {
                n.target.closest("a") && s.classList.remove("article-nav--open");
            });
    }
    ze();
    function A(s, e) {
        let t;
        return function (n) {
            t && clearTimeout(t),
                (t = setTimeout(function () {
                    s(n);
                }, e));
        };
    }
    function je() {
        var ge, pe;
        let s = ".toc",
            e = ".toc__link",
            t = ".article-heading",
            n = ".article-heading__copy-button",
            o = Array.from(document.querySelectorAll(e)),
            r = Array.from(document.querySelectorAll(t)).filter((h) => !h.closest("details"));
        if (!(o.length && r.length)) return;
        let i = {},
            a = {},
            l,
            d,
            c = "toc__link--active",
            u = "article-heading--visible",
            f = 0;
        function v() {
            return parseFloat(window.getComputedStyle(r[0]).scrollMarginTop);
        }
        function b() {
            return r
                .filter((h) => {
                    let m = h.getBoundingClientRect(),
                        p = v();
                    return m.top + m.height * f < p;
                })
                .pop();
        }
        function E(h) {
            var m, p;
            (m = i[l == null ? void 0 : l.id]) == null || m.classList.remove(c), (p = i[h == null ? void 0 : h.id]) == null || p.classList.add(c), (l = h);
        }
        function T(h) {
            for (let w of h) w.target.classList.toggle(u, w.isIntersecting);
            let p = r.filter((w) => w.classList.contains(u)).pop() || b();
            p && E(p);
        }
        function S(h) {
            var p;
            let m = h.slice(1);
            return (p = a[m]) == null ? void 0 : p.element;
        }
        function g(h) {
            let m = h == null ? void 0 : h.getBoundingClientRect(),
                p = 1;
            return window.scrollY + (m.top + m.height * f + p) - v();
        }
        function y(h, m) {
            try {
                navigator.clipboard
                    .writeText(h)
                    .then(() => {
                        try {
                            if (window.matchMedia("(max-width: 720px)").matches) {
                                let p = document.querySelector(".doc__popup");
                                (p.hidden = !1),
                                    setTimeout(() => {
                                        p.hidden = !0;
                                    }, 2e3);
                            } else {
                                let p = m.firstElementChild,
                                    w = m.nextElementSibling;
                                (m.disabled = !0),
                                    (p.outerHTML = `
              <svg class="article-heading__icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="m8.77,19.52l-6.97,-7.11l1.38,-1.43l5.6,5.71l12.04,-12.25l1.38,1.43l-13.41,13.65l-0.02,0z"></path>
              </svg>
              `),
                                    (w.textContent = "\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u043E"),
                                    (w.hidden = !1),
                                    setTimeout(() => {
                                        (m.disabled = !1), (m.firstElementChild.outerHTML = p.outerHTML);
                                        let z = !!document.querySelector(`${n}:disabled`);
                                        document.activeElement === document.body && !z && m.focus(), (w.textContent = void 0), (w.hidden = !0);
                                    }, 1800);
                            }
                        } catch (p) {
                            console.log(
                                `\u041E\u0448\u0438\u0431\u043A\u0430 \u0441 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u043E\u0439 \u043E\u0431 \u0443\u0441\u043F\u0435\u0448\u043D\u043E\u043C \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438 \u0441\u0441\u044B\u043B\u043A\u0438: ${p.message}`
                            );
                        }
                    })
                    .catch((p) => console.log(`\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438 \u0441\u0441\u044B\u043B\u043A\u0438: ${p.message}`));
            } catch (p) {
                console.log(
                    `\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u043D\u0435\u0437\u0430\u0449\u0438\u0449\u0435\u043D\u043D\u043E\u0435. \u041E\u0448\u0438\u0431\u043A\u0430: ${p.message}`
                );
            }
        }
        function D(h) {
            let m = S(h);
            window.scrollTo({ top: g(m), behavior: "smooth" });
        }
        o.forEach((h) => {
            let m = h.hash.slice(1);
            i[m] = h;
        }),
            r.forEach((h, m) => {
                a[h.id] = { element: h, index: m };
            });
        function te() {
            (d = new IntersectionObserver(T, { rootMargin: `0px 0px -${window.innerHeight - v()}px 0px`, threshold: [f] })),
                r.forEach((h) => {
                    d.observe(h);
                });
        }
        function B() {
            r.forEach((h) => {
                d.unobserve(h);
            }),
                d.disconnect(),
                (d = null);
        }
        function me() {
            d && B(),
                te(),
                r.forEach((h) => {
                    d.observe(h);
                });
        }
        setTimeout(me),
            window.addEventListener("resize", A(me, 200)),
            window.addEventListener("load", () => {
                let h = b();
                h && E(h);
            }),
            (ge = document.querySelector(s)) == null ||
                ge.addEventListener("click", (h) => {
                    let m = h.target.closest(`${e}, ${n}`);
                    !m || (h.preventDefault(), D(m.hash));
                }),
            (pe = document.querySelectorAll(n)) == null ||
                pe.forEach((h) =>
                    h.addEventListener("click", (m) => {
                        let p = m.target.closest(n),
                            w = document.location.href + p.dataset.anchor;
                        document.location.hash && (w = w.replace(document.location.hash, "")), m.preventDefault(), y(w, p);
                    })
                );
        function De() {
            let h = document.querySelectorAll(t);
            for (let m of h) {
                let p = m.querySelector(".article-heading__copier"),
                    w = p.querySelector(".article-heading__status"),
                    z = m.getBoundingClientRect(),
                    Be = p.getBoundingClientRect();
                z.left === Be.left && (m.style.width = `${m.offsetWidth - p.offsetWidth * 1.1}px`), (w.hidden = !0), (w.textContent = "");
            }
        }
        De();
    }
    je();
    var Ge = document.querySelectorAll(".toc__link"),
        Ye = 90,
        Je = (s, e) => {
            s.forEach((t) => {
                let n = t.textContent.trim().replace(/\s+/g, " ");
                if (n.length > e) {
                    let o = n.substr(0, e),
                        r = o.lastIndexOf(" "),
                        i = o.slice(0, r);
                    t.textContent = `${i}\u2026`;
                }
            });
        };
    Je(Ge, Ye);
    function ne(s, e, t = { leading: !0 }) {
        let n = !1,
            o,
            r;
        return function () {
            if (n) {
                (o = arguments), (r = this);
                return;
            }
            t.leading && s.apply(this, arguments),
                (n = !0),
                setTimeout(function () {
                    (n = !1), o && (s.apply(r, o), (o = r = null));
                }, e);
        };
    }
    O();
    var oe = "header--open",
        Te = "fixedHeaderAnimation",
        re = class extends L {
            constructor({ rootElement: e }) {
                super(),
                    (this.refs = { rootElement: e, input: e.querySelector(".search__input"), toggleButtons: e.querySelectorAll(".menu-toggle") }),
                    (this.state = { headerHeight: null, fixedHeaderHeight: null, lastScroll: 0, getScrollThreshold: window.innerHeight });
                let t = [
                    { condition: () => !!document.querySelector(".article"), getter: () => this.state.headerHeight + document.querySelector(".article__header").offsetHeight },
                    {
                        condition: () => !!document.querySelector(".index-block"),
                        getter: () => {
                            let r = window.matchMedia("(min-width: 1366px)") ? 0 : document.querySelector(".index-block__header").offsetHeight;
                            return this.state.headerHeight + r;
                        },
                    },
                    { condition: () => !!document.querySelector(".standalone-page"), getter: () => this.state.headerHeight + document.querySelector(".standalone-page__header").offsetHeight },
                    { condition: () => !0, getter: () => window.innerHeight },
                ];
                for (let { condition: r, getter: i } of t)
                    if (r()) {
                        this.getScrollThreshold = i;
                        break;
                    }
                ["openOnKeyUp", "closeOnKeyUp", "closeOnClickOutSide", "openMenu", "closeMenu", "fixHeader", "checkFixed"].forEach((r) => {
                    this[r] = this[r].bind(this);
                });
                let n = () => {
                        this.calculateHeaderHeight(), this.calculateScrollThreshold();
                    },
                    o = A(n, 200);
                window.addEventListener("resize", o),
                    window.addEventListener("orientationchange", o),
                    n(),
                    this.isClosableHeader &&
                        (this.refs.toggleButtons.forEach((r) => {
                            r.addEventListener("click", () => {
                                this.isMenuOpen ? this.closeMenu() : this.openMenu();
                            });
                        }),
                        document.addEventListener("keyup", this.openOnKeyUp),
                        window.addEventListener("scroll", ne(this.checkFixed, 250, { leading: !1 }), { passive: !0 }),
                        this.checkFixed());
            }
            get isFixed() {
                return this.refs.rootElement.classList.contains("header--fixed");
            }
            get isMainPage() {
                return this.refs.rootElement.classList.contains("header--main");
            }
            get isClosableHeader() {
                let e = this.refs.rootElement;
                return [!e.classList.contains("header--static"), !e.classList.contains("search-page__header")].every(Boolean);
            }
            get isMenuOpen() {
                return this.refs.rootElement.classList.contains(oe);
            }
            calculateHeaderHeight() {
                let e = this.refs.rootElement,
                    t = this.state;
                this.isFixed
                    ? ((t.fixedHeaderHeight = e.offsetHeight), e.classList.remove("header--fixed"), (t.headerHeight = e.offsetHeight), e.classList.add("header--fixed"))
                    : ((t.headerHeight = e.offsetHeight), e.classList.add("header--fixed"), (t.fixedHeaderHeight = e.offsetHeight), e.classList.remove("header--fixed")),
                    document.documentElement.style.setProperty("--fixed-header-height", t.fixedHeaderHeight),
                    document.documentElement.style.setProperty("--not-fixed-header-height", t.headerHeight);
            }
            calculateScrollThreshold() {
                this.scrollThreshold = this.getScrollThreshold();
            }
            openOnKeyUp(e) {
                e.code === "Slash" && this.openMenu();
            }
            closeOnKeyUp(e) {
                e.code === "Escape" && !this.isMainPage && this.closeMenu();
            }
            closeOnClickOutSide(e) {
                !e.target.closest(".header__inner") && !this.isMainPage && this.closeMenu();
            }
            openMenu() {
                this.refs.rootElement.classList.add(oe), document.removeEventListener("keyup", this.openOnKeyUp), document.addEventListener("keyup", this.closeOnKeyUp), document.addEventListener("click", this.closeOnClickOutSide);
            }
            closeMenu() {
                let { rootElement: e } = this.refs;
                e.classList.remove(oe),
                    document.removeEventListener("keyup", this.closeOnKeyUp),
                    document.removeEventListener("click", this.closeOnClickOutSide),
                    document.addEventListener("keyup", this.openOnKeyUp),
                    this.emit("menu.close");
            }
            showHeader() {
                let { rootElement: e } = this.refs,
                    t = ["header--animating", "header--fixed-show"];
                e.addEventListener(
                    "animationend",
                    (n) => {
                        n.animationName === Te && e.classList.remove(...t);
                    },
                    { once: !0 }
                ),
                    this.fixHeader(!0),
                    e.classList.add(...t),
                    this.emit("fixed");
            }
            hideHeader() {
                let { rootElement: e } = this.refs,
                    t = ["header--animating", "header--fixed-hide"];
                e.addEventListener(
                    "animationend",
                    (n) => {
                        n.animationName === Te && (this.fixHeader(!1), e.classList.remove(...t));
                    },
                    { once: !0 }
                ),
                    e.classList.add(...t),
                    this.emit("unfixed");
            }
            fixHeader(e) {
                this.refs.rootElement.classList.toggle("header--fixed", e), document.documentElement.style.setProperty("--is-header-fixed", Number(e));
            }
            checkFixed() {
                let { lastScroll: e } = this.state,
                    t = window.scrollY,
                    n = t > e,
                    o = t === 0;
                if (((this.state.lastScroll = t), o)) {
                    this.isFixed && (this.fixHeader(!1), this.emit("unfixed"));
                    return;
                }
                if (t <= this.scrollThreshold) {
                    this.isFixed && this.hideHeader();
                    return;
                }
                n ? this.isFixed && this.hideHeader() : !this.isFixed && !this.isMainPage && this.showHeader();
            }
        },
        V = new re({ rootElement: document.querySelector(".header") });
    function Xe() {
        let s = document.querySelector(".article__aside");
        if (!(s && V)) return;
        let e = "article__aside--offset";
        V.on("fixed", () => {
            s.classList.add(e);
        }),
            V.on("unfixed", () => {
                s.classList.remove(e);
            });
    }
    Xe();
    function Qe() {
        let s = document.querySelector(".index-block");
        if (!s) return;
        let e = s.querySelector(".index-block__filter-control"),
            t = s.querySelectorAll(".index-section");
        if (!e && !t) return;
        let n = "view",
            o = { THEMES: "themes", ALPHABET: "alphabet" };
        function r(d) {
            for (let c of t) c.hidden = c.id !== d;
        }
        function i(d) {
            let c = new URLSearchParams({ [n]: d });
            history.replaceState(null, null, `?${c}`);
        }
        e.addEventListener("change", (d) => {
            let { value: c } = d.target;
            !c || (r(c), i(c));
        });
        let a = new URLSearchParams(window.location.search);
        r(a.get(n) || o.THEMES);
        let l = window.location.hash;
        l &&
            window.addEventListener("load", () => {
                var d;
                (d = document.querySelector(l)) == null || d.scrollIntoView();
            });
    }
    Qe();
    var { replace: Ze } = "";
    var et = /[&<>'"]/g,
        tt = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" },
        st = (s) => tt[s],
        _e = (s) => Ze.call(s, et, st);
    var ie = class {
            static get defaultSearchSettings() {
                return { getRankingInfo: !0, analytics: !0, enableABTest: !1, attributesToRetrieve: "*", attributesToSnippet: "*:20", responseFields: "*", explain: "*", facets: ["*", "category", "tags"] };
            }
            constructor(e) {
                this.url = e;
            }
            search(e, t = []) {
                let n = new URL(this.url),
                    o = new URLSearchParams(n.search);
                return (
                    o.append("search", e.replaceAll("+", "%2B").replaceAll("-", "%2D")),
                    t.forEach((r) => {
                        o.append(r.key, r.val);
                    }),
                    fetch(n.toString() + "?" + o.toString(), { method: "POST", headers: { Accept: "application/json", Origin: "https://doka.guide" } }).then((r) => r.json())
                );
            }
        },
        nt = new ie("https://search.doka.guide"),
        G = nt;
    var Y = new Set([
        "a",
        "b",
        "br",
        "dd",
        "dl",
        "dt",
        "em",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "hr",
        "i",
        "li",
        "ol",
        "p",
        "q",
        "rb",
        "rp",
        "rt",
        "s",
        "td",
        "th",
        "tr",
        "tt",
        "u",
        "ul",
        "ch",
        "cm",
        "em",
        "ex",
        "ic",
        "in",
        "is",
        "lh",
        "mm",
        "ms",
        "pc",
        "pt",
        "px",
        "s",
        "vh",
        "vw",
        "if",
        "of",
    ]);
    function J(s) {
        return s ? s.map((e) => ({ originalTitle: e.title, title: e.title, summary: e.fragments ? e.fragments : [], url: `${e.link}`, category: e.category, tags: e.tags })) : [];
    }
    X();
    function ct() {
        return U(this, null, function* () {
            return (yield Promise.resolve().then(() => (be(), Le))).default;
        });
    }
    function lt() {
        return U(this, null, function* () {
            if (window.location.pathname.indexOf("/search/") > -1) return;
            let e = yield ct();
            if (!e) return;
            let t = 150;
            function n(o) {
                let r = o.detail;
                if (!(r.length >= 3 || Y.has(r))) {
                    e.clearOutput();
                    return;
                }
                e.openSuggestion(),
                    C.startAnimation(),
                    G.search(r)
                        .then((i) => {
                            let a = J(i).map((l) => K(N({}, l), { title: _e(l.title) }));
                            e.renderResults(a);
                        })
                        .catch(console.error)
                        .finally(() => {
                            C.endAnimation();
                        });
            }
            V.on("menu.close", () => {
                e.exit();
            }),
                e.on("search", A(n, t));
        });
    }
    lt();
    O();
    X();
    function dt() {
        C.setFocusOnElement();
    }
    function ht() {
        C.unsetFocusOnElement();
    }
    function le(s, e) {
        s ? (e.setAttribute("aria-live", "assertive"), e.setAttribute("aria-atomic", "true")) : (e.removeAttribute("aria-live"), e.removeAttribute("aria-atomic"));
    }
    var ue = class extends L {
            constructor({ form: e }) {
                super(),
                    (this.refs = { form: e }),
                    Array.from(e.elements)
                        .filter((t) => !!t.name)
                        .forEach((t) => {
                            t.addEventListener("input", this);
                        }),
                    e.addEventListener("reset", () => {
                        setTimeout(() => {
                            this.emit("reset", this.state);
                        });
                    }),
                    queueMicrotask(() => {
                        this.emit("change.query", this.state);
                    });
            }
            get state() {
                let e = new FormData(),
                    t = new FormData(this.refs.form);
                for (let [n, o] of t) o && e.append(n, o);
                return e;
            }
            set state(e) {
                let { form: t } = this.refs;
                for (let [n, o] of e.entries())
                    switch (n) {
                        case "query": {
                            t.elements[n].value = o;
                            break;
                        }
                        case "tag":
                        case "category": {
                            let i = Array.from(t.elements[n]).find((a) => a.value === o);
                            i.checked = !0;
                            break;
                        }
                    }
            }
            handleEvent(e) {
                let { name: t } = e.target;
                switch (t) {
                    case "query": {
                        this.emit("change.query", this.state);
                        break;
                    }
                    default:
                        this.emit("change.filter", this.state);
                }
                this.emit("change", this.state);
            }
        },
        k = class extends L {
            static get matchedItems() {
                return 3;
            }
            static isPlaceholder(e) {
                return e.tags.includes("placeholder");
            }
            static replaceBackticks(e, t) {
                return e.replace(/`(.*?)`/g, t);
            }
            static get templates() {
                return {
                    summaryItem: (e) => `<p class="search-hit__summary-item">${e.replaceAll("<mark>", '<mark class="search-hit__marked">')}</p>`,
                    titleCode: '<code class="search-hit__link-code code-fix font-theme font-theme--code">$1</code>',
                    textCode: '<code class="search-hit__text-code code-fix font-theme font-theme--code">$1</code>',
                    placeholderIcon: '<span class="search-hit__edit font-theme font-theme--code" aria-hidden="true"></span>',
                    hit: (e) => {
                        let t = k.isPlaceholder(e) ? k.templates.placeholderIcon : "",
                            n = k.replaceBackticks(e.title.replaceAll("<mark>", '<mark class="search-hit__marked">'), k.templates.titleCode),
                            o = e.summary
                                .slice(0, k.matchedItems)
                                .map((r) => k.templates.summaryItem(r))
                                .join("");
                        return `
          <article class="search-hit" style="--accent-color: var(--color-base-${e.category})">
            <h2 class="search-hit__title">
              <a class="search-hit__link link" href="${e.url}">
                ${t}${n}
              </a>
            </h3>
            <div class="search-hit__summary">
              ${o}
            </div>
          </article>
        `;
                    },
                    hits: (e, t) => (
                        le(!1, e),
                        `
          <ol class="search-result-list base-list">
            ${t
                .map(
                    (n) => `
                <li class="search-result-list__item">
                  ${k.templates.hit(n)}
                </li>
              `
                )
                .join("")}
          </ol>
        `
                    ),
                    emptyResults: (e) => (
                        le(!0, e),
                        `
          <div class="search-page__empty">\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E</div>
        `
                    ),
                };
            }
            constructor({ element: e }) {
                super(), (this.refs = { element: e });
            }
            renderHits(e, t, n, o) {
                let { element: r } = this.refs,
                    i = !e || e.length === 0 ? k.templates.emptyResults(n) : k.templates.hits(n, e, t, o);
                r.innerHTML = i;
            }
            clear() {
                let { element: e } = this.refs;
                e.innerHTML = "";
            }
        };
    function ft() {
        let s = ".search",
            e = ".search__input",
            t = ".search__output",
            n = document.querySelector(s),
            o = document.querySelector(e),
            r = document.querySelector(t),
            i = new ue({ form: n });
        i.state = new URLSearchParams(location.search);
        let a = new k({ element: r });
        function l(E) {
            return [[...E.getAll("category")].map((S) => ({ key: "category", val: S })), [...E.getAll("tag")].map((S) => ({ key: "tags", val: S }))].flat();
        }
        function d(E, T) {
            let S = new URLSearchParams(E).toString();
            return (S = S ? "?" + S : T), S;
        }
        function c(E, T) {
            E.length >= 3 || Y.has(E)
                ? (C.startAnimation(),
                  G.search(E, T)
                      .then(function (S) {
                          let g = J(S);
                          a.renderHits(g, E, r, 150);
                      })
                      .catch((S) => {
                          console.error(S);
                      })
                      .finally(() => {
                          C.endAnimation();
                      }))
                : a.clear();
        }
        function u(E) {
            let T = E.detail,
                S = T.get("query") || "",
                g = l(T);
            c(S, g);
        }
        function f(E) {
            let T = E.detail,
                S = d(T, location.pathname);
            history.replaceState(null, null, S);
        }
        let v = A(u, 150);
        function b() {
            o.addEventListener("focus", dt, !0),
                o.addEventListener("blur", ht, !0),
                o.focus(),
                o.addEventListener("input", () => {
                    o.value || le(!1, r);
                }),
                n.addEventListener("submit", (E) => {
                    E.preventDefault();
                }),
                document.addEventListener("keydown", (E) => {
                    E.code === "Slash" && document.activeElement !== o && E.preventDefault();
                }),
                document.addEventListener("keyup", (E) => {
                    E.code === "Escape" && n.reset(),
                        E.code === "Slash" &&
                            document.activeElement !== o &&
                            setTimeout(() => {
                                o.focus();
                            });
                });
        }
        b(),
            i.on("change", f),
            i.on("reset", f),
            i.on("reset", () => {
                a.clear();
            }),
            i.on("change.filter", u),
            i.on("change.query", v);
    }
    var mt = window.location.pathname.indexOf("/search/") > -1;
    mt && ft();
    function gt() {
        let s = document.querySelector(".search-page__aside"),
            e = document.querySelector(".search-page__aside-button"),
            t = document.querySelector(".search-page__aside-button-name"),
            n = !1;
        (!s && !e) ||
            e.addEventListener("click", () => {
                s.classList.toggle("search-page__aside--open"),
                    n
                        ? (e.setAttribute("aria-expanded", "false"), (t.innerHTML = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440"), (n = !1))
                        : (e.setAttribute("aria-expanded", "true"), (t.innerHTML = "\u0421\u043A\u0440\u044B\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440"), (n = !0));
            });
    }
    gt();
    O();
    var x = class extends L {
            static get EVENTS() {
                return { ANSWER: "answer", CORRECTION: "correction" };
            }
            constructor({ rootElement: e, childsSelector: t, childActiveClass: n, answerCondition: o = (r) => r.type !== "button" }) {
                super();
                let r = e == null ? void 0 : e.querySelectorAll(t);
                e.addEventListener("click", (i) => {
                    let a = i.target.closest(t);
                    if (!a) return;
                    for (let c of r) c.classList.toggle(n, c === a);
                    let d = o(a) ? x.EVENTS.ANSWER : x.EVENTS.CORRECTION;
                    this.emit(d, a.value);
                });
            }
        },
        H = class extends L {
            static get EVENTS() {
                return { ANSWER: "answer" };
            }
            static get TEXT_THRESHOLD() {
                return 4;
            }
            constructor({ rootElement: e }) {
                super(),
                    (this.textarea = e.querySelector("textarea")),
                    (this.button = e.querySelector("button")),
                    this.button.addEventListener("click", () => {
                        let t = this.textarea.value.trim();
                        t.length >= H.TEXT_THRESHOLD && this.emit(H.EVENTS.ANSWER, t);
                    }),
                    ["keydown", "keyup"].forEach((t) => {
                        this.textarea.addEventListener(t, (n) => {
                            n.stopPropagation();
                        });
                    });
            }
            focus() {
                this.textarea.focus();
            }
        };
    function pt() {
        let s = document.querySelector(".feedback-form");
        if (!s) return;
        let e = s.querySelector(".vote--down"),
            t = s.querySelector(".vote--up"),
            n = s.querySelector(".feedback-form__fieldset--reason"),
            o = s.querySelector(".feedback-form__text"),
            r = !1;
        function i() {
            return fetch("/api.json")
                .then((u) => u.json())
                .then((u) => u.token);
        }
        function a(u) {
            let f = JSON.stringify({ type: "feedback", data: JSON.stringify(u), author_id: 1 }),
                v = "https://api.doka.guide/form";
            return i()
                .then((b) => fetch(v, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: b }, body: f }))
                .then((b) => {
                    if (!b.ok) throw b;
                    return b;
                });
        }
        let l = new H({ rootElement: o });
        l.on(H.EVENTS.ANSWER, () => {
            setTimeout(() => {
                (n.disabled = !0), (t.disabled = !0);
            });
        });
        let d = new x({ rootElement: s.querySelector(".feedback-form__fieldset--vote"), childsSelector: ".vote", childActiveClass: "vote--active" });
        d.on(
            x.EVENTS.ANSWER,
            () => {
                setTimeout(() => {
                    (e.disabled = !0), (n.disabled = !0);
                });
            },
            { once: !0 }
        ),
            d.on(x.EVENTS.CORRECTION, () => {
                n.hidden = !1;
            });
        let c = new x({ rootElement: n, childsSelector: ".feedback-form__reason-button", childActiveClass: "button--active" });
        c.on(
            x.EVENTS.ANSWER,
            () => {
                setTimeout(() => {
                    (n.disabled = !0), (t.disabled = !0), (o.hidden = !0);
                });
            },
            { once: !0 }
        ),
            c.on(x.EVENTS.CORRECTION, () => {
                (o.hidden = !1), l.focus();
            }),
            s.addEventListener("submit", (u) => {
                var b;
                if ((u.preventDefault(), r)) return;
                let v = new FormData(s).get("answer") || ((b = u.submitter) == null ? void 0 : b.value);
                !(v && v.length >= H.TEXT_THRESHOLD) ||
                    ((r = !0),
                    a({ answer: v, article_id: window.location.pathname })
                        .then(() => {
                            s.dataset.state = "success";
                        })
                        .catch((E) => {
                            (s.dataset.state = "error"), console.error(E);
                        })
                        .finally(() => {
                            r = !1;
                        }));
            });
    }
    try {
        pt();
    } catch (s) {
        console.error(s);
    }
    O();
    var I = class extends L {
            static get EVENTS() {
                return { QUESTION: "question", CORRECTION: "correction" };
            }
            constructor({ rootElement: e, childsSelector: t, childActiveClass: n, questionCondition: o = (r) => r.type !== "button" }) {
                super();
                let r = e == null ? void 0 : e.querySelectorAll(t);
                e.addEventListener("click", (i) => {
                    let a = i.target.closest(t);
                    if (!a) return;
                    for (let c of r) c.classList.toggle(n, c === a);
                    let d = o(a) ? I.EVENTS.QUESTION : I.EVENTS.CORRECTION;
                    this.emit(d, a.value);
                });
            }
        },
        R = class extends L {
            static get EVENTS() {
                return { QUESTION: "question" };
            }
            static get TEXT_THRESHOLD() {
                return 4;
            }
            constructor({ rootElement: e }) {
                super(),
                    (this.textarea = e.querySelector("textarea")),
                    (this.button = e.querySelector("button")),
                    this.button.addEventListener("click", () => {
                        let t = this.textarea.value.trim();
                        t.length >= R.TEXT_THRESHOLD && this.emit(R.EVENTS.QUESTION, t);
                    }),
                    ["keydown", "keyup"].forEach((t) => {
                        this.textarea.addEventListener(t, (n) => {
                            n.stopPropagation();
                        });
                    });
            }
            focus() {
                this.textarea.focus();
            }
        };
    function St() {
        let s = document.querySelector(".question-form");
        if (!s) return;
        let e = s.querySelector(".question-form__fieldset"),
            t = s.querySelector(".question-form__text"),
            n = !1;
        function o() {
            return fetch("/api.json")
                .then((l) => l.json())
                .then((l) => l.token);
        }
        function r(l) {
            let d = JSON.stringify({ type: "question", data: JSON.stringify(l), author_id: 1 }),
                c = "https://api.doka.guide/form";
            return o()
                .then((u) => fetch(c, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: u }, body: d }))
                .then((u) => {
                    if (!u.ok) throw u;
                    return u;
                });
        }
        let i = new R({ rootElement: t });
        i.on(R.EVENTS.QUESTION, () => {
            setTimeout(() => {
                e.disabled = !0;
            });
        });
        let a = new I({ rootElement: e, childsSelector: ".question-form__question-button", childActiveClass: "button--active" });
        a.on(
            I.EVENTS.QUESTION,
            () => {
                setTimeout(() => {
                    (e.disabled = !0), (t.hidden = !0);
                });
            },
            { once: !0 }
        ),
            a.on(I.EVENTS.CORRECTION, () => {
                (t.hidden = !1), i.focus();
            }),
            s.addEventListener("submit", (l) => {
                var f;
                if ((l.preventDefault(), n)) return;
                let d = new FormData(s),
                    c = d.get("question") || ((f = l.submitter) == null ? void 0 : f.value),
                    u = d.get("person");
                !(c && c.length >= R.TEXT_THRESHOLD) ||
                    ((n = !0),
                    r({ question: c, person: u, date: new Date().toUTCString() })
                        .then(() => {
                            s.dataset.state = "success";
                        })
                        .catch((v) => {
                            (s.dataset.state = "error"), console.error(v);
                        })
                        .finally(() => {
                            n = !1;
                        }));
            });
    }
    try {
        St();
    } catch (s) {
        console.error(s);
    }
    O();
    var $ = class extends L {
            static get EVENTS() {
                return { SETTINGS: "settings" };
            }
            static get VALIDATION_REGEXP() {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            }
            constructor({ rootElement: e, title: t, activeFieldSelector: n, emailFieldSelector: o, whoFieldSelector: r, gradeFieldSelector: i, interestFieldSelector: a, inflation: l, hash: d }) {
                if (
                    (super(),
                    (this.title = document.querySelector(t)),
                    (this.button = e.querySelector("button")),
                    (this.active = e.querySelector(n)),
                    (this.email = e.querySelector(o)),
                    (this.who = e.querySelectorAll(r)),
                    (this.grade = e.querySelectorAll(i)),
                    (this.interests = e.querySelectorAll(a)),
                    (this.status = e),
                    !(this.title || this.button || this.active || this.email || this.who || this.grade || this.interests || this.status))
                ) {
                    if (d && d !== "") {
                        let c = JSON.parse(l.profile.data);
                        (this.email.value = l.profile.email),
                            this.email.parentElement.classList.add("subscribe-settings__row--hidden"),
                            (this.active.value = c.active),
                            c.active
                                ? ((this.button.innerHTML = "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),
                                  (this.title.innerHTML = "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438"))
                                : !c.active && c.reason
                                ? ((this.button.innerHTML = "\u041F\u043E\u0434\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u0441\u043D\u043E\u0432\u0430"),
                                  (this.title.innerHTML = "\u0412\u044B \u043E\u0442\u043F\u0438\u0441\u0430\u043D\u044B \u043E\u0442 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0438"))
                                : c.active ||
                                  ((this.button.innerHTML = "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C"),
                                  (this.title.innerHTML = "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0443")),
                            c.who &&
                                this.who.forEach((u) => {
                                    c.who === u.value ? (u.checked = !0) : (u.checked = !1);
                                }),
                            c.grade &&
                                this.grade.forEach((u) => {
                                    c.grade === u.value ? (u.checked = !0) : (u.checked = !1);
                                }),
                            c.interest &&
                                this.interests.forEach((u) => {
                                    u.checked = !!c.interest.includes(u.value);
                                });
                    }
                    this.button.addEventListener("click", () => {
                        let c = this.email.value.trim();
                        $.VALIDATION_REGEXP.test(c) && this.emit($.EVENTS.EMAIL, c);
                    }),
                        ["keydown", "keyup"].forEach((c) => {
                            this.email.addEventListener(c, (u) => {
                                u.stopPropagation();
                            });
                        });
                }
            }
            clearStatus() {
                this.status.classList.remove("progress"), this.status.classList.remove("success"), this.status.classList.remove("error");
            }
            progress() {
                this.clearStatus(), this.status.classList.toggle("progress");
            }
            success() {
                this.clearStatus(), this.status.classList.toggle("success");
            }
            error() {
                this.clearStatus(), this.status.classList.toggle("error");
            }
            focus() {
                this.email.value === "" ? this.email.focus() : this.who.focus();
            }
        },
        W = class extends L {
            static get EVENTS() {
                return { UNSUBSCRIBE: "unsubscribe" };
            }
            constructor({ rootElement: e, isHidden: t }) {
                super(),
                    (this.input = e.querySelector("input")),
                    (this.button = e.querySelector("button")),
                    (this.section = e.parentElement),
                    (this.status = e),
                    !(this.input || this.button || this.section || this.status) &&
                        (t && this.section.classList.add("unsubscribe-section--hidden"),
                        this.button.addEventListener("click", () => {
                            let n = this.input.value.trim();
                            this.emit(W.EVENTS.UNSUBSCRIBE, n);
                        }),
                        ["keydown", "keyup"].forEach((n) => {
                            this.input.addEventListener(n, (o) => {
                                o.stopPropagation();
                            });
                        }));
            }
            clearStatus() {
                this.status.classList.remove("progress"), this.status.classList.remove("success"), this.status.classList.remove("error");
            }
            progress() {
                this.clearStatus(), this.status.classList.toggle("progress");
            }
            success() {
                this.clearStatus(), this.status.classList.toggle("success");
            }
            error() {
                this.clearStatus(), this.status.classList.toggle("error");
            }
            focus() {
                this.input.focus();
            }
        };
    function Et() {
        return U(this, null, function* () {
            var E;
            let s = "https://api.doka.guide",
                e = window.location.search.replace("?", "").split("&"),
                t = e.length > 0 ? ((E = e.filter((T) => T.startsWith("hash="))[0]) == null ? void 0 : E.replace("hash=", "")) : null,
                n = document.querySelector(".subscribe-page");
            if (!n) return;
            let o = n.querySelector(".subscribe-page__subscribe"),
                r = n.querySelector(".subscribe-page__unsubscribe"),
                i = !1;
            function a() {
                return fetch("/api.json")
                    .then((T) => T.json())
                    .then((T) => T.token);
            }
            function l(T) {
                return U(this, null, function* () {
                    let S = `${s}/profile-link/${T}`;
                    return a()
                        .then((g) => fetch(S, { method: "GET", headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: g } }))
                        .then((g) => g.json());
                });
            }
            function d(T, S, g, y = "") {
                let D = JSON.stringify({ email: T, data: JSON.stringify(S), author_id: 1 }),
                    te = g === "POST" ? `${s}/subscription` : `${s}/subscription/${y}`;
                return a()
                    .then((B) => fetch(te, { method: g, headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: B }, body: D }))
                    .then((B) => {
                        if (!B.ok) throw B;
                        return B;
                    });
            }
            function c(T) {
                return Array.from(new FormData(T)).reduce((g, y) => {
                    if (g[y[0]] && typeof g[y[0]] == "string") {
                        let D = g[y[0]];
                        return (g[y[0]] = []), g[y[0]].push(D), g[y[0]].push(y[1]), N({}, g);
                    } else {
                        if (g[y[0]] && Array.isArray(g[y[0]])) return g[y[0]].push(y[1]), N({}, g);
                        if (typeof y[1] == "string" && (y[1] === "true" || y[1] === "false")) return K(N({}, g), { [y[0]]: y[1] === "true" });
                    }
                    return K(N({}, g), { [y[0]]: y[1] });
                }, {});
            }
            let u = t ? yield l(t) : null,
                f = new $({
                    rootElement: o,
                    title: ".subscribe-page .standalone-page__title",
                    activeFieldSelector: "input[name=active]",
                    emailFieldSelector: "input[name=email]",
                    whoFieldSelector: "input[name=who]",
                    gradeFieldSelector: "input[name=grade]",
                    interestFieldSelector: "input[name=interest]",
                    inflation: u,
                    hash: t,
                });
            o.addEventListener("submit", (T) => {
                if ((T.preventDefault(), i)) return;
                let S = c(o),
                    g = S.email;
                g && delete S.email,
                    (S.active = !0),
                    (i = !0),
                    f.progress(),
                    d(g, S, t ? "PUT" : "POST", t ? u.profile.id : "")
                        .then(() => {
                            f.success();
                        })
                        .catch((y) => {
                            f.error(), console.error(y);
                        })
                        .finally(() => {
                            i = !1;
                        });
            });
            let v = c(o),
                b = new W({ rootElement: r, statusSelector: ".unsubscribe__form.form-with-status", isHidden: !!v.unsubscribed || !v.active });
            r.addEventListener("submit", (T) => {
                if ((T.preventDefault(), i)) return;
                let S = c(o),
                    g = c(r),
                    y = N(N({}, S), g);
                (y.active = !1),
                    (i = !0),
                    b.progress(),
                    d(y.email, y, "PUT", u.profile.id)
                        .then(() => {
                            b.success();
                        })
                        .catch((D) => {
                            b.error(), console.error(D);
                        })
                        .finally(() => {
                            i = !1;
                        });
            });
        });
    }
    try {
        Et();
    } catch (s) {
        console.error(s);
    }
    function yt() {
        let s = document.querySelectorAll("pre[data-lang]");
        if (s.length === 0) return;
        function e() {
            s.forEach((n) => {
                let o = n.querySelectorAll(".block-code__original-line"),
                    r = n.querySelectorAll(".block-code__line");
                o.forEach((i, a) => {
                    r[a].style.height = `${getComputedStyle(i).height}`;
                });
            });
        }
        let t = A(e, 100);
        window.addEventListener("resize", t), window.addEventListener("orientationchange", t), e();
    }
    yt();
    function Tt() {
        let s = document.querySelector(".cookie-notification"),
            e = s == null ? void 0 : s.querySelector("button");
        if (!s && !e) return;
        let t = "cookie-notification";
        try {
            if (JSON.parse(localStorage.getItem(t))) return;
        } catch (n) {
            console.error(n);
        }
        (s.hidden = !1),
            e.addEventListener(
                "click",
                () => {
                    (s.hidden = !0), localStorage.setItem(t, !0);
                },
                { once: !0 }
            );
    }
    Tt();
    function _t() {
        if (!!!document.querySelector(".article__content-inner")) return;
        let e = { IDLE: "idle", SUCCESS: "success", ERROR: "error" },
            t = 5e3;
        document.addEventListener("click", (n) => {
            let o = n.target.closest(".block-code__copy-button");
            if (!o) return;
            let r = o.closest(".block-code");
            if (!r) return;
            let i = r.querySelector(".block-code__highlight");
            if (!i) return;
            o.disabled = !0;
            let a;
            navigator.clipboard
                .writeText(i.textContent)
                .then(() => {
                    (o.dataset.state = e.SUCCESS),
                        document.addEventListener("keydown", (l) => {
                            l.key === "Tab" && (a = !0);
                        });
                })
                .catch(() => {
                    o.dataset.state = e.ERROR;
                })
                .finally(() => {
                    setTimeout(() => {
                        (o.dataset.state = e.IDLE), (o.disabled = !1), a || o.focus();
                    }, t);
                });
        });
    }
    _t();
    function vt() {
        let s = document.querySelector(".people-page");
        if (!s) return;
        let e = s.querySelector(".people-page__filter"),
            t = s.querySelector(".person-grid"),
            [n, ...o] = Array.from(s.querySelectorAll(".tag-filter__control"));
        function r() {
            return o.filter((c) => c.checked).map((c) => c.value);
        }
        function i() {
            t.dataset.filters = r().join(",");
        }
        function a() {
            let c = [...new FormData(e).entries()].filter(([, f]) => !!f),
                u = c.length !== 0 ? "?" + new URLSearchParams(c) : window.location.pathname;
            history.pushState(null, null, u);
        }
        function l() {
            let c = new URLSearchParams(window.location.search),
                u = new Set([...c.values()]);
            for (let f of o) f.checked = u.has(f.value);
            n.checked = u.size === 0;
        }
        function d(c) {
            let { value: u, checked: f } = c.target;
            switch (!0) {
                case !u && f: {
                    for (let v of o) v.checked = !1;
                    break;
                }
                case !u && !f: {
                    n.checked = !0;
                    break;
                }
                case u && f: {
                    n.checked = !1;
                    break;
                }
                case u && !f: {
                    r().length === 0 && (n.checked = !0);
                    break;
                }
            }
            i(), a();
        }
        e.addEventListener("change", d), l(), i();
    }
    vt();
    function Lt() {
        let s = document.querySelector(".filter-panel"),
            e = document.querySelector(".filter-panel__button"),
            t = document.querySelector(".float-button__name"),
            n = !1;
        (!s && !e) ||
            e.addEventListener("click", () => {
                s.classList.toggle("filter-panel--open"),
                    n
                        ? (e.setAttribute("aria-expanded", "false"), (t.innerHTML = "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440"), (n = !1))
                        : (e.setAttribute("aria-expanded", "true"), (t.innerHTML = "\u0421\u043A\u0440\u044B\u0442\u044C \u0444\u0438\u043B\u044C\u0442\u0440"), (n = !0));
            });
    }
    Lt();
    function bt() {
        let [s, e] = [document.querySelector(".linked-article--previous .linked-article__link"), document.querySelector(".linked-article--next .linked-article__link")];
        if (!(s && e)) return;
        function t(n) {
            if (!(n.ctrlKey && n.altKey)) return;
            let o = { ArrowLeft: s, ArrowRight: e }[n.code];
            !o || (window.location = o.href);
        }
        document.addEventListener("keyup", t);
    }
    bt();
    function wt(s, e) {
        for (let t of s) t.setAttribute("tabindex", e);
    }
    function ke(s) {
        let e = [];
        e.push(s.getElementsByClassName("block-code__inner")), e.push(s.getElementsByClassName("block-code__copy-button")), e.push(s.getElementsByTagName("a")), e.push(s.getElementsByTagName("input"));
        for (let t of s.getElementsByTagName("iframe")) e.push(t.contentWindow.document.getElementsByTagName("a")), e.push(t.contentWindow.document.getElementsByTagName("input"));
        return e;
    }
    function Q(s, e) {
        ke(s).forEach((n) => {
            wt(n, e);
        });
    }
    function we(s) {
        let t = s.target.parentNode.parentNode,
            n = ke(t);
        if (s.shiftKey && s.key === "Tab") {
            let o = n.length - 1,
                r = n[o].length - 1;
            n[o][r].focus();
        } else s.key === "Tab" && n[0][0].focus();
    }
    function kt(s) {
        let e = s.target;
        e.toggleAttribute("data-collapsed");
        let t = e.getAttribute("data-collapsed") === "",
            n = e.parentNode,
            o = n.parentNode;
        o.classList.toggle("practices__content--open"),
            t
                ? ((e.innerHTML = "+ \u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C"), e.removeEventListener("keydown", we), Q(n, "-1"), window.scrollTo(0, o.offsetTop - 150))
                : ((e.innerHTML = "\u2013 \u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"), e.addEventListener("keydown", we), Q(n, "0"));
    }
    window.addEventListener("load", () => {
        let s = document.getElementsByClassName("practices__toggler");
        for (let t of s) (t.onclick = kt), Q(t.parentNode, "-1");
        let e = document.URL.split("#")[1];
        if (e) {
            let t = document.getElementById(e),
                n = t.parentNode;
            if (n.classList.contains("practices__summary")) {
                let o = n.getElementsByClassName("practices__toggler")[0];
                o.setAttribute("data-collapsed", !0);
                let r = n.parentNode;
                r.classList.toggle("practices__content--open"), (o.innerHTML = "+ \u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"), Q(n, "0"), window.scrollTo(0, r.offsetTop + t.offsetTop - 150);
            }
        }
    });
    O();
    var _ = class extends L {
            static get EVENTS() {
                return { CLOSE: "close", OPEN: "open" };
            }
            static get LOCAL_STORAGE_KEY() {
                return "subscription-form-status";
            }
            static get STATUS_STATE() {
                return { closed: "CLOSED", error: "ERROR", loaded: "LOADED", pending: "PENDING", shown: "SHOWN", success: "SUCCESS" };
            }
            static get ERROR_CLASS() {
                return "error";
            }
            static get SUCCESS_CLASS() {
                return "success";
            }
            constructor({ rootElement: e, containerSelector: t, successTextSelector: n, errorTextSelector: o, emailTextSelector: r }) {
                super(),
                    (this.popup = e.parentElement),
                    (this.container = e.parentElement.querySelector(t)),
                    (this.successText = e.parentElement.querySelector(n)),
                    (this.errorText = e.parentElement.querySelector(o)),
                    (this.email = e.parentElement.querySelector(r)),
                    this.popup.addEventListener("close", () => {
                        this.emit(_.EVENTS.CLOSE), this.close();
                    }),
                    this.popup.addEventListener("open", () => {
                        this.emit(_.EVENTS.OPEN);
                    });
            }
            get status() {
                let e = localStorage.getItem(_.LOCAL_STORAGE_KEY);
                return e || (localStorage.setItem(_.LOCAL_STORAGE_KEY, _.STATUS_STATE.loaded), _.STATUS_STATE.loaded);
            }
            set status(e) {
                Object.values(_.STATUS_STATE).includes(e) && localStorage.setItem(_.LOCAL_STORAGE_KEY, e);
            }
            close() {
                (this.status = _.STATUS_STATE.closed), this.popup.close();
            }
            show() {
                (this.status = _.STATUS_STATE.shown), this.popup.show(), clearInterval(this.timer);
            }
            error(e) {
                (this.status = _.STATUS_STATE.error), this.successText.classList.toggle(_.ERROR_CLASS), this.container.classList.toggle(_.ERROR_CLASS), (this.email.innerText = e);
            }
            success(e) {
                (this.status = _.STATUS_STATE.success), this.successText.classList.toggle(_.SUCCESS_CLASS), this.container.classList.toggle(_.SUCCESS_CLASS), (this.email.innerText = e);
            }
            triggerCallback() {
                this.status === _.STATUS_STATE.pending && this.show();
            }
            triggerListenerStart(e = 2e4) {
                this.timer || (this.timer = setInterval(() => this.triggerCallback(), e));
            }
        },
        M = class extends L {
            static get EVENTS() {
                return { EMAIL: "email" };
            }
            static get VALIDATION_REGEXP() {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            }
            constructor({ rootElement: e }) {
                super(),
                    (this.container = e.parentElement),
                    (this.input = e.querySelector("input")),
                    (this.button = e.querySelector("button")),
                    this.button.addEventListener("click", () => {
                        let t = this.input.value.trim();
                        M.VALIDATION_REGEXP.test(t) && this.emit(M.EVENTS.EMAIL, t);
                    }),
                    ["keydown", "keyup"].forEach((t) => {
                        this.input.addEventListener(t, (n) => {
                            n.stopPropagation();
                        });
                    });
            }
            focus() {
                this.input.focus();
            }
        };
    function At() {
        let s = document.querySelector(".subscribe-popup");
        if (!s) return;
        let e = s.querySelector(".subscribe-popup__email-form"),
            t = s.querySelector(".subscribe-popup__close-form"),
            n = !1;
        function o() {
            return fetch("/api.json")
                .then((l) => l.json())
                .then((l) => l.token);
        }
        function r(l, d) {
            let c = JSON.stringify({ email: l, data: JSON.stringify(d), author_id: 1 }),
                u = "https://api.doka.guide/subscription";
            return o()
                .then((f) => fetch(u, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json", Authorization: f }, body: c }))
                .then((f) => {
                    if (!f.ok) throw f;
                    return f;
                });
        }
        let i = new _({
                rootElement: t,
                containerSelector: ".subscribe-popup__container",
                successTextSelector: ".subscribe-popup__success-text",
                errorTextSelector: ".subscribe-popup__error-text",
                emailTextSelector: ".subscribe-popup__email",
            }),
            a = new M({ rootElement: e });
        a.on(M.EVENTS.EMAIL, () => {
            setTimeout(() => {});
        }),
            i.on(_.EVENTS.OPEN, () => {
                setTimeout(() => {
                    a.focus();
                });
            }),
            i.on(_.EVENTS.CLOSE, () => {
                setTimeout(() => {});
            }),
            i.triggerListenerStart(),
            s.addEventListener("submit", (l) => {
                var u;
                if (Object.is(l.target, t) || (l.preventDefault(), n)) return;
                let c = new FormData(e).get("email") || ((u = l.submitter) == null ? void 0 : u.value);
                !(c && M.VALIDATION_REGEXP.test(c)) ||
                    ((n = !0),
                    r(c, { active: !1 })
                        .then(() => {
                            i.success(c);
                        })
                        .catch((f) => {
                            console.error(f), i.error(c);
                        })
                        .finally(() => {
                            n = !1;
                        }));
            });
    }
    try {
        At();
    } catch (s) {
        console.error(s);
    }
    function Ct(s, e, t, n, o) {
        switch (s) {
            case "gamma-left":
                return e === 0 ? (n === 1 && (o === 1 || o === 2) ? -1 : t) : e === 90 ? (o === 1 && (n === 0 || n === 1) ? -1 : t) : e === 180 ? (n === 0 && (o === 0 || o === 1) ? -1 : t) : o === 0 && (n === 1 || n === 2) ? -1 : t;
            case "gamma-right":
                return e === 0 ? (n === 0 && (o === 1 || o === 2) ? -1 : t) : e === 90 ? (o === 0 && (n === 0 || n === 1) ? -1 : t) : e === 180 ? (n === 1 && (o === 0 || o === 1) ? -1 : t) : o === 1 && (n === 1 || n === 2) ? -1 : t;
            case "zeta-right":
                return e === 0 || e === 180 ? ((n === 1 && o === 0) || (n === 0 && o === 2) ? -1 : t) : (n === 0 && o === 0) || (n === 2 && o === 1) ? -1 : t;
            case "zeta-left":
                return e === 0 || e === 180 ? ((n === 0 && o === 0) || (n === 1 && o === 2) ? -1 : t) : (n === 2 && o === 0) || (n === 0 && o === 1) ? -1 : t;
            case "theta":
                return e === 0 ? (o === 1 && (n === 0 || n === 2) ? -1 : t) : e === 90 ? (n === 0 && (o === 0 || o === 1) ? -1 : t) : e === 180 ? (o === 0 && (n === 0 || n === 2) ? -1 : t) : n === 0 && (o === 0 || o === 2) ? -1 : t;
            default:
                return t;
        }
    }
    function de(s) {
        let e = s,
            t = e.length,
            n = e[0].length;
        n > t && Ae(e, e.length - (n - t));
        for (let o = 0; o < t / 2; o++)
            for (let r = o; r < t - o - 1; r++) {
                let i = e[o][r];
                (e[o][r] = e[t - r - 1][o]), (e[t - r - 1][o] = e[t - o - 1][t - r - 1]), (e[t - o - 1][t - r - 1] = e[r][t - o - 1]), (e[r][t - o - 1] = i);
            }
        return e;
    }
    function xt(s, e) {
        let t = s;
        switch (e) {
            case 270:
                t = de(t);
            case 180:
                t = de(t);
            case 90:
                t = de(t);
            case 0:
                return t;
        }
    }
    function Nt(s, e, t, n, o) {
        let r = [];
        for (let i = 0; i < e; i++) {
            let a = [];
            for (let l = 0; l < t; l++) a.push(Ct(s, n, o, l, i));
            r.push(a);
        }
        switch (s) {
            case "gamma-left":
            case "gamma-right":
            case "zeta-right":
            case "zeta-left":
            case "theta":
                return xt(r, n);
            default:
                return r;
        }
    }
    function qt(s, e = 1) {
        for (let t = 0; t < e; t++) {
            let n = [];
            for (let o = 0; o < s[0].length; o++) n.push(-1);
            s.push(n);
        }
    }
    function Ae(s, e = 1) {
        e > s.length && (s.reverse(), qt(s, e - s.length + 1), s.reverse());
    }
    function Ot(s, e) {
        let t = 0,
            n = "",
            o = 0,
            r = 0;
        return (
            s.classList.forEach((a) => {
                a.includes("person-badges__shape--angle-")
                    ? (t = Number.parseInt(a.replace("person-badges__shape--angle-", "")))
                    : a.includes("person-badges__shape--height-")
                    ? (o = Number.parseInt(a.replace("person-badges__shape--height-", "")))
                    : a.includes("person-badges__shape--width-")
                    ? (r = Number.parseInt(a.replace("person-badges__shape--width-", "")))
                    : a.includes("person-badges__shape--") && (n = a.replace("person-badges__shape--", ""));
            }),
            Nt(n, o, r, t, e)
        );
    }
    function Ht(s) {
        let e = [[]];
        for (let t = 0; t < s; t++) e[0].push(-1);
        return e;
    }
    function It(s, e, t, n) {
        if (t + s[0].length <= e[0].length)
            for (let o = 0; o < s.length; o++) {
                let r = s[o];
                for (let i = 0; i < r.length; i++) e[o + n][i + t] < 0 && (e[o + n][i + t] = r[i]);
            }
    }
    function Rt(s, e, t, n) {
        let o = !0;
        for (let r = 0; r < s.length; r++) {
            let i = s[r];
            for (let a = 0; a < i.length; a++)
                if (i[a] >= 0 && e[r + n][a + t] >= 0) {
                    o = !1;
                    break;
                }
            if (!o) break;
        }
        return o;
    }
    function Mt(s, e) {
        let t = e[0].length,
            n = s[0].length;
        for (let o = e.length - 1; o >= 0; o--) {
            Ae(e, o + s.length);
            for (let r = 0; r < t - n; r++) if (Rt(s, e, r, o)) return { x: r, y: o };
        }
        return { x: 0, y: 0 };
    }
    function Dt(s) {
        return s.filter((e) => {
            for (let t = 0; t < e.length; t++) if (e[t] >= 0) return !0;
            return !1;
        });
    }
    function Bt(s) {
        let e = Ht(7);
        s.forEach((n) => {
            let o = Mt(n, e);
            It(n, e, o.x, o.y);
        }),
            (e = Dt(e));
        let t = {};
        return (
            e.forEach((n, o) => {
                for (let r = 0; r < n.length; r++) {
                    let i = n[r];
                    if (i >= 0) {
                        let a = 0;
                        s[i][0][0] === -1 &&
                            s[i][0].forEach((l) => {
                                l === -1 && a++;
                            }),
                            t[i] || (t[i] = { x: r - a, y: o });
                    }
                }
            }),
            { coords: t, rowCount: e.length }
        );
    }
    function Pt(s, e) {
        s.forEach((t, n) => {
            t.parentElement.style = `--start-col: ${e[n].x + 1}; --start-row: ${e[n].y + 1};`;
        });
    }
    window.addEventListener("load", () => {
        let s = document.querySelector(".person-badges");
        if (!s) return;
        let e = [],
            t = [];
        s.querySelectorAll(".person-badges__shape").forEach((o, r) => {
            e.push(Ot(o, r)), t.push(o);
        });
        let n = Bt(e);
        (s.style = `--row-count: ${n.rowCount}`), Pt(t, n.coords);
    });
    function Ft(s) {
        let e = s.querySelector(".person-badges__default-image"),
            t = s.querySelector(".person-badges__pop-up-container");
        s.addEventListener("mouseenter", () => {
            Ce(t);
        }),
            e.addEventListener("focus", () => {
                Ce(t);
            }),
            s.addEventListener("mouseleave", () => {
                he(t);
            }),
            e.addEventListener("blur", () => {
                he(t);
            }),
            e.addEventListener("keydown", (n) => {
                n.key === "Escape" && he(t);
            });
    }
    function Ce(s) {
        s.style.display = "grid";
    }
    function he(s) {
        s.style.display = "none";
    }
    window.addEventListener("load", () => {
        document.querySelectorAll(".person-badges__sign").forEach((e) => {
            Ft(e);
        });
    });
    function Ut(s, e) {
        for (let t of s) t.setAttribute("tabindex", e);
    }
    function Ne(s) {
        let e = [];
        e.push(s.getElementsByClassName("block-code__inner")), e.push(s.getElementsByClassName("block-code__copy-button")), e.push(s.getElementsByTagName("a")), e.push(s.getElementsByTagName("input"));
        for (let t of s.getElementsByTagName("iframe")) e.push(t.contentWindow.document.getElementsByTagName("a")), e.push(t.contentWindow.document.getElementsByTagName("input"));
        return e;
    }
    function Z(s, e) {
        Ne(s).forEach((n) => {
            Ut(n, e);
        });
    }
    function xe(s) {
        let t = s.target.parentNode.parentNode,
            n = Ne(t);
        if (s.shiftKey && s.key === "Tab") {
            let o = n.length - 1,
                r = n[o].length - 1;
            n[o][r].focus();
        } else s.key === "Tab" && n[0][0].focus();
    }
    function Vt(s) {
        let e = s.target;
        e.toggleAttribute("data-collapsed");
        let t = e.getAttribute("data-collapsed") === "",
            n = e.parentNode,
            o = n.parentNode;
        o.classList.toggle("answer__content--open"),
            t
                ? ((e.innerHTML = "+ \u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C"), e.removeEventListener("keydown", xe), Z(n, "-1"), window.scrollTo(0, o.offsetTop - 150))
                : ((e.innerHTML = "\u2013 \u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"), e.addEventListener("keydown", xe), Z(n, "0"));
    }
    window.addEventListener("load", () => {
        let s = document.getElementsByClassName("answer__toggler");
        for (let t of s) (t.onclick = Vt), Z(t.parentNode, "-1");
        let e = document.URL.split("#")[1];
        if (e) {
            let t = document.getElementById(e),
                n = t.parentNode;
            if (n.classList.contains("answer__summary")) {
                let o = n.getElementsByClassName("answer__toggler")[0];
                o.setAttribute("data-collapsed", !0);
                let r = n.parentNode;
                r.classList.toggle("answer__content--open"), (o.innerHTML = "+ \u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C"), Z(n, "0"), window.scrollTo(0, r.offsetTop + t.offsetTop - 150);
            }
        }
    });
    var qe = "pages-list";
    var q = {};
    function ee() {
        let s = localStorage.getItem("subscription-form-status"),
            e = localStorage.getItem("cookie-notification");
        s && e && s === "LOADED" && e === "true" && localStorage.setItem("subscription-form-status", "PENDING");
    }
    var Oe = "page-from-the-list",
        He = "pages-amount-enough",
        Ie = "average-duration-enough",
        Re = "max-scroll-deepness-enough",
        F = {};
    F[Oe] = ee;
    F[He] = ee;
    F[Ie] = ee;
    F[Re] = ee;
    var $t = ["/about/", "/people/", "/manifesto/"];
    function Kt(s) {
        let e = s == null ? void 0 : s.visited;
        if (e) {
            let t = Object.keys(e);
            for (let r = 0; r < t.length; r++) if ($t.includes(t[r])) return Oe;
            if (t.length > 5) return He;
            if (Object.values(e).reduce((r, i) => r + i.duration, 0) / t.length > 1e4 * 4.5) return Ie;
            if (Math.max(...Object.values(e).map((r) => r.scrollDeepness)) > 0.5) return Re;
        }
    }
    function Wt(s, e) {
        var t;
        (t = F[s]) == null || t.call(F, e);
    }
    function fe(s, e, t, n, o) {
        let r = s[e][t];
        r ? (s[e][t] = o(r, n)) : (s[e][t] = n);
    }
    var zt = Me();
    function Me() {
        let s = setInterval(() => {
            let e = localStorage.getItem(qe),
                t = window.location.pathname,
                n = Date.now(),
                o = window.scrollY / document.getElementsByTagName("body")[0].clientHeight;
            (q.visited = e ? JSON.parse(e) : {}),
                Object.keys(q.visited).includes(t)
                    ? (fe(q.visited, t, "duration", 1e4, (i, a) => i + a), fe(q.visited, t, "loaded", n, (i, a) => a), fe(q.visited, t, "scrollDeepness", o, (i, a) => (a > i ? a : i)))
                    : (q.visited[t] = { duration: 0, loaded: n, scrollDeepness: o });
            let r = Kt(q);
            r && (Wt(r, q), zt()), localStorage.setItem(qe, JSON.stringify(q.visited));
        }, 1e4);
        return () => clearInterval(s);
    }
    try {
        Me();
    } catch (s) {
        console.error(s);
    }
})();
