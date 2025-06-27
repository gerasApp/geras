/*
  Warnings:

  - Added the required column `code` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `plan` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "objective" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "initialAmount" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "monthlyContribution" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expectedReturnRate" REAL NOT NULL
);
INSERT INTO "new_plan" ("createdAt", "duration", "expectedReturnRate", "id", "initialAmount", "monthlyContribution", "objective", "userId", "name", "code", "type") SELECT "createdAt", "duration", "expectedReturnRate", "id", "initialAmount", "monthlyContribution", "objective", "userId", 'Plan de Retiro', 'PLAN_' || "id", 'FINAL_AMOUNT' FROM "plan";
DROP TABLE "plan";
ALTER TABLE "new_plan" RENAME TO "plan";
CREATE UNIQUE INDEX "plan_code_key" ON "plan"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
