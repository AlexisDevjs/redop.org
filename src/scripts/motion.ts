import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const root = document.documentElement;
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

let lenis: Lenis | null = null;
let locks = 0;

/** Pause page scrolling (menus, dialogs). Safe to call when Lenis is off. */
export function lockScroll() {
	locks += 1;
	if (locks > 1) return;
	lenis?.stop();
	root.classList.add("scroll-locked");
}

/** Release one scroll lock. */
export function unlockScroll() {
	locks = Math.max(0, locks - 1);
	if (locks > 0) return;
	lenis?.start();
	root.classList.remove("scroll-locked");
}

function initLenis() {
	if (reduce.matches) return;

	lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: false });
	lenis.on("scroll", ScrollTrigger.update);
	gsap.ticker.add((time) => lenis?.raf(time * 1000));
	gsap.ticker.lagSmoothing(0);
}

function initAnchors() {
	document.addEventListener("click", (event) => {
		if (
			event.defaultPrevented ||
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		) {
			return;
		}

		const anchor = (event.target as Element | null)?.closest?.(
			"a[href]",
		) as HTMLAnchorElement | null;
		if (!anchor) return;

		const url = new URL(anchor.href, window.location.href);
		if (url.origin !== window.location.origin) return;
		if (url.pathname !== window.location.pathname) return;
		if (!url.hash || url.hash === "#") return;

		let target: HTMLElement | null = null;
		try {
			target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
		} catch {
			target = null;
		}
		if (!target) return;

		event.preventDefault();

		// Lenis also subtracts `scroll-margin-top` and `scroll-padding-top`,
		// which are already set to 100px in global.css. Pass a numeric target
		// so the header offset is applied exactly once.
		const header = document.querySelector<HTMLElement>("[data-header]");
		const top = Math.max(
			0,
			target.getBoundingClientRect().top +
				window.scrollY -
				((header?.offsetHeight ?? 0) + 16),
		);

		if (lenis) {
			lenis.scrollTo(top, { duration: 1.1 });
		} else {
			window.scrollTo({
				top,
				behavior: reduce.matches ? "auto" : "smooth",
			});
		}
		window.history.pushState(null, "", url.hash);
	});
}

function initDialogs() {
	let locked = false;

	const sync = () => {
		const open = document.querySelector<HTMLDialogElement>("dialog[open]");
		const isOpen = Boolean(open);
		if (isOpen === locked) return;
		locked = isOpen;

		if (isOpen) {
			lockScroll();
			if (open?.id === "contact-dialog") {
				gsap.fromTo(
					open,
					{ opacity: 0, y: 18, scale: 0.98 },
					{ opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" },
				);
			}
		} else {
			unlockScroll();
		}
	};

	new MutationObserver(sync).observe(document.body, {
		attributes: true,
		attributeFilter: ["open"],
		subtree: true,
	});
	sync();
}

function initSplits() {
	for (const el of document.querySelectorAll<HTMLElement>("[data-split]")) {
		const words = el.querySelectorAll<HTMLElement>(".split-word > span");
		if (!words.length) continue;

		const custom = Number(el.dataset.splitStagger);
		const isHero = Boolean(el.closest("#inicio"));
		const stagger =
			Number.isFinite(custom) && custom > 0 ? custom : isHero ? 0.07 : 0.035;

		const vars = {
			y: 0,
			opacity: 1,
			duration: 0.9,
			ease: "expo.out",
			stagger,
		};

		if (isHero) {
			gsap.to(words, { ...vars, delay: 0.12 });
		} else {
			gsap.to(words, {
				...vars,
				scrollTrigger: { trigger: el, start: "top 88%", once: true },
			});
		}
	}
}

function initReveals() {
	const elements = gsap.utils.toArray<HTMLElement>("[data-reveal]");
	if (!elements.length) return;

	gsap.set(elements, { y: 24, opacity: 0 });

	// The hero is visible on load, so it can't wait for a scroll trigger.
	const hero = document.querySelector<HTMLElement>("#inicio");
	const heroElements = hero ? elements.filter((el) => hero.contains(el)) : [];
	const rest = elements.filter((el) => !heroElements.includes(el));

	if (heroElements.length) {
		gsap.to(heroElements, {
			y: 0,
			opacity: 1,
			duration: 0.8,
			ease: "power3.out",
			stagger: 0.12,
			delay: 0.5,
		});
	}

	if (!rest.length) return;

	ScrollTrigger.batch(rest, {
		start: "top 88%",
		once: true,
		onEnter: (batch) =>
			gsap.to(batch, {
				y: 0,
				opacity: 1,
				duration: 0.75,
				ease: "power3.out",
				stagger: 0.06,
				overwrite: true,
			}),
	});
}

function initParallax() {
	const hero = document.querySelector<HTMLElement>("#inicio");
	if (!hero) return;

	for (const layer of hero.querySelectorAll<HTMLElement>("[data-parallax]")) {
		const amount = Number.parseFloat(layer.dataset.parallax ?? "0");
		if (!amount) continue;
		gsap.to(layer, {
			yPercent: amount,
			ease: "none",
			scrollTrigger: {
				trigger: hero,
				start: "top top",
				end: "bottom top",
				scrub: true,
			},
		});
	}
}

function initGalleryPin() {
	const mm = gsap.matchMedia();

	mm.add(
		"(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
		() => {
			const pin = document.querySelector<HTMLElement>("[data-gallery-pin]");
			const track = pin?.querySelector<HTMLElement>("[data-gallery-track]");
			if (!pin || !track) return;

			const distance = () => Math.max(0, track.scrollWidth - pin.clientWidth);
			if (distance() < 80) return;

			const tween = gsap.to(track, {
				x: () => -distance(),
				ease: "none",
				scrollTrigger: {
					trigger: pin,
					start: "top top+=100",
					end: () => `+=${distance()}`,
					pin: true,
					scrub: 0.8,
					anticipatePin: 1,
					invalidateOnRefresh: true,
				},
			});

			return () => {
				tween.scrollTrigger?.kill();
				tween.kill();
				gsap.set(track, { clearProps: "transform" });
			};
		},
	);
}

function boot() {
	root.dataset.motion = "ready";

	initLenis();
	initAnchors();
	initDialogs();
	initSplits();
	initReveals();
	initParallax();
	initGalleryPin();

	ScrollTrigger.refresh();

	window.addEventListener("load", () => ScrollTrigger.refresh(), {
		once: true,
	});
}

if (reduce.matches) {
	root.classList.remove("anim");
	root.dataset.motion = "reduced";
} else if (document.fonts?.status === "loaded") {
	boot();
} else {
	const timeout = new Promise((resolve) => window.setTimeout(resolve, 700));
	Promise.race([document.fonts?.ready ?? timeout, timeout]).then(boot);
}
