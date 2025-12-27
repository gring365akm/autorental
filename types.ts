
export interface Car {
  id: string;
  name: string;
  type: string;
  pricePerDay: number;
  image: string;
  features: string[];
  mpg: string;
  seats: number;
}

export interface BookingDetails {
  carId: string;
  startDate: string;
  endDate: string;
  fullName: string;
  email: string;
}
