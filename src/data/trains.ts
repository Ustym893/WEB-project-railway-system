export interface Train {
  id: string;
  trainNumber: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  duration: string;
}

export const trainsData: Train[] = [
  {
    id: "1",
    trainNumber: "091К",
    departureCity: "Київ",
    arrivalCity: "Львів",
    departureDate: "2024-10-15",
    departureTime: "22:37",
    duration: "7 год 40 хв"
  },
  {
    id: "2",
    trainNumber: "705К",
    departureCity: "Київ",
    arrivalCity: "Перемишль",
    departureDate: "2024-10-16",
    departureTime: "20:14",
    duration: "9 год 15 хв"
  },
  {
    id: "3",
    trainNumber: "043Л",
    departureCity: "Івано-Франківськ",
    arrivalCity: "Київ",
    departureDate: "2024-10-15",
    departureTime: "21:55",
    duration: "10 год 30 хв"
  }
];