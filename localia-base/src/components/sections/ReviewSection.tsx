import { Alert } from "flowbite-react";
import ReviewCard from "../cards/ReviewCard";
import StarRating from "../ui/StarRating";
import type { CommentProps } from "../../types/comment";
import type { Role } from "../../types/rol";
import { useState } from "react";
import Button from "../ui/Button";

interface ReviewsSectionProps {
  userRole: Role;
  comments: CommentProps[];
}

export default function ReviewsSection({
  userRole,
  comments,
}: ReviewsSectionProps) {
  
  const [localComments, setLocalComments] = useState<CommentProps[]>(comments);
  const [newReview, setNewReview] = useState({
    title: "",
    body: "",
    rating: 0,
  });
  const [showAll, setShowAll] = useState(false);
  const visibleComments = showAll ? localComments : localComments.slice(0, 3);

  const handleSubmit = () => {
    if (!newReview.title || !newReview.body || newReview.rating === 0) return;

    const comment: CommentProps = {
      id: Date.now().toString(),
      name: "You",
      location: "",
      joinedDate: "Just now",
      reviewDate: new Date().toLocaleDateString(),
      rating: newReview.rating,
      title: newReview.title,
      body: newReview.body,
      helpfulCount: 0,
    };

    setLocalComments((prev) => [comment, ...prev]); // agrega arriba
    setNewReview({ title: "", body: "", rating: 0 }); // limpia el form
  };

  const handleHelpful = (id: string) => {
    setLocalComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, helpfulCount: c.helpfulCount + 1 } : c,
      ),
    );
  };

  return (
    <section className="space-y-4">
      {userRole === "guest" && <Alert color="info">Registro necesario</Alert>}

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
              text="Submit review"
              bgColor="bg-violet-500"
              textColor="text-white"
              size="w-36"
              onClick={handleSubmit}
              disabled={
                !newReview.title || !newReview.body || newReview.rating === 0
              }
            />
          </div>
        </div>
      )}

     {visibleComments.map((comment) => (
  <div key={comment.id} className="review-enter">
    <ReviewCard
      reviewCard={comment}
      userRole={userRole}
      onHelpful={handleHelpful}
    />
  </div>
))}
     {localComments.length > 3 && (
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
