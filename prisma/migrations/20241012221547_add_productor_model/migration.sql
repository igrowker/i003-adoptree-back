/*
  Warnings:

  - You are about to drop the column `productor` on the `Finca` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Finca" DROP COLUMN "productor";

-- CreateTable
CREATE TABLE "Productor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT,
    "direccion" TEXT,
    "experiencia" INTEGER,
    "especialidad" TEXT,
    "certificaciones" TEXT[],
    "fincaId" INTEGER NOT NULL,

    CONSTRAINT "Productor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Productor_fincaId_key" ON "Productor"("fincaId");

-- AddForeignKey
ALTER TABLE "Productor" ADD CONSTRAINT "Productor_fincaId_fkey" FOREIGN KEY ("fincaId") REFERENCES "Finca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
