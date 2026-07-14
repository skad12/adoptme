export type PetTypeSlug = "dog" | "cat" | "fish" | "bird" | "reptile" | "small-pet" | "farm-animal";

export type ShopCategory = {
  slug: string;
  name: string;
  subcategories: { slug: string; name: string }[];
};

export type PetType = {
  slug: PetTypeSlug;
  name: string;
  description: string;
  categories: ShopCategory[];
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  petType: PetTypeSlug;
  categorySlug: string;
  subcategorySlug: string;
  priceMinor: number;
  currency: "NGN";
  description: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  autoshipEligible?: boolean;
};

export type ServiceType = "GROOMING" | "TRAINING" | "DAY_CAMP" | "VET_CARE";

export type Service = {
  id: string;
  slug: string;
  type: ServiceType;
  name: string;
  summary: string;
  description: string;
  priceFromMinor: number;
  currency: "NGN";
  duration: string;
  bookingSteps: string[];
  imageUrl: string;
};

export type StoreLocation = {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  stateCode: string;
  phone: string;
  services: ServiceType[];
  hours: string;
};

export type LearningArticle = {
  id: string;
  slug: string;
  petType: PetTypeSlug | "general";
  category: string;
  title: string;
  summary: string;
  tags: string[];
  readMinutes: number;
};

export type CatalogData = {
  petTypes: PetType[];
  products: Product[];
  services: Service[];
  stores: StoreLocation[];
  articles: LearningArticle[];
};
