import { lockScroll, unlockScroll } from "./motion";

const themeToggle = document.querySelector<HTMLButtonElement>("#theme-toggle");
const updateThemeLabel = () => {
	const dark = document.documentElement.dataset.theme === "dark";
	document
		.querySelector('meta[name="theme-color"]')
		?.setAttribute("content", dark ? "#090a0b" : "#f5f6f8");
	themeToggle?.setAttribute(
		"aria-label",
		`Activar modo ${dark ? "claro" : "oscuro"}`,
	);
};
updateThemeLabel();
themeToggle?.addEventListener("click", () => {
	const next =
		document.documentElement.dataset.theme === "dark" ? "light" : "dark";
	document.documentElement.dataset.theme = next;
	try {
		localStorage.setItem("redops-theme", next);
	} catch {}
	updateThemeLabel();
});

const menu = document.querySelector<HTMLButtonElement>("#menu-toggle");
const nav = document.querySelector<HTMLElement>("#main-nav");
const page = document.querySelector<HTMLElement>("#contenido");
const footer = document.querySelector<HTMLElement>("footer");
const desktop = window.matchMedia("(min-width: 48rem)");

let menuOpen = false;

const setMenu = (open: boolean, returnFocus = true) => {
	if (!nav || !menu || open === menuOpen) return;

	menuOpen = open;
	nav.classList.toggle("open", open);
	menu.setAttribute("aria-expanded", String(open));
	menu.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
	document.documentElement.classList.toggle("menu-open", open);
	page?.toggleAttribute("inert", open);
	footer?.toggleAttribute("inert", open);

	if (open) {
		lockScroll();
		nav.querySelector<HTMLAnchorElement>("a")?.focus();
	} else {
		unlockScroll();
		if (returnFocus) menu.focus();
	}
};

menu?.addEventListener("click", () => setMenu(!menuOpen));
nav?.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => setMenu(false, false));
});
desktop.addEventListener("change", (event) => {
	if (event.matches) setMenu(false, false);
});
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape" && menuOpen) setMenu(false);
});

const contact = document.querySelector<HTMLDialogElement>("#contact-dialog");
document
	.querySelector("#contact-open")
	?.addEventListener("click", () => contact?.showModal());
contact?.querySelectorAll("[data-close]").forEach((button) => {
	button.addEventListener("click", () => contact?.close());
});
contact?.addEventListener("click", (event) => {
	if (event.target === contact) {
		const box = contact.getBoundingClientRect();
		if (
			event.clientX < box.left ||
			event.clientX > box.right ||
			event.clientY < box.top ||
			event.clientY > box.bottom
		)
			contact.close();
	}
});
