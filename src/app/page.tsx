"use client";
import {
  // CHAIN,
  // SendTransactionRequest,
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
// import { useEffect, useState } from "react";
// import Vesting from "../Components/vesting-hex.json";
// import {
//   Cell,
//   beginCell,
//   Address,
//   toNano,
//   contractAddress,
//   StateInit,
//   storeStateInit,
//   loadStateInit,
//   Builder,
//   BitString,
// } from "ton-core"; // Import from ton-core
// import TonWeb from "tonweb"; // Keep using TonWeb for signing and sending transactions

// // Function to encode vestingData into a Cell

// export default function Home() {
//   const ONCHAIN_CONTENT_PREFIX = 0x00;

//   const walletAddress = useTonAddress(); //connected wallet address
//   const [tonconnect] = useTonConnectUI(); //ton wallet-account connection

//   console.log(walletAddress, "walletAddress");
//   console.log(tonconnect, "tonconnect");
//   useEffect(() => {
//     if (!walletAddress) {
//       alert("Connection se address nahi aa raha");
//     }

//     if (!tonconnect.connected) {
//       alert("TON not connected.");
//     }
//   }, []);

//   const [vestingData, setVestingData] = useState<any>({
//     // id: "1",
//     cliffDuration: 200,
//     vestingStartTime: 1725691742,
//     vestingDuration: 360,
//     vestingInterval: 40,
//     cliffPercentage: 50,
//     projectName: "ExampleProject",
//     projectStartTime: 1725691742,
//     projectEndTime: 1725691742 + 30 * 24 * 60 * 60,
//     ICOToken: Address.parse("kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"),
//     investmentToken: Address.parse(
//       "kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"
//     ),
//     owner: Address.parse("kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"),
//     maxCap: 10000000,
//     minBuy: 100000,
//     maxBuy: 10000,
//     tokenPrice: 100,
//   });
//   const cliffDuration = BigInt(vestingData.cliffDuration);
//   const vestingStartTime = BigInt(vestingData.vestingStartTime);
//   const vestingDuration = BigInt(vestingData.vestingDuration);
//   const vestingInterval = BigInt(vestingData.vestingInterval);
//   const cliffPercentage = BigInt(vestingData.cliffPercentage);
//   const projectName = vestingData.projectName;
//   const projectStartTime = BigInt(vestingData.projectStartTime);
//   const projectEndTime = BigInt(vestingData.projectEndTime);
//   const ICOToken = vestingData.ICOToken; // Assuming Address.toString() returns a string
//   const investmentToken = vestingData.investmentToken; // Same assumption as above
//   const owner = vestingData.owner; // Same assumption as above
//   const maxCap = BigInt(vestingData.maxCap);
//   const minBuy = BigInt(vestingData.minBuy);
//   const maxBuy = BigInt(vestingData.maxBuy);
//   const tokenPrice = BigInt(vestingData.tokenPrice);
//   ////
//   //
//   ///
//   // function encodeVestingData(vestingData: any) {
//   //   const cell = beginCell().storeUint(vestingData.cliffDuration, 32).storeUint(vestingData.vestingStartTime, 64).storeUint(vestingData.vestingDuration, 32).storeUint(vestingData.vestingInterval, 32).storeUint(vestingData.cliffPercentage, 8).storeStringTail(vestingData.projectName).storeUint(vestingData.projectStartTime, 64).storeUint(vestingData.projectEndTime, 64).storeAddress(vestingData.ICOToken).storeAddress(vestingData.investmentToken).storeAddress(vestingData.owner).storeUint(vestingData.maxCap, 64).storeUint(vestingData.minBuy, 64).storeUint(vestingData.maxBuy, 64).storeUint(vestingData.tokenPrice, 64).endCell();

//   //   return cell;
//   // }

//   // function encodeVestingData(vestingData: any) {
//   //   try {
//   //     const cell = beginCell()
//   //       .storeUint(vestingData.cliffDuration, 32)
//   //       .storeUint(vestingData.vestingStartTime, 64)
//   //       .storeUint(vestingData.vestingDuration, 32)
//   //       .storeUint(vestingData.vestingInterval, 32)
//   //       .storeUint(vestingData.cliffPercentage, 8)
//   //       .storeStringTail(vestingData.projectName.slice(0, 255)) // Limit string size
//   //       .storeUint(vestingData.projectStartTime, 64)
//   //       .storeUint(vestingData.projectEndTime, 64)
//   //       .storeAddress(vestingData.ICOToken) // Ensure Address object
//   //       .storeAddress(vestingData.investmentToken) // Ensure Address object
//   //       .storeAddress(vestingData.owner) // Ensure Address object
//   //       // .storeStringTail(vestingData.ICOToken.toString()) // Ensure Address object
//   //       // .storeStringTail(vestingData.investmentToken.toString()) // Ensure Address object
//   //       // .storeStringTail(vestingData.owner.toString()) // Ensure Address object
//   //       .storeUint(vestingData.maxCap, 32)
//   //       .storeUint(vestingData.minBuy, 32)
//   //       .storeUint(vestingData.maxBuy, 32)
//   //       .storeUint(vestingData.tokenPrice, 32)
//   //       .endCell();

//   //     return cell;
//   //   } catch (error) {
//   //     console.error('Error encoding vesting data:', error);
//   //     throw error;
//   //   }
//   // }
//   //
//   //
//   //-real:-
//   // function encodeVestingData1(vestingData: any) {
//   //   try {
//   //     // Initialize a cell to hold the encoded data
//   //     const cell = beginCell();

//   //     // Store basic data fields
//   //     cell.storeUint(vestingData.cliffDuration, 32);
//   //     cell.storeUint(vestingData.vestingStartTime, 32);
//   //     cell.storeUint(vestingData.vestingDuration, 32);
//   //     cell.storeUint(vestingData.vestingInterval, 32);
//   //     cell.storeUint(vestingData.cliffPercentage, 8);
//   //     // cell.storeStringTail(vestingData.projectName.slice(0, 255)); // Limit string length
//   //     // Instead of storeStringTail, convert projectName to bytes and store it
//   //     const projectNameBytes = Buffer.from(vestingData.projectName, "utf-8");
//   //     // cell.storeUint(projectNameBytes.length, 8); // Store length of the string (optional)
//   //     cell.storeBuffer(projectNameBytes);
//   //     cell.storeUint(vestingData.projectStartTime, 32);
//   //     cell.storeUint(vestingData.projectEndTime, 32);
//   //     cell.storeUint(vestingData.maxCap, 32);
//   //     cell.storeUint(vestingData.minBuy, 32);
//   //     cell.storeUint(vestingData.maxBuy, 32);
//   //     cell.storeUint(vestingData.tokenPrice, 32);

//   //     // Use storeRef for addresses if the size becomes an issue
//   //     // Create separate cell for addresses if needed
//   //     const addressesCell = beginCell()
//   //       .storeAddress(vestingData.ICOToken)
//   //       .storeAddress(vestingData.investmentToken)
//   //       .storeAddress(vestingData.owner)
//   //       .endCell();

//   //     cell.storeRef(addressesCell);
//   //     return cell.endCell();
//   //     // End the main cell
//   //     // return cell.endCell();
//   //   } catch (error) {
//   //     console.error("Error encoding vesting data:", error);
//   //     throw error;
//   //   }
//   // }

//   // Function to encode vesting data
//   function createBitStringFromBuffer(buffer: Buffer): BitString {
//     return new BitString(buffer, 0, buffer.length * 8);
//   }

//   // function encodeVestingData1(vestingData: any): Cell {
//   //   try {
//   //     // Initialize a cell to hold the encoded data
//   //     const cell = beginCell();

//   //     // Store basic data fields in the new specified order
//   //     cell.storeUint(vestingData.cliffDuration, 256); // 32 bits
//   //     cell.storeUint(vestingData.vestingStartTime, 256); // 32 bits
//   //     cell.storeUint(vestingData.vestingDuration, 256); // 32 bits

//   //     //
//   //     ///
//   //     //
//   //     //

//   //     const secondcell = beginCell();
//   //     secondcell.storeUint(vestingData.vestingInterval, 256); // 32 bits
//   //     secondcell.storeUint(vestingData.cliffPercentage, 32); // 32 bits

//   //     // Convert projectName to bytes and store it
//   //     const projectNameBytes = Buffer.from(vestingData.projectName, "utf-8");
//   //     const projectNameLength = projectNameBytes.length * 8; // length in bits
//   //     // cell.storeUint(projectNameLength, 8); // Store length of the string in bits
//   //     // cell.storeBits(createBitStringFromBuffer(projectNameBytes)); // Store the project name as bits
//   //     secondcell.storeStringTail(vestingData.projectName.slice(0, 255)); // Limit string length
//   //     // Store remaining vesting data
//   //     secondcell.storeUint(vestingData.projectStartTime, 256); // 32 bits
//   //     secondcell.storeUint(vestingData.projectEndTime, 256); // 32 bits
//   //     // secondcell
//   //     secondcell.endCell();

//   //     const bitLength1 = secondcell.bits; // Total bit length
//   //     const paddingLength1 = (8 - (bitLength1 % 8)) % 8; // Padding needed to align to 8 bits

//   //     // Add padding bits if needed
//   //     if (bitLength1 > 0) {
//   //       const paddingBits = Buffer.alloc(paddingLength1 / 8); // Allocate padding buffer
//   //       cell.storeBits(createBitStringFromBuffer(paddingBits)); // Store padding bits
//   //     }

//   //     cell.storeRef(secondcell);

//   //     //
//   //     //
//   //     ///
//   //     ///
//   //     // Handle addresses in a separate cell
//   //     const addressesCell = beginCell();

//   //     addressesCell.storeAddress(vestingData.ICOToken);
//   //     addressesCell.storeAddress(vestingData.investmentToken);
//   //     addressesCell.storeAddress(vestingData.owner);

//   //     addressesCell.endCell();

//   //     const bitLength3 = addressesCell.bits; // Total bit length
//   //     const paddingLength3 = (8 - (bitLength3 % 8)) % 8; // Padding needed to align to 8 bits

//   //     // Add padding bits if needed
//   //     if (bitLength3 > 0) {
//   //       const paddingBits = Buffer.alloc(paddingLength3 / 8); // Allocate padding buffer
//   //       cell.storeBits(createBitStringFromBuffer(paddingBits)); // Store padding bits
//   //     }

//   //     cell.storeRef(addressesCell);

//   //     // Store additional data fields

//   //     const priceCell = beginCell();

//   //     priceCell.storeUint(vestingData.maxCap, 256); // 256 bits
//   //     priceCell.storeUint(vestingData.minBuy, 256); // 256 bits
//   //     priceCell.storeUint(vestingData.maxBuy, 256); // 256 bits
//   //     // priceCell.storeUint(vestingData.tokenPrice, 256); // 256 bits
//   //     priceCell.endCell();
//   //     ///
//   //     //

//   //     const bitLength4 = priceCell.bits; // Total bit length
//   //     const paddingLength4 = (8 - (bitLength4 % 8)) % 8; // Padding needed to align to 8 bits

//   //     // Add padding bits if needed
//   //     if (bitLength4 > 0) {
//   //       const paddingBits = Buffer.alloc(paddingLength4 / 8); // Allocate padding buffer
//   //       cell.storeBits(createBitStringFromBuffer(paddingBits)); // Store padding bits
//   //     }
//   //     //
//   //     //
//   //     cell.storeRef(priceCell);
//   //     const lastCell = beginCell();
//   //     lastCell.storeUint(vestingData.tokenPrice, 256); // 256 bits

//   //     lastCell.endCell();
//   //     //
//   //     const bitLength5 = lastCell.bits; // Total bit length
//   //     const paddingLength5 = (8 - (bitLength5 % 8)) % 8; // Padding needed to align to 8 bits

//   //     // Add padding bits if needed
//   //     if (bitLength5 > 0) {
//   //       const paddingBits = Buffer.alloc(paddingLength5 / 8); // Allocate padding buffer
//   //       cell.storeBits(createBitStringFromBuffer(paddingBits)); // Store padding bits
//   //     }
//   //     //

//   //     cell.storeRef(lastCell);
//   //     // Calculate the bit length of the current cell
//   //     const bitLength = cell.bits; // Total bit length
//   //     const paddingLength = (8 - (bitLength % 8)) % 8; // Padding needed to align to 8 bits

//   //     // Add padding bits if needed
//   //     if (paddingLength > 0) {
//   //       const paddingBits = Buffer.alloc(paddingLength / 8); // Allocate padding buffer
//   //       cell.storeBits(createBitStringFromBuffer(paddingBits)); // Store padding bits
//   //     }

//   //     // End the main cell
//   //     return cell.endCell();
//   //   } catch (error) {
//   //     console.error("Error encoding vesting data:", error);
//   //     throw error;
//   //   }
//   // }

//   //
//   //
//   //
//   function calculatePadding(bitLength: number): number {
//     return (8 - (bitLength % 8)) % 8;
//   }

//   function addPadding(cell: Builder, bitLength: number): void {
//     const paddingLength = calculatePadding(bitLength);
//     if (paddingLength > 0) {
//       const paddingBits = Buffer.alloc(paddingLength / 8);
//       cell.storeBits(createBitStringFromBuffer(paddingBits));
//     }
//   }

//   function encodeVestingData1(vestingData: any): Cell {
//     try {
//       const cell = beginCell();
//       let accumulatedBitLength = 0;
//       cell.storeUint(ONCHAIN_CONTENT_PREFIX, 8); // Indicate on-chain metadata follows
//       // Store basic data fields
//       cell.storeUint(cliffDuration, 256);
//       accumulatedBitLength += 256;
//       cell.storeUint(vestingStartTime, 256);
//       accumulatedBitLength += 256;
//       cell.storeUint(vestingDuration, 256);
//       accumulatedBitLength += 256;

//       const secondcell = beginCell();
//       secondcell.storeUint(vestingInterval, 256);
//       accumulatedBitLength += 256;
//       secondcell.storeUint(cliffPercentage, 32);
//       accumulatedBitLength += 32;

//       // Store project name
//       const projectNameBytes = Buffer.from(projectName, "utf-8");
//       secondcell.storeStringTail(projectName.slice(0, 255));
//       accumulatedBitLength += projectNameBytes.length * 8;

//       // Store remaining vesting data
//       secondcell.storeUint(projectStartTime, 256);
//       accumulatedBitLength += 256;
//       secondcell.storeUint(projectEndTime, 256);
//       accumulatedBitLength += 256;

//       secondcell.endCell();
//       cell.storeRef(secondcell);

//       // Add padding after storing all data in `secondcell`
//       // addPadding(cell, accumulatedBitLength);

//       // Handle addresses in a separate cell
//       const addressesCell = beginCell();
//       addressesCell.storeAddress(ICOToken);
//       addressesCell.storeAddress(investmentToken);
//       addressesCell.storeAddress(owner);
//       addressesCell.endCell();
//       cell.storeRef(addressesCell);

//       accumulatedBitLength += addressesCell.bits; // Accumulate bit length

//       // Add padding after storing all data in `addressesCell`
//       // addPadding(cell, accumulatedBitLength);

//       // Store additional data fields
//       const priceCell = beginCell();
//       priceCell.storeUint(maxCap, 256);
//       priceCell.storeUint(minBuy, 256);
//       priceCell.storeUint(maxBuy, 256);
//       priceCell.endCell();
//       cell.storeRef(priceCell);

//       accumulatedBitLength += priceCell.bits; // Accumulate bit length

//       // Add padding after storing all data in `priceCell`
//       // addPadding(cell, accumulatedBitLength);

//       const lastCell = beginCell();
//       lastCell.storeUint(tokenPrice, 256);
//       lastCell.endCell();
//       cell.storeRef(lastCell);

//       accumulatedBitLength += lastCell.bits; // Accumulate bit length

//       // Add padding after storing all data in `lastCell`
//       // addPadding(cell, accumulatedBitLength);

//       // Finalize and end the cell
//       return cell.endCell();
//     } catch (error) {
//       console.error("Error encoding vesting data:", error);
//       throw error;
//     }
//   }

//   // function encodeVestingData2(vestingData: any) {
//   //   try {
//   //     // First cell for primary data
//   //     const cell1 = beginCell().storeUint(vestingData.cliffDuration, 32).storeUint(vestingData.vestingStartTime, 64).storeUint(vestingData.vestingDuration, 32).storeUint(vestingData.vestingInterval, 32).storeUint(vestingData.cliffPercentage, 32).storeUint(vestingData.projectStartTime, 64).storeUint(vestingData.projectEndTime, 64).endCell();

//   //     // Second cell for address and financial details
//   //     const cell2 = beginCell().storeAddress(vestingData.ICOToken).storeAddress(vestingData.investmentToken).storeAddress(vestingData.owner).storeUint(vestingData.maxCap, 32).storeUint(vestingData.minBuy, 32).storeUint(vestingData.maxBuy, 32).storeUint(vestingData.tokenPrice, 32).endCell();

//   //     return [cell1, cell2];
//   //   } catch (error) {
//   //     console.error('Error encoding vesting data:', error);
//   //     throw error;
//   //   }
//   // }
//   ///
//   //
//   // function DeployContract() {
//   const [txStatus, setTxStatus] = useState("");

//   function createStateInitCell(stateInit: StateInit): Cell {
//     const builder = new Builder();
//     storeStateInit(stateInit)(builder);
//     return builder.endCell();
//   }

//   const deployContract = async () => {
//     try {
//       // Contract code in hex
//       const contractCodeHex = Vesting.hex; // Replace with actual contract code (hex)

//       // Convert the contract code hex to a cell
//       const codeCell = Cell.fromBoc(
//         Buffer.from(TonWeb.utils.hexToBytes(contractCodeHex))
//       )[0];
//       // Convert hex code to Cell

//       // Encode the initialization data
//       const initialDataCell = encodeVestingData1(vestingData);
//       // const [initialDataCell1, initialDataCell2] = encodeVestingData2(vestingData);

//       // Create the contract deploy transaction
//       // const messageBody = beginCell()
//       //   .storeRef(codeCell)
//       //   .storeRef(initialDataCell)
//       //   .endCell();

//       const stateInit: StateInit = {
//         code: codeCell,
//         data: initialDataCell,
//       };
//       // const stateInit: StateInit = {
//       //   code: codeCell,
//       //   data: beginCell().storeRef(initialDataCell1).storeRef(initialDataCell2).endCell()
//       // };

//       // Compute the contract address before deployment
//       const _contractAddress = contractAddress(0, stateInit);

//       // const stateInitCell = beginCell()
//       //   .storeRef(stateInit.code)
//       //   .storeRef(stateInit.data)
//       //   .endCell();

//       const initCellINIT = createStateInitCell(stateInit);
//       const tx: SendTransactionRequest = {
//         validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes validity
//         network: CHAIN.TESTNET,
//         from: tonconnect?.account?.address,
//         messages: [
//           {
//             address: _contractAddress.toString(), // Contract address to deploy to
//             amount: toNano(0.25).toString(), // Specify the amount of TON to deploy the contract
//             stateInit: initCellINIT.toBoc().toString("base64"), // Contract state in base64 format
//             payload: "",
//             // stateInit: stateInitCell.toBoc().toString('base64') // Contract state in base64 format
//           },
//         ],
//       };

//       // Send the transaction using tonconnect
//       await tonconnect.sendTransaction(tx);
//       setTxStatus(
//         "Contract deployed successfully to: " + _contractAddress.toString()
//       );
//     } catch (error) {
//       console.error("Error deploying contract:", error);
//       setTxStatus("Error deploying contract");
//     }
//   };
//   function alertHello() {
//     alert("Hello World!");
//   }

//   return (
//     <div>
//       <div>
//         <TonConnectButton></TonConnectButton>
//         You merely have adopted the dark. I was born in it.
//       </div>
//       <h3>Deploy Vesting Contract</h3>
//       <button onClick={walletAddress ? deployContract : alertHello}>
//         Deploy Contract
//       </button>
//       <p>{txStatus}</p>
//     </div>
//   );
// }

// // }
import React, { useState } from "react";
import {
  Address,
  beginCell,
  toNano,
  Cell,
  StateInit,
  contractAddress,
  storeStateInit,
} from "ton-core";
import TonWeb from "tonweb";
import { GenieLaunchpad } from "../Components/GenieLaunchpad";
import { CHAIN, SendTransactionRequest } from "@tonconnect/ui-react";

function DeployForm() {
  const ONCHAIN_CONTENT_PREFIX = 0x01;
  const walletAddress = useTonAddress(); //connected wallet address
  const [tonconnect] = useTonConnectUI(); //ton wallet-account connection
  const [formData, setFormData] = useState({
    cliffDuration: 213,
    vestingStartTime: 1725691742,
    vestingDuration: 210,
    vestingInterval: 50,
    cliffPercentage: 65,
    projectName: "ExampleProject",
    projectStartTime: 1725691742,
    projectEndTime: 1725691742 + 36 * 24 * 60 * 60,
    ICOToken: Address.parse("kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"),
    investmentToken: Address.parse(
      "kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"
    ),
    owner: Address.parse("kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"),
    maxCap: 1000000,
    minBuy: 1000,
    maxBuy: 100,
    tokenPrice: 60,
  });

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await deployContract();
  };
  const {
    cliffDuration,
    vestingStartTime,
    vestingDuration,
    vestingInterval,
    cliffPercentage,
    projectName,
    projectStartTime,
    projectEndTime,
    ICOToken,
    investmentToken,
    owner,
    maxCap,
    minBuy,
    maxBuy,
    tokenPrice,
  } = formData;
  async function deployContract() {
    // Initialize contract with form data
    const genieLaunchpadInit = await GenieLaunchpad.fromInit(
      BigInt(cliffDuration),
      BigInt(vestingStartTime),
      BigInt(vestingDuration),
      BigInt(vestingInterval),
      BigInt(cliffPercentage),
      projectName,
      BigInt(projectStartTime),
      BigInt(projectEndTime),
      ICOToken,
      investmentToken,
      owner,
      BigInt(maxCap),
      BigInt(minBuy),
      BigInt(maxBuy),
      BigInt(tokenPrice)
    );

    // Define the provider and sender
    const provider = new TonWeb.HttpProvider(
      "https://testnet.toncenter.com/api/v2/jsonRPC"
    ); // Replace with your provider
    const senderAddress = "kQC4-1rca6G1Wy25UydNBwRYHr7-ym9a_P_sSgm3E8Dz293g"; // Replace with the user's wallet address
    const value = toNano("0.25"); // Ensure this covers the deployment cost

    // Compute the contract address before deployment
    const init = await GenieLaunchpad.init(
      BigInt(cliffDuration),
      BigInt(vestingStartTime),
      BigInt(vestingDuration),
      BigInt(vestingInterval),
      BigInt(cliffPercentage),
      projectName,
      BigInt(projectStartTime),
      BigInt(projectEndTime),
      ICOToken,
      investmentToken,
      owner,
      BigInt(maxCap),
      BigInt(minBuy),
      BigInt(maxBuy),
      BigInt(tokenPrice)
    );

    const contractCode = init.code; // This should be the contract's code
    const contractData = init.data; // This should be the initialization data

    const stateInit: StateInit = {
      code: contractCode,
      data: contractData,
    };

    // const stateInitCell = beginCell()
    //   .storeRef(contractCode)
    //   .storeRef(contractData)
    //   .endCell();
    const _contractAddress = contractAddress(0, stateInit);

    const stateInitCell = beginCell();
    // stateInitCell.storeRef(__system);
    // stateInitCell.storeUint(0, 1);
    // stateInitCell.storeInt(ONCHAIN_CONTENT_PREFIX, 8);

    // stateInitCell.storeUint(0xaff90f57, 32);
    // stateInitCell.storeUint(0, 32); // Optional: Some TON contracts expect an operation code, otherwise you can omit this.
    storeStateInit(stateInit)(stateInitCell);
    const serializedStateInitCell = stateInitCell.endCell();

    // Generate the contract address based on the StateInit
    // const contractAddr = contractAddress(0, stateInit);
    const messagePayload = "Remember the Name Anurag Kaul";

    // Create the payload as a Cell containing your string
    const messageCell = beginCell()
      .storeUint(0, 32) // Optional: Some TON contracts expect an operation code, otherwise you can omit this.
      .storeStringTail(messagePayload) // Store the message as a string
      .endCell();
    const serializedPayload = messageCell.toBoc().toString("base64"); // Convert the cell to base64
    // const serializedStateInitCellFinal = beginCell()
    //   .storeRef(contractCode) // Make sure `contractCode` is correct
    //   .storeRef(contractData) // Make sure `contractData` is correct
    //   .endCell();
    try {
      // Example using TonWeb SDK, replace with your wallet SDK method
      const tx: SendTransactionRequest = {
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes validity
        network: CHAIN.TESTNET,
        from: tonconnect?.account?.address,
        messages: [
          {
            address: _contractAddress.toString(), // Contract address to deploy to
            amount: toNano(1).toString(), // Specify the amount of TON to deploy the contract
            stateInit: serializedStateInitCell.toBoc().toString("base64"), // Contract state in base64 format
            // payload: serializedPayload, --OPTIONAL
          },
        ],
      };

      await tonconnect.sendTransaction(tx);
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  }

  return (
    <>
      <TonConnectButton></TonConnectButton>
      <form onSubmit={handleSubmit}>
        {/* Render form fields here */}
        <button type="submit">Deploy Contract</button>
      </form>
    </>
  );
}
export default DeployForm;
