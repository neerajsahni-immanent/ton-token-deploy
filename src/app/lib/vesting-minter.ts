import { Address, beginCell, beginDict, Cell, Slice, toNano } from "ton";
import walletHex from "./contracts/jetton-wallet-compiled.json";
import vestingHex from "./contracts/vesting.compiled.json";
import BN from "bn.js";
import { Sha256 } from "@aws-crypto/sha256-js";
import BigNumber from "bignumber.js";
import axios from "axios";
import { sha256 } from "./jetton-minter";
// import BN from "bn.js";
// import { Address } from "ton"; // Ensure the Address type is correctly imported

export const VESTING_DEPLOY_GAS = toNano(0.25);
const ONCHAIN_CONTENT_PREFIX = 0x00;
const OFFCHAIN_CONTENT_PREFIX = 0x01;
const SNAKE_PREFIX = 0x00;
const ten = new BigNumber(10);
export const DEFAULT_DECIMALS = 9;
export const JETTON_WALLET_CODE = Cell.fromBoc(walletHex.hex)[0];
export const JETTON_MINTER_CODE = Cell.fromBoc(vestingHex.hex)[0];
export type PersistenceType =
  | "onchain"
  | "offchain_private_domain"
  | "offchain_ipfs";

export interface VestingDeployParams {
  onchainMetaData?: {
    // id?: string;
    // cliffDuration: number;
    // vestingStartTime: number;
    // vestingDuration: number;
    // vestingInterval: number;
    // cliffPercentage: number;
    // startDateTime: number;
    // endDateTime: number;
    // maxCap: number;
    // minBuy: number;
    // maxBuy: number;
    // tokenPrice: number;
    // projectName: string;
    // tokenAddress: Address;
    // projectOwner: Address;

    cliffDuration: number; // 180 days
    vestingStartTime: number;
    vestingDuration: number; // 360 days
    vestingInterval: number; // 30 days
    cliffPercentage: number; // 25% released at cliff
    // startDateTime: 1725540436000,
    // endDateTime: 1725540436000 + 360 * 24 * 60 * 60 * 1000, // 360 days from now
    projectName: string;
    projectStartTime: number;
    projectEndTime: number;
    ICOToken: Address;
    investmentToken: Address;
    owner: Address;

    maxCap: number; // 1,000,000 tokens
    minBuy: number; // 100 tokens
    maxBuy: number; // 10,000 tokens
    tokenPrice: number; // $0.01 per token
  };
  offchainUri?: string;
  owner: Address;
}

export function buildVestingOffChainMetadata(contentUri: string): Cell {
  console.log(contentUri, "buildVestingOffChainMetadata");
  return beginCell()
    .storeInt(OFFCHAIN_CONTENT_PREFIX, 8)
    .storeBuffer(Buffer.from(contentUri, "ascii"))
    .endCell();
}

export function buildVestingOnchainMetadata(data: {
  [s: string]: string | undefined | number;
}): Cell {
  const KEYLEN = 256;
  const dict = beginDict(KEYLEN);
  console.log(data, "buildVestingOnchainMetadata");

  Object.entries(data).forEach(
    ([k, v]: [string, string | undefined | number | any]) => {
      if (!vestingOnChainMetadataSpec[k as VestingMetaDataKeys])
        throw new Error(`Unsupported onchain key: ${k}`);
      if (v === undefined || v === "") return;
      console.log("hey1");

      let bufferToStore = Buffer.from(
        v,
        vestingOnChainMetadataSpec[k as VestingMetaDataKeys]
      );
      console.log("hey2");
      const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

      const rootCell = new Cell();
      rootCell.bits.writeUint8(SNAKE_PREFIX);
      let currentCell = rootCell;

      while (bufferToStore.length > 0) {
        currentCell.bits.writeBuffer(
          bufferToStore.slice(0, CELL_MAX_SIZE_BYTES)
        );
        bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
        if (bufferToStore.length > 0) {
          let newCell = new Cell();
          currentCell.refs.push(newCell);
          currentCell = newCell;
        }
      }

      dict.storeRef(sha256(k), rootCell);
    }
  );

  return beginCell()
    .storeInt(ONCHAIN_CONTENT_PREFIX, 8)
    .storeDict(dict.endDict())
    .endCell();
}

export function createVestingContractCell(params: any): Cell {
  const cellBuilder = beginCell();

  // Add basic contract information
  cellBuilder.storeUint(0, 32); // Example placeholder for any initial contract identifier if needed

  // Check if owner address is correctly defined
  if (params) {
    cellBuilder.storeAddress(params.owner);
  } else {
    throw new Error("Invalid owner address");
  }

  // Serialize on-chain metadata if provided
  if (params) {
    console.log(params, "check1");

    cellBuilder.storeUint(ONCHAIN_CONTENT_PREFIX, 8); // Indicate on-chain metadata follows
    cellBuilder.storeUint(params.cliffDuration, 32);
    cellBuilder.storeUint(params.vestingStartTime, 32);
    cellBuilder.storeUint(params.vestingDuration, 32);
    cellBuilder.storeUint(params.vestingInterval, 32);
    cellBuilder.storeUint(params.cliffPercentage, 32);
    cellBuilder.storeUint(params.projectStartTime, 32);
    cellBuilder.storeUint(params.projectEndTime, 32);
    cellBuilder.storeUint(params.maxCap, 32);
    cellBuilder.storeUint(params.minBuy, 32);
    cellBuilder.storeUint(params.maxBuy, 32);
    cellBuilder.storeUint(params.tokenPrice, 32);

    // Convert and store projectName
    if (params) {
      const projectNameBytes = Buffer.from(params.projectName, "utf-8");
      cellBuilder.storeBuffer(projectNameBytes);
    } else {
      throw new Error("Project name is undefined");
    }

    // Convert and store other string fields
    if (params) {
      cellBuilder.storeAddress(params.ICOToken);
      cellBuilder.storeAddress(params.investmentToken);
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
      const uriBytes = Buffer.from(params.offchainUri, "utf8");
      cellBuilder.storeBuffer(uriBytes);
    } else {
      throw new Error("Offchain URI is undefined");
    }
  }

  return cellBuilder.endCell();
}

