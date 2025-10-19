import { Transaction } from "@mysten/sui/transactions";
import { suiToMist } from "../helpers/suiToMist";

export const listHero = (
  packageId: string,
  heroId: string,
  priceInSui: string,
) => {
  const tx = new Transaction();
    
  
  // TODO: Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
    const priceInMist = suiToMist(priceInSui);
  
  // TODO: Add moveCall to list a hero for sale
  
    tx.moveCall({
      target: `${packageId}::marketplace::list_hero`,
      arguments: [tx.object(heroId), tx.pure.u64(priceInMist)],
    });
      

  return tx;
};
