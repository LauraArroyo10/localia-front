import { useEffect, useState } from "react";
import { useBusinessLocation } from "../../hooks/useBusinessLocation";
import ProfileEdit from "../../components/profile/ProfileEdit";
import ProfileView from "../profile/ProfileViewCard";
import TouristProfileView from "../profile/TouristProfileCard";
import { useAuth } from "../../hooks/useAuth";
import type { ProfileData } from "../../types/profile";

// Placeholders locales
const defaultAvatar = "/img/destination-placeholder.jpg";
const defaultBanner = "/img/food.jpg";

export default function ProfilePage() {
  const { user } = useAuth();
  const { location } = useBusinessLocation();
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState<ProfileData>({
    businessName: "Esquina de Pepe",
    subtitle: "Profile",
    image_url: defaultAvatar,
    bannerImgUrl: defaultBanner,
    description:
      "Un espacio diseñado para quienes disfrutan de un buen café en un ambiente relajado y natural.",
    location: "Loading...",
    rating: 4,
  });

  // 🔥 Actualiza la ubicación cuando llegue del backend
  useEffect(() => {
    if (location) {
      setProfileData((prev) => ({
        ...prev,
        location: location.location,
      }));
    }
  }, [location]);

  const handleSaveData = (updatedData: ProfileData) => {
    setProfileData(updatedData);
    setIsEditing(false);
  };

  // 👤 Vista turista
  if (user?.role === "tourist") {
    return (
      <div className="flex justify-center items-start py-16">
        <TouristProfileView
          name={user.name}
          avatarUrl={user.avatar}
          location={user.location ?? "No location set"}
        />
      </div>
    );
  }

 
  return (
    <div className="flex justify-center items-start py-16">
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