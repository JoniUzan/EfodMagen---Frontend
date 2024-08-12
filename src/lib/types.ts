

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
  IsPrivate: boolean;
};

////// Auth Provider //////
export interface User {
  _id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
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
