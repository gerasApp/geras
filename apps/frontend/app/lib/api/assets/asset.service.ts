import { Asset, CreateAssetDto, UpdateAssetDto } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getAllAssets(): Promise<Asset[]> {
  try {
    const response = await fetch(`${API_URL}/assets`);
    if (!response.ok) {
      if (response.status === 404) {
        return [];
      }
      throw new Error("Error al obtener los activos");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllAssets:", error);
    throw error;
  }
}

export async function getAssetById(id: string): Promise<Asset> {
  try {
    const response = await fetch(`${API_URL}/assets/${id}`);
    if (!response.ok) {
      throw new Error("Error al obtener el activo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAssetById:", error);
    throw error;
  }
}

export async function createAsset(asset: CreateAssetDto): Promise<Asset> {
  try {
    const response = await fetch(`${API_URL}/assets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asset),
    });
    if (!response.ok) {
      throw new Error("Error al crear el activo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en createAsset:", error);
    throw error;
  }
}

export async function updateAsset(
  id: string,
  asset: UpdateAssetDto,
): Promise<Asset> {
  try {
    const response = await fetch(`${API_URL}/assets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(asset),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el activo");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en updateAsset:", error);
    throw error;
  }
}

export async function deleteAsset(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/assets/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el activo");
    }
  } catch (error) {
    console.error("Error en deleteAsset:", error);
    throw error;
  }
}
