// src/data/mockReviews.ts

import type { CommentProps } from "../types/comment";

export const mockReviews: CommentProps[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    location: "Costa Rica",
    name: "Juan Pérez",
    joinedDate: "January 2024",
    rating: 5,
    reviewDate: "June 2026",
    title: "Excellent service",
    body: "Excellent service and very friendly staff.",
    helpfulCount: 12
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    location: "San José",
    name: "María López",
    joinedDate: "March 2024",
    rating: 4,
    reviewDate: "May 2026",
    title: "Good experience",
    body: "The overall experience was very good.",
    helpfulCount: 8
  }
];