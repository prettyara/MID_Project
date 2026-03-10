import { mutation } from "./_generated/server";

export const createQuest = mutation(async ({ db }) => {
  await db.insert("quests", {
    title: "Datang ke Perpustakaan",
    description: "Scan QR di perpustakaan",
    reward: 10,
  });
});