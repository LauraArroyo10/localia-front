
import React, { useState } from "react";
import ProfileView from "../profile/ProfileViewCard";
import ProfileEdit from "../../components/profile/ProfileEdit";

// Importación de las imágenes placeholders locales
import defaultAvatar from "../../assets/brand/destination-placeholder.jpg"; 
import defaultBanner from "../../assets/brand/food.jpg"; 

interface ProfileData {
  businessName: string;
  subtitle: string;
  avatarUrl: string;
  bannerImgUrl: string;
  description: string;
  location: string;
  rating: number;
}

export default function ProfilePage() {
  // Interruptor inteligente
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // (Datos hardcodes , debe ser eliminado a futuro )
  const [profileData, setProfileData] = useState<ProfileData>({
    businessName: "Esquina de Pepe",
    subtitle: "Profile",
    avatarUrl: defaultAvatar,
    bannerImgUrl: defaultBanner,
    description: "Un espacio diseñado para quienes disfrutan de un buen café en un ambiente relajado y natural. Nuestro local se encuentra a pocos pasos de la playa, lo que permite combinar el aroma de granos seleccionados con la brisa marina y el sonido de las olas.",
    location: "Quepos centro, 500mt sur Iglesia",
    rating: 4,
  });

  // Acción al guardar los cambios desde el componente editor
  const handleSaveData = (updatedData: ProfileData) => {
    setProfileData(updatedData);
    setIsEditing(false); // Cierra el editor automáticamente
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-16 px-4">
      {isEditing ? (
        <ProfileEdit
          initialData={profileData}
          onSave={handleSaveData}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <ProfileView 
          data={profileData} 
          onEditClick={() => setIsEditing(true)} 
        />
      )}
    </div>
  );
}