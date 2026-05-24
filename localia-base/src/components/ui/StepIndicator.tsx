// ── StepIndicator ──────────────────────────────────────
interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({ current, total }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full py-1">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div
            className="w-2 h-2 rounded-full shrink-0 transition-all duration-300"
            style={{
              backgroundColor: i <= current ? "#5B5BD6" : "#E5E7EB",
              transform: i === current ? "scale(1.5)" : "scale(1)",
            }}
          />
          {i < total - 1 && (
            <div
              className="flex-1 h-0.5 transition-all duration-500"
              style={{ backgroundColor: i < current ? "#5B5BD6" : "#E5E7EB" }}
            />
          )}
        </div>
      ))}
    </div>
  );
}