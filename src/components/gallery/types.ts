export type GalleryCategory = "Videovigilancia" | "Redes" | "Instalaciones";

export type GalleryFilter = "Todos" | GalleryCategory;

export const galleryFilters: GalleryFilter[] = [
	"Todos",
	"Videovigilancia",
	"Redes",
	"Instalaciones",
];

/**
 * Serializable view model. Astro resolves every image with `getImage` and
 * passes plain strings and numbers to React, never `ImageMetadata`.
 */
export interface GalleryImageView {
	id: string;
	src: string;
	srcSet: string;
	width: number;
	height: number;
	blurUrl: string;
	alt: string;
	title: string;
	category: GalleryCategory;
	focalPoint?: string;
}
