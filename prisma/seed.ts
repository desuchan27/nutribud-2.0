import { utapi } from "@/server/uploadthing";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { Argon2id } from "oslo/password";
import { users } from "../public/dummies/data/users";
import { recipes } from "../public/dummies/data/recipe";

const prisma = new PrismaClient();

// ----------------------------------------------------------------------

async function main() {
	// Delete records
	await dropAll();
	// Delete records

	await userSeed();
	await recipeSeeding();
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});

async function uploadDummyUserImages() {
	const fileNames = ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg"];
	const formData = new FormData();
	fileNames.forEach((fileName) => {
		const filebuffer = fs.readFileSync(path.join(process.cwd(), "public/dummies/images/user", fileName));
		formData.append("files", new Blob([filebuffer]), fileName);
	});
	const files = formData.getAll("files") as File[];
	return await utapi.uploadFiles(files);
}

async function userSeed() {
	const userImages = await uploadDummyUserImages();
	for (const user of users) {
		let profileImage = null;
		if (Math.floor(Math.random() * 10) > 3) {
			const img = userImages[Math.floor(Math.random() * userImages.length)];
			if (img.data) {
				profileImage = img.data.appUrl;
			}
		}
		const hashedPassword = await new Argon2id().hash("123123");
		const newUser = await prisma.user.create({
			data: {
				...user,
				password: hashedPassword,
				profileImage,
			},
		});
		console.log(`Created user with id: ${newUser.id}`);
	}
	console.log("User seeding finished");
}

async function recipeSeeding() {
	const recipeImages = await uploadDummyRecipeImages();
	const users = await prisma.user.findMany();
	for (const recipe of recipes) {
		const img = recipeImages[Math.floor(Math.random() * recipeImages.length)];
		const user = users[Math.floor(Math.random() * users.length)];
		if (img.data && user) {
			const newRecipe = await prisma.recipe.create({
				data: {
					...recipe,
					userId: user.id,
					recipeImage: {
						create: [{ img: img.data.appUrl }],
					},
				},
			});
			console.log(`Created recipe with id: ${newRecipe.id}`);
		}
	}
	console.log("Recipe seeding finished");
}

async function uploadDummyRecipeImages() {
	const fileNames = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"];
	const formData = new FormData();
	fileNames.forEach((fileName) => {
		const filebuffer = fs.readFileSync(path.join(process.cwd(), "public/dummies/images/recipe", fileName));
		formData.append("files", new Blob([filebuffer]), fileName);
	});
	const files = formData.getAll("files") as File[];
	return await utapi.uploadFiles(files);
}

async function dropAll() {
	await prisma.recipe.deleteMany();
	await prisma.session.deleteMany();
	await prisma.follows.deleteMany();
	await prisma.user.deleteMany();
}
