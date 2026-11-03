"""Create privacy-redacted copies of the gallery photos.

The originals in src/assets/images are never modified. The published copies
live in src/assets/images/gallery and blur client names, screens, plates and
identifiable faces.

Run with: python scripts/redact-gallery.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / "src" / "assets" / "images"
TARGET = SOURCE / "gallery"

# Regions are (left, top, right, bottom) in source pixels.
REDACTIONS = {
    "monitoreo-hikvision-en-portatil.jpeg": {
        "regions": [(620, 250, 1030, 345)],
        "radius": 16,
        "feather": 6,
    },
    "monitoreo-multicamara-en-pantalla.jpeg": {
        "regions": [(0, 0, 1600, 300), (0, 300, 1600, 1040)],
        "radius": 30,
        "feather": 10,
    },
    "monitoreo-de-camaras-hikvision.jpeg": {
        "regions": [(0, 0, 1200, 1300)],
        "radius": 34,
        "feather": 10,
    },
    "sala-de-monitoreo.jpeg": {
        "regions": [(0, 290, 1600, 625), (340, 665, 1275, 945)],
        "radius": 30,
        "feather": 10,
    },
    "tecnico-configurando-equipos.jpeg": {
        "regions": [
            (585, 180, 885, 570),
            (60, 475, 405, 755),
            (475, 675, 985, 1165),
        ],
        "radius": 20,
        "feather": 8,
    },
    "instalacion-en-techo-de-bano.jpeg": {
        "regions": [(365, 765, 490, 905)],
        "radius": 18,
        "feather": 6,
    },
    "mantenimiento-en-techo-de-bano.jpeg": {
        "regions": [(355, 575, 485, 720)],
        "radius": 18,
        "feather": 6,
    },
    "instalacion-de-cableado-exterior.jpeg": {
        "regions": [(45, 385, 165, 440)],
        "radius": 14,
        "feather": 4,
    },
    "tecnico-con-camara-ptz.jpeg": {
        "regions": [(635, 390, 765, 520)],
        "radius": 18,
        "feather": 6,
    },
    "camara-ptz-hikvision-doble-lente.jpeg": {
        "regions": [(440, 335, 590, 485)],
        "radius": 18,
        "feather": 6,
    },
    "instalador-con-camara-hikvision.jpeg": {
        "regions": [(585, 235, 880, 575)],
        "radius": 18,
        "feather": 6,
    },
}


def redact(image: Image.Image, regions: list[tuple[int, int, int, int]], radius: int, feather: int) -> Image.Image:
    blurred = image.filter(ImageFilter.GaussianBlur(radius))
    result = image
    for region in regions:
        mask = Image.new("L", image.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.rounded_rectangle(region, radius=min(24, feather * 2), fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(feather))
        result = Image.composite(blurred, result, mask)
    return result


def main() -> None:
    TARGET.mkdir(parents=True, exist_ok=True)
    for name, config in REDACTIONS.items():
        source = SOURCE / name
        if not source.exists():
            raise FileNotFoundError(source)
        with Image.open(source) as original:
            image = ImageOps.exif_transpose(original).convert("RGB")
            redacted = redact(image, **config)
            redacted.save(TARGET / name, quality=92, optimize=True)
            print(f"redacted {name}")
    print(f"done: {TARGET}")


if __name__ == "__main__":
    main()
