import { useState } from "react";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepWhatOffer } from "./steps/StepWhatoffer";
import { StepBusinessInfo } from "./steps/StepBusinessInfo";
 import { StepLocation } from "./steps/StepLocation";
import { StepDone } from "./steps/StepDone";
import { StepIndicator } from './ui/StepIndicator';

export type Role = "tourist" | "seller" | "";

type StepKey = "basic" | "offer" | "business" | "location" | "done";

function getSteps(role: Role): StepKey[] {
  if (role === "seller") return ["basic", "offer", "business", "location", "done"];
  if (role === "tourist") return ["basic", "done"];
  return ["basic", "done"];
}

interface RegisterWizardProps {
  onClose: () => void;
  onSwitch: () => void;
}

export function RegisterWizard({ onClose, onSwitch }: RegisterWizardProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [role, setRole] = useState<Role>("");

  const steps = getSteps(role);
  const currentStep = steps[stepIndex];
  const totalSteps = steps.length - 1;

  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto h-full">

      {/* Stepper siempre visible */}
      {currentStep !== "done" && (
        <StepIndicator current={stepIndex} total={totalSteps} />
      )}

      {/* justify-center solo en done, resto scrollea normal */}
      <div className={`flex-1 overflow-y-auto flex flex-col ${currentStep === "done" ? "justify-center" : ""}`}>
        {currentStep === "basic" && (
          <StepBasicInfo
            role={role}
            onRoleChange={setRole}
            onNext={(selectedRole) => {
              setRole(selectedRole);
              next();
            }}
            onSwitch={onSwitch}
          />
        )}
        {currentStep === "offer" && (
          <StepWhatOffer onNext={next} onBack={back} />
        )}
        {currentStep === "business" && (
          <StepBusinessInfo onNext={next} onBack={back} />
        )}
        {currentStep === "location" && (
           <StepLocation onFinish={next} onBack={back} />
        )}
        {currentStep === "done" && (
          <StepDone role={role} onClose={onClose} />
        )}
      </div>
    </div>
  );

}


