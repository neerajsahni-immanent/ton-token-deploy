import { Address, beginCell, beginDict, Cell, Slice, toNano } from "ton";
import walletHex from "./contracts/jetton-wallet-compiled.json";
import vestingHex from "./contracts/vesting.compiled.json";
import BN from "bn.js";
import { Sha256 } from "@aws-crypto/sha256-js";
import BigNumber from "bignumber.js";
import axios from "axios";

export const VESTING_DEPLOY_GAS = toNano(0.25);
const ONCHAIN_CONTENT_PREFIX = 0x00;
const OFFCHAIN_CONTENT_PREFIX = 0x01;
const SNAKE_PREFIX = 0x00;
const ten = new BigNumber(10);
export const DEFAULT_DECIMALS = 9;
export const JETTON_WALLET_CODE = Cell.fromBoc(walletHex.hex)[0];
export const JETTON_MINTER_CODE = Cell.fromBoc(vestingHex.hex)[0]; 
export type PersistenceType = "onchain" | "offchain_private_domain" | "offchain_ipfs";

export interface VestingDeployParams {
    onchainMetaData?: {
      id?: string,
      cliffDuration:number ,
      vestingStartTime:number ,
      vestingDuration:number ,
      vestingInterval:number ,
      cliffPercentage:number ,
      startDateTime:number,
      endDateTime:number ,
      maxCap:number ,
      minBuy:number ,
      maxBuy:number ,
      tokenPrice:number ,
      projectName: string,
      tokenAddress:Address,
      projectOwner:Address,         
    };
    offchainUri?: string;
    owner: Address;
  }


//   export function createVestingContractCell(params: VestingDeployParams): Cell {
//     const cellBuilder = beginCell();
  
//     // Add basic contract information
//     cellBuilder.storeUint(0, 32);  // Example placeholder for any initial contract identifier if needed
//     cellBuilder.storeAddress(params.owner);
  
//     // Serialize on-chain metadata if provided
//     if (params.onchainMetaData) {
//       cellBuilder.storeUint(ONCHAIN_CONTENT_PREFIX, 8); // Indicate on-chain metadata follows
//       cellBuilder.storeUint(params.onchainMetaData.cliffDuration, 32);
//       cellBuilder.storeUint(params.onchainMetaData.vestingStartTime, 32);
//       cellBuilder.storeUint(params.onchainMetaData.vestingDuration, 32);
//       cellBuilder.storeUint(params.onchainMetaData.vestingInterval, 32);
//       cellBuilder.storeUint(params.onchainMetaData.cliffPercentage, 32);
//       cellBuilder.storeUint(params.onchainMetaData.startDateTime, 32);
//       cellBuilder.storeUint(params.onchainMetaData.endDateTime, 32);
//       cellBuilder.storeUint(params.onchainMetaData.maxCap, 32);
//       cellBuilder.storeUint(params.onchainMetaData.minBuy, 32);
//       cellBuilder.storeUint(params.onchainMetaData.maxBuy, 32);
//       cellBuilder.storeUint(params.onchainMetaData.tokenPrice, 32);
//           // Convert projectName to a byte array and store it as a buffer
//     const projectNameBytes = Buffer.from(params.onchainMetaData.projectName, 'utf-8');
//     cellBuilder.storeBuffer(projectNameBytes);

//     // Similarly, convert and store other string fields (like tokenAddress, projectOwner, etc.)
//     const tokenAddressBytes = Buffer.from(params.onchainMetaData.tokenAddress, 'utf-8');
//     cellBuilder.storeBuffer(tokenAddressBytes);

//     const projectOwnerBytes = Buffer.from(params.onchainMetaData.projectOwner, 'utf-8');
//     cellBuilder.storeBuffer(projectOwnerBytes);

//       // Continue adding other metadata fields as required
//     } else if (params.offchainUri) {
//       cellBuilder.storeUint(OFFCHAIN_CONTENT_PREFIX, 8); // Indicate off-chain metadata follows
//       // Store off-chain URI, handle serialization according to TON storage format
//       // Typically converting the URI to bytes and storing in the cell
//       const uriBytes = Buffer.from(params.offchainUri, 'utf8');
//       cellBuilder.storeBuffer(uriBytes);
//     }
  
//     return cellBuilder.endCell();
//   }
  



export function createVestingContractCell(params: VestingDeployParams): Cell {
    const cellBuilder = beginCell();
  
    // Add basic contract information
    cellBuilder.storeUint(0, 32);  // Example placeholder for any initial contract identifier if needed
    
    // Check if owner address is correctly defined
    if (params.owner && params.owner instanceof Address) {
        cellBuilder.storeAddress(params.owner);
    } else {
        throw new Error("Invalid owner address");
    }
  
    // Serialize on-chain metadata if provided
    if (params.onchainMetaData) {
        cellBuilder.storeUint(ONCHAIN_CONTENT_PREFIX, 8); // Indicate on-chain metadata follows
        cellBuilder.storeUint((params.onchainMetaData.cliffDuration), 32);
        cellBuilder.storeUint((params.onchainMetaData.vestingStartTime), 32);
        cellBuilder.storeUint((params.onchainMetaData.vestingDuration), 32);
        cellBuilder.storeUint((params.onchainMetaData.vestingInterval), 32);
        cellBuilder.storeUint((params.onchainMetaData.cliffPercentage), 32);
        cellBuilder.storeUint((params.onchainMetaData.startDateTime), 32);
        cellBuilder.storeUint((params.onchainMetaData.endDateTime), 32);
        cellBuilder.storeUint((params.onchainMetaData.maxCap), 32);
        cellBuilder.storeUint((params.onchainMetaData.minBuy), 32);
        cellBuilder.storeUint((params.onchainMetaData.maxBuy), 32);
        cellBuilder.storeUint((params.onchainMetaData.tokenPrice), 32);
        
        // Convert and store projectName
        if (params.onchainMetaData.projectName) {
            const projectNameBytes = Buffer.from(params.onchainMetaData.projectName, 'utf-8');
            cellBuilder.storeBuffer(projectNameBytes);
        } else {
            throw new Error("Project name is undefined");
        }
        
        // Convert and store other string fields
        if (params.onchainMetaData.tokenAddress) {
            cellBuilder.storeAddress(params.onchainMetaData.tokenAddress);
        } else {
            throw new Error("Token address is undefined");
        }

        // if (params.onchainMetaData.projectOwner) {
        //     // const projectOwnerBytes = Buffer.from(params.onchainMetaData.projectOwner, 'utf-8');
        //     cellBuilder.storeAddress(params.onchainMetaData.projectOwner);
        // } else {
        //     throw new Error("Project owner is undefined");
        // }

    } else if (params.offchainUri) {
        cellBuilder.storeUint(OFFCHAIN_CONTENT_PREFIX, 8); // Indicate off-chain metadata follows
        
        // Check if URI is defined
        if (params.offchainUri) {
            const uriBytes = Buffer.from(params.offchainUri, 'utf8');
            cellBuilder.storeBuffer(uriBytes);
        } else {
            throw new Error("Offchain URI is undefined");
        }
    }
  
    return cellBuilder.endCell();
}

export type VestingMetaDataKeys =
  | "name"
  | "description"
  | "image"
  | "symbol"
  | "image_data"
  | "decimals"
  | "uri" 
  | "id"
  | "cliffDuration"
  | "vestingStartTime"
  | "vestingDuration"
  | "vestingInterval"
  | "cliffPercentage"
  | "startDateTime"
  | "endDateTime"
  | "maxCap"
  | "minBuy"
  | "maxBuy"
  | "tokenPrice"
  | "projectName"
  | "tokenAddress"
  | "projectOwner"

// const jvestingOnChainMetadataSpec: {
//     [key in VestingMetaDataKeys]: "utf8" | "ascii" | undefined;
//   } = {
//     name: "utf8",
//     description: "utf8",
//     image: "ascii",
//     decimals: "utf8",
//     symbol: "utf8",
//     image_data: undefined,
//   }  

export function initDataForVesting(
    owner: Address,
    data?: any,
    offchainUri?: string,
){
    if (!data && !offchainUri) {
        throw new Error("Must either specify onchain data or offchain uri");
      }
      return beginCell()
        .storeCoins(0)
        .storeAddress(owner)
       
        .storeRef(JETTON_WALLET_CODE)
        .endCell();
}