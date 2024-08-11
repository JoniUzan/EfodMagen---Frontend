export interface Shelter {
  address: string;
  capacity: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  notes: string;
  accessibility: boolean;
  _id: string;
}




///// Google Maps /////
export type Point = {
    address: string;
    capacity: number;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    notes: string;
    accessibility: boolean;
    _id: string;
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