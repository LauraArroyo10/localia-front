// src/hooks/useReviews.ts
import { useState, useEffect } from "react";
import type { CommentProps } from "../types/comment";
import { useAuth } from "./useAuth";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function useReviews(businessId: string) {
  const token = useAuth((state) => state.token);

  const [reviews, setReviews] = useState<CommentProps[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async (page = 1) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/api/businesses/${businessId}/reviews?page=${page}`
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message ?? "Failed to fetch reviews");
      }

      setReviews(json.reviews);
      setAvgRating(json.avgRating);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setLoading(false);
    }
  };

  const createReview = async (data: {
    rating: number;
    title: string;
    body: string;
  }) => {
    if (!token) {
      const msg = "Debes iniciar sesión para dejar una reseña";
      setError(msg);
      throw new Error(msg);
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/api/businesses/${businessId}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message ?? "Failed to create review");
      }

      await fetchReviews();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error";
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const markHelpful = async (reviewId: string) => {
    if (!token) {
      setError("Debes iniciar sesión para marcar como útil");
      return;
    }

    try {
      const res = await fetch(
        `${API_URL}/api/businesses/reviews/${reviewId}/helpful`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message ?? "Failed to mark helpful");
      }

      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? { ...r, helpfulCount: json.helpful }
            : r
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  };

  useEffect(() => {
    if (businessId) {
      fetchReviews();
    }
  }, [businessId]);

  return {
    reviews,
    avgRating,
    loading,
    error,
    createReview,
    markHelpful,
    fetchReviews,
  };
}