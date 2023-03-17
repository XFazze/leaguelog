-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Ratelimit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Ratelimit" ("date", "id", "type") SELECT "date", "id", "type" FROM "Ratelimit";
DROP TABLE "Ratelimit";
ALTER TABLE "new_Ratelimit" RENAME TO "Ratelimit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
