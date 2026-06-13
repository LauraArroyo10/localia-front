import  { useState } from "react";
// Importación de las imágenes placeholders locales
import defaultAvatar from "../../assets/brand/destination-placeholder.jpg";
import defaultBanner from "../../assets/brand/food.jpg";
import ProfileEdit from "../../components/profile/ProfileEdit";
import ProfileView from "../profile/ProfileViewCard";
import TouristProfileView from "../profile/TouristProfileCard";
import { useAuth } from "../../hooks/useAuth";

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
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
 
  const [profileData, setProfileData] = useState<ProfileData>({
    businessName: "Esquina de Pepe",
    subtitle: "Profile",
    avatarUrl: defaultAvatar,
    bannerImgUrl: defaultBanner,
    description:
      "Un espacio diseñado para quienes disfrutan de un buen café en un ambiente relajado y natural.",
    location: user?.location ?? "No location set",
    rating: 4,
  });
 
  const handleSave = (updatedData: ProfileData) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };
 
  return (
  <div className="flex justify-center items-start py-6 px-4">
      {user?.role === "tourist" ? (
        <TouristProfileView
          name={user.name}
          avatarUrl={user.avatar ?? undefined}
          location={user.location ?? undefined}
        />
      ) : (
        isEditing ? (
          <ProfileEdit
            initialData={profileData}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <ProfileView
            data={profileData}
            onEditClick={() => setIsEditing(true)}
          />
        )
      )}
    </div>
  );
}