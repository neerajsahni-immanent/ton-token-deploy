import { SendTransactionRequest, TonConnectUI } from "@tonconnect/ui-react";
import { VESTING_DEPLOY_GAS, VestingDeployParams } from "./vesting-minter";
import { Address, beginCell, Cell, toNano } from "ton";
import { ContractDeployer } from "./contract-deployer";
import { getClient } from "./get-ton-client";
import {
  createVestingDeployParams,
  waitForContractDeploy,
  waitForSeqno,
} from "./utils";
import { makeGetCall } from "./make-get-call";

class VestingController {
  async createVesting(
    params: VestingDeployParams,
    tonConnection: TonConnectUI
  ): Promise<Address> {
    const contractDeployer = new ContractDeployer();
    const tc = await getClient();
    const balance = await tc.getBalance(params.owner);
    console.log(balance.lt(VESTING_DEPLOY_GAS), params.owner);
    if (balance.lt(VESTING_DEPLOY_GAS)) {
      console.log("errrorrrrrr");

      throw new Error("Not enough balance in deployer wallet");
    }

    console.log(
      "seeee",
      params,
      "https://testnet.toncenter.com/api/v2/jsonRPC",
      params.owner
    );

    const deployParams = createVestingDeployParams(
      params,
      "https://testnet.toncenter.com/api/v2/jsonRPC"
    );
    console.log(
      "seeee222",
      params,
      "https://testnet.toncenter.com/api/v2/jsonRPC",
      params.owner
    );
    const contractAddr = contractDeployer.addressForContract(deployParams);

    console.log(
      "seeee3333",
      params,
      "https://testnet.toncenter.com/api/v2/jsonRPC",
      params.owner
    );
    console.log(contractAddr, "CONT", deployParams, params);
    if (await tc.isContractDeployed(contractAddr)) {
      console.log("deployed contract");
      await contractDeployer.deployContract(deployParams, tonConnection);
      await waitForContractDeploy(contractAddr, tc);
    } else {
      await contractDeployer.deployContract(deployParams, tonConnection);
      await waitForContractDeploy(contractAddr, tc);
      console.log("wait over");
    }

    return contractAddr;
  }

  async depositTokens(
    contractAddress: Address,
    tonConnection: TonConnectUI,
    walletAddress: string,
    amount: number
  ) {
    const tc = await getClient();
    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(walletAddress),
      })
    );
    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: contractAddress.toString(),
          amount: toNano(0.01).toString(),
          stateInit: undefined,
          // payload: changeAdminBody(zeroAddress()).toBoc().toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }
  async addToken(
    contractAddress: Address,
    tonConnection: TonConnectUI,
    walletAddress: string,
    amount: number
  ) {
    const tc = await getClient();
    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(walletAddress),
      })
    );
    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: contractAddress.toString(),
          amount: toNano(0.01).toString(),
          stateInit: undefined,
          // payload: changeAdminBody(zeroAddress()).toBoc().toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);
  }
  async claimTokens(
    contractAddress: Address,
    tonConnection: TonConnectUI,
    walletAddress: string
  ) {
    const tc = await getClient();
    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(walletAddress),
      })
    );
    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: contractAddress.toString(),
          amount: toNano(0.04).toString(),
          stateInit: undefined,
          // payload: mintBody(Address.parse(walletAddress), amount, toNano(0.02), 0)
          //   .toBoc()
          //   .toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);
    await waiter();
  }
  async pause() {}
  async renounceOwnership() {}
  async transferOwnership(walletAddress: Address) {}
  async unpause() {}

  async withdrawToken(
    contractAddress: Address,
    tonConnection: TonConnectUI,
    tokenAmount: number
  ) {}
  async getCalculateUnlockedToken(walletAddress: string) {}
  async getCliffDuration() {}
  async getCliffPercentage() {}
  async getEndDateTime() {}
  async getMaxBuy() {}
  async getMaxCap() {}
  async getMinBuy() {}
  async getOwner() {}
  async getPaused() {}
  async getProjectName() {}
  async getProjectOwner() {}
  async getStartDateTime() {}
  async getToken() {}
  async getTokenAddress() {}
  async getTokenPrice() {}
  async getTotalParticipants() {}

  async getTotalRaised() {}
  async getUserDetails(walletAddress: string) {}
  async getVestingDuration() {}
  async getVestingInterval() {}
  async getVestingStartTime() {}
}

const vestingDeployController = new VestingController();
export { vestingDeployController };

// import { Address, beginCell, Cell, toNano } from "ton";
// // import { TonConnectUI, SendTransactionRequest } from ""
// // import { getClient, waitForSeqno, makeGetCall } // Adjust imports based on your project structure
// import { TonConnectUI , SendTransactionRequest} from "@tonconnect/ui-react";
// import { getClient } from "./get-ton-client";
// import { ContractDeployer } from "./contract-deployer";
// import { createVestingDeployParams, waitForContractDeploy, waitForSeqno } from "./utils";
// import { cellToAddress, makeGetCall } from "./make-get-call";
// import { VESTING_DEPLOY_GAS } from "./vesting-minter";
// import BN from "bn.js";

