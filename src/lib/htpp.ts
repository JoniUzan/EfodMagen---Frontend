// http.js

import { QueryClient } from "react-query";
import { Shelter } from "./types";
import api from "./api";

export const baseURL = "http://localhost:3000/api/";

export const queryClient = new QueryClient();

export async function getShelters() {
  try {
    const response = await api.get("shelters");
    return response.data;
  } catch (error) {
    console.error("getShelters : error fetching shelters", error);
    throw error;
  }
}

export async function getClosestShelters(lat: number, lng: number) {
  try {
    const response = await api.get("closest-shelters", {
      params: { lat, lng },
    });
    return response.data;
  } catch (error) {
    console.error("getClosestShelters : error fetching closest shelters", error);
    throw error;
  }
}

export async function createShelter(newShelter: Shelter) {
  try {
    const response = await api.post(`${baseURL}shelters`, newShelter);
    return response.data;
  } catch (error) {
    console.error("createShelter : error creating shelter", error);
    throw error;
  }
}

export async function deleteShelter(shelterId: string) {
  try {
    await api.delete(`${baseURL}shelters/${shelterId}`);
  } catch (error) {
    console.error("deleteShelter : error deleting shelter", error);
    throw error;
  }
}

export async function updateShelter(updatedShelter: Shelter) {
  try {
    const response = await api.patch(`${baseURL}shelters/${updatedShelter._id}`, updatedShelter);
    return response.data;
  } catch (error) {
    console.error("updateShelter : error updating shelter", error);
    throw error;
  }
}
