import { useState } from "react"; 

/**
 * Hook que maneja la carga de avatar para perfiles turísticos.
 * Devuelve el estado de carga y la función para subir la imagen.
 */
export const useTouristProfile = () => {
  const [isUploading, setIsUploading] = useState(false);

  /**
   * Sube una nueva foto de perfil y devuelve la ruta que debe usarse en la UI.
   */
  const uploadAvatar = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("token");

    /**
     * Envía la imagen al backend y recupera la respuesta para validar el resultado.
     */
    try {
      const response = await fetch("http://localhost:3000/api/users/update-avatar", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();
      
      /**
       * Registra la respuesta del servidor para facilitar la depuración del flujo.
       */
      console.log("Respuesta completa del servidor en uploadAvatar:", result);

      if (!response.ok) {
        throw new Error(result.message || "Error al subir la imagen");
      }

      /**
       * Determina la ruta final del avatar a partir de los datos devueltos.
       */
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