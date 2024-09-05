"use client";
import {
  TonConnectButton,
  useTonAddress,
  useTonConnectUI,
} from "@tonconnect/ui-react";
import React, { useEffect, useState } from "react";
import { Address, Cell } from "ton";
import { vestingDeployController } from "../lib/vesting-controller";
import {
  createVestingContractCell,
  createVestingDeployParams,
  VESTING_DEPLOY_GAS,
  VestingDeployParams,
} from "../lib/vesting-minter";
import TonWeb from "tonweb";
import { ContractDeployer } from "../lib/contract-deployer";
import WalletConnection from "../lib/wallet-connection";

const DeployVestingContract = () => {
  const [isLoading, setIsLoading] = useState(false);
  const address = useTonAddress(); // Get the connected wallet address
  const [tonconnect] = useTonConnectUI();
  const tokenAddressString = "kQDa88yRVMJVXbYlH5JwL1H8rP1Cuv6ydjK3JVV0XYJdqf2g";
  const convertedTokenAddress = Address.parse(tokenAddressString);
  // const [vestingDetail, setVestingDetail] = useState<VestingDeployParams>(
  //   {} as VestingDeployParams
  // );

  const [vestingDetail, setVestingDetail] = useState<VestingDeployParams>({
    onchainMetaData: {
      // id: "1",
      cliffDuration: 150, // 180 days
      vestingStartTime: 1725590436,
      vestingDuration: 360, // 360 days
      vestingInterval: 30, // 30 days
      cliffPercentage: 25, // 25% released at cliff
      // startDateTime: 1725540436000,
      // endDateTime: 1725540436000 + 360 * 24 * 60 * 60 * 1000, // 360 days from now
      projectName: "ExampleProject",
      projectStartTime: 1725540436,
      projectEndTime: 1725540436 + 360 * 24 * 60 * 60,
      ICOToken: Address.parse(
        "kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"
      ),
      investmentToken: Address.parse(
        "kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"
      ),
      owner: Address.parse("kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"),

      maxCap: 10000000, // 1,000,000 tokens
      minBuy: 1000, // 100 tokens
      maxBuy: 100000, // 10,000 tokens
      tokenPrice: 10, // $0.01 per token

      // tokenAddress: Address.parse(
      //   "kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"
      // ), // dummy address
      // dummy address
    },
    offchainUri: "https://testnet.toncenter.com/api/v2/jsonRPC",
    owner: Address.parse("kQCCc7D4PUhv7Yu740G_ROW_cH2fEuq6KC5PHGr9DSOadhhH"), // dummy owner address
  });
  const vestingFormDetail = [
    {
      type: "text",
      name: "id",
      placeholder: "Enter vesting ID, e.g., 1",
      value: 1 || vestingDetail?.onchainMetaData?.id,
      className: "form-control",
    },
    {
      type: "number",
      name: "cliffDuration",
      placeholder: "Cliff duration in days, e.g., 30",
      value: 30 || vestingDetail?.onchainMetaData?.cliffDuration,
      className: "form-control",
    },
    {
      type: "number",
      name: "vestingStartTime",
      placeholder: "Vesting start time (UNIX timestamp)",
      value: 1725436253 || vestingDetail?.onchainMetaData?.vestingStartTime,
      className: "form-control",
    },
    {
      type: "number",
      name: "vestingDuration",
      placeholder: "Vesting duration in days, e.g., 90",
      value: 90 || vestingDetail?.onchainMetaData?.vestingDuration,
      className: "form-control",
    },
    {
      type: "number",
      name: "vestingInterval",
      placeholder: "Vesting interval in days, e.g., 30",
      value: 30 || vestingDetail?.onchainMetaData?.vestingInterval,
      className: "form-control",
    },
    {
      type: "number",
      name: "cliffPercentage",
      placeholder: "Cliff percentage, e.g., 20",
      value: 10 || vestingDetail?.onchainMetaData?.cliffPercentage,
      className: "form-control",
    },
    {
      type: "number",
      name: "startDateTime",
      placeholder: "Start date time (UNIX timestamp)",
      value: 1725496253 || vestingDetail?.onchainMetaData?.startDateTime,
      className: "form-control",
    },
    {
      type: "number",
      name: "endDateTime",
      placeholder: "End date time (UNIX timestamp)",
      value: 1729496253 || vestingDetail?.onchainMetaData?.endDateTime,
      className: "form-control",
    },
    {
      type: "number",
      name: "maxCap",
      placeholder: "Max cap, e.g., 100000",
      value: 100000 || vestingDetail?.onchainMetaData?.maxCap,
      className: "form-control",
    },
    {
      type: "number",
      name: "minBuy",
      placeholder: "Minimum buy amount, e.g., 100",
      value: 100 || vestingDetail?.onchainMetaData?.minBuy,
      className: "form-control",
    },
    {
      type: "number",
      name: "maxBuy",
      placeholder: "Maximum buy amount, e.g., 1000",
      value: 100 || vestingDetail?.onchainMetaData?.maxBuy,
      className: "form-control",
    },
    {
      type: "number",
      name: "tokenPrice",
      placeholder: "Token price, e.g., 1",
      value: 1 || vestingDetail?.onchainMetaData?.tokenPrice,
      className: "form-control",
    },
    {
      type: "text",
      name: "projectName",
      placeholder: "Project name, e.g., My Project",
      value: "Say my name" || vestingDetail?.onchainMetaData?.projectName,
      className: "form-control",
    },
    {
      type: "text",
      name: "tokenAddress",
      placeholder: "Token address",
      value:
        "kQCcdOj-k-kHnzabML1etavmCjBzZ9FwjKvibUBXBybFflmD" ||
        vestingDetail?.onchainMetaData?.tokenAddress,
      className: "form-control",
    },
    {
      type: "text",
      name: "projectOwner",
      placeholder: "Project owner address",
      value:
        "kQCcdOj-k-kHnzabML1etavmCjBzZ9FwjKvibUBXBybFflmD" ||
        vestingDetail?.onchainMetaData?.projectOwner,
      className: "form-control",
    },
  ];

  const deployContractVesting = async (data: VestingDeployParams) => {
    let vestingDeployParams: VestingDeployParams = {
      owner: Address.parse(address),
      onchainMetaData: vestingDetail?.onchainMetaData,
    };

    console.log(vestingDeployParams);
    if (!address || !vestingDeployParams) return;
    const stateInitCell = new Cell();

    // Serialize Cell object to a base64 string
    const stateInitString = stateInitCell.toBoc().toString("base64"); // Adjust if using different encoding

    try {
      // await WalletConnection.initializeClient("https://testnet.toncenter.com/api/v2/jsonRPC"); // Replace with your desired endpoint
      const tonweb = new TonWeb(
        new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC")
      ); // Example endpoint
      // console.log(
      //   vestingDeployParams,
      //   "vestingDeployParamsvestingDeployParamsvestingDeployParams"
      // );
      // console.log("00000000000000000000");
      // const deployParams = createVestingDeployParams(
      //   vestingDeployParams,
      //   "https://testnet.toncenter.com/api/v2/jsonRPC"
      // );
      // console.log("1111111111111111111");

      // const contractAddress = new ContractDeployer().addressForContract(
      //   deployParams
      // );
      // console.log("222222222222222222");
      // const isDeployed = await WalletConnection.isContractDeployed(
      //   contractAddress
      // );
      // console.log(isDeployed, "ISdeployed", deployParams);
      // if (isDeployed) {
      //   setIsLoading(false);
      //   return;
      // }
      // console.log("33333333333333333333333333333");
      console.log(vestingDeployParams, "vestingDeployParams");

      // try {
      const result = await vestingDeployController.createVesting(
        vestingDeployParams,
        tonconnect
      );
      console.log(result, "result");

      console.log("Contract deployed successfully!");
    } catch (error) {
      console.error("Failed to deploy contract:", error);
    }
  };
  console.log(vestingDetail);
  return (
    <div>
      <TonConnectButton />
      <div className="grid-cols-3 mr-2">
        {vestingFormDetail.map((item: any, index: number) => (
          <>
            <div key={index}>
              <label>{item.name.toUpperCase()} :</label>
              <input
                type="text"
                placeholder={item.placeholder}
                name={item.name}
                id="token-name"
                value={item.value}
                className="h-10 font-medium border-b-2 border-green-600 focus:outline-none focus:border-green-800 w-full"
                onChange={(e) =>
                  setVestingDetail((prev: any) => ({
                    ...prev,
                    onchainMetaData: {
                      ...prev.onchainMetaData,
                      [e.target.name]: e.target.value,
                    },
                  }))
                }
              />
            </div>
          </>
        ))}
      </div>
      <div className="justify-center">
        <button
          type="button"
          className="border-2 border-green-600 w-full h-10 text-center font-bold m-3"
          onClick={() => deployContractVesting(vestingDetail)}
        >
          Deploy Vesting Contract
        </button>
      </div>
    </div>
  );
};
export default DeployVestingContract;
