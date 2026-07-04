import { FiEdit2, FiTrash2 } from "react-icons/fi";
import type { CommentProps } from "../../types/comment";
import type { Role } from "../../types/rol";
import Button from "../ui/Button";
import StarRating from "../ui/StarRating";

export interface ReviewCardProps {
	reviewCard: CommentProps;
	userRole: Role;
	//para boton de comentarios
	onHelpful: (id: string) => void;
	onEdit: (reviewCard: CommentProps) => void;
	onDelete: (id: string) => void;
}

const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("es-CR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

export default function ReviewCard({ reviewCard, userRole, onHelpful, onEdit, onDelete }: ReviewCardProps) {
  return (
    <article className="p-4 bg-neutral-0 border border-neutral-200 rounded-2xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img
            className="w-8 h-8 me-3 rounded-full"
            src={reviewCard.avatar ?? "/default-avatar.png"}
            alt={reviewCard.name}
          />
          <div>
            <p className="text-sm font-medium text-neutral-900">{reviewCard.name}</p>
            <time className="block text-xs text-neutral-500">{formatDate(reviewCard.joinedDate)}</time>
          </div>
        </div>

        {reviewCard.isOwner && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => onEdit(reviewCard)}
              className="text-neutral-500 hover:text-violet-900 cursor-pointer"
              aria-label="Editar comentario"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              onClick={() => onDelete(reviewCard.id)}
              className="text-neutral-500 hover:text-red-600 cursor-pointer"
              aria-label="Eliminar comentario"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        )}
      </div>

			<div className="flex items-center mb-1 space-x-2">
				<StarRating rating={reviewCard.rating} className="text-sm" />
			</div>

      <footer className="mb-3 text-xs text-neutral-500">
        <p>Reviewed on <time>{formatDate(reviewCard.reviewDate)}</time></p>
      </footer>

      <h3 className="mb-1 text-xs font-semibold text-neutral-900">{reviewCard.title}</h3>
      <p className="mb-2 text-sm text-neutral-700">{reviewCard.body}</p>

      <aside>
        <p className="mt-1 text-xs text-neutral-500">{reviewCard.helpfulCount} people found this helpful</p>
        <div className="flex items-center mt-2">
          {userRole !== "guest" && !reviewCard.isOwner && (
            <Button
              text={reviewCard.markedHelpfulByMe ? "Helpful" : "Helpful"}
              bgColor="bg-transparent"
              textColor="text-neutral-900"
              border="border border-neutral-300"
              size="w-20"
              textSize="text-xs"
              onClick={() => onHelpful(reviewCard.id)}
              disabled={reviewCard.markedHelpfulByMe}
            />
          )}
        </div>
      </aside>
    </article>
  );
}