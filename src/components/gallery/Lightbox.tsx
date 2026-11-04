import {
	type KeyboardEvent,
	type PointerEvent,
	useEffect,
	useRef,
	useState,
} from "react";
import GalleryImage from "./GalleryImage";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";
import type { GalleryImageView } from "./types";

interface LightboxProps {
	images: GalleryImageView[];
	index: number;
	onIndexChange: (index: number) => void;
	onClose: () => void;
}

export default function Lightbox({
	images,
	index,
	onIndexChange,
	onClose,
}: LightboxProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);
	const pointerRef = useRef<{ x: number; y: number } | null>(null);
	const [direction, setDirection] = useState<1 | -1 | null>(null);

	const image = images[index];
	const total = images.length;

	const go = async (next: number) => {
		if (total === 0) return;
		const nextIndex = (next + total) % total;
		setDirection(
			nextIndex > index || (index === total - 1 && nextIndex === 0) ? 1 : -1,
		);

		const preload = new window.Image();
		preload.src = images[nextIndex].src;
		try {
			await preload.decode();
		} catch {
			// The browser can still display the image when decoding is unavailable.
		}
		onIndexChange(nextIndex);
	};

	useEffect(() => {
		triggerRef.current = document.activeElement as HTMLElement | null;
		const dialog = dialogRef.current;
		if (dialog && !dialog.open) dialog.showModal();

		return () => {
			if (dialog?.open) dialog.close();
			triggerRef.current?.focus?.();
		};
	}, []);

	useEffect(() => {
		const reduced = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		dialogRef.current
			?.querySelector<HTMLElement>(`[data-thumb="${index}"]`)
			?.scrollIntoView({
				block: "nearest",
				inline: "center",
				behavior: reduced ? "auto" : "smooth",
			});
	}, [index]);

	if (!image) return null;

	const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			go(index - 1);
		} else if (event.key === "ArrowRight") {
			event.preventDefault();
			go(index + 1);
		} else if (event.key === "Home") {
			event.preventDefault();
			go(0);
		} else if (event.key === "End") {
			event.preventDefault();
			go(total - 1);
		}
	};

	const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
		pointerRef.current = { x: event.clientX, y: event.clientY };
		event.currentTarget.setPointerCapture(event.pointerId);
	};

	const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
		const start = pointerRef.current;
		pointerRef.current = null;
		if (!start) return;
		const dx = event.clientX - start.x;
		const dy = event.clientY - start.y;
		if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
			go(index + (dx < 0 ? 1 : -1));
		}
	};

	return (
		<dialog
			ref={dialogRef}
			aria-label="Visor de fotografías"
			onKeyDown={handleKeyDown}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
			className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-[#08090a] p-0 text-white backdrop:bg-black/85"
		>
			<div className="grid h-dvh w-full grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden">
				<header className="flex min-h-18 shrink-0 items-center gap-4 border-b border-white/10 px-3 py-3 sm:px-5">
					<div className="min-w-0 flex-1">
						<p className="text-[9px] tracking-[0.18em] text-white/55 uppercase">
							{image.category}
						</p>
						<p className="mt-0.5 truncate font-display text-[13px] font-medium text-white">
							{image.title}
						</p>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Cerrar visor"
						className="grid size-11 shrink-0 place-items-center rounded-full border border-white/20 bg-white/5 text-white hover:bg-white/15"
					>
						<CloseIcon />
					</button>
				</header>

				<div className="relative flex min-h-0 min-w-0 items-stretch">
					<div
						className="flex min-h-0 flex-1 touch-pan-y items-center justify-center overflow-hidden px-3 py-4 select-none sm:px-16"
						onPointerDown={handlePointerDown}
						onPointerUp={handlePointerUp}
					>
						<div className="lightbox-image-frame relative h-full min-h-0 w-full min-w-0 overflow-hidden">
							<div
								key={image.id}
								className={`absolute inset-0 ${
									direction === null
										? ""
										: direction === 1
											? "motion-safe:animate-gallery-slide-left motion-reduce:animate-none"
											: "motion-safe:animate-gallery-slide-right motion-reduce:animate-none"
								}`}
							>
								<GalleryImage
									image={image}
									sizes="100vw"
									priority
									contain
									className="size-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)]"
								/>
							</div>
						</div>
					</div>

					<button
						type="button"
						onClick={() => go(index - 1)}
						aria-label="Fotografía anterior"
						className="absolute top-1/2 left-2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm hover:bg-black/70 sm:left-4"
					>
						<ChevronLeftIcon />
					</button>
					<button
						type="button"
						onClick={() => go(index + 1)}
						aria-label="Fotografía siguiente"
						className="absolute top-1/2 right-2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm hover:bg-black/70 sm:right-4"
					>
						<ChevronRightIcon />
					</button>
				</div>

				<footer className="min-w-0 shrink-0 border-t border-white/10 px-3 pt-3 pb-4 sm:px-5">
					<p className="mx-auto mb-3 min-h-[2.75rem] max-w-3xl overflow-hidden text-center text-[11px] leading-normal text-white/60">
						{image.alt}
					</p>
					<div className="gallery-thumbnails mx-auto max-w-4xl overflow-x-auto py-1">
						<div className="gallery-thumbnails-track flex min-w-full w-max justify-center gap-2">
							{images.map((thumb, thumbIndex) => (
								<button
									key={thumb.id}
									type="button"
									data-thumb={thumbIndex}
									onClick={() => go(thumbIndex)}
									aria-label={`Ver ${thumb.title}`}
									aria-current={thumbIndex === index ? "true" : undefined}
									className={`relative h-14 w-11 shrink-0 overflow-hidden rounded-[3px] border transition-opacity ${
										thumbIndex === index
											? "border-accent-red opacity-100"
											: "border-white/15 opacity-50 hover:opacity-80"
									}`}
								>
									<img
										src={thumb.src}
										srcSet={thumb.srcSet}
										sizes="44px"
										alt=""
										width={thumb.width}
										height={thumb.height}
										loading="lazy"
										decoding="async"
										draggable={false}
										className="size-full object-cover"
									/>
								</button>
							))}
						</div>
					</div>
				</footer>
			</div>
		</dialog>
	);
}