export type VestingMetaDataKeys =
  // | "id"
  | "cliffDuration"
  | "vestingStartTime"
  | "vestingDuration"
  | "vestingInterval"
  | "cliffPercentage"
  | "projectName"
  | "projectStartTime"
  | "projectEndTime"
  | "ICOToken"
  | "investmentToken"
  | "owner"
  | "maxCap"
  | "minBuy"
  | "maxBuy"
  | "tokenPrice";
const vestingOnChainMetadataSpec: {
  [key in VestingMetaDataKeys]:
    | "utf8"
    | "ascii"
    | string
    | Address
    | undefined
    | number;
} = {
  // id: "utf8",
  cliffDuration: "utf8",
  vestingStartTime: "utf8",
  vestingDuration: "utf8",
  vestingInterval: "utf8",
  cliffPercentage: "utf8",
  projectName: "utf8",
  projectStartTime: "utf8",
  projectEndTime: "utf8",
  ICOToken: "utf8",
  investmentToken: "utf8",
  owner: "utf8",
  maxCap: "utf8",
  minBuy: "utf8",
  maxBuy: "utf8",
  tokenPrice: "utf8",
};

// Convert Address to string in the metadata

function convertAddressDataToStrings(data: {
  [s in VestingMetaDataKeys]?: string | number | Address | undefined;
}): { [s in VestingMetaDataKeys]?: string | undefined } {
  const result: { [s in VestingMetaDataKeys]?: string | undefined } = {};

  for (const key in data) {
    // Assert that 'key' is of type 'VestingMetaDataKeys'
    const typedKey = key as VestingMetaDataKeys;

    const value = data[typedKey];

    if (value instanceof Address) {
      result[typedKey] = value.toString(); // Convert Address to string
    } else if (typeof value === "number") {
      result[typedKey] = value.toString();
    } else {
      result[typedKey] = value; // Retain string or undefined values as is
    }
  }
  console.log(result, "resulttttt123654");

  // return result;
  const formattedResult = {
    cliffDuration: result.cliffDuration,
    vestingStartTime: result.vestingStartTime,
    vestingDuration: result.vestingDuration,
    vestingInterval: result.vestingInterval,
    cliffPercentage: result.cliffPercentage,
    projectName: result.projectName,
    projectStartTime: result.projectStartTime,
    projectEndTime: result.projectEndTime,
    ICOToken: result.ICOToken,
    investmentToken: result.investmentToken,
    owner: result.owner,
    maxCap: result.maxCap,
    minBuy: result.minBuy,
    maxBuy: result.maxBuy,
    tokenPrice: result.tokenPrice,
  };
  // console.log(formattedResult, "formattedResult");
  return formattedResult;
}

export function initDataForVesting(
  owner: Address,
  data?: { [s in VestingMetaDataKeys]?: string | number | Address | undefined },
  offchainUri?: string
) {
  if (!data && !offchainUri) {
    throw new Error("Must either specify onchain data or offchain uri");
  }
  const convertedData = data ? convertAddressDataToStrings(data) : undefined;
  console.log(data, owner, "gggggggggggg");

  try {
    const dataa = createVestingContractCell(data);
    console.log(dataa, "encoded data");

    // try {
    //   const decodeData = decodeVestingContractCell(dataa);
    //   console.log(decodeData, "mumkin");
    // } catch (e) {
    //   console.log(e, "error in deconding");
    // }

    return beginCell()
      .storeCoins(0)
      .storeAddress(owner)
      .storeRef(dataa)
      .storeRef(JETTON_WALLET_CODE)
      .endCell();
  } catch (e) {
    console.log(e, "error in encoding");
  }
}

export const createVestingDeployParams = (
  params: VestingDeployParams,
  offchainUri?: string
) => {
  const queryId = parseInt(process.env.REACT_APP_DEPLOY_QUERY_ID ?? "0");
  console.log(queryId, "haha");

  console.log(params, offchainUri, "haha");
  return {
    code: JETTON_MINTER_CODE,
    data: initDataForVesting(
      params.owner,
      params.onchainMetaData,
      // params,
      "https://testnet.toncenter.com/api/v2/jsonRPC"
      // undefined
    ),
    deployer: params.owner,
    value: VESTING_DEPLOY_GAS,
    // message: mintBody(params.owner, params.amountToMint, toNano(0.2), queryId),
  };
};
