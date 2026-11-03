import { getImage } from "astro:assets";
import type { GalleryImageView } from "../components/gallery/types";
import { type GalleryItem, gallery } from "../data/gallery";

const WIDTHS = [240, 400, 640, 900, 1200, 1600];

/**
 * Resolve Astro images into a plain, serializable array for React.
 * `ImageMetadata` never crosses the island boundary.
 */
export async function getGalleryImages(
	items: GalleryItem[] = gallery,
): Promise<GalleryImageView[]> {
	return Promise.all(
		items.map(async ({ id, image, title, alt, category, focalPoint }) => {
			const [view, placeholder] = await Promise.all([
				getImage({
					src: image,
					widths: WIDTHS,
					format: "webp",
					quality: 82,
				}),
				getImage({ src: image, width: 24, format: "webp", quality: 45 }),
			]);

			return {
				id,
				src: view.src,
				srcSet: view.srcSet.attribute,
				width: image.width,
				height: image.height,
				blurUrl: placeholder.src,
				alt,
				title,
				category,
				focalPoint,
			};
		}),
	);
}
