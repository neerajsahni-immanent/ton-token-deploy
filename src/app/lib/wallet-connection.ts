import { Address } from "ton";
class WalletConnection {
  public static isContractDeployed(contractAddr: Address) {
    return false; // TODO fix
    // return this.connection?._tonClient.isContractDeployed(contractAddr);
  }
}

export default WalletConnection;



// import { Address } from "ton";
// class WalletConnection {
//   public static isContractDeployed(contractAddr: Address) {
//     return false; // TODO fix
//     // return this.connection?._tonClient.isContractDeployed(contractAddr);
//   }
// }

// export default WalletConnection;


// import { Address, TonClient, TonClient4 } from "ton";

// class WalletConnection {
//   private static client: TonClient | null = null;

//   // Initialize the TON client (ensure this is called before using isContractDeployed)
//   public static async initializeClient(endpoint: string) {
//     this.client = new TonClient({ endpoint });
//   }

//   // Check if a contract is deployed at the specified address
//   public static async isContractDeployed(contractAddr: Address): Promise<boolean> {
//     if (!this.client) {
//       throw new Error("TON client is not initialized. Call initializeClient() first.");
//     }

//     try {
//       // Fetch the full state of the contract
//       const state = await this.client.getContractState( contractAddr);
//       console.log(state);
//       // Check if the contract has both code and data initialized
//       return state?.code !== null && state?.data !== null;
//     } catch (error) {
//       console.error("Error checking contract deployment:", error);
//       return false;
//     }
//   }
// }

// export default WalletConnection;

