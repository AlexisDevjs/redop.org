/** Canonical permalink for a gallery photo. */
export function galleryPhotoPath(id: string): string {
	return `/galeria/${encodeURIComponent(id)}`;
}

/** Photo id from `/galeria/<id>`, or `null` for any other path. */
export function photoIdFromPath(pathname: string): string | null {
	const match = /^\/galeria\/([^/]+)\/?$/.exec(pathname);
	if (!match) return null;

	try {
		return decodeURIComponent(match[1]);
	} catch {
		return null;
	}
}