// // Define VestingDeployParams interface
// export interface VestingDeployParams {
//   onchainMetaData?: {
//     cliffDuration?: string;
//     vestingStartTime?: string;
//     vestingDuration?: string;
//     vestingInterval?: string;
//     cliffPercentage?: string;
//     startDateTime?: string;
//     endDateTime?: string;
//     maxCap?: string;
//     minBuy?: string;
//     maxBuy?: string;
//     tokenPrice?: string;
//     projectName?: string;
//     tokenAddress?: string;
//     projectOwner?: string;
//   };
//   offchainUri?: string;
//   owner: Address;
//   amountToMint: BN;
// }

// class VestingController {
//   async createVesting(
//     params: VestingDeployParams,
//     tonConnection: TonConnectUI,
//     walletAddress: string
//   ): Promise<Address> {
//     const contractDeployer = new ContractDeployer(); // Assume ContractDeployer is a utility class similar to your JettonDeployController
//     const tc = await getClient();

//     // Check balance
//     const balance = await tc.getBalance(params.owner);
//     if (balance.lt(VESTING_DEPLOY_GAS)) throw new Error("Not enough balance in deployer wallet");

//     const deployParams = createVestingDeployParams(params, "https://testnet.toncenter.com/api/v2/jsonRPC");
//     const contractAddr = contractDeployer.addressForContract(deployParams);

//     if (await tc.isContractDeployed(contractAddr)) {
//       console.log("Contract already deployed");
//     } else {
//       await contractDeployer.deployContract(deployParams, tonConnection);
//       await waitForContractDeploy(contractAddr, tc);
//     }

//     // Assuming you have a method to get the wallet address
//     const ownerVestingWalletAddr = await makeGetCall(
//       contractAddr,
//       "get_wallet_address",
//       [beginCell().storeAddress(params.owner).endCell()],
//       ([addr]) => (addr as Cell).beginParse().readAddress()!,
//       tc
//     );

//     await waitForContractDeploy(ownerVestingWalletAddr, tc);
//     return contractAddr;
//   }

//   async updateVesting(
//     contractAddress: Address,
//     data: Partial<VestingDeployParams>,
//     tonConnection: TonConnectUI,
//     walletAddress: string
//   ) {
//     const tc = await getClient();
//     const waiter = await waitForSeqno(
//       tc.openWalletFromAddress({
//         source: Address.parse(walletAddress),
//       })
//     );

//     const body = updateVestingBody(buildVestingOnchainMetadata(data)); // Build the metadata update payload
//     const tx: SendTransactionRequest = {
//       validUntil: Date.now() + 5 * 60 * 1000,
//       messages: [
//         {
//           address: contractAddress.toString(),
//           amount: toNano(0.01).toString(),
//           stateInit: undefined,
//           payload: body.toBoc().toString("base64"),
//         }
//       ],
//     };

//     await tonConnection.sendTransaction(tx);
//     await waiter();
//   }

//   async getVestingDetails(contractAddr: Address, owner: Address) {
//     const tc = await getClient();
//     const vestingDetails = await makeGetCall(
//       contractAddr,
//       "get_vesting_data",
//       [],
//       async ([dataCell]) => ({
//         ...(await readVestingMetadata(dataCell as unknown as Cell)),
//       }),
//       tc
//     );

//     const vestingWalletAddress = await makeGetCall(
//       contractAddr,
//       "get_wallet_address",
//       [beginCell().storeAddress(owner).endCell()],
//       ([addressCell]) => cellToAddress(addressCell),
//       tc
//     );

//     const isDeployed = await tc.isContractDeployed(vestingWalletAddress);

//     let vestingWallet;
//     if (isDeployed) {
//       vestingWallet = await makeGetCall(
//         vestingWalletAddress,
//         "get_wallet_data",
//         [],
//         ([amount, jettonMasterAddressCell]) => ({
//           balance: amount as unknown as BN,
//           vestingWalletAddress,
//           jettonMasterAddress: cellToAddress(jettonMasterAddressCell),
//         }),
//         tc
//       );
//     } else {
//       vestingWallet = null;
//     }

//     return {
//       vestingDetails,
//       vestingWallet
//     };
//   }

//   async executeVestingAction(
//     action: string,
//     params: any, // Define more specific types based on actions
//     tonConnection: TonConnectUI,
//     walletAddress: string
//   ) {
//     const tc = await getClient();
//     const waiter = await waitForSeqno(
//       tc.openWalletFromAddress({
//         source: Address.parse(walletAddress),
//       })
//     );

//     const tx: SendTransactionRequest = {
//       validUntil: Date.now() + 5 * 60 * 1000,
//       messages: [
//         {
//           address: params.vestingWalletAddress,
//           amount: toNano(0.01).toString(),
//           stateInit: undefined,
//           payload: actionToPayload(action, params).toBoc().toString("base64"), // Convert action to payload
//         }
//       ],
//     };

//     await tonConnection.sendTransaction(tx);
//     await waiter();
//   }
// }

// const vestingController = new VestingController();
// export { vestingController };
