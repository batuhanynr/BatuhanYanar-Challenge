import { Transaction } from "@mysten/sui/transactions";
import { suiToMist } from "../helpers/suiToMist";
export const buyHero = (packageId: string, listHeroId: string, priceInSui: string) => {
  const tx = new Transaction();
  
  // TODO: Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
     const priceInMist = suiToMist(priceInSui);

  // TODO: Split coin for exact payment
      const [paymentCoin] = tx.splitCoins(tx.gas, [tx.pure.u64(priceInMist)]);
  
  
  // TODO: Add moveCall to buy a hero
  // Function: `${packageId}::marketplace::buy_hero`
  // Arguments: listHeroId (object), paymentCoin (coin)
      tx.moveCall({
        target: `${packageId}::marketplace::buy_hero`,
        arguments: [tx.object(listHeroId), paymentCoin],
      });
    
  return tx;
};
