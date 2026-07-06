import { useState, useEffect } from "react";
import ProfileEdit from "../../components/profile/ProfileEdit";
import ProfileView from "../../components/profile/ProfileViewCard";
import TouristProfileView from "../../components/profile/TouristProfileCard";
import { useAuth } from "../../hooks/useAuth";
import { useBusinessProfile } from "../../hooks/useBusinessProfile";
import { useTouristProfile } from "../../hooks/useTouristProfile";

export default function ProfilePage() {
  const { user, token, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  /**
   * Obtiene los datos del perfil de negocio y las acciones para actualizarlo.
   */
  const { profileData, isLoading, updateProfile } = useBusinessProfile();
  const { uploadAvatar, isUploading } = useTouristProfile();
  const [touristAvatar, setTouristAvatar] = useState<string | undefined>(user?.avatar);

  /**
   * Mantiene el avatar del turista alineado con el estado global al recargar la página.
   */
  useEffect(() => {
    if (user?.avatar) {
      setTouristAvatar(user.avatar);
    }
  }, [user?.avatar]);

  /**
   * Guarda los cambios del perfil y cierra la edición cuando la operación termina bien.
   */
  const handleSaveData = async (updatedData: any) => {
    const success = await updateProfile(updatedData);
    if (success) {
      setIsEditing(false);
    }
  };

  /**
   * Sube una foto nueva para el perfil de turista y actualiza el estado visible.
   */
  const handleAvatarChange = async (file: File) => {
    if (token) {
      localStorage.setItem("token", token);
    }

    const uploadedUrl = await uploadAvatar(file);
    
    if (uploadedUrl && user) {
      setTouristAvatar(uploadedUrl);
      
      updateUser({
        avatar: uploadedUrl
      });
    }
  };

  /**
   * Evita bloquear la vista de turista esperando un estado de negocio que no aplica.
   */
  if (isLoading && user?.role !== "tourist") {
    return <div className="text-center py-20">Cargando perfil...</div>;
  }

  /**
   * Renderiza la vista del perfil para usuarios turistas.
   */
  if (user?.role === "tourist") {
    return (
      <div className="flex justify-center items-start py-16">
        <TouristProfileView
          name={user.name}
          avatarUrl={touristAvatar}
          location={user.location}
          onAvatarChange={handleAvatarChange}
        />
        {isUploading && (
          <div className="fixed bottom-4 right-4 bg-violet-500 text-white px-4 py-2 rounded-full text-xs shadow-lg animate-pulse">
            Guardando foto en el servidor...
          </div>
        )}
      </div>
    );
  }

  /**
   * Prepara un modelo vacío para el caso de que el comercio aún no exista.
   */
  const emptyBusinessData = {
    businessName: "",
    subtitle: "Nuevo Comercio",
    avatarUrl: "",
    bannerImgUrl: "",
    description: "",
    location: "",
    rating: 0,
  };

  /**
   * Renderiza la vista de edición o visualización del perfil para vendedores.
   */
  return (
    <div className="flex justify-center items-start py-16 w-full">
      {profileData ? (
        isEditing ? (
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
        )
      ) : (
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-violet-100 flex flex-col gap-4">
          <div className="text-center py-4">
            <h3 className="text-lg font-bold text-gray-800">Registrar Perfil de Negocio</h3>
            <p className="text-sm text-gray-500">Aún no has configurado los datos de tu comercio.</p>
          </div>
          
          <ProfileEdit
            initialData={emptyBusinessData}
            onSave={handleSaveData}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )}
    </div>
  );
}