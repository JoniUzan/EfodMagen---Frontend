import { QueryClient } from "react-query";

import { Shelter } from "./types";
import api from "./api";

export const baseURL = "http://localhost:3000/";

export const queryClient = new QueryClient();

export async function getShelters() {
  let shelters;
  try {
    const response = await api.get(baseURL + "shelters");
    shelters = response.data;
  } catch (error) {
    console.error("getShelters : error fetching shelters", error);
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
    console.log("updateShelters: shelter updatetd successfully");
  } catch (error) {
    console.error(
      "updateShelters: error while trying to update shelter ",
      error
    );
  }
}
