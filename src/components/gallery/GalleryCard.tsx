import type { MouseEvent } from "react";
import GalleryImage from "./GalleryImage";
import { ExpandIcon } from "./icons";
import type { GalleryImageView } from "./types";

interface GalleryCardProps {
	image: GalleryImageView;
	index?: number;
	href: string;
	onOpen: () => void;
	sizes: string;
	/** Fixed crop for the preview mosaic; omit for natural masonry. */
	aspect?: string;
	priority?: boolean;
	showDetails?: boolean;
}

export default function GalleryCard({
	image,
	index,
	href,
	onOpen,
	sizes,
	aspect,
	priority = false,
	showDetails = false,
}: GalleryCardProps) {
	// Plain clicks open the lightbox in place; modifier clicks, middle clicks
	// and "open in new tab" keep the real permalink behavior.
	const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
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
		onOpen();
	};

	return (
		<a
			href={href}
			onClick={handleClick}
			className="group flex w-full flex-col text-left"
			aria-label={
				index === undefined
					? `Ver fotografía: ${image.title}`
					: `Ver fotografía ${index + 1}: ${image.title}`
			}
		>
			<span
				className={`relative block overflow-hidden rounded-sm border border-outline bg-raised ${
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
				{showDetails && index !== undefined && (
					<span className="absolute top-2.5 left-2.5 font-display text-[10px] font-medium tracking-[0.16em] text-white/85 tabular-nums [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]">
						{String(index + 1).padStart(2, "0")}
					</span>
				)}
			</span>
			{showDetails && (
				<span className="mt-2.5 flex items-baseline justify-between gap-3">
					<span className="block min-w-0 truncate font-display text-[12px] font-medium text-content">
						{image.title}
					</span>
					<span className="shrink-0 text-[9px] tracking-[0.14em] text-muted uppercase">
						{image.category}
					</span>
				</span>
			)}
		</a>
	);
}
