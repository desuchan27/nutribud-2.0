export interface UserProps {
  id: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  userName: string | undefined;
  email: string | undefined;
  profileImage?: string | undefined | null;
}

// export interface RecipeImage {
//   id: string;
//   img: string;
//   recipeId: string;
// }

// export interface Recipe {
//   id: string;
//   title: string;
//   ingredients: string;
//   procedure: string;
//   createdAt: string; // Change to string
//   recipeImage: RecipeImage[];
//   user: {
//     username: string;
//     image: string;
//   };
// }