export function getBackendImageUrl(imageUrl: string, apiBaseUrl: string | null): string {
  if (!apiBaseUrl) return imageUrl;
  return `${apiBaseUrl}/image?file=${encodeURIComponent(imageUrl)}`;
}