import { Alert } from "flowbite-react";
import { useState } from "react";
import type { Role } from "../../types/rol";
import ReviewCard from "../cards/ReviewCard";
import Button from "../ui/Button";
import StarRating from "../ui/StarRating";
import { useReviews } from "../../hooks/useReviews";

interface ReviewsSectionProps {
	userRole: Role;
	businessId: string;
}

export default function ReviewsSection({
	userRole,
	businessId,
}: ReviewsSectionProps) {
	const { reviews, loading, error, createReview, markHelpful } =
		useReviews(businessId);

	const [newReview, setNewReview] = useState({
		title: "",
		body: "",
		rating: 0,
	});
	const [showAll, setShowAll] = useState(false);
	const [submitting, setSubmitting] = useState(false); // NUEVO: estado propio del envío, separado del loading general
	const visibleComments = showAll ? reviews : reviews.slice(0, 3);

	const handleSubmit = async () => {
		if (!newReview.title || !newReview.body || newReview.rating === 0) return;

		setSubmitting(true);
		try {
			await createReview(newReview);
			// Solo llegamos aquí si createReview tuvo éxito (no lanzó excepción)
			setNewReview({ title: "", body: "", rating: 0 });
		} catch {
			// El hook ya guardó el mensaje en `error` y se muestra en el Alert;
			// aquí simplemente NO limpiamos el formulario para que el usuario no pierda lo escrito.
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<section className="space-y-4">
			{userRole === "guest" && <Alert color="info">Registro necesario</Alert>}

			{error && <Alert color="failure">{error}</Alert>}

      {userRole !== "guest" && (
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
							text={submitting ? "Submitting..." : "Submit review"} // NUEVO
							bgColor="bg-violet-500"
							textColor="text-white"
							size="w-36"
							onClick={handleSubmit}
							disabled={
								submitting || // NUEVO
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