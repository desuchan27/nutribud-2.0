/*
  Warnings:

  - You are about to drop the column `ingredients` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `Calcium` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Calories` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Carbs` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Fat` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Fiber` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Iron` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Potassium` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Protein` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Sodium` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Sugar` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VitaminA` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VitaminC` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalSrp` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthyBudget` to the `UserInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeImage" DROP CONSTRAINT "RecipeImage_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "UserInfo" DROP CONSTRAINT "UserInfo_userId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "ingredients",
ADD COLUMN     "Calcium" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Calories" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Carbs" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Fat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Fiber" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Iron" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Potassium" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Protein" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Sodium" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "Sugar" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "VitaminA" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "VitaminC" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalSrp" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "UserInfo" ADD COLUMN     "monthyBudget" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Allergies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userInfoId" TEXT NOT NULL,

    CONSTRAINT "Allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "srp" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserInfo" ADD CONSTRAINT "UserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Allergies" ADD CONSTRAINT "Allergies_userInfoId_fkey" FOREIGN KEY ("userInfoId") REFERENCES "UserInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeImage" ADD CONSTRAINT "RecipeImage_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
