import type { CommentProps } from "../../types/comment";
import type { Role } from "../../types/rol";
import StarRating from "../ui/StarRating";

export interface ReviewCardProps {
  reviewCard: CommentProps;
  userRole: Role;
}

export default function ReviewCard({
  reviewCard,
  userRole,
}: ReviewCardProps) {
  return (
    <article className="p-6 bg-white border border-gray-200 rounded-2xl">
      <div className="flex items-center mb-4">
        <img
          className="w-10 h-10 me-3 rounded-full"
          src={reviewCard.avatar ?? "/default-avatar.png"}
          alt={reviewCard.name}
        />

        <div>
          <p className="font-medium text-gray-900">
            {reviewCard.name}
          </p>

          <time className="block text-sm text-gray-500">
            {reviewCard.joinedDate}
          </time>
        </div>
      </div>

      <div className="flex items-center mb-1 space-x-2">
        <StarRating rating={reviewCard.rating} />
      </div>

      <footer className="mb-5 text-sm text-gray-500">
        <p>
          Reviewed on <time>{reviewCard.reviewDate}</time>
        </p>
      </footer>

      <h3 className="mb-2 text-sm font-semibold text-gray-900">
        {reviewCard.title}
      </h3>

      <p className="mb-3 text-gray-700">
        {reviewCard.body}
      </p>

      <aside>
        <p className="mt-1 text-xs text-gray-500">
          {reviewCard.helpfulCount} people found this helpful
        </p>

        <div className="flex items-center mt-3">
         {userRole !== "guest" && (
  <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-xs px-3 py-1.5">
    Helpful
  </button>
)}
        </div>
      </aside>
    </article>
  );
}