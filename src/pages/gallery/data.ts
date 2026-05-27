import { galleryImages } from "@/data/images/Index";

export type MediaFilter = "All Media" | "Photos" | "Videos";
export type DateFilter = "Most Recent" | "May 2026";

export type GalleryMedia = {
  src: string;
  type: "photo" | "video";
  uploadedAt: string;
};

export const galleryMedia: GalleryMedia[] = [
  ...galleryImages,
  ...galleryImages.slice(0, 5),
  ...galleryImages.slice(1, 5),
].map((src, index) => ({
  src,
  type: "photo",
  uploadedAt: `2026-05-${String(18 - (index % 6)).padStart(2, "0")}`,
}));

export const galleryFilters: MediaFilter[] = ["All Media", "Photos", "Videos"];
export const dateFilters: DateFilter[] = ["Most Recent", "May 2026"];

export const initialVisibleMediaCount = 12;
export const visibleMediaBatchSize = 6;
