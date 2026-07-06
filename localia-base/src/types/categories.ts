// src/constants/categories.ts
/**
 * Lista de categorías disponibles para filtrar negocios y productos.
 */
export const CATEGORIES = [
	"Gastronomy",
	"Tours & Adventures",
	"Wellness",
	"Accommodation",
	"Transport",
	"Shopping",
	"Artisan Goods",
	"Local Food",
	"Culture",
	"Beach",
	"Mountain",
	"Town",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface CategoryOption {
	value: Category;
	label: Category;
}

export const CATEGORY_OPTIONS: CategoryOption[] = CATEGORIES.map((c) => ({
	value: c,
	label: c,
}));
