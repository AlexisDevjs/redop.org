import type { MouseEvent } from "react";
import GalleryImage from "./GalleryImage";
import { ExpandIcon } from "./icons";
import type { GalleryImageView } from "./types";

interface GalleryCardProps {
	image: GalleryImageView;
	href: string;
	onOpen?: () => void;
	sizes: string;
	/** Fixed crop for the preview mosaic; omit for natural masonry. */
	aspect?: string;
	priority?: boolean;
}

export default function GalleryCard({
	image,
	href,
	onOpen,
	sizes,
	aspect,
	priority = false,
}: GalleryCardProps) {
	// Plain clicks open the lightbox in place; modifier clicks, middle clicks
	// and "open in new tab" keep the real permalink behavior.
	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
		if (!onOpen) return;
		if (
			event.button !== 0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ||
			event.altKey
		) {
			return;
		}
		event.preventDefault();
		onOpen?.();
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className="group flex w-full flex-col text-left"
			aria-label={
				onOpen
					? `Ver fotografía: ${image.title}`
					: `Ir a la galería: ${image.title}`
			}
		>
			<span
				className={`relative block overflow-hidden border border-outline bg-raised ${
					aspect ?? ""
				}`}
			>
				<GalleryImage
					image={image}
					sizes={sizes}
					priority={priority}
					fill={Boolean(aspect)}
					className="transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
				/>
				<span
					aria-hidden="true"
					className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
				/>
				<span
					aria-hidden="true"
					className="absolute right-2.5 bottom-2.5 grid size-8.5 place-items-center rounded-full border border-white/35 bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
				>
					<ExpandIcon />
				</span>
			</span>
		</a>
	);
}
