function SubscribeBanner() {
	return (
		<section
			className="
        w-full
        py-20
        px-6
        flex
        flex-col
        items-center
        text-center
        bg-terracota-400
        text-neutral-0
      "
		>
			<div className="flex flex-col items-center gap-8">
				<h2
					className="
            text-3xl
            md:text-4xl
            font-semibold
            leading-tight
          "
				>
					Explore what’s waiting for you on your next adventure
				</h2>

				{/* FORM */}
				<div
					className="
            w-full
            flex
            flex-col
            sm:flex-row
            gap-4
            justify-center
          "
				>
					{/* INPUT */}
					<input
						type="email"
						placeholder="Email"
						className="
              flex-1
              h-12
              rounded-full
              px-6
              outline-none
              transition-all
              bgneutral-0
              text-violet-900
              placeholder:text-neutral-400
              focus:ring-1
              focus:ring-violet-500
              bg-bg
            "
					/>

					{/* BUTTON */}
					<button
						className="
              h-12
              px-8
              rounded-full
              font-medium
              cursor-pointer
              
              transition-all
              bg-violet-500
              text-neutral-0
              hover:bg-violet-700
            "
					>
						Subscribe
					</button>
				</div>

				{/* TEXT */}
				<p
					className="
            text-xs
            leading-relaxed
            text-neutral-100
          "
				>
					We’ll send you inspiring updates and information about our
					experiences.
				</p>
			</div>
		</section>
	);
}

export default SubscribeBanner;
