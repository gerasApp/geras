-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_assets" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "historicalReturn" REAL NOT NULL,
    "risk" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "planId" INTEGER,
    CONSTRAINT "assets_planId_fkey" FOREIGN KEY ("planId") REFERENCES "plan" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_assets" ("createdAt", "description", "historicalReturn", "id", "name", "risk", "type", "updatedAt") SELECT "createdAt", "description", "historicalReturn", "id", "name", "risk", "type", "updatedAt" FROM "assets";
DROP TABLE "assets";
ALTER TABLE "new_assets" RENAME TO "assets";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
