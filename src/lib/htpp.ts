import { QueryClient } from "react-query";
import api from "./api";
import { Shelter } from "./types";

export const baseURL = "http://localhost:3000/api/";

export const queryClient = new QueryClient();

export async function getShelters() {
  let shelters;
  try {
    const response = await api.get("shelters");
    shelters = response.data;
  } catch (error) {
    console.error("getShelters : error fetching shelters", error);
  }
  if (shelters) {
    return shelters;
  }
}

export async function getClosestShelters(lat: number, lng: number) {
  let shelters;
  try {
    const response = await api.get("shelters/closest-shelters", {
      params: { lat, lng },
    });
    shelters = response.data;
  } catch (error) {
    console.error(
      "getClosestShelters : error fetching closest shelters",
      error
    );
  }
  if (shelters) {
    return shelters;
  }
}

export async function updateShelters({
  updatedShelter,
}: {
  updatedShelter: Shelter;
}) {
  try {
    await api.patch(`${baseURL}shelters/${updatedShelter._id}`, updatedShelter);
    console.log("updateShelters: shelter updated successfully");
  } catch (error) {
    console.error(
      "updateShelters: error while trying to update shelter ",
      error
    );
  }
}

// New function to get the user's saved shelters
export async function getUserShelters() {
  let shelters;
  try {
    const response = await api.get(`/shelters/user-shelters`);
    shelters = response.data;
  } catch (error) {
    console.error("getUserShelters : error fetching user's shelters", error);
  }
  if (shelters) {
    return shelters;
  }
}


export async function toggleSavedShelter(shelterId:string) {
  try {
    const response = await api.post('/shelters/save-shelter', { shelterId });
    return response.data;
  } catch (error) {
    console.error('Error toggling shelter save status', error);
    throw error;
  }
}