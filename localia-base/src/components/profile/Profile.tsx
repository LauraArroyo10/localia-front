export interface ProfileHeaderProps {
	businessName: string;
	subtitle: string;
	avatarUrl: string;
	onEditClick?: () => void;
}

export default function ProfileHeader({
	businessName,
	subtitle,
	avatarUrl,
}: ProfileHeaderProps) {
	return (
		<div className="w-full flex justify-center">
			<div className="  w-full max-w-6xl bg-neutral-0 rounded-3xl overflow-hidden border border-neutral-100">
				<div className="bg-violet-50 px-10 py-8 flex justify-between items-center relative">
					<div>
						<h1 className="text-4xl font-semibold text-violet-500 tracking-wide mb-1">
							{businessName}
						</h1>

						<p className="text-2xl font-medium text-terracota-500">
							{subtitle}
						</p>
					</div>

					{/* Avatar Circular */}
					<div className="w-33 h-33 rounded-full overflow-hidden border-4 border-neutral-0 bg-neutral-100">
						<img
							src={avatarUrl}
							alt="Avatar"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

