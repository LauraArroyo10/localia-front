import Logo from "../../assets/brand/logo-vertical.svg?react";

export function LocaliaPanel() {
	return (
		<div
			className="hidden md:flex flex-col items-center justify-center w-85 shrink-0 rounded-3xl
        px-6 py-2 text-center
        bg-violet-500"
		>
			{/*Logo SVG*/}
			<Logo className="w-60 h-40  " />

			{/* Tagline */}
			<p className="text-xs mt-10 leading-relaxed text-white">
				Localia empowers your business to shine locally while opening doors to
				tourists eager to discover authentic experiences
			</p>
		</div>
	);
}
