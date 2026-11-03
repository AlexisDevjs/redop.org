# REDOPS · redop.org

Primera versión del sitio en Astro 7: landing y galería completa, con modo claro y oscuro, menú móvil y visor de fotografías.

## Desarrollo

```sh
pnpm install
pnpm dev --background
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

## Validación

```sh
pnpm build
pnpm lint
```

## Contenido

- Páginas: `src/pages/index.astro` y `src/pages/galeria.astro`.
- Tema, navegación y diálogo de contacto: `src/scripts/interactions.ts`.
- Galería React: `src/components/gallery/` (retícula, tarjetas, visor y lógica de filtros); la home monta el preview desde `Gallery.astro`.
- Componentes con Tailwind: `Button.astro`, `SectionLabel.astro`, `Footer.astro`, `Dialogs.astro`, `Header.astro` y `Gallery.astro`, en `src/components/`.
- Gráficos con CSS encapsulado: `BrandNetwork.astro` y `ServiceGraphic.astro`.
- Tokens y estilos base: `src/styles/global.css`; alcance de la migración en `docs/tailwind-migration.md`.
- Contactos provisionales: `src/data/contact.ts`.
- Fotografías publicadas: `src/assets/images/gallery/` (derivados redactados) y metadatos en `src/data/gallery.ts`. Los originales de `src/assets/images/` no se publican.
- Sistema visual: `docs/design-direction.md`.
- Información del cliente y pendientes: `docs/content-notes.md`.

Los audios se transcribieron localmente. El contenido cubre videovigilancia con Hikvision y UNV, seguridad digital y obra civil con acabados. El correo es un ejemplo y WhatsApp está pendiente del número real.
