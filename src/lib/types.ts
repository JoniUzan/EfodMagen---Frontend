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