export type Fruit = {
  id?: number;
  name?: string;
  image?: string;
  isActive: boolean;
};

let fruits: Fruit[] = [
  {
    id: 1,
    name: "Apple",
    image: "https://via.placeholder.com/100",
    isActive: true,
  },
];

let idCounter = 2;

export const getFruits = () => fruits;

export const addFruit = (fruit: {
  name: string;
  image: string;
  isActive: boolean;
}) => {
  const newFruit = { ...fruit, id: idCounter++ };
  fruits.push(newFruit);
  return newFruit;
};

export const updateFruit = (
  id: number,
  data: Partial<Fruit>
) => {
  const fruit = fruits.find((f) => f.id === id);
  if (fruit) Object.assign(fruit, data);
  return fruit;
};

export const deleteFruit = (id: number) => {
  fruits = fruits.filter((f) => f.id !== id);
};
