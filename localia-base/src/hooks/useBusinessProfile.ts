import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export interface ProfileData {
  businessName: string;
  subtitle: string; 
  avatarUrl: string;
  bannerImgUrl: string;
  description: string;
  location: string;  
  rating: number;
  category: string;
  type: string;
  avatarFile?: File; // Capturado por ProfileEdit.tsx
  bannerFile?: File; 
}

/**
 * Hook de perfil comercial que carga los datos del negocio vinculado
 * al usuario autenticado y permite actualizar el perfil.
 * Se usa en la página de perfil y en formularios de edición.
 */
export function useBusinessProfile() {
  const { token, user } = useAuth();
  /**
   * Identifica el negocio asociado al usuario autenticado.
   */
  const [businessId, setBusinessId] = useState<string | null>(null);
  /**
   * Indica si el perfil de negocio aún se está cargando.
   */
  const [isLoading, setIsLoading] = useState(true);
  /**
   * Contiene los datos del perfil que se muestran en los formularios y vistas.
   */
  const [profileData, setProfileData] = useState<ProfileData>({
    businessName: "",
    subtitle: "",
    avatarUrl: "",
    bannerImgUrl: "",
    description: "",
    location: "",
    rating: 0,
    category: "",
    type: "",
  });

  /**
   * Guarda la respuesta completa del negocio cuando se requiere información adicional
   * más allá de lo que se muestra en el perfil resumido.
   */
  const [, setFullBusinessData] = useState<any>(null);

  /**
   * Carga el perfil del negocio vinculado al usuario y prepara los datos
   * para mostrarlos en la interfaz.
   */
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/api/businesses/my-business", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (res.ok && json.data) {
          setBusinessId(json.data.id);
          setFullBusinessData(json.data);

          /**
           * Normaliza la ruta de la imagen para que la UI reciba un valor usable.
           */
          const completeImageUrl = json.data.image_url 
            ? (json.data.image_url.startsWith("http") ? json.data.image_url : `http://localhost:3000${json.data.image_url}`)
            : "";

          setProfileData({
            businessName: json.data.name || "",
            subtitle: json.data.type || "Comerciante",
            avatarUrl: completeImageUrl,
            bannerImgUrl: completeImageUrl,
            description: json.data.description || "",
            location: json.data.address || "",
            rating: Number(json.data.avg_rating) || 0,
            category: json.data.category || "",
            type: json.data.type || "",
          });
        } else {
          /**
           * Si no hay datos de negocio, se inicializa un perfil vacío
           * para que el usuario pueda completar la información.
           */
          setProfileData({
            businessName: user?.name || "Mi Nuevo Comercio",
            subtitle: "Comerciante",
            avatarUrl: "",
            bannerImgUrl: "",
            description: "",
            location: "",
            rating: 0,
            category: "Gastronomy", 
            type: "service",
          });
        }
      } catch (error) {
        console.error("Error al obtener perfil de negocio:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, user]);

  /**
   * Envía los cambios del perfil a la API.
   * Crea un negocio si no existía uno y actualiza el negocio existente en caso contrario.
   */
  const updateProfile = async (updatedData: ProfileData) => {
    if (!token) return false;

    /**
     * Determina si se debe crear un negocio nuevo o actualizar uno existente.
     */
    const isNew = !businessId;
    const url = isNew
      ? "http://localhost:3000/api/businesses"
      : `http://localhost:3000/api/businesses/${businessId}`;

    const method = isNew ? "POST" : "PUT";

    try {
      /**
       * Construye el formulario multipart para enviar el perfil al backend.
       */
      const formData = new FormData();

      formData.append("name", updatedData.businessName);
      formData.append("description", updatedData.description);
      formData.append("address", updatedData.location);
      formData.append("type", updatedData.type || "service");
      formData.append("category", updatedData.category || "Gastronomy");

      /**
       * Para nuevos negocios se agrega información mínima requerida por el API.
       */
      if (isNew) {
        formData.append("city", "San José");
        formData.append("phone", "00000000");
        formData.append("lat", "0");
        formData.append("lng", "0");
      }

      /**
       * Agrega la imagen de avatar al formulario si el usuario la cargó.
       */
      if (updatedData.avatarFile) {
        formData.append("image", updatedData.avatarFile);
      }

      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const json = await res.json();
      console.log(`=== RESPUESTA RECIBIDA CON MULTIPART (${method}) ===`, json);

      if (res.ok && json.data) {
        setBusinessId(json.data.id);
        setFullBusinessData(json.data);
        
        /**
         * Ajusta la ruta de la imagen en la respuesta para que la vista la pueda usar directamente.
         */
        const completeImageUrl = json.data.image_url 
          ? (json.data.image_url.startsWith("http") ? json.data.image_url : `http://localhost:3000${json.data.image_url}`)
          : "";

        setProfileData({
          businessName: json.data.name || "",
          subtitle: json.data.type || "Comerciante",
          avatarUrl: completeImageUrl,
          bannerImgUrl: completeImageUrl, 
          description: json.data.description || "",
          location: json.data.address || "",
          rating: Number(json.data.avg_rating) || 0,
          category: json.data.category || "",
          type: json.data.type || "",
        });
        return true;
      } else {
        console.error("Fallo en la respuesta del servidor:", json.errors || json.message);
      }
    } catch (error) {
      console.error("Error al guardar perfil de negocio:", error);
    }
    return false;
  };

  return { profileData, isLoading, updateProfile };
}