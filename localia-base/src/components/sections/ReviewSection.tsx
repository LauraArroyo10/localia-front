import { Alert } from "flowbite-react";
import { useState } from "react";
import { toast } from "sonner";
import { useReviews } from "../../hooks/useReviews";
import type { CommentProps } from "../../types/comment";
import type { Role } from "../../types/rol";
import ReviewCard from "../cards/ReviewCard";
import Button from "../ui/Button";
import StarRating from "../ui/StarRating";

interface ReviewsSectionProps {
	userRole: Role;
	businessId: string;
}

export default function ReviewsSection({
	userRole,
	businessId,
}: ReviewsSectionProps) {
	const {
		reviews,
		loading,
		error,
		createReview,
		updateReview,
		deleteReview,
		markHelpful,
	} = useReviews(businessId);

	const [newReview, setNewReview] = useState({
		title: "",
		body: "",
		rating: 0,
	});
	const [showAll, setShowAll] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [editingReview, setEditingReview] = useState<CommentProps | null>(null);
	const [editForm, setEditForm] = useState({ title: "", body: "", rating: 0 }); // NUEVO
	const [savingEdit, setSavingEdit] = useState(false); // NUEVO
	const visibleComments = showAll ? reviews : reviews.slice(0, 3);

	const handleSubmit = async () => {
		if (!newReview.title || !newReview.body || newReview.rating === 0) return;

		setSubmitting(true);
		try {
			await createReview(newReview);
			setNewReview({ title: "", body: "", rating: 0 });
			toast.success("¡Reseña publicada con éxito!", {
				style: { background: "#8b5cf6", color: "#ffffff" },
			});
		} catch {
			toast.error("No se pudo publicar la reseña. Intentá de nuevo.", {
				style: { background: "#ab0000", color: "#ffffff" },
			});
		} finally {
			setSubmitting(false);
		}
	};

	const handleEdit = (review: CommentProps) => {
		setEditingReview(review);
		setEditForm({
			title: review.title,
			body: review.body,
			rating: review.rating,
		}); // NUEVO: precarga el form
	};

	const handleCancelEdit = () => {
		setEditingReview(null);
	};

	const handleSaveEdit = async () => {
		if (!editingReview) return;
		if (!editForm.title || !editForm.body || editForm.rating === 0) return;

		setSavingEdit(true);
		try {
			await updateReview(editingReview.id, editForm);
			setEditingReview(null);
			toast.success("Reseña actualizada correctamente", {
				style: { background: "#8b5cf6", color: "#ffffff" },
			});
		} catch {
			toast.error("No se pudo actualizar la reseña.", {
				style: { background: "#ab0000", color: "#ffffff" },
			});
		} finally {
			setSavingEdit(false);
		}
	};

	const handleDelete = async (reviewId: string) => {
		if (!confirm("¿Seguro que querés eliminar este comentario?")) return;
		try {
			await deleteReview(reviewId);
			toast.success("Reseña eliminada", {
				style: { background: "#8b5cf6", color: "#ffffff" },
			});
		} catch {
			toast.error("No se pudo eliminar la reseña.", {
				style: { background: "#ab0000", color: "#ffffff" },
			});
		}
	};

	return (
		<section className="space-y-4">
			{userRole === "guest" && <Alert color="info">Registro necesario</Alert>}

			{error && <Alert color="failure">{error}</Alert>}

			{/* NUEVO: bloque de edición, aparece arriba de todo cuando editingReview no es null */}
			{editingReview && (
				<div className="p-5 bg-neutral-0 border border-violet-300 rounded-2xl flex flex-col gap-3">
					<p className="font-medium text-gray-900">Edit your review</p>

					<StarRating
						rating={editForm.rating}
						interactive
						onRate={(r) => setEditForm((prev) => ({ ...prev, rating: r }))}
					/>

					<input
						className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
						placeholder="Title"
						value={editForm.title}
						onChange={(e) =>
							setEditForm((prev) => ({ ...prev, title: e.target.value }))
						}
					/>

					<textarea
						className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm resize-none"
						placeholder="Write your review..."
						rows={3}
						value={editForm.body}
						onChange={(e) =>
							setEditForm((prev) => ({ ...prev, body: e.target.value }))
						}
					/>

					<div className="flex justify-end gap-2">
						<Button
							type="button"
							text="Cancel"
							bgColor="bg-white"
							textColor="text-neutral-700"
							border="border border-neutral-300"
							size="w-24"
							onClick={handleCancelEdit}
						/>
						<Button
							type="button"
							text={savingEdit ? "Saving..." : "Save changes"}
							bgColor="bg-violet-500"
							textColor="text-white"
							size="w-36"
							onClick={handleSaveEdit}
							disabled={
								savingEdit ||
								!editForm.title ||
								!editForm.body ||
								editForm.rating === 0
							}
						/>
					</div>
				</div>
			)}

			{userRole !== "guest" && !editingReview && (
				<div className="p-5 bg-neutral-0 border border-neutral-200 rounded-2xl flex flex-col gap-3">
					<p className="font-medium text-gray-900">Leave a review</p>

					<StarRating
						rating={newReview.rating}
						interactive
						onRate={(r) => setNewReview((prev) => ({ ...prev, rating: r }))}
					/>

					<input
						className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm"
						placeholder="Title"
						value={newReview.title}
						onChange={(e) =>
							setNewReview((prev) => ({ ...prev, title: e.target.value }))
						}
					/>

					<textarea
						className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-sm resize-none"
						placeholder="Write your review..."
						rows={3}
						value={newReview.body}
						onChange={(e) =>
							setNewReview((prev) => ({ ...prev, body: e.target.value }))
						}
					/>

					<div className="flex justify-end">
						<Button
							type="button"
							text={submitting ? "Submitting..." : "Submit review"}
							bgColor="bg-violet-500"
							textColor="text-white"
							size="w-36"
							onClick={handleSubmit}
							disabled={
								submitting ||
								!newReview.title ||
								!newReview.body ||
								newReview.rating === 0
							}
						/>
					</div>
				</div>
			)}

			{loading && <p className="text-sm text-gray-500">Cargando reviews...</p>}

			{visibleComments.map((comment) => (
				<div key={comment.id} className="review-enter">
					<ReviewCard
						reviewCard={comment}
						userRole={userRole}
						onHelpful={markHelpful}
						onEdit={handleEdit}
						onDelete={handleDelete}
					/>
				</div>
			))}
			{reviews.length > 3 && (
				<Button
					text={showAll ? "Show less" : "Show more"}
					bgColor="bg-white"
					textColor="text-violet-500"
					size="w-full"
					onClick={() => setShowAll(!showAll)}
				/>
			)}
		</section>
	);
}
