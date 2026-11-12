import { useEffect, useMemo, useState } from "react";
import { galleryPhotoPath, photoIdFromPath } from "../../lib/gallery-url";
import GalleryCard from "./GalleryCard";
import Lightbox from "./Lightbox";
import {
	type GalleryFilter,
	type GalleryImageView,
	galleryFilters,
} from "./types";

interface GalleryPageProps {
	images: GalleryImageView[];
}

const SIZES = "(min-width: 1051px) 31vw, (min-width: 560px) 46vw, 92vw";

function categoryFromParam(value: string | null): GalleryFilter | null {
	if (!value) return null;
	return galleryFilters.includes(value as GalleryFilter)
		? (value as GalleryFilter)
		: null;
}

export default function GalleryPage({ images }: GalleryPageProps) {
	const [category, setCategory] = useState<GalleryFilter>("Todos");
	const [activeId, setActiveId] = useState<string | null>(null);

	const filtered = useMemo(
		() =>
			category === "Todos"
				? images
				: images.filter((image) => image.category === category),
		[images, category],
	);

	const activeIndex = activeId
		? filtered.findIndex((image) => image.id === activeId)
		: -1;

	useEffect(() => {
		const sync = () => {
			const params = new URLSearchParams(window.location.search);
			const photoId = photoIdFromPath(window.location.pathname);
			const photo = photoId
				? images.find((image) => image.id === photoId)
				: undefined;

			const nextCategory =
				categoryFromParam(params.get("categoria")) ?? "Todos";

			setCategory(nextCategory);
			setActiveId(photo ? photo.id : null);
		};

		sync();
		window.addEventListener("popstate", sync);
		return () => window.removeEventListener("popstate", sync);
	}, [images]);

	const buildCategoryUrl = (nextCategory: GalleryFilter) => {
		const url = new URL(window.location.href);
		url.pathname = "/galeria";
		url.hash = "";
		url.searchParams.delete("foto");
		if (nextCategory === "Todos") url.searchParams.delete("categoria");
		else url.searchParams.set("categoria", nextCategory);
		return url;
	};

	const changeCategory = (next: GalleryFilter) => {
		setCategory(next);
		setActiveId(null);
		window.history.replaceState(null, "", buildCategoryUrl(next));
	};

	const openPhoto = (id: string) => {
		setActiveId(id);
		window.history.pushState(
			{ redopsGallery: "photo" },
			"",
			galleryPhotoPath(id),
		);
	};

	const changePhoto = (nextIndex: number) => {
		const next = filtered[nextIndex];
		if (!next) return;
		setActiveId(next.id);
		window.history.replaceState(
			{ redopsGallery: "photo" },
			"",
			galleryPhotoPath(next.id),
		);
	};

	const closePhoto = () => {
		setActiveId(null);
		if (window.history.state?.redopsGallery === "photo") {
			window.history.back();
			return;
		}
		window.history.replaceState(null, "", buildCategoryUrl(category));
	};

	return (
		<>
			<div className="sticky top-22 z-10 border-y border-outline bg-header backdrop-blur-[15px] max-md:top-18.5">
				<div className="site-container flex items-center gap-2 overflow-x-auto py-3 scrollbar-none [&::-webkit-scrollbar]:hidden">
					<span className="mr-2 hidden shrink-0 text-[9px] tracking-[0.18em] text-muted uppercase md:block">
						Filtrar
					</span>
					{galleryFilters.map((filter) => {
						const selected = filter === category;
						return (
							<button
								key={filter}
								type="button"
								onClick={() => changeCategory(filter)}
								aria-pressed={selected}
								className={`flex min-h-11 shrink-0 items-center gap-2 rounded-[7px] border px-3.5 text-[11px] font-semibold whitespace-nowrap ${
									selected
										? "border-brand bg-brand text-white"
										: "border-outline bg-surface text-muted hover:border-muted hover:text-content"
								}`}
							>
								{filter}
							</button>
						);
					})}
				</div>
			</div>

			<div className="site-container py-8 max-md:py-6">
				{filtered.length === 0 ? (
					<div className="grid min-h-60 place-items-center border border-dashed border-outline text-center">
						<div className="max-w-90 px-6">
							<p className="font-display text-[18px] text-content">
								No hay fotografías en esta categoría.
							</p>
							<button
								type="button"
								onClick={() => changeCategory("Todos")}
								className="mt-4 min-h-11 text-[12px] font-semibold text-accent-red underline underline-offset-4"
							>
								Ver todas las fotografías
							</button>
						</div>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-3.5">
						{filtered.map((image) => (
							<div key={image.id}>
								<GalleryCard
									image={image}
									href={galleryPhotoPath(image.id)}
									aspect="aspect-[4/3]"
									sizes={SIZES}
									onOpen={() => openPhoto(image.id)}
								/>
							</div>
						))}
					</div>
				)}
			</div>

			{activeIndex >= 0 && (
				<Lightbox
					images={filtered}
					index={activeIndex}
					onIndexChange={changePhoto}
					onClose={closePhoto}
				/>
			)}
		</>
	);
}
