export interface MenuItem {
    id:number;
    name:string;
    price:number;
    category:string
}

export const menuData: MenuItem[] = [
  { id: 1, name: "Burger Classic",   price: 89,  category: "burgers" },
  { id: 2, name: "Crispy Chicken",   price: 75,  category: "chicken" },
  { id: 3, name: "Pepperoni Pizza",  price: 120, category: "pizza"   },
  { id: 4, name: "Caesar Salad",     price: 55,  category: "salads"  },
  { id: 5, name: "Chocolate Shake",  price: 45,  category: "drinks"  },
]