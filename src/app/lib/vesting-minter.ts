import { Address, beginCell, beginDict, Cell, Slice, toNano } from "ton";
import walletHex from "./contracts/jetton-wallet-compiled.json";
import vestingHex from "./contracts/vesting.compiled.json";
import BN from "bn.js";
import { Sha256 } from "@aws-crypto/sha256-js";
import BigNumber from "bignumber.js";
import axios from "axios";
import { sha256 } from "./jetton-minter";

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
        cliffDuration: number,
        vestingStartTime: number,
        vestingDuration: number,
        vestingInterval: number,
        cliffPercentage: number,
        startDateTime: number,
        endDateTime: number,
        maxCap: number,
        minBuy: number,
        maxBuy: number,
        tokenPrice: number,
        projectName: string,
        tokenAddress: Address,
        projectOwner: Address,
    };
    offchainUri?: string;
    owner: Address;
}

export function buildVestingOffChainMetadata(contentUri: string): Cell {
    return beginCell()
        .storeInt(OFFCHAIN_CONTENT_PREFIX, 8)
        .storeBuffer(Buffer.from(contentUri, "ascii"))
        .endCell();
}


export function buildVestingOnchainMetadata(data: { [s: string]: string | undefined | number }): Cell {
    const KEYLEN = 256;
    const dict = beginDict(KEYLEN);

    Object.entries(data).forEach(([k, v]: [string, string | undefined | number |any]) => {
        if (!vestingOnChainMetadataSpec[k as VestingMetaDataKeys])
            throw new Error(`Unsupported onchain key: ${k}`);
        if (v === undefined || v === "") return;
        let bufferToStore = Buffer.from(v, vestingOnChainMetadataSpec[k as VestingMetaDataKeys]);

        const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

        const rootCell = new Cell();
        rootCell.bits.writeUint8(SNAKE_PREFIX);
        let currentCell = rootCell;

        while (bufferToStore.length > 0) {
            currentCell.bits.writeBuffer(bufferToStore.slice(0, CELL_MAX_SIZE_BYTES));
            bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
            if (bufferToStore.length > 0) {
                let newCell = new Cell();
                currentCell.refs.push(newCell);
                currentCell = newCell;
            }
        }

        dict.storeRef(sha256(k), rootCell);
    });

    return beginCell().storeInt(ONCHAIN_CONTENT_PREFIX, 8).storeDict(dict.endDict()).endCell();
}

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

const vestingOnChainMetadataSpec: {
    [key in VestingMetaDataKeys]: "utf8" | "ascii" | string | Address | undefined | number;
} = {

    id: "utf8",
    cliffDuration: "utf8",
    vestingStartTime: "utf8",
    vestingDuration: "utf8",
    vestingInterval: "utf8",
    cliffPercentage: "utf8",
    startDateTime: "utf8",
    endDateTime: "utf8",
    maxCap: "utf8",
    minBuy: "utf8",
    maxBuy: "utf8",
    tokenPrice: "utf8",
    projectName: "utf8",
    tokenAddress: "utf8",
    projectOwner: "utf8",
}

// Convert Address to string in the metadata
function convertAddressDataToStrings(
    data: { [s in VestingMetaDataKeys]?: string | number | Address | undefined }
): { [s in VestingMetaDataKeys]?: string | number | undefined } {
    const result: { [s in VestingMetaDataKeys]?: string | number | undefined } = {};

    for (const key in data) {
        // Assert that 'key' is of type 'VestingMetaDataKeys'
        const typedKey = key as VestingMetaDataKeys;

        if (data[typedKey] instanceof Address) {
            result[typedKey] = data[typedKey]?.toString(); // Convert Address to string
        } else {
            result[typedKey] = data[typedKey];
        }
    }

    return result;
}

export function initDataForVesting(
    owner: Address,
    data?: { [s in VestingMetaDataKeys]?: string | number | Address | undefined },
    offchainUri?: string,
) {
    if (!data && !offchainUri) {
        throw new Error("Must either specify onchain data or offchain uri");
    }
    const convertedData = data ? convertAddressDataToStrings(data) : undefined;

    return beginCell()
        .storeCoins(0)
        .storeAddress(owner)
        .storeRef(
            offchainUri ? buildVestingOffChainMetadata(offchainUri) : buildVestingOnchainMetadata(convertedData!),
        )
        .storeRef(JETTON_WALLET_CODE)
        .endCell();
}


export const createVestingDeployParams = (params: VestingDeployParams, offchainUri?: string) => {
    const queryId = parseInt(process.env.REACT_APP_DEPLOY_QUERY_ID ?? "0");
    console.log(params, offchainUri,);
    return {
        code: JETTON_MINTER_CODE,
        data: initDataForVesting(params.owner, params.onchainMetaData, offchainUri),
        deployer: params.owner,
        value: VESTING_DEPLOY_GAS,
        // message: mintBody(params.owner, params.amountToMint, toNano(0.2), queryId),
    };
};