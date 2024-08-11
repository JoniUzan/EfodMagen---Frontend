import { getShelters, queryClient, updateShelters } from "@/lib/htpp";
import { Shelter } from "@/lib/types";
import { createContext, useContext, ReactNode } from "react";
import { useMutation, useQuery } from "react-query";

interface SheltersContext {
  shelters: Shelter[];
  sheltersLoading: boolean;
  sheltersError: boolean;
  handleUpdate: (updatedShelter: Shelter) => void;
}

const sheltersContext = createContext<SheltersContext | undefined>(undefined);

export function SheltersProvider({ children }: { children: ReactNode }) {
 
 
  const {
    data: shelters,
    isLoading: sheltersLoading,
    isError: sheltersError,
  } = useQuery({
    queryKey: ["shelters"],
    queryFn: getShelters,
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
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
