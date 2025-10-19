import { Transaction } from "@mysten/sui/transactions";
import { suiToMist } from "../helpers/suiToMist";

export const changePrice = (packageId: string, listHeroId: string, newPriceInSui: string, adminCapId: string) => {
  const tx = new Transaction();
  
  // TODO: Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
  const newPriceInMist = suiToMist(newPriceInSui);
  
  // TODO: Add moveCall to change hero price (Admin only)
  // Function: `${packageId}::marketplace::change_the_price`
  // Arguments: adminCapId (object), listHeroId (object), newPriceInMist (u64)
      tx.moveCall({
        target: `${packageId}::marketplace::change_the_price`,
        arguments: [
          tx.object(adminCapId),
          tx.object(listHeroId),
          tx.pure.u64(newPriceInMist),
        ],
      });
 
  
  return tx;
};
