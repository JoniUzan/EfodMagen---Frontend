import {
  getShelters,
  getClosestShelters,
  queryClient,
  updateShelters,
} from "@/lib/htpp";
import { Shelter } from "@/lib/types";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useMutation, useQuery } from "react-query";

interface SheltersContext {
  shelters: Shelter[];
  sheltersLoading: boolean;
  sheltersError: boolean;
  handleUpdate: (updatedShelter: Shelter) => void;
  closestShelters: Shelter[] | undefined;
  closestSheltersLoading: boolean;
  closestSheltersError: boolean;
}

const sheltersContext = createContext<SheltersContext | undefined>(undefined);

export function SheltersProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    }
  }, []);

  const {
    data: shelters,
    isLoading: sheltersLoading,
    isError: sheltersError,
  } = useQuery({
    queryKey: ["shelters"],
    queryFn: getShelters,
  });

  const {
    data: closestShelters,
    isLoading: closestSheltersLoading,
    isError: closestSheltersError,
  } = useQuery({
    queryKey: ["closest-shelters", userLocation],
    queryFn: () => {
      if (userLocation) {
        return getClosestShelters(userLocation.lat, userLocation.lng);
      }
    },
    enabled: !!userLocation, // only run this query if userLocation is available
  });

  ///////////    Update shelters    ///////////
  const { mutate: updatedProductMutate } = useMutation({
    mutationFn: updateShelters,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shelters"] });
    },
  });

  function handleUpdate(updatedShelter: Shelter) {
    updatedProductMutate({ updatedShelter });
  }

  const value: SheltersContext = {
    shelters: shelters,
    sheltersLoading: sheltersLoading,
    sheltersError: sheltersError,
    handleUpdate,
    closestShelters: closestShelters,
    closestSheltersLoading: closestSheltersLoading,
    closestSheltersError: closestSheltersError,
  };

  return (
    <sheltersContext.Provider value={value}>
      {children}
    </sheltersContext.Provider>
  );
}

export function useShelters(): SheltersContext {
  const context = useContext(sheltersContext);
  if (context === undefined) {
    throw new Error("useShelters must be used within a SheltersProvider");
  }
  return context;
}
