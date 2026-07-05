import { useState } from "react"; 

export const useTouristProfile = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadAvatar = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/api/users/update-avatar", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();
      
      // Esto nos dirá exactamente la forma que tiene la respuesta en consola
      console.log("Respuesta completa del servidor en uploadAvatar:", result);

      if (!response.ok) {
        throw new Error(result.message || "Error al subir la imagen");
      }

      // Validamos de dónde viene el avatar para que nunca retorne un undefined inservible
      const avatarPath = result.user?.avatar ?? result.avatar ?? null;
      return avatarPath;

    } catch (error) {
      console.error("Error en uploadAvatar:", error);
      alert("No se pudo guardar la foto de perfil.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadAvatar, isUploading };
};