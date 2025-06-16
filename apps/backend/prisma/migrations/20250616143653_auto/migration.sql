-- CreateTable
CREATE TABLE "plan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL DEFAULT 1,
    "initialAmount" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "monthlyContribution" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "objective" INTEGER NOT NULL,
    "expectedReturnRate" REAL NOT NULL
);
