import { useState } from "react";

import { StepWhatOffer } from "./steps/StepWhatoffer";
import { StepBusinessInfo } from "./steps/StepBusinessInfo";
import { StepLocation } from "./steps/StepLocation";
import { StepDone } from "./steps/StepDone";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepIndicator } from '../ui/StepIndicator';

import type { Role } from "../../types/rol";



type StepKey = "basic" | "offer" | "business" | "location" | "done";

function getSteps(role: Role): StepKey[] {
  if (role === "seller") return ["basic", "offer", "business", "location", "done"];
  if (role === "tourist") return ["basic", "done"];
  return ["basic", "done"];
}

interface RegisterWizardProps {
  //cerrar formulario
  onClose: () => void;
  //cambiar de paso
  onSwitch: () => void;
}

export function RegisterWizard({ onClose, onSwitch }: RegisterWizardProps) {
  //para cambiar eel form, comeinza en 0 
  const [stepIndex, setStepIndex] = useState(0);
  //para cambiar depenmdiendod el rol ingresado 
  const [role, setRole] = useState<Role>("tourist");
//para obtener los pasos de cada rol separado 
  const steps = getSteps(role);
  //referencia delqo ue se tiene seleccionado en el momento 
  const currentStep = steps[stepIndex];
  // esto para ver la cantidad de pasos y usarlo en los movimientos de next y back
  const totalSteps = steps.length - 1;

  //para los botones sigueinte y atras
  const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  return (
    <div className="flex flex-col  w-full max-w-sm mx-auto h-full">

      {/* Stepper siempre visible  para los pasos el vendedor que son varios*/}
     <div className="h-12">
  {role === "seller" && currentStep !== "done" && (
    <StepIndicator current={stepIndex} total={totalSteps} />
  )}
</div>

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


