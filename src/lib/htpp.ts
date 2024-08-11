// http.js

// http.js

import { QueryClient } from "react-query";
import { Shelter } from "./types";
import api from "./api";

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
    console.error("updateShelter : error updating shelter", error);
    throw error;
  }
}
