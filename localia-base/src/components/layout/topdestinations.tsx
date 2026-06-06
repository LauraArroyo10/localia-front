import destinationImg from '../../assets/brand/destination-placeholder.jpg';

function TopDestinations() {
  const cards = Array(4).fill(null);

  return (
    <section className=" max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-violet-900">Top destinations near you</h2>
        <button className="px-6 py-3 bg-accent text-violet-900 rounded-full font-semibold hover:opacity-80 transition-all cursor-pointer text-sm">
          Find more places
        </button>
      </div>

      <div className="relative flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {cards.map((_, index) => (
          <div key={index} className="flex-1 bg-neutral-0 rounded-3xl overflow-hidden border border-neutral-200 p-4 flex flex-col gap-3">
            <img
              src={destinationImg}
              alt="Destination"
              className="w-full h-48 object-cover rounded-2xl"
            />
            <span className="text-violet-500 font-semibold text-sm px-1">Location</span>
            <p className="text-xs text-neutral-500 leading-relaxed px-1">
              Localia offers you the comfort of discovering new ways to enjoy your trip. No fixed plans — just hidden places to explore and share.
            </p>
          </div>
        ))}

        <button className="absolute -right-4 top-[40%] w-10 h-10 rounded-full bg-violet-500 text-neutral-0 flex items-center justify-center hover:bg-violet-700 transition-all cursor-pointer z-10">
          ➔
        </button>
      </div>
    </section>
  );
}

export default TopDestinations;