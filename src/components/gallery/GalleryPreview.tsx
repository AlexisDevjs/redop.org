import { useEffect, useMemo, useRef, useState } from "react";
import { galleryPhotoPath, photoIdFromPath } from "../../lib/gallery-url";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";
import type { GalleryImageView } from "./types";

interface GalleryPreviewProps {
	images: GalleryImageView[];
}

const SIZES = "(min-width: 1051px) 34vw, (min-width: 761px) 44vw, 92vw";

export default function GalleryPreview({ images }: GalleryPreviewProps) {
	const cards = useMemo(() => images.slice(0, 6), [images]);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const originRef = useRef("/");

	useEffect(() => {
		const sync = () => {
			const id = photoIdFromPath(window.location.pathname);
			const index = id ? cards.findIndex((image) => image.id === id) : -1;
			if (index < 0) {
				originRef.current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
			}
			setActiveIndex(index >= 0 ? index : null);
		};

		sync();
		window.addEventListener("popstate", sync);
		return () => window.removeEventListener("popstate", sync);
	}, [cards]);

	const openPhoto = (index: number) => {
		const image = cards[index];
		if (!image) return;
		setActiveIndex(index);
		window.history.pushState(
			{ redopsGallery: "photo" },
			"",
			galleryPhotoPath(image.id),
		);
	};

	const changePhoto = (index: number) => {
		const image = cards[index];
		if (!image) return;
		setActiveIndex(index);
		window.history.replaceState(
			{ redopsGallery: "photo" },
			"",
			galleryPhotoPath(image.id),
		);
	};

	const closePhoto = () => {
		setActiveIndex(null);
		if (window.history.state?.redopsGallery === "photo") {
			window.history.back();
			return;
		}
		window.history.replaceState(null, "", originRef.current);
	};

	const renderCard = (index: number) => {
		const image = cards[index];
		if (!image) return null;

		return (
			<GalleryCard
				key={image.id}
				image={image}
				href={galleryPhotoPath(image.id)}
				aspect="aspect-[4/3]"
				sizes={SIZES}
				onOpen={() => openPhoto(index)}
			/>
		);
	};

	return (
		<>
			<div className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 min-[1051px]:grid-cols-3 min-[1051px]:gap-3.5">
				{cards.map((_, index) => renderCard(index))}
			</div>
			{activeIndex !== null && (
				<Lightbox
					images={cards}
					index={activeIndex}
					onIndexChange={changePhoto}
					onClose={closePhoto}
				/>
			)}
		</>
	);
}
