interface StepIndicatorProps {
  current: number;
  total: number;
}

export function StepIndicator({
  current,
  total,
}: StepIndicatorProps) {
  return (
    <div className="flex items-center w-full py-1">
      {Array.from({ length: total }).map((_, i) => {
        const active = i <= current;
        const currentStep = i === current;

        return (
          <div
            key={i}
            className="flex items-center flex-1 last:flex-none"
          >
            {/* DOT */}
            <div
              className={`
                w-2 h-2 rounded-full shrink-0
                transition-all duration-300
                ${currentStep ? "scale-125" : ""}
                ${
                  active
                    ? "bg-violet-500"
                    : "bg-neutral-300"
                }
              `}
            />

            {/* LINE */}
            {i < total - 1 && (
              <div
                className={`
                  flex-1 h-0.5 transition-all duration-300
                  ${
                    i < current
                      ? "bg-violet-500"
                      : "bg-neutral-300"
                  }
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}