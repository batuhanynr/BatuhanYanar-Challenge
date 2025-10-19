import { Transaction } from "@mysten/sui/transactions";

export const delist = (
  packageId: string,
  listHeroId: string,
  adminCapId: string,
) => {
  const tx = new Transaction();

  // TODO: Add moveCall to delist a hero (Admin only)
  // Function: `${packageId}::marketplace::delist`
  // Arguments: adminCapId (object), listHeroId (object)
    tx.moveCall({
      target: `${packageId}::marketplace::delist`,
      arguments: [tx.object(adminCapId), tx.object(listHeroId)],
    });

  return tx;
};
