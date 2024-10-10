-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "StatusTreeEnum" AS ENUM ('SEMILLA', 'PLANTULA', 'ARBOLITO', 'ARBOL_JOVEN', 'ARBOL_MADURO', 'ARBOL_VIEJO', 'ARBOL_SECO', 'ARBOL_MUERTO');

-- CreateEnum
CREATE TYPE "EstadoDeEnvioEnum" AS ENUM ('EN_PREPARACION', 'DESPACHADO', 'EN_CAMINO', 'ENTREGADO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "direccionEnvio" TEXT NOT NULL,
    "role" "RoleEnum" NOT NULL,
    "arbolId" INTEGER,
    "password" TEXT NOT NULL,
    "googleId" TEXT,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arbol" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "statusTree" "StatusTreeEnum" NOT NULL,
    "fincaId" INTEGER NOT NULL DEFAULT 1,
    "userId" INTEGER NOT NULL,
    "active" BOOLEAN DEFAULT true,
    "images" TEXT[],

    CONSTRAINT "Arbol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Finca" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ubication" TEXT NOT NULL,
    "practicesSustainable" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "Finca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cosecha" (
    "id" SERIAL NOT NULL,
    "arbolId" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fechaDeEnvio" TIMESTAMP(3) NOT NULL,
    "estadoDeEnvio" "EstadoDeEnvioEnum" NOT NULL,

    CONSTRAINT "Cosecha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adoption" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "treeId" INTEGER NOT NULL,
    "purchaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Arbol" ADD CONSTRAINT "Arbol_fincaId_fkey" FOREIGN KEY ("fincaId") REFERENCES "Finca"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arbol" ADD CONSTRAINT "Arbol_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cosecha" ADD CONSTRAINT "Cosecha_arbolId_fkey" FOREIGN KEY ("arbolId") REFERENCES "Arbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_treeId_fkey" FOREIGN KEY ("treeId") REFERENCES "Arbol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
