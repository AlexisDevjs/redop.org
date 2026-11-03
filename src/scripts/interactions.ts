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
const nav = document.querySelector("#main-nav");
const closeMenu = () => {
	nav?.classList.remove("open");
	menu?.setAttribute("aria-expanded", "false");
	menu?.setAttribute("aria-label", "Abrir menú");
};
menu?.addEventListener("click", () => {
	const open = menu.getAttribute("aria-expanded") !== "true";
	menu.setAttribute("aria-expanded", String(open));
	menu.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
	nav?.classList.toggle("open", open);
});
nav?.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", closeMenu);
});
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") closeMenu();
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
