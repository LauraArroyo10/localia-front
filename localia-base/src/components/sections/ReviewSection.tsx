import { Alert } from "flowbite-react";
import ReviewCard from "../cards/ReviewCard";
import type { CommentProps } from "../../types/comment";
import type { Role } from "../../types/rol";

interface ReviewsSectionProps {
  userRole: Role;
  comments: CommentProps[];
}

export default function ReviewsSection({
  userRole,
  comments,
}: ReviewsSectionProps) {
  return (
    <section className="space-y-4">
      {userRole === "guest" && (
        <Alert color="info">
          Debés registrarte para comentar o interactuar con los reviews.
        </Alert>
      )}

      {comments.map((comment) => (
        <ReviewCard
  key={comment.id}
  reviewCard={comment}
  userRole={userRole}  // ← falta esto
/>
      ))}
    </section>
  );
}