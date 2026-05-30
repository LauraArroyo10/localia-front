import Button from '../../ui/Button';
import { type Role } from '../../authentication/Registerwizard';

interface StepDoneProps {
  role: Role;
  onClose: () => void;
}

export function StepDone({ role, onClose }: StepDoneProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center my-auto py-6">
      <div className="w-16 h-16 rounded-full flex items-center justify-center bg-violet-50">
        <span className="text-3xl text-violet-500">✓</span>
      </div>

      <div>
        <h3 className="text-xl font-bold text-neutral-800">All set!</h3>
        <p className="mt-1 text-sm text-neutral-500">
          {role === "seller"
            ? "Your business account is ready. Start showcasing your services to locals and tourists!"
            : "Your account is ready. Start exploring authentic local experiences!"}
        </p>
      </div>

      <Button
        text="Finish"
        bgColor="bg-violet-500"
        textColor="text-neutral-0"
        size="w-40"
        onClick={onClose}
      />
    </div>
  );
}