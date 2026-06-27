import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import type { Role } from "../../types/rol";
import { StepIndicator } from "../ui/StepIndicator";
import { StepBasicInfo } from "./steps/StepBasicInfo";
import { StepBusinessInfo } from "./steps/StepBusinessInfo";
import { StepDone } from "./steps/StepDone";
import { StepLocation } from "./steps/StepLocation";
import { StepWhatOffer } from "./steps/StepWhatoffer";

import { useNavigate } from "@tanstack/react-router"


type StepKey = "basic" | "offer" | "business" | "location" | "done";

function getSteps(role: Role): StepKey[] {
	if (role === "seller")
		return ["basic", "offer", "business", "location", "done"];
	return ["basic", "done"];
}

interface RegisterWizardProps {
	onClose: () => void;
	onSwitch: () => void;
}

interface RegisterData {
	name: string;
	email: string;
	password: string;
	role: Role;
}

export function RegisterWizard({ onClose, onSwitch }: RegisterWizardProps) {
	const [stepIndex, setStepIndex] = useState(0);
	const [role, setRole] = useState<Role>("tourist");
	const { register } = useAuth();
	const [registerData, setRegisterData] = useState<RegisterData>({
		name: "",
		email: "",
		password: "",
		role: "tourist",
	});
	
	const steps = getSteps(role);
	const currentStep = steps[stepIndex];
	const totalSteps = steps.length - 1;
const navigate = useNavigate();
	const next = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));

	const back = () => setStepIndex((i) => Math.max(i - 1, 0));

	const handleRegister = async () => {
		try {
			console.log("Sending to backend:", registerData);

			const response = await register(registerData);

			console.log("User registered:", response);

			onClose();
       navigate({ to: "/dashboard" }); 
		} catch (error) {
			console.error("Registration error:", error);
		}
	};

	return (
		<div className="flex flex-col w-full max-w-sm mx-auto h-full">
			<div className="h-12">
				{role === "seller" && currentStep !== "done" && (
					<StepIndicator current={stepIndex} total={totalSteps} />
				)}
			</div>

			<div
				className={`flex-1 overflow-y-auto flex flex-col ${
					currentStep === "done" ? "justify-center" : ""
				}`}
			> 
			{currentStep === "basic" && (
    <StepBasicInfo
        role={role}
        onRoleChange={setRole}
        onNext={async (selectedRole, data) => {
    setRole(selectedRole);
    const newData = { ...data, role: selectedRole };
    setRegisterData(newData);

    if (selectedRole === "tourist") {
        await register(newData);
        next();
        navigate({ to: "/dashboard" });
    } else {
        next();
    }}
	
	}
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
					<StepDone role={role} onClose={handleRegister} />
				)}
			</div>
		</div>
	);
}
