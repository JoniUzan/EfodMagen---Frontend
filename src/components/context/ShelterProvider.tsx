import {
  getShelters,
  getClosestShelters,
  createShelter,
  deleteShelter,
  updateShelter,
  queryClient,
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
  handleCreate: (newShelter: Shelter) => void;
  handleDelete: (shelterId: string) => void;
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

  ///////////    Create Shelter    ///////////
  const { mutate: createShelterMutate } = useMutation({
    mutationFn: createShelter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shelters"] });
    },
  });

  function handleCreate(newShelter: Shelter) {
    createShelterMutate(newShelter);
  }

  ///////////    Delete Shelter    ///////////
  const { mutate: deleteShelterMutate } = useMutation({
    mutationFn: deleteShelter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shelters"] });
    },
  });

  function handleDelete(shelterId: string) {
    deleteShelterMutate(shelterId);
  }

  ///////////    Update Shelter    ///////////
  const { mutate: updateShelterMutate } = useMutation({
    mutationFn: updateShelter,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shelters"] });
    },
  });

  function handleUpdate(updatedShelter: Shelter) {
    updateShelterMutate(updatedShelter);
  }

  const value: SheltersContext = {
    shelters: shelters || [],
    sheltersLoading,
    sheltersError,
    handleCreate,
    handleDelete,
    handleUpdate,
    closestShelters: closestShelters || [],
    closestSheltersLoading,
    closestSheltersError,
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
