// Dummy data for the Food Waste Management & Donation System

export const donations = [
  {
    id: "1",
    foodName: "Fresh Vegetable Assortment",
    quantity: "15 kg",
    category: "Vegetables",
    expiryTime: "2026-03-30T18:00:00",
    location: "Koregaon Park, Pune",
    distance: "1.2 km",
    status: "available",
    donor: "Green Café",
    image: null,
    description: "Mixed seasonal vegetables including carrots, spinach, tomatoes and capsicum. Freshly harvested.",
    createdAt: "2026-03-29T10:00:00",
  },
  {
    id: "2",
    foodName: "Cooked Rice & Dal",
    quantity: "8 kg",
    category: "Cooked Food",
    expiryTime: "2026-03-29T22:00:00",
    location: "Baner, Pune",
    distance: "3.5 km",
    status: "available",
    donor: "Spice Garden Restaurant",
    image: null,
    description: "Freshly prepared rice and dal from today's lunch service. Packed in food-grade containers.",
    createdAt: "2026-03-29T14:00:00",
  },
  {
    id: "3",
    foodName: "Bakery Surplus",
    quantity: "30 pieces",
    category: "Bakery",
    expiryTime: "2026-03-30T08:00:00",
    location: "Aundh, Pune",
    distance: "5.1 km",
    status: "requested",
    donor: "The Bread Box",
    image: null,
    description: "Assorted breads, croissants and muffins from today's batch. Best consumed within 12 hours.",
    createdAt: "2026-03-29T16:00:00",
  },
  {
    id: "4",
    foodName: "Fruit Basket",
    quantity: "20 kg",
    category: "Fruits",
    expiryTime: "2026-03-31T12:00:00",
    location: "Viman Nagar, Pune",
    distance: "7.2 km",
    status: "completed",
    donor: "FreshMart",
    image: null,
    description: "Seasonal fruits including mangoes, bananas, apples and oranges. Slightly overripe but excellent for juices.",
    createdAt: "2026-03-28T09:00:00",
  },
  {
    id: "5",
    foodName: "Wedding Feast Leftovers",
    quantity: "50 kg",
    category: "Cooked Food",
    expiryTime: "2026-03-29T23:00:00",
    location: "Hadapsar, Pune",
    distance: "9.8 km",
    status: "available",
    donor: "Sharma Events",
    image: null,
    description: "Large quantity of freshly cooked paneer dishes, rotis, and sweet items from a wedding reception.",
    createdAt: "2026-03-29T18:00:00",
  },
];

export const donorStats = {
  totalDonations: 24,
  activeRequests: 3,
  foodSaved: "186 kg",
  livesImpacted: 340,
};

export const ngoStats = {
  totalReceived: 18,
  peopleFed: 820,
  activePickups: 2,
  partneredDonors: 15,
};

export const features = [
  {
    icon: "🌱",
    title: "Zero Food Waste",
    description: "Connect surplus food with those who need it most. Every meal saved is a step toward a sustainable future.",
  },
  {
    icon: "🤝",
    title: "Community Driven",
    description: "A network of restaurants, homes, and NGOs working together to eliminate hunger in our neighborhoods.",
  },
  {
    icon: "⚡",
    title: "Real-Time Matching",
    description: "Instant notifications when food is available nearby. Fast pickup ensures nothing goes to waste.",
  },
];

export const categories = [
  "Cooked Food",
  "Vegetables",
  "Fruits",
  "Bakery",
  "Dairy",
  "Grains & Pulses",
  "Packaged Food",
  "Other",
];
