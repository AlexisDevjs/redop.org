import type { ImageMetadata } from "astro";

import camaraHikvisionTandemvu from "../assets/images/gallery/camara-hikvision-tandemvu.jpeg";
import camaraPtzDobleLente from "../assets/images/gallery/camara-ptz-hikvision-doble-lente.jpeg";
import camaraPtzEnPoste from "../assets/images/gallery/camara-ptz-hikvision-en-poste.jpeg";
import camaraPtzInstalada from "../assets/images/gallery/camara-ptz-hikvision-instalada.jpeg";
import desempaqueCamaras from "../assets/images/gallery/desempaque-de-camaras-hikvision.jpeg";
import equiposEnMesa from "../assets/images/gallery/equipos-hikvision-en-mesa-de-trabajo.jpeg";
import cableadoExterior from "../assets/images/gallery/instalacion-de-cableado-exterior.jpeg";
import camaraEnPoste from "../assets/images/gallery/instalacion-de-camara-en-poste.jpeg";
import instalacionTechoBano from "../assets/images/gallery/instalacion-en-techo-de-bano.jpeg";
import instaladorConCamara from "../assets/images/gallery/instalador-con-camara-hikvision.jpeg";
import mantenimientoTechoBano from "../assets/images/gallery/mantenimiento-en-techo-de-bano.jpeg";
import monitoreoCams from "../assets/images/gallery/monitoreo-de-camaras-hikvision.jpeg";
import monitoreoPortatil from "../assets/images/gallery/monitoreo-hikvision-en-portatil.jpeg";
import monitoreoMulticamara from "../assets/images/gallery/monitoreo-multicamara-en-pantalla.jpeg";
import panelConBateria from "../assets/images/gallery/panel-de-alarma-con-bateria.jpeg";
import panelConexiones from "../assets/images/gallery/panel-de-alarma-conexiones.jpeg";
import salaDeMonitoreo from "../assets/images/gallery/sala-de-monitoreo.jpeg";
import tecnicoConPtz from "../assets/images/gallery/tecnico-con-camara-ptz.jpeg";
import tecnicoConfigurando from "../assets/images/gallery/tecnico-configurando-equipos.jpeg";
import cableadoEnAltura from "../assets/images/gallery/tecnico-instalando-cableado-en-altura.jpeg";

import type { GalleryCategory } from "../components/gallery/types";

export interface GalleryItem {
	id: string;
	image: ImageMetadata;
	title: string;
	alt: string;
	category: GalleryCategory;
	/** Curated photos used by the home preview. */
	featured?: boolean;
	/** CSS object-position used when a cell crops the photo. */
	focalPoint?: string;
}

/**
 * Published copies live in `assets/images/gallery`. They are privacy-redacted
 * derivatives; the originals in `assets/images` are never bundled.
 */
export const gallery: GalleryItem[] = [
	{
		id: "camara-ptz-en-poste",
		image: camaraPtzEnPoste,
		title: "Cámara PTZ en poste",
		alt: "Cámara PTZ Hikvision montada en un poste exterior, lista para vigilar un perímetro.",
		category: "Videovigilancia",
		featured: true,
		focalPoint: "45% 36%",
	},
	{
		id: "camara-tandemvu",
		image: camaraHikvisionTandemvu,
		title: "Cámara TandemVu",
		alt: "Cámara Hikvision TandemVu sostenida sobre su caja de instalación.",
		category: "Videovigilancia",
		featured: true,
		focalPoint: "50% 45%",
	},
	{
		id: "panel-de-alarma-con-bateria",
		image: panelConBateria,
		title: "Panel con respaldo de batería",
		alt: "Panel de alarma abierto con su batería de respaldo y el cableado conectado.",
		category: "Redes",
		featured: true,
		focalPoint: "50% 48%",
	},
	{
		id: "instalacion-en-cielo-raso",
		image: instalacionTechoBano,
		title: "Instalación en cielo raso",
		alt: "Técnico instalando un equipo en el cielo raso de un baño.",
		category: "Instalaciones",
		featured: true,
		focalPoint: "48% 55%",
	},
	{
		id: "camara-instalada-en-poste",
		image: camaraEnPoste,
		title: "Cámara instalada en poste",
		alt: "Cámara Hikvision instalada en un poste metálico junto a una fachada.",
		category: "Videovigilancia",
		featured: true,
		focalPoint: "48% 40%",
	},
	{
		id: "camara-ptz-instalada",
		image: camaraPtzInstalada,
		title: "PTZ lista para operar",
		alt: "Cámara PTZ Hikvision instalada en una pared exterior.",
		category: "Videovigilancia",
		featured: true,
		focalPoint: "50% 40%",
	},
	{
		id: "equipos-en-mesa-de-trabajo",
		image: equiposEnMesa,
		title: "Equipos en preparación",
		alt: "Equipos Hikvision sobre una mesa de trabajo durante la preparación de una instalación.",
		category: "Videovigilancia",
	},
	{
		id: "cableado-exterior",
		image: cableadoExterior,
		title: "Cableado exterior",
		alt: "Cableado exterior canalizado y fijado a la pared de un edificio.",
		category: "Redes",
	},
	{
		id: "tecnico-con-camara-ptz",
		image: tecnicoConPtz,
		title: "Técnico con cámara PTZ",
		alt: "Técnico de REDOPS sosteniendo una cámara PTZ antes de instalarla.",
		category: "Videovigilancia",
	},
	{
		id: "mantenimiento-en-cielo-raso",
		image: mantenimientoTechoBano,
		title: "Mantenimiento en cielo raso",
		alt: "Mantenimiento de una cámara instalada en el cielo raso de un baño.",
		category: "Instalaciones",
	},
	{
		id: "camara-ptz-doble-lente",
		image: camaraPtzDobleLente,
		title: "PTZ de doble lente",
		alt: "Detalle de una cámara PTZ Hikvision de doble lente.",
		category: "Videovigilancia",
	},
	{
		id: "panel-de-alarma-conexiones",
		image: panelConexiones,
		title: "Panel de alarma y conexiones",
		alt: "Panel de alarma abierto con sus conexiones y bornes a la vista.",
		category: "Redes",
	},
	{
		id: "instalador-con-camara",
		image: instaladorConCamara,
		title: "Instalador con cámara",
		alt: "Instalador revisando una cámara Hikvision antes de montarla.",
		category: "Videovigilancia",
	},
	{
		id: "cableado-en-altura",
		image: cableadoEnAltura,
		title: "Cableado en altura",
		alt: "Técnico instalando cableado en altura con equipo de protección.",
		category: "Instalaciones",
	},
	{
		id: "monitoreo-en-portatil",
		image: monitoreoPortatil,
		title: "Monitoreo remoto",
		alt: "Monitoreo de cámaras Hikvision desde un portátil.",
		category: "Videovigilancia",
	},
	{
		id: "desempaque-de-camaras",
		image: desempaqueCamaras,
		title: "Desempaque de cámaras",
		alt: "Cámaras Hikvision recién desempaquetadas junto a sus accesorios.",
		category: "Videovigilancia",
	},
	{
		id: "configuracion-de-equipos",
		image: tecnicoConfigurando,
		title: "Configuración de equipos",
		alt: "Técnico configurando equipos de videovigilancia antes de la entrega.",
		category: "Instalaciones",
	},
	{
		id: "sala-de-monitoreo",
		image: salaDeMonitoreo,
		title: "Sala de monitoreo",
		alt: "Sala de monitoreo con varias pantallas de vigilancia.",
		category: "Videovigilancia",
	},
	{
		id: "monitoreo-hikvision",
		image: monitoreoCams,
		title: "Monitoreo Hikvision",
		alt: "Pantallas de monitoreo con cámaras Hikvision en operación.",
		category: "Videovigilancia",
	},
	{
		id: "monitoreo-multicamara",
		image: monitoreoMulticamara,
		title: "Vista multicámara",
		alt: "Vista multicámara en una pantalla de monitoreo.",
		category: "Videovigilancia",
	},
];
