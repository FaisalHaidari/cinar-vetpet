-- CreateTable
CREATE TABLE "Address" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "buildingNo" TEXT NOT NULL,
    "floor" TEXT,
    "apartmentNo" TEXT NOT NULL,
    "addressNote" TEXT,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_id_key" ON "Address"("userId", "id");
