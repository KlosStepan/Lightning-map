export function getBackendImageUrl(
  fileName: string,
  apiBaseUrl: string | null,
  category?: "eshop" | "merchant" | "original",
  original?: boolean
): string {
  if (!apiBaseUrl) return fileName;

  const params = new URLSearchParams();
  params.set("file", fileName);
  if (category) params.set("category", category);
  if (original) params.set("original", "true");

  return `${apiBaseUrl}/image?${params.toString()}`;
}