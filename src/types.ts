export interface UserPreferences {
  cuisines: string[];
  frequency: number;
  budget: [number, number];
  phone: string; // Добавлено для регистрации по номеру телефона
}

export interface Dish {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  price: number;
  rating: number;
  cookTime: string;
  chef: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    speciality: string;
  };
  tags: string[];
  description: string;
  ingredients: string[];
}