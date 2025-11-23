import { Prisma } from "@prisma/client";

// ----------------------------------------------------------------------

export const users: Omit<Prisma.UserCreateInput, "password">[] = [
	{
		email: "admin@email.com",
		username: "admin",
		profileImage: null,
		bio: "Loves cooking and outdoor adventures.",
		firstName: "Admin",
		lastName: "User",
		userInfo: {
			create: {
				birthDate: new Date("1990-01-15"),
				weight: 75.5,
				height: 180.3,
				monthyBudget: 600.0,
				allergies: {
					create: [{ name: "Peanuts" }, { name: "Shellfish" }],
				},
			},
		},
	},
	{
		email: "johndoe@example.com",
		username: "johndoe",
		profileImage: null,
		bio: "Loves cooking and outdoor adventures.",
		firstName: "John",
		lastName: "Doe",
		userInfo: {
			create: {
				birthDate: new Date("1990-01-15"),
				weight: 75.5,
				height: 180.3,
				monthyBudget: 600.0,
				allergies: {
					create: [{ name: "Peanuts" }, { name: "Shellfish" }],
				},
			},
		},
	},
	{
		email: "janedoe@example.com",
		username: "janedoe",
		profileImage: null,
		bio: "Passionate about fitness and healthy eating.",
		firstName: "Jane",
		lastName: "Doe",
		userInfo: {
			create: {
				birthDate: new Date("1995-05-20"),
				weight: 65.2,
				height: 165.5,
				monthyBudget: 500.0,
				allergies: {
					create: [{ name: "Dairy" }],
				},
			},
		},
	},
	{
		email: "alexsmith@example.com",
		username: "alexsmith",
		profileImage: null,
		bio: "Tech enthusiast and weekend chef.",
		firstName: "Alex",
		lastName: "Smith",
		userInfo: {
			create: {
				birthDate: new Date("1988-11-03"),
				weight: 80.0,
				height: 175.0,
				monthyBudget: 800.0,
				allergies: {
					create: [],
				},
			},
		},
	},
	{
		email: "emilybrown@example.com",
		username: "emilybrown",
		profileImage: null,
		bio: "Enjoys experimenting with new recipes.",
		firstName: "Emily",
		lastName: "Brown",
		userInfo: {
			create: {
				birthDate: new Date("1992-09-18"),
				weight: 68.4,
				height: 160.0,
				monthyBudget: 700.0,
				allergies: {
					create: [{ name: "Gluten" }],
				},
			},
		},
	},
	{
		email: "michaeljohnson@example.com",
		username: "michaeljohnson",
		profileImage: null,
		bio: "Fitness coach and meal prep expert.",
		firstName: "Michael",
		lastName: "Johnson",
		userInfo: {
			create: {
				birthDate: new Date("1985-04-10"),
				weight: 85.0,
				height: 185.0,
				monthyBudget: 1000.0,
				allergies: {
					create: [{ name: "Soy" }, { name: "Eggs" }],
				},
			},
		},
	},
	{
		email: "jane.smith@example.com",
		username: "jane_smith",
		profileImage: null,
		bio: "Nutritionist sharing healthy recipes.",
		firstName: "Jane",
		lastName: "Smith",
		userInfo: {
			create: {
				birthDate: new Date("1990-03-15"),
				weight: 65.0,
				height: 168.0,
				monthyBudget: 800.0,
				allergies: {
					create: [{ name: "Shellfish" }],
				},
			},
		},
	},
	{
		email: "michael.brown@example.com",
		username: "michael_brown",
		profileImage: null,
		bio: "Fitness guru with a love for cooking.",
		firstName: "Michael",
		lastName: "Brown",
		userInfo: {
			create: {
				birthDate: new Date("1988-07-21"),
				weight: 78.0,
				height: 182.0,
				monthyBudget: 700.0,
				allergies: {
					create: [{ name: "Gluten" }],
				},
			},
		},
	},
	{
		email: "emily.wilson@example.com",
		username: "emily_wilson",
		profileImage: null,
		bio: "Food blogger exploring cuisines worldwide.",
		firstName: "Emily",
		lastName: "Wilson",
		userInfo: {
			create: {
				birthDate: new Date("1993-11-05"),
				weight: 60.0,
				height: 160.0,
				monthyBudget: 600.0,
			},
		},
	},
	{
		email: "david.taylor@example.com",
		username: "david_taylor",
		profileImage: null,
		bio: "Home cook sharing quick and easy recipes.",
		firstName: "David",
		lastName: "Taylor",
		userInfo: {
			create: {
				birthDate: new Date("1992-09-12"),
				weight: 75.0,
				height: 178.0,
				monthyBudget: 450.0,
				allergies: {
					create: [{ name: "Soy" }],
				},
			},
		},
	},
	{
		email: "sarah.connor@example.com",
		username: "sarah_connor",
		profileImage: null,
		bio: "Tech enthusiast and passionate baker.",
		firstName: "Sarah",
		lastName: "Connor",
		userInfo: {
			create: {
				birthDate: new Date("1995-08-22"),
				weight: 68.0,
				height: 165.0,
				monthyBudget: 700.0,
				allergies: {
					create: [{ name: "Peanuts" }],
				},
			},
		},
	},
	{
		email: "robert.james@example.com",
		username: "robert_james",
		profileImage: null,
		bio: "Amateur chef who loves experimenting with flavors.",
		firstName: "Robert",
		lastName: "James",
		userInfo: {
			create: {
				birthDate: new Date("1990-01-14"),
				weight: 80.0,
				height: 180.0,
				monthyBudget: 900.0,
				allergies: {
					create: [{ name: "Dairy" }],
				},
			},
		},
	},
	{
		email: "lisa.martin@example.com",
		username: "lisa_martin",
		profileImage: null,
		bio: "Yoga instructor with a knack for healthy meals.",
		firstName: "Lisa",
		lastName: "Martin",
		userInfo: {
			create: {
				birthDate: new Date("1987-11-30"),
				weight: 58.0,
				height: 162.0,
				monthyBudget: 800.0,
				allergies: {
					create: [{ name: "Shellfish" }],
				},
			},
		},
	},
	{
		email: "jason.clark@example.com",
		username: "jason_clark",
		profileImage: null,
		bio: "Athlete turned recipe creator for fitness enthusiasts.",
		firstName: "Jason",
		lastName: "Clark",
		userInfo: {
			create: {
				birthDate: new Date("1993-05-18"),
				weight: 90.0,
				height: 188.0,
				monthyBudget: 1000.0,
				allergies: {
					create: [{ name: "Gluten" }],
				},
			},
		},
	},
	{
		email: "anna.white@example.com",
		username: "anna_white",
		profileImage: null,
		bio: "Student learning to make quick, healthy meals.",
		firstName: "Anna",
		lastName: "White",
		userInfo: {
			create: {
				birthDate: new Date("1998-09-08"),
				weight: 55.0,
				height: 158.0,
				monthyBudget: 500.0,
			},
		},
	},
	{
		email: "amanda.davis@example.com",
		username: "amanda_davis1",
		profileImage: null,
		bio: "Vegetarian food lover and creative recipe developer.",
		firstName: "Amanda",
		lastName: "Davis",
		userInfo: {
			create: {
				birthDate: new Date("1992-02-19"),
				weight: 60.0,
				height: 167.0,
				monthyBudget: 700.0,
				allergies: {
					create: [{ name: "Nuts" }],
				},
			},
		},
	},
	{
		email: "thomas.morgan@example.com",
		username: "thomas_morgan2",
		profileImage: null,
		bio: "Fitness enthusiast with a love for simple, clean eating.",
		firstName: "Thomas",
		lastName: "Morgan",
		userInfo: {
			create: {
				birthDate: new Date("1990-10-25"),
				weight: 85.0,
				height: 180.0,
				monthyBudget: 850.0,
				allergies: {
					create: [{ name: "Eggs" }],
				},
			},
		},
	},
	{
		email: "elizabeth.king@example.com",
		username: "elizabeth_king3",
		profileImage: null,
		bio: "College student juggling studies and healthy eating.",
		firstName: "Elizabeth",
		lastName: "King",
		userInfo: {
			create: {
				birthDate: new Date("1999-06-12"),
				weight: 55.0,
				height: 162.0,
				monthyBudget: 600.0,
			},
		},
	},
	{
		email: "daniel.evans@example.com",
		username: "daniel_evans4",
		profileImage: null,
		bio: "Chef sharing tips for balanced meals and snacks.",
		firstName: "Daniel",
		lastName: "Evans",
		userInfo: {
			create: {
				birthDate: new Date("1985-12-01"),
				weight: 78.0,
				height: 175.0,
				monthyBudget: 950.0,
				allergies: {
					create: [{ name: "Dairy" }],
				},
			},
		},
	},
	{
		email: "samantha.lee@example.com",
		username: "samantha_lee5",
		profileImage: null,
		bio: "Mom creating recipes for families with busy schedules.",
		firstName: "Samantha",
		lastName: "Lee",
		userInfo: {
			create: {
				birthDate: new Date("1987-08-15"),
				weight: 62.0,
				height: 170.0,
				monthyBudget: 750.0,
				allergies: {
					create: [{ name: "Peanuts" }],
				},
			},
		},
	},
];
