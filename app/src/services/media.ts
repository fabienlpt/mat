/* eslint-disable @typescript-eslint/no-explicit-any */
interface Breakpoints {
	[key: string]: number;
	uhd: number;
	widescreen: number,
	desktop: number,
	tablet: number,
}

export const breakpoints:Breakpoints = {
	uhd: 1980,
	widescreen: 1366,
	desktop: 1024,
	tablet: 768,
};
  
export const mediaQueries = (key:string) => {
	return (style: any) => `@media (min-width: ${breakpoints[key]}px) { ${style} }`;
};