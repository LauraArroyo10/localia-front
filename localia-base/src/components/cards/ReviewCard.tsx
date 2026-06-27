import type { CommentProps } from "../../types/comment";
import type { Role } from "../../types/rol";
import StarRating from "../ui/StarRating";
import Button from "../ui/Button";

export interface ReviewCardProps {
  reviewCard: CommentProps;
  userRole: Role;
  //para boton de comentarios
  onHelpful: (id: string) => void;
}

export default function ReviewCard({ reviewCard, userRole, onHelpful }: ReviewCardProps) {
  return (
    <article className="p-4 bg-neutral-0 border border-neutral-200 rounded-2xl">
      <div className="flex items-center mb-3">
        <img
          className="w-8 h-8 me-3 rounded-full"
          src={reviewCard.avatar ?? "/default-avatar.png"}
          alt={reviewCard.name}
        />
        <div>
          <p className="text-sm font-medium text-neutral-900">{reviewCard.name}</p>
          <time className="block text-xs text-neutral-500">{reviewCard.joinedDate}</time>
        </div>
      </div>

      <div className="flex items-center mb-1 space-x-2">
        <StarRating rating={reviewCard.rating} className="text-sm" />
      </div>

      <footer className="mb-3 text-xs text-neutral-500">
        <p>Reviewed on <time>{reviewCard.reviewDate}</time></p>
      </footer>

      <h3 className="mb-1 text-xs font-semibold text-neutral-900">{reviewCard.title}</h3>
      <p className="mb-2 text-sm text-neutral-700">{reviewCard.body}</p>

      <aside>
        <p className="mt-1 text-xs text-neutral-500">{reviewCard.helpfulCount} people found this helpful</p>
        <div className="flex items-center mt-2">
          {userRole !== "guest" && (
            <Button
              text="Helpful"
              bgColor="bg-transparent"
              textColor="text-neutral-900"
              border="border border-neutral-300"
              size="w-20"
              textSize="text-xs"
              onClick={() => onHelpful(reviewCard.id)}
            />
          )}
        </div>
      </aside>
    </article>
  );
}