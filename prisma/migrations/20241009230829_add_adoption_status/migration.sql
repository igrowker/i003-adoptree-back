-- CreateEnum
CREATE TYPE "AdoptionStatusEnum" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Adoption" ADD COLUMN     "status" "AdoptionStatusEnum" NOT NULL DEFAULT 'PENDING';
