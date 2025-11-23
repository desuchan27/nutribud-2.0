import { Prisma } from "@prisma/client";

// ----------------------------------------------------------------------

export const recipes: Omit<Prisma.RecipeCreateInput, "user">[] = [
	{
		title: "Vegetable Soup",
		procedure: `
    Heat olive oil in a large pot and sauté onions, garlic, and celery until softened.
    
    Add diced carrots, potatoes, and zucchini, and cook for 5 minutes.
    
    Pour in vegetable broth and bring to a boil.
    
    Reduce heat and simmer until vegetables are tender.
    
    Season with salt, pepper, and fresh herbs. Serve hot.
    `,
		totalSrp: 6.5,
		Calories: 120,
		Protein: 4,
		Carbs: 18,
		Fat: 4,
		Fiber: 3,
		Sugar: 4,
		Sodium: 400,
		Potassium: 250,
		VitaminC: 20,
		VitaminA: 150,
		Calcium: 40,
		Iron: 1,
		ingredients: {
			create: [
				{ name: "Onions", srp: 1.0 },
				{ name: "Carrots", srp: 1.5 },
				{ name: "Potatoes", srp: 2.0 },
				{ name: "Zucchini", srp: 2.0 },
			],
		},
	},
	{
		title: "Classic Pancakes",
		procedure: `
  1. In a large bowl, whisk together the flour, sugar, baking powder, and salt.
  2. In another bowl, combine the milk, eggs, and melted butter, then pour into the dry ingredients.
  3. Stir until just combined, leaving small lumps in the batter.
  4. Heat a non-stick skillet over medium heat and lightly grease it with butter or oil.
  5. Pour 1/4 cup of batter onto the skillet and cook until bubbles form on the surface.
  6. Flip the pancake and cook until golden brown. Serve warm with syrup or your favorite toppings.
  `,
		totalSrp: 5.6,
		Calories: 350,
		Protein: 8,
		Carbs: 40,
		Fat: 10,
		Fiber: 2,
		Sugar: 5,
		Sodium: 300,
		Potassium: 100,
		VitaminC: 0,
		VitaminA: 50,
		Calcium: 120,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Flour", srp: 2.0 },
				{ name: "Milk", srp: 1.5 },
				{ name: "Eggs", srp: 1.1 },
				{ name: "Butter", srp: 1.0 },
			],
		},
	},
	{
		title: "Grilled Cheese Sandwich",
		procedure: `
    Butter one side of each slice of bread.
    
    Place one slice, buttered side down, in a skillet over medium heat.
    
    Add a layer of cheese slices, then top with the second slice of bread, buttered side up.
    
    Cook until the bread is golden brown, then flip and cook the other side.
    
    Remove from heat, let cool slightly, and slice in half. Serve warm.
    `,
		totalSrp: 4.0,
		Calories: 380,
		Protein: 12,
		Carbs: 30,
		Fat: 22,
		Fiber: 2,
		Sugar: 3,
		Sodium: 700,
		Potassium: 100,
		VitaminC: 0,
		VitaminA: 80,
		Calcium: 200,
		Iron: 1.5,
		ingredients: {
			create: [
				{ name: "Bread", srp: 2.0 },
				{ name: "Cheese", srp: 2.0 },
			],
		},
	},
	{
		title: "Spaghetti Bolognese",
		procedure: `
  1. Bring a large pot of salted water to a boil and cook the spaghetti according to package instructions.
  2. In a skillet, heat olive oil over medium heat and sauté onions, garlic, and carrots until soft.
  3. Add ground beef and cook until browned, breaking it up with a spoon.
  4. Stir in tomato paste, canned tomatoes, oregano, and a pinch of salt and pepper.
  5. Simmer for 20 minutes, stirring occasionally, until the sauce thickens.
  6. Drain the spaghetti and toss with the sauce. Garnish with Parmesan and serve immediately.
  `,
		totalSrp: 9.8,
		Calories: 520,
		Protein: 22,
		Carbs: 60,
		Fat: 15,
		Fiber: 6,
		Sugar: 8,
		Sodium: 800,
		Potassium: 350,
		VitaminC: 5,
		VitaminA: 100,
		Calcium: 90,
		Iron: 3,
		ingredients: {
			create: [
				{ name: "Spaghetti", srp: 3.0 },
				{ name: "Ground Beef", srp: 4.5 },
				{ name: "Tomato Sauce", srp: 1.5 },
				{ name: "Parmesan", srp: 0.8 },
			],
		},
	},
	{
		title: "Chicken Caesar Salad",
		procedure: `
  1. Preheat the grill and cook the chicken breast until fully cooked, about 5–7 minutes per side.
  2. Chop the lettuce into bite-sized pieces and place in a large salad bowl.
  3. Slice the grilled chicken into strips and add to the salad.
  4. Toss with croutons and Caesar dressing, ensuring the lettuce is evenly coated.
  5. Sprinkle grated Parmesan cheese on top and serve immediately.
  `,
		totalSrp: 7.5,
		Calories: 430,
		Protein: 26,
		Carbs: 15,
		Fat: 25,
		Fiber: 3,
		Sugar: 3,
		Sodium: 600,
		Potassium: 200,
		VitaminC: 15,
		VitaminA: 200,
		Calcium: 80,
		Iron: 1.5,
		ingredients: {
			create: [
				{ name: "Lettuce", srp: 2.5 },
				{ name: "Grilled Chicken", srp: 1.5 },
				{ name: "Croutons", srp: 2.0 },
				{ name: "Caesar Dressing", srp: 1.5 },
			],
		},
	},
	{
		title: "Chicken Noodle Soup",
		procedure: `
    Heat olive oil in a large pot and sauté onions, garlic, and celery.
    
    Add diced chicken breast and cook until lightly browned.
    
    Pour in chicken broth and bring to a boil.
    
    Add noodles, carrots, and seasoning. Cook until the noodles are tender.
    
    Serve hot, garnished with fresh parsley.
    `,
		totalSrp: 8.0,
		Calories: 250,
		Protein: 18,
		Carbs: 30,
		Fat: 6,
		Fiber: 2,
		Sugar: 3,
		Sodium: 800,
		Potassium: 300,
		VitaminC: 10,
		VitaminA: 200,
		Calcium: 50,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Chicken Breast", srp: 3.0 },
				{ name: "Noodles", srp: 2.0 },
				{ name: "Carrots", srp: 1.5 },
				{ name: "Chicken Broth", srp: 1.5 },
			],
		},
	},
	{
		title: "Vegetarian Pizza",
		procedure: `
  1. Preheat your oven to 220°C (430°F) and prepare a baking sheet or pizza stone.
  2. Roll out the pizza dough on a floured surface to your desired thickness.
  3. Spread tomato sauce evenly over the base, leaving a small border.
  4. Sprinkle shredded mozzarella cheese generously over the sauce.
  5. Add toppings such as sliced bell peppers, mushrooms, and onions.
  6. Bake for 12–15 minutes, or until the crust is golden and the cheese is bubbly.
  7. Remove from the oven, let cool slightly, and slice to serve.
  `,
		totalSrp: 8.0,
		Calories: 450,
		Protein: 18,
		Carbs: 50,
		Fat: 15,
		Fiber: 4,
		Sugar: 6,
		Sodium: 700,
		Potassium: 150,
		VitaminC: 12,
		VitaminA: 150,
		Calcium: 100,
		Iron: 2.5,
		ingredients: {
			create: [
				{ name: "Pizza Dough", srp: 3.0 },
				{ name: "Tomato Sauce", srp: 1.5 },
				{ name: "Mozzarella Cheese", srp: 2.5 },
				{ name: "Bell Peppers", srp: 1.0 },
			],
		},
	},
	{
		title: "Margherita Pizza",
		procedure: `
    Preheat your oven to 220°C (430°F) and prepare a baking sheet.
    
    Roll out the pizza dough on a floured surface.
    
    Spread tomato sauce evenly over the base, leaving a small border.
    
    Top with slices of fresh mozzarella and basil leaves.
    
    Bake for 10-15 minutes, or until the crust is golden and the cheese is bubbly. Serve hot.
    `,
		totalSrp: 8.5,
		Calories: 420,
		Protein: 15,
		Carbs: 50,
		Fat: 14,
		Fiber: 3,
		Sugar: 4,
		Sodium: 600,
		Potassium: 200,
		VitaminC: 15,
		VitaminA: 100,
		Calcium: 120,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Pizza Dough", srp: 3.0 },
				{ name: "Tomato Sauce", srp: 1.5 },
				{ name: "Mozzarella", srp: 2.5 },
				{ name: "Basil", srp: 1.5 },
			],
		},
	},
	{
		title: "Beef Tacos",
		procedure: `
  1. Heat a skillet over medium-high heat and cook ground beef until fully browned.
  2. Stir in taco seasoning and a splash of water, simmering for 2–3 minutes.
  3. Warm the taco shells in a dry skillet or in the oven.
  4. Fill each taco shell with the beef mixture, lettuce, and shredded cheddar cheese.
  5. Add optional toppings like salsa, sour cream, and avocado slices. Serve immediately.
  `,
		totalSrp: 8.5,
		Calories: 500,
		Protein: 20,
		Carbs: 35,
		Fat: 22,
		Fiber: 4,
		Sugar: 3,
		Sodium: 750,
		Potassium: 200,
		VitaminC: 8,
		VitaminA: 120,
		Calcium: 90,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Taco Shells", srp: 2.0 },
				{ name: "Ground Beef", srp: 4.0 },
				{ name: "Lettuce", srp: 1.0 },
				{ name: "Cheddar Cheese", srp: 1.5 },
			],
		},
	},
	{
		title: "BBQ Chicken Wings",
		procedure: `
    Preheat your oven to 200°C (400°F) and line a baking sheet with parchment paper.
    
    Toss chicken wings in olive oil, salt, and pepper.
    
    Spread the wings on the baking sheet in a single layer.
    
    Bake for 20 minutes, then flip the wings.
    
    Brush with BBQ sauce and bake for an additional 15 minutes. Serve warm.
    `,
		totalSrp: 10.0,
		Calories: 450,
		Protein: 30,
		Carbs: 10,
		Fat: 30,
		Fiber: 1,
		Sugar: 5,
		Sodium: 900,
		Potassium: 250,
		VitaminC: 5,
		VitaminA: 50,
		Calcium: 30,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Chicken Wings", srp: 7.0 },
				{ name: "BBQ Sauce", srp: 3.0 },
			],
		},
	},
	{
		title: "Vegetable Soup",
		procedure: `
    Heat olive oil in a large pot and sauté onions, garlic, and celery until softened.
    
    Add diced carrots, potatoes, and zucchini, and cook for 5 minutes.
    
    Pour in vegetable broth and bring to a boil.
    
    Reduce heat and simmer until vegetables are tender.
    
    Season with salt, pepper, and fresh herbs. Serve hot.
    `,
		totalSrp: 6.5,
		Calories: 120,
		Protein: 4,
		Carbs: 18,
		Fat: 4,
		Fiber: 3,
		Sugar: 4,
		Sodium: 400,
		Potassium: 250,
		VitaminC: 20,
		VitaminA: 150,
		Calcium: 40,
		Iron: 1,
		ingredients: {
			create: [
				{ name: "Onions", srp: 1.0 },
				{ name: "Carrots", srp: 1.5 },
				{ name: "Potatoes", srp: 2.0 },
				{ name: "Zucchini", srp: 2.0 },
			],
		},
	},
	{
		title: "Grilled Cheese Sandwich",
		procedure: `
    Butter one side of each slice of bread.
    
    Place one slice, buttered side down, in a skillet over medium heat.
    
    Add a layer of cheese slices, then top with the second slice of bread, buttered side up.
    
    Cook until the bread is golden brown, then flip and cook the other side.
    
    Remove from heat, let cool slightly, and slice in half. Serve warm.
    `,
		totalSrp: 4.0,
		Calories: 380,
		Protein: 12,
		Carbs: 30,
		Fat: 22,
		Fiber: 2,
		Sugar: 3,
		Sodium: 700,
		Potassium: 100,
		VitaminC: 0,
		VitaminA: 80,
		Calcium: 200,
		Iron: 1.5,
		ingredients: {
			create: [
				{ name: "Bread", srp: 2.0 },
				{ name: "Cheese", srp: 2.0 },
			],
		},
	},
	{
		title: "Chicken Noodle Soup",
		procedure: `
    Heat olive oil in a large pot and sauté onions, garlic, and celery.
    
    Add diced chicken breast and cook until lightly browned.
    
    Pour in chicken broth and bring to a boil.
    
    Add noodles, carrots, and seasoning. Cook until the noodles are tender.
    
    Serve hot, garnished with fresh parsley.
    `,
		totalSrp: 8.0,
		Calories: 250,
		Protein: 18,
		Carbs: 30,
		Fat: 6,
		Fiber: 2,
		Sugar: 3,
		Sodium: 800,
		Potassium: 300,
		VitaminC: 10,
		VitaminA: 200,
		Calcium: 50,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Chicken Breast", srp: 3.0 },
				{ name: "Noodles", srp: 2.0 },
				{ name: "Carrots", srp: 1.5 },
				{ name: "Chicken Broth", srp: 1.5 },
			],
		},
	},
	{
		title: "Margherita Pizza",
		procedure: `
    Preheat your oven to 220°C (430°F) and prepare a baking sheet.
    
    Roll out the pizza dough on a floured surface.
    
    Spread tomato sauce evenly over the base, leaving a small border.
    
    Top with slices of fresh mozzarella and basil leaves.
    
    Bake for 10–15 minutes, or until the crust is golden and the cheese is bubbly. Serve hot.
    `,
		totalSrp: 8.5,
		Calories: 420,
		Protein: 15,
		Carbs: 50,
		Fat: 14,
		Fiber: 3,
		Sugar: 4,
		Sodium: 600,
		Potassium: 200,
		VitaminC: 15,
		VitaminA: 100,
		Calcium: 120,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Pizza Dough", srp: 3.0 },
				{ name: "Tomato Sauce", srp: 1.5 },
				{ name: "Mozzarella", srp: 2.5 },
				{ name: "Basil", srp: 1.5 },
			],
		},
	},
	{
		title: "BBQ Chicken Wings",
		procedure: `
    Preheat your oven to 200°C (400°F) and line a baking sheet with parchment paper.
    
    Toss chicken wings in olive oil, salt, and pepper.
    
    Spread the wings on the baking sheet in a single layer.
    
    Bake for 20 minutes, then flip the wings.
    
    Brush with BBQ sauce and bake for an additional 15 minutes. Serve warm.
    `,
		totalSrp: 10.0,
		Calories: 450,
		Protein: 30,
		Carbs: 10,
		Fat: 30,
		Fiber: 1,
		Sugar: 5,
		Sodium: 900,
		Potassium: 250,
		VitaminC: 5,
		VitaminA: 50,
		Calcium: 30,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Chicken Wings", srp: 7.0 },
				{ name: "BBQ Sauce", srp: 3.0 },
			],
		},
	},
	{
		title: "Beef Stroganoff",
		procedure: `
    Cook egg noodles in salted boiling water, then drain and set aside.
    
    In a skillet, sauté onions and mushrooms in butter until soft.
    
    Add strips of beef and cook until browned.
    
    Pour in beef broth and sour cream, then simmer until the sauce thickens.
    
    Serve the beef stroganoff over the egg noodles, garnished with parsley.
    `,
		totalSrp: 9.0,
		Calories: 550,
		Protein: 25,
		Carbs: 40,
		Fat: 30,
		Fiber: 2,
		Sugar: 3,
		Sodium: 700,
		Potassium: 350,
		VitaminC: 10,
		VitaminA: 50,
		Calcium: 100,
		Iron: 3,
		ingredients: {
			create: [
				{ name: "Beef", srp: 5.0 },
				{ name: "Mushrooms", srp: 2.0 },
				{ name: "Egg Noodles", srp: 2.0 },
			],
		},
	},
	{
		title: "Vegetarian Stir Fry",
		procedure: `
    Heat sesame oil in a large wok over medium heat.
    
    Add broccoli, bell peppers, and snap peas, and stir fry for 5 minutes.
    
    Stir in soy sauce, garlic, and ginger, and cook for an additional 2 minutes.
    
    Serve the stir fry over steamed rice, topped with sesame seeds.
    `,
		totalSrp: 7.0,
		Calories: 300,
		Protein: 6,
		Carbs: 50,
		Fat: 8,
		Fiber: 6,
		Sugar: 4,
		Sodium: 500,
		Potassium: 400,
		VitaminC: 30,
		VitaminA: 150,
		Calcium: 80,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Broccoli", srp: 2.0 },
				{ name: "Bell Peppers", srp: 1.5 },
				{ name: "Snap Peas", srp: 2.0 },
				{ name: "Soy Sauce", srp: 1.5 },
			],
		},
	},
	{
		title: "Mango Smoothie",
		procedure: `
    Peel and chop the mangoes into chunks.
    
    Add mango chunks, yogurt, milk, and honey to a blender.
    
    Blend until smooth and creamy.
    
    Pour into a glass and serve immediately.
    `,
		totalSrp: 5.0,
		Calories: 180,
		Protein: 5,
		Carbs: 30,
		Fat: 3,
		Fiber: 2,
		Sugar: 25,
		Sodium: 80,
		Potassium: 300,
		VitaminC: 30,
		VitaminA: 100,
		Calcium: 150,
		Iron: 0.5,
		ingredients: {
			create: [
				{ name: "Mangoes", srp: 3.0 },
				{ name: "Yogurt", srp: 1.5 },
				{ name: "Honey", srp: 0.5 },
			],
		},
	},
	{
		title: "Garlic Butter Shrimp",
		procedure: `
    Melt butter in a skillet over medium heat.
    
    Add minced garlic and sauté until fragrant.
    
    Stir in raw shrimp and cook until they turn pink and opaque.
    
    Season with salt, pepper, and parsley.
    
    Serve hot with a slice of lemon on the side.
    `,
		totalSrp: 12.0,
		Calories: 250,
		Protein: 20,
		Carbs: 2,
		Fat: 18,
		Fiber: 0,
		Sugar: 1,
		Sodium: 800,
		Potassium: 200,
		VitaminC: 10,
		VitaminA: 50,
		Calcium: 100,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Shrimp", srp: 10.0 },
				{ name: "Garlic", srp: 1.0 },
				{ name: "Butter", srp: 1.0 },
			],
		},
	},
	{
		title: "Pancakes",
		procedure: `
    In a bowl, whisk together flour, sugar, baking powder, and salt.
    
    In a separate bowl, mix milk, eggs, and melted butter.
    
    Combine the wet and dry ingredients until smooth.
    
    Heat a non-stick skillet over medium heat and pour in a ladle of batter.
    
    Cook until bubbles form on the surface, then flip and cook the other side.
    
    Serve with maple syrup and fresh fruit.
    `,
		totalSrp: 4.0,
		Calories: 150,
		Protein: 5,
		Carbs: 20,
		Fat: 5,
		Fiber: 1,
		Sugar: 6,
		Sodium: 300,
		Potassium: 100,
		VitaminC: 0,
		VitaminA: 30,
		Calcium: 50,
		Iron: 1,
		ingredients: {
			create: [
				{ name: "Flour", srp: 1.0 },
				{ name: "Eggs", srp: 1.0 },
				{ name: "Milk", srp: 1.5 },
				{ name: "Sugar", srp: 0.5 },
			],
		},
	},
	{
		title: "Classic Caesar Salad",
		procedure: `
    Chop romaine lettuce and place it in a large bowl.
    
    In a small bowl, whisk together Caesar dressing, lemon juice, and grated Parmesan.
    
    Toss the lettuce with the dressing mixture until evenly coated.
    
    Add croutons and sprinkle with extra Parmesan.
    
    Serve immediately as a side dish or light meal.
    `,
		totalSrp: 6.5,
		Calories: 200,
		Protein: 6,
		Carbs: 15,
		Fat: 14,
		Fiber: 3,
		Sugar: 2,
		Sodium: 600,
		Potassium: 200,
		VitaminC: 10,
		VitaminA: 150,
		Calcium: 100,
		Iron: 1,
		ingredients: {
			create: [
				{ name: "Romaine Lettuce", srp: 2.0 },
				{ name: "Caesar Dressing", srp: 2.5 },
				{ name: "Croutons", srp: 1.5 },
				{ name: "Parmesan Cheese", srp: 0.5 },
			],
		},
	},
	{
		title: "Baked Ziti",
		procedure: `
    Preheat your oven to 375°F (190°C).
    
    Cook ziti pasta in salted boiling water until al dente, then drain.
    
    In a large bowl, mix ricotta cheese, marinara sauce, and cooked ziti.
    
    Spread half of the mixture in a baking dish, then sprinkle with shredded mozzarella.
    
    Add the remaining pasta mixture and top with more mozzarella.
    
    Bake for 20–25 minutes, or until the cheese is melted and bubbly. Serve hot.
    `,
		totalSrp: 8.0,
		Calories: 400,
		Protein: 15,
		Carbs: 50,
		Fat: 12,
		Fiber: 3,
		Sugar: 7,
		Sodium: 800,
		Potassium: 350,
		VitaminC: 5,
		VitaminA: 100,
		Calcium: 200,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Ziti Pasta", srp: 2.0 },
				{ name: "Ricotta Cheese", srp: 2.5 },
				{ name: "Marinara Sauce", srp: 2.0 },
				{ name: "Mozzarella Cheese", srp: 1.5 },
			],
		},
	},
	{
		title: "Vegetable Curry",
		procedure: `
    Heat oil in a large pot and sauté onions until golden.
    
    Add diced tomatoes, garlic, ginger, and curry spices, and cook until fragrant.
    
    Stir in diced potatoes, carrots, and cauliflower, and coat them in the spice mixture.
    
    Pour in coconut milk and simmer until the vegetables are tender.
    
    Serve over steamed rice or with naan bread.
    `,
		totalSrp: 7.5,
		Calories: 300,
		Protein: 6,
		Carbs: 40,
		Fat: 12,
		Fiber: 5,
		Sugar: 6,
		Sodium: 400,
		Potassium: 400,
		VitaminC: 25,
		VitaminA: 120,
		Calcium: 80,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Onions", srp: 1.0 },
				{ name: "Potatoes", srp: 2.0 },
				{ name: "Carrots", srp: 1.5 },
				{ name: "Coconut Milk", srp: 3.0 },
			],
		},
	},
	{
		title: "Chicken Alfredo",
		procedure: `
	Cook fettuccine pasta according to package instructions.
	
	In a separate pan, sauté garlic in butter until fragrant.
	
	Add heavy cream and bring to a simmer, then stir in Parmesan cheese.
	
	Once the sauce thickens, add the cooked pasta and toss to coat.
	
	Season with salt, pepper, and a sprinkle of parsley.
	
	Serve hot with extra Parmesan on top.
	`,
		totalSrp: 10.0,
		Calories: 500,
		Protein: 25,
		Carbs: 50,
		Fat: 25,
		Fiber: 3,
		Sugar: 5,
		Sodium: 800,
		Potassium: 300,
		VitaminC: 2,
		VitaminA: 150,
		Calcium: 300,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Fettuccine Pasta", srp: 3.0 },
				{ name: "Chicken Breast", srp: 5.0 },
				{ name: "Heavy Cream", srp: 2.0 },
				{ name: "Parmesan Cheese", srp: 1.0 },
			],
		},
	},
	{
		title: "Vegetable Stir Fry",
		procedure: `
	Heat oil in a pan and sauté sliced onions, carrots, and bell peppers.
	
	Add broccoli and snap peas, and stir fry for 5–7 minutes.
	
	Add soy sauce, garlic, and ginger, and cook for an additional 2 minutes.
	
	Serve the stir fry over steamed rice or noodles.
	`,
		totalSrp: 8.0,
		Calories: 250,
		Protein: 8,
		Carbs: 35,
		Fat: 10,
		Fiber: 6,
		Sugar: 8,
		Sodium: 600,
		Potassium: 400,
		VitaminC: 30,
		VitaminA: 100,
		Calcium: 60,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Carrots", srp: 2.0 },
				{ name: "Broccoli", srp: 2.0 },
				{ name: "Snap Peas", srp: 1.5 },
				{ name: "Soy Sauce", srp: 1.0 },
			],
		},
	},
	{
		title: "Beef Tacos",
		procedure: `
	Brown the ground beef in a skillet, breaking it apart as it cooks.
	
	Add taco seasoning and water, then simmer for 10 minutes.
	
	Fill taco shells with the beef mixture and top with shredded lettuce, cheese, and salsa.
	
	Serve with sour cream and guacamole on the side.
	`,
		totalSrp: 12.0,
		Calories: 350,
		Protein: 20,
		Carbs: 25,
		Fat: 15,
		Fiber: 4,
		Sugar: 3,
		Sodium: 700,
		Potassium: 300,
		VitaminC: 5,
		VitaminA: 100,
		Calcium: 150,
		Iron: 3,
		ingredients: {
			create: [
				{ name: "Ground Beef", srp: 6.0 },
				{ name: "Taco Shells", srp: 3.0 },
				{ name: "Shredded Lettuce", srp: 1.0 },
				{ name: "Cheese", srp: 2.0 },
			],
		},
	},
	{
		title: "Caprese Salad",
		procedure: `
	Arrange slices of fresh tomatoes, mozzarella, and basil on a plate.
	
	Drizzle with balsamic glaze and olive oil.
	
	Sprinkle with salt and pepper, then serve chilled.
	`,
		totalSrp: 5.0,
		Calories: 150,
		Protein: 8,
		Carbs: 10,
		Fat: 12,
		Fiber: 2,
		Sugar: 3,
		Sodium: 200,
		Potassium: 400,
		VitaminC: 15,
		VitaminA: 100,
		Calcium: 300,
		Iron: 1,
		ingredients: {
			create: [
				{ name: "Tomatoes", srp: 2.0 },
				{ name: "Mozzarella Cheese", srp: 2.0 },
				{ name: "Basil", srp: 1.0 },
				{ name: "Balsamic Glaze", srp: 0.5 },
			],
		},
	},
	{
		title: "Salmon with Asparagus",
		procedure: `
	Preheat the oven to 400°F (200°C).
	
	Place salmon fillets on a baking sheet and season with salt, pepper, and lemon.
	
	Arrange asparagus around the salmon and drizzle with olive oil.
	
	Bake for 15–20 minutes, or until the salmon is cooked through.
	
	Serve with a side of quinoa or rice.
	`,
		totalSrp: 14.0,
		Calories: 400,
		Protein: 30,
		Carbs: 10,
		Fat: 25,
		Fiber: 5,
		Sugar: 3,
		Sodium: 600,
		Potassium: 500,
		VitaminC: 15,
		VitaminA: 100,
		Calcium: 150,
		Iron: 3,
		ingredients: {
			create: [
				{ name: "Salmon Fillets", srp: 8.0 },
				{ name: "Asparagus", srp: 3.0 },
				{ name: "Lemon", srp: 1.0 },
				{ name: "Olive Oil", srp: 2.0 },
			],
		},
	},
	{
		title: "Chicken Caesar Wraps",
		procedure: `
	Grill or sauté chicken breast and slice into strips.
	
	Lay out a tortilla wrap and add Caesar dressing.
	
	Place the chicken, romaine lettuce, and shredded Parmesan on top.
	
	Roll up the wrap and cut it in half.
	
	Serve with a side of pickles or chips.
	`,
		totalSrp: 8.5,
		Calories: 350,
		Protein: 25,
		Carbs: 30,
		Fat: 15,
		Fiber: 5,
		Sugar: 3,
		Sodium: 700,
		Potassium: 300,
		VitaminC: 4,
		VitaminA: 50,
		Calcium: 100,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Chicken Breast", srp: 5.0 },
				{ name: "Tortilla Wraps", srp: 1.5 },
				{ name: "Romaine Lettuce", srp: 1.0 },
				{ name: "Caesar Dressing", srp: 1.0 },
			],
		},
	},
	{
		title: "Spaghetti Carbonara",
		procedure: `
	Cook spaghetti pasta according to package instructions.
	
	Fry pancetta or bacon until crispy.
	
	In a bowl, whisk eggs and Parmesan together.
	
	Combine the pasta, pancetta, and egg mixture while the pasta is still hot.
	
	Toss well and serve immediately with extra cheese.
	`,
		totalSrp: 10.0,
		Calories: 600,
		Protein: 25,
		Carbs: 60,
		Fat: 30,
		Fiber: 2,
		Sugar: 4,
		Sodium: 800,
		Potassium: 400,
		VitaminC: 2,
		VitaminA: 150,
		Calcium: 250,
		Iron: 3,
		ingredients: {
			create: [
				{ name: "Spaghetti", srp: 4.0 },
				{ name: "Pancetta", srp: 3.0 },
				{ name: "Eggs", srp: 2.0 },
				{ name: "Parmesan Cheese", srp: 1.0 },
			],
		},
	},
	{
		title: "Shakshuka",
		procedure: `
	Heat oil in a skillet and sauté onions, bell peppers, and garlic.
	
	Add tomatoes, cumin, paprika, and chili flakes, then simmer for 10 minutes.
	
	Create small wells in the sauce and crack eggs into each well.
	
	Cover the skillet and cook until the eggs are set.
	
	Serve with crusty bread for dipping.
	`,
		totalSrp: 9.0,
		Calories: 350,
		Protein: 15,
		Carbs: 25,
		Fat: 25,
		Fiber: 5,
		Sugar: 8,
		Sodium: 600,
		Potassium: 400,
		VitaminC: 15,
		VitaminA: 100,
		Calcium: 80,
		Iron: 3,
		ingredients: {
			create: [
				{ name: "Eggs", srp: 3.0 },
				{ name: "Tomatoes", srp: 3.0 },
				{ name: "Bell Peppers", srp: 1.5 },
				{ name: "Onions", srp: 1.0 },
			],
		},
	},
	{
		title: "Pulled Pork Sandwiches",
		procedure: `
	Rub pork shoulder with seasoning and slow-cook it until tender.
	
	Shred the pork and mix with barbecue sauce.
	
	Toast sandwich buns and add the pulled pork mixture.
	
	Top with coleslaw and serve immediately.
	`,
		totalSrp: 12.0,
		Calories: 500,
		Protein: 30,
		Carbs: 40,
		Fat: 20,
		Fiber: 3,
		Sugar: 8,
		Sodium: 800,
		Potassium: 400,
		VitaminC: 2,
		VitaminA: 50,
		Calcium: 100,
		Iron: 3,
		ingredients: {
			create: [
				{ name: "Pork Shoulder", srp: 7.0 },
				{ name: "Barbecue Sauce", srp: 3.0 },
				{ name: "Buns", srp: 2.0 },
			],
		},
	},
	{
		title: "Grilled Cheese Sandwich",
		procedure: `
	Butter two slices of bread and place cheese between them.
	
	Grill the sandwich on medium heat until golden brown on both sides.
	
	Serve with a bowl of tomato soup for dipping.
	`,
		totalSrp: 5.0,
		Calories: 400,
		Protein: 10,
		Carbs: 40,
		Fat: 20,
		Fiber: 2,
		Sugar: 4,
		Sodium: 600,
		Potassium: 200,
		VitaminC: 2,
		VitaminA: 150,
		Calcium: 200,
		Iron: 2,
		ingredients: {
			create: [
				{ name: "Bread", srp: 2.0 },
				{ name: "Cheese", srp: 2.0 },
				{ name: "Butter", srp: 1.0 },
			],
		},
	},
];
