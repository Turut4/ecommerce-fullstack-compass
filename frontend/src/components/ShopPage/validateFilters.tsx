export function validatePriceRange(
  priceMin: number,
  priceMax: number,
): [number, number] {
  if (priceMax < priceMin) priceMax = priceMin;
  if (priceMin < 0) priceMin = 0;
  return [priceMin, priceMax];
}

export function normalizeSortBy(sortBy: string): string {
  return sortBy === 'Default' ? '' : sortBy;
}

export function normalizeCategory(category: string): string {
  return category === 'All' ? '' : category;
}

export function getDisplayMessage(
  page: number,
  pageSize: number,
  totalProducts: number,
) {
  const start = page * pageSize - pageSize + 1;
  const end =
    totalProducts >= page * pageSize ? page * pageSize : totalProducts;
  return `Showing ${start}-${end} of ${totalProducts}`;
}
