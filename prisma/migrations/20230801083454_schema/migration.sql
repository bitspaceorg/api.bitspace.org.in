/*
  Warnings:

  - You are about to drop the column `parentId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "parentId",
ADD COLUMN     "parent_id" INTEGER;

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "year" (
    "id" INTEGER NOT NULL,

    CONSTRAINT "year_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT[],
    "date" TIMESTAMP(3) NOT NULL,
    "year_id" INTEGER NOT NULL,

    CONSTRAINT "timeline_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "is_ban" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT NOT NULL,
    "is_joined_discord" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "discord_id" TEXT,
    "github_id" TEXT NOT NULL,
    "strike" SMALLINT NOT NULL DEFAULT 0,
    "points" INTEGER DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role")
);

-- CreateTable
CREATE TABLE "Role_user" (
    "role" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "Role_user_pkey" PRIMARY KEY ("role","username")
);

-- CreateTable
CREATE TABLE "Rank" (
    "rank" INTEGER NOT NULL,
    "is_mod" BOOLEAN NOT NULL,
    "is_super_mod" BOOLEAN NOT NULL,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("rank")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- AddForeignKey
ALTER TABLE "timeline" ADD CONSTRAINT "timeline_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "year"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_rank_fkey" FOREIGN KEY ("rank") REFERENCES "Rank"("rank") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role_user" ADD CONSTRAINT "Role_user_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("role") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role_user" ADD CONSTRAINT "Role_user_username_fkey" FOREIGN KEY ("username") REFERENCES "Users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
