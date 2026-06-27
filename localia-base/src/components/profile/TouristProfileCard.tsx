// src/components/profile/TouristProfileView.tsx

interface TouristProfileViewProps {
  name: string;
  avatarUrl?: string;
  location?: string;
}

export default function TouristProfileView({
  name,
  avatarUrl,
  location,
}: TouristProfileViewProps) {
  return (
    <div className="w-full max-w-[850px] bg-white rounded-3xl overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-[#EAEBFA] px-10 py-8 flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-semibold text-[#4D55C8] tracking-wide">
            {name}
          </h1>
          <p className="text-2xl font-medium text-[#E35E38]">Tourist</p>
        </div>

        {/* Avatar */}
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder con inicial del nombre
            <div className="w-full h-full bg-violet-200 flex items-center justify-center text-violet-700 text-4xl font-bold">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-10">
        <div className="bg-[#5A63D3] rounded-3xl p-8 text-white flex flex-col gap-3 max-w-xs">
          <h3 className="text-xl font-semibold">Location</h3>
          <p className="text-sm text-white/80">
            {location ?? "No location set"}
          </p>
        </div>
      </div>
    </div>
  );
}