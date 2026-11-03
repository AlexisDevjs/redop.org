interface IconProps {
	className?: string;
}

const base = {
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.6,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
	focusable: false,
};

export function ChevronLeftIcon({ className }: IconProps) {
	return (
		<svg
			{...base}
			width="20"
			height="20"
			className={className}
			role="presentation"
			aria-hidden="true"
		>
			<path d="m15 5-7 7 7 7" />
		</svg>
	);
}

export function ChevronRightIcon({ className }: IconProps) {
	return (
		<svg
			{...base}
			width="20"
			height="20"
			className={className}
			role="presentation"
			aria-hidden="true"
		>
			<path d="m9 5 7 7-7 7" />
		</svg>
	);
}

export function CloseIcon({ className }: IconProps) {
	return (
		<svg
			{...base}
			width="20"
			height="20"
			className={className}
			role="presentation"
			aria-hidden="true"
		>
			<path d="m6 6 12 12M6 18 18 6" />
		</svg>
	);
}

export function ExpandIcon({ className }: IconProps) {
	return (
		<svg
			{...base}
			width="18"
			height="18"
			className={className}
			role="presentation"
			aria-hidden="true"
		>
			<path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5" />
		</svg>
	);
}
