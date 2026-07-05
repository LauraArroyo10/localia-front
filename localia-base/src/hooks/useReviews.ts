// src/hooks/useReviews.ts
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/api";
import type { CommentProps } from "../types/comment";
import { useAuth } from "./useAuth";

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
			const res = await apiFetch(
				`/api/businesses/${businessId}/reviews?page=${page}`,
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
			const res = await apiFetch(`/api/businesses/${businessId}/reviews`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

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

	const updateReview = async (
		reviewId: string,
		data: { rating: number; title: string; body: string },
	) => {
		if (!token) {
			const msg = "Debes iniciar sesión";
			setError(msg);
			throw new Error(msg);
		}

		setError(null);

		try {
			const res = await apiFetch(`/api/businesses/reviews/${reviewId}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const json = await res.json();

			if (!res.ok) {
				throw new Error(json.message ?? "Failed to update review");
			}

			await fetchReviews();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Error";
			setError(msg);
			throw err;
		}
	};

	const deleteReview = async (reviewId: string) => {
		if (!token) {
			setError("Debes iniciar sesión");
			return;
		}

		setError(null);

		try {
			const res = await apiFetch(`/api/businesses/reviews/${reviewId}`, {
				method: "DELETE",
			});

			const json = await res.json();

			if (!res.ok) {
				throw new Error(json.message ?? "Failed to delete review");
			}

			setReviews((prev) => prev.filter((r) => r.id !== reviewId));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error");
		}
	};

	const markHelpful = async (reviewId: string) => {
		if (!token) {
			setError("Debes iniciar sesión para marcar como útil");
			return;
		}

		try {
			const res = await apiFetch(
				`/api/businesses/reviews/${reviewId}/helpful`,
				{ method: "POST" },
			);

			const json = await res.json();

			if (!res.ok) {
				throw new Error(json.message ?? "Failed to mark helpful");
			}

			setReviews((prev) =>
				prev.map((r) =>
					r.id === reviewId
						? { ...r, helpfulCount: json.helpful, markedHelpfulByMe: true }
						: r,
				),
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
		updateReview,
		deleteReview,
		markHelpful,
		fetchReviews,
	};
}