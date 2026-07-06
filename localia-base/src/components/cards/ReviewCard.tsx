import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import type { CommentProps } from "../../types/comment";
import type { Role } from "../../types/rol";
import Button from "../ui/Button";
import StarRating from "../ui/StarRating";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export interface ReviewCardProps {
	reviewCard: CommentProps;
	userRole: Role;
	onHelpful: (id: string) => void;
	onEdit: (reviewCard: CommentProps) => void;
	onDelete: (id: string) => void;
}

/**
 * Convierte fechas ISO a un formato legible en español.
 */
const formatDate = (dateString: string) => {
	return new Date(dateString).toLocaleDateString("es-CR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

/**
 * Normaliza la URL del avatar para usar una ruta completa válida.
 */
const getAvatarSrc = (avatar?: string | null) => {
	if (!avatar?.trim()) return null;
	if (avatar.startsWith("http")) return avatar;
	return `${API_URL}${avatar}`;
};

/**
 * Muestra una tarjeta de reseña con autor, fecha, calificación y acciones.
 */
export default function ReviewCard({
	reviewCard,
	userRole,
	onHelpful,
	onEdit,
	onDelete,
}: ReviewCardProps) {
	const avatarSrc = getAvatarSrc(reviewCard.avatar);

	return (
		<article className="p-4 bg-neutral-0 border border-neutral-200 rounded-2xl">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center">
					{avatarSrc ? (
						<img
							className="w-8 h-8 me-3 rounded-full object-cover"
							src={avatarSrc}
							alt={reviewCard.name}
						/>
					) : (
						<FaUserCircle className="w-8 h-8 me-3 text-neutral-300" />
					)}

					<div>
						<p className="text-sm font-medium text-neutral-900">
							{reviewCard.name}
						</p>
						<time className="block text-xs text-neutral-500">
							{formatDate(reviewCard.joinedDate)}
						</time>
					</div>
				</div>

				{reviewCard.isOwner && (
					<div className="flex items-center gap-3">
						<button
							onClick={() => onEdit(reviewCard)}
							className="text-neutral-500 hover:text-violet-900"
						>
							<FiEdit2 size={16} />
						</button>

						<button
							onClick={() => onDelete(reviewCard.id)}
							className="text-neutral-500 hover:text-red-600"
						>
							<FiTrash2 size={16} />
						</button>
					</div>
				)}
			</div>

			<div className="mb-1">
				<StarRating rating={reviewCard.rating} className="text-sm" />
			</div>

			<footer className="mb-3 text-xs text-neutral-500">
				Reviewed on {formatDate(reviewCard.reviewDate)}
			</footer>

			<h3 className="mb-1 text-xs font-semibold text-neutral-900">
				{reviewCard.title}
			</h3>

			<p className="mb-2 text-sm text-neutral-700">{reviewCard.body}</p>

			<p className="text-xs text-neutral-500">
				{reviewCard.helpfulCount} people found this helpful
			</p>

			{userRole !== "guest" && !reviewCard.isOwner && (
				<div className="mt-2">
					<Button
						text="Helpful"
						bgColor="bg-transparent"
						textColor="text-neutral-900"
						border="border border-neutral-300"
						size="w-20"
						textSize="text-xs"
						onClick={() => onHelpful(reviewCard.id)}
						disabled={reviewCard.markedHelpfulByMe}
					/>
				</div>
			)}
		</article>
	);
}