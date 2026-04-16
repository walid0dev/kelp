type Oklch = {
	l: number;
	c: number;
	h: number;
};

function parseOklch(value: string): Oklch | null {
	const match = value
		.trim()
		.match(/^oklch\(\s*([0-9]*\.?[0-9]+%?)\s+([0-9]*\.?[0-9]+)\s+([0-9]*\.?[0-9]+)(?:\s*\/\s*[0-9]*\.?[0-9]+%?)?\s*\)$/i);

	if (!match) return null;

	const lightnessRaw = match[1];
	const lightness = lightnessRaw.endsWith('%')
		? Number(lightnessRaw.replace('%', '')) / 100
		: Number(lightnessRaw);

	const chroma = Number(match[2]);
	const hue = Number(match[3]);

	if (
		Number.isNaN(lightness) ||
		Number.isNaN(chroma) ||
		Number.isNaN(hue) ||
		lightness < 0 ||
		lightness > 1
	) {
		return null;
	}

	return { l: lightness, c: chroma, h: hue };
}

function clamp01(value: number): number {
	return Math.min(1, Math.max(0, value));
}

function oklchToLinearSrgb({ l, c, h }: Oklch): [number, number, number] {
	const hRad = (h * Math.PI) / 180;
	const a = c * Math.cos(hRad);
	const b = c * Math.sin(hRad);

	const lPrime = l + 0.3963377774 * a + 0.2158037573 * b;
	const mPrime = l - 0.1055613458 * a - 0.0638541728 * b;
	const sPrime = l - 0.0894841775 * a - 1.291485548 * b;

	const lCube = lPrime ** 3;
	const mCube = mPrime ** 3;
	const sCube = sPrime ** 3;

	const r = 4.0767416621 * lCube - 3.3077115913 * mCube + 0.2309699292 * sCube;
	const g = -1.2684380046 * lCube + 2.6097574011 * mCube - 0.3413193965 * sCube;
	const bLinear = -0.0041960863 * lCube - 0.7034186147 * mCube + 1.707614701 * sCube;

	return [clamp01(r), clamp01(g), clamp01(bLinear)];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(l1: number, l2: number): number {
	const high = Math.max(l1, l2);
	const low = Math.min(l1, l2);
	return (high + 0.05) / (low + 0.05);
}

export function getReadableForeground(backgroundColor: string): string {
	if (backgroundColor === 'transparent') {
		return 'var(--foreground)';
	}

	const oklch = parseOklch(backgroundColor);
	if (!oklch) {
		return 'var(--foreground)';
	}

	const luminance = relativeLuminance(oklchToLinearSrgb(oklch));
	const contrastWithBlack = contrastRatio(luminance, 0);
	const contrastWithWhite = contrastRatio(luminance, 1);

	// Pick stronger WCAG contrast against dynamic note background.
	return contrastWithBlack >= contrastWithWhite ? '#111111' : '#ffffff';
}
