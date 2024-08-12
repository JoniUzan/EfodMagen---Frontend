///// Google Maps /////
export type Shelter = {
  address: string;
  capacity: number;
  location: {
    type: string;
    coordinates: number[];
  };
  notes: string;
  accessibility: boolean;
  _id: string;
};

////// Auth Provider //////
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
  saved_shelters: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  israeli_ID: number;
  address: string;
}
