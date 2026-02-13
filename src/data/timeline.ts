export type TimelineItem = {
  id: number;
  type: "photo" | "video";
  filename: string;
  caption?: string;
};

// Put files in public/media and list filenames here in story order.
export const timeline: TimelineItem[] = [
  {
    id: 1,
    type: "photo",
    filename: "photo-1.jpg",
    caption: "Две лысые коти поздравляют свою любимую маму с 14 февраля.",
  },
  {
    id: 2,
    type: "photo",
    filename: "photo-2.jpg",
    caption: "Две лысые коти поздравляют свою любимую маму с 14 февраля.",
  },
  {
    id: 3,
    type: "video",
    filename: "sleepy-kitty.mp4",
  },
  {
    id: 4,
    type: "photo",
    filename: "photo-3.jpg",
  },
  {
    id: 5,
    type: "video",
    filename: "video-2.mp4",
  },
  {
    id: 6,
    type: "photo",
    filename: "photo-4.jpg",
  },
  {
    id: 7,
    type: "video",
    filename: "video-3.mp4",
  },
];
