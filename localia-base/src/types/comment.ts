export interface CommentProps {
	id: string;
	avatar?: string;
	location: string;
	name: string;
	joinedDate: string;
	rating: number;
	reviewDate: string;
	title: string;
	body: string;
	helpfulCount: number;
	isOwner: boolean;
	markedHelpfulByMe: boolean;
}
