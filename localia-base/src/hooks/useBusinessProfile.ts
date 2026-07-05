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

export function useBusinessProfile() {
  const { token, user } = useAuth();
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  const [fullBusinessData, setFullBusinessData] = useState<any>(null);

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

          // Construye la URL estática completa unificada para el renderizado
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

  const updateProfile = async (updatedData: ProfileData) => {
    if (!token) return false;

    const isNew = !businessId;
    const url = isNew
      ? "http://localhost:3000/api/businesses"
      : `http://localhost:3000/api/businesses/${businessId}`;

    const method = isNew ? "POST" : "PUT";

    try {
      const formData = new FormData();

      formData.append("name", updatedData.businessName);
      formData.append("description", updatedData.description);
      formData.append("address", updatedData.location);
      formData.append("type", updatedData.type || "service");
      formData.append("category", updatedData.category || "Gastronomy");

      if (isNew) {
        formData.append("city", "San José");
        formData.append("phone", "00000000");
        formData.append("lat", "0");
        formData.append("lng", "0");
      }

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
        
        // Definido localmente dentro del bloque correcto para evitar el ReferenceError
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