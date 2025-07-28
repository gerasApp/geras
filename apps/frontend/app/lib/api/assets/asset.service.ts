import { getSession } from "next-auth/react";
import { Asset, CreateAssetDto, UpdateAssetDto } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function withAuthHeaders(): Promise<HeadersInit> {
  const session = await getSession();
  const token = session?.user.accessToken;
  if (!token) throw new Error("Usuario no autenticado");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getAllAssets(): Promise<Asset[]> {
  const headers = await withAuthHeaders();
  const res = await fetch(`${API_URL}/assets`, { headers });
  if (!res.ok) {
    if (res.status === 404) return [];
    throw new Error("Error al obtener los activos");
  }
  return await res.json();
}

export async function getAssetById(id: string): Promise<Asset> {
  try {
    const headers = await withAuthHeaders();
    const res = await fetch(`${API_URL}/assets/${id}`, { headers });
    if (!res.ok) throw new Error("Error al obtener el activo");
    return await res.json();
  } catch (error) {
    console.error("Error en getAssetById:", error);
    throw error;
  }
}

export async function createAsset(asset: CreateAssetDto): Promise<Asset> {
  try {
    const headers = await withAuthHeaders();
    const res = await fetch(`${API_URL}/assets`, {
      method: "POST",
      headers,
      body: JSON.stringify(asset),
    });
    if (!res.ok) throw new Error("Error al crear el activo");
    return await res.json();
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
    const headers = await withAuthHeaders();
    const response = await fetch(`${API_URL}/assets/${id}`, {
      method: "PUT",
      headers,
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
    const headers = await withAuthHeaders();
    const response = await fetch(`${API_URL}/assets/${id}`, {
      method: "DELETE",
      headers,
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el activo");
    }
  } catch (error) {
    console.error("Error en deleteAsset:", error);
    throw error;
  }
}
