/*
  Warnings:

  - You are about to alter the column `objective` on the `plan` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "objective" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "initialAmount" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "monthlyContribution" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedReturnRate" REAL NOT NULL,
    CONSTRAINT "plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_plan" ("code", "createdAt", "duration", "expectedReturnRate", "id", "initialAmount", "monthlyContribution", "name", "objective", "type", "userId") SELECT "code", "createdAt", "duration", "expectedReturnRate", "id", "initialAmount", "monthlyContribution", "name", "objective", "type", "userId" FROM "plan";
DROP TABLE "plan";
ALTER TABLE "new_plan" RENAME TO "plan";
CREATE UNIQUE INDEX "plan_code_key" ON "plan"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
