import BN from "bn.js";
import { Address, beginCell, Cell, contractAddress, StateInit } from "ton";
import { SendTransactionRequest, TonConnectUI } from "@tonconnect/ui-react";

interface ContractDeployDetails {
  deployer: Address;
  value: BN;
  code: Cell;
  data: Cell;
  message?: Cell;
  dryRun?: boolean;
}

export class ContractDeployer {
  addressForContract(params: ContractDeployDetails) {
    console.log(params, "Address FOR Contract");
    return contractAddress({
      workchain: 0,
      initialData: params.data,
      initialCode: params.code,
    });
  }

  async deployContract(
    params: ContractDeployDetails,
    tonConnection: TonConnectUI
  ): Promise<Address> {
    const _contractAddress = this.addressForContract(params);
    let cell = new Cell();
    new StateInit({ data: params.data, code: params.code }).writeTo(cell);
    if (!params.dryRun) {
      const tx: SendTransactionRequest = {
        validUntil: Date.now() + 5 * 60 * 1000,
        messages: [
          {
            address: _contractAddress.toString(),
            amount: params.value.toString(),
            stateInit: cell.toBoc().toString("base64"),
            // payload: params.message?.toBoc().toString("base64"),
          },
        ],
      };

      await tonConnection.sendTransaction(tx);
    }

    return _contractAddress;
  }
  // async deployContract(
  //   params: ContractDeployDetails,
  //   tonConnection: TonConnectUI
  // ): Promise<Address> {
  //   const _contractAddress = this.addressForContract(params);
  //   const cell = new Cell();
  //   // Use beginCell() to create the Cell
  //   const constructorData = beginCell()
  //     .storeUint(1000, 64) // cliffDuration (seconds)
  //     .storeUint(Math.floor(Date.now() / 1000), 64) // vestingStartTime (current time)
  //     .storeUint(31536000, 64) // vestingDuration (1 year in seconds)
  //     .storeUint(86400, 64) // vestingInterval (1 day in seconds)
  //     .storeUint(50, 64) // cliffPercentage
  //     .storeBuffer(Buffer.from("My Project Name", "utf8")) // projectName (UTF-8 encoding)
  //     .storeUint(Math.floor(Date.now() / 1000), 64) // projectStartTime (current time)
  //     .storeUint(Math.floor(Date.now() / 1000) + 31536000, 64) // projectEndTime (1 year from now)
  //     .storeAddress(
  //       new Address(
  //         0,
  //         Buffer.from(
  //           "0000000000000000000000000000000000000000000000000000000000000000",
  //           "hex"
  //         )
  //       ) // ICOToken address (replace with actual address)
  //     )
  //     .storeAddress(
  //       new Address(
  //         0,
  //         Buffer.from(
  //           "0000000000000000000000000000000000000000000000000000000000000000",
  //           "hex"
  //         )
  //       ) // investmentToken address (replace with actual address)
  //     )
  //     .storeAddress(
  //       new Address(
  //         0,
  //         Buffer.from(
  //           "0000000000000000000000000000000000000000000000000000000000000000",
  //           "hex"
  //         )
  //       ) // owner address (replace with actual address)
  //     )
  //     .storeUint(1000000000, 64) // maxCap (in investment token units)
  //     .storeUint(100000, 64) // minBuy (in investment token units)
  //     .storeUint(1000000, 64) // maxBuy (in investment token units)
  //     .storeUint(100, 64) // tokenPrice (price of 1 ICO token in investment tokens)
  //     .endCell(); // Finalize the Cell

  //   // Encode the constructor data
  //   const encodedData = constructorData.toBoc().toString("base64");

  //   // Prepare the state initialization object
  //   const stateInit = new StateInit({
  //     data: constructorData,
  //     code: params.code,
  //   }).writeTo(cell);

  //   if (!params.dryRun) {
  //     const tx: SendTransactionRequest = {
  //       validUntil: Date.now() + 5 * 60 * 1000,
  //       messages: [
  //         {
  //           address: _contractAddress.toString(),
  //           amount: params.value.toString(),
  //           stateInit: cell.toBoc().toString("base64"),
  //         },
  //       ],
  //     };

  //     console.log("going1");
  //     await tonConnection.sendTransaction(tx);
  //     console.log("going2");
  //   }

  //   return _contractAddress;
  // }
  // async deployContract(
  //   params: ContractDeployDetails,
  //   tonConnection: TonConnectUI
  // ): Promise<Address> {
  //   const _contractAddress = this.addressForContract(params);
  //   const cell = new Cell();
  //   // Create the main cell
  //   const mainCell = beginCell()
  //     .storeUint(1000, 64) // cliffDuration
  //     .storeUint(Math.floor(Date.now() / 1000), 64) // vestingStartTime
  //     .storeUint(31536000, 64) // vestingDuration
  //     .storeUint(86400, 64) // vestingInterval
  //     .storeUint(50, 64) // cliffPercentage
  //     .storeBuffer(Buffer.from("My Project Name", "utf8")) // projectName
  //     .storeUint(Math.floor(Date.now() / 1000), 64) // projectStartTime
  //     .storeUint(Math.floor(Date.now() / 1000) + 31536000, 64) // projectEndTime
  //     .endCell(); // End first part

  //   // Create an additional cell for addresses and other data
  //   const addressesCell = beginCell()
  //     .storeAddress(
  //       new Address(
  //         0,
  //         Buffer.from(
  //           "0000000000000000000000000000000000000000000000000000000000000000",
  //           "hex"
  //         )
  //       ) // ICOToken address
  //     )
  //     .storeAddress(
  //       new Address(
  //         0,
  //         Buffer.from(
  //           "0000000000000000000000000000000000000000000000000000000000000000",
  //           "hex"
  //         )
  //       ) // investmentToken address
  //     )
  //     .storeAddress(
  //       new Address(
  //         0,
  //         Buffer.from(
  //           "0000000000000000000000000000000000000000000000000000000000000000",
  //           "hex"
  //         )
  //       ) // owner address
  //     )
  //     .storeUint(1000000000, 64) // maxCap
  //     .storeUint(100000, 64) // minBuy
  //     .storeUint(1000000, 64) // maxBuy
  //     .storeUint(100, 64) // tokenPrice
  //     .endCell(); // End second part

  //   // Combine cells into one Cell
  //   const combinedCell = beginCell()
  //     .storeRef(mainCell) // Reference the first cell
  //     .storeRef(addressesCell) // Reference the second cell
  //     .endCell(); // End combined cell

  //   // Encode the constructor data
  //   const encodedData = combinedCell.toBoc().toString("base64");

  //   // Prepare the state initialization object
  //   const stateInit = new StateInit({
  //     data: combinedCell,
  //     code: params.code,
  //   }).writeTo(cell);

  //   if (!params.dryRun) {
  //     const tx: SendTransactionRequest = {
  //       validUntil: Date.now() + 5 * 60 * 1000,
  //       messages: [
  //         {
  //           address: _contractAddress.toString(),
  //           amount: params.value.toString(),
  //           stateInit: cell.toBoc().toString("base64"),
  //         },
  //       ],
  //     };

  //     console.log("going1");
  //     await tonConnection.sendTransaction(tx);
  //     console.log("going2");
  //   }

  //   return _contractAddress;
  // }
  // Encode the constructor data
}
