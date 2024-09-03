
"use client"
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react';
import { Address, Cell } from 'ton';
import { vestingDeployController } from '../lib/vesting-controller';
import { createVestingContractCell, createVestingDeployParams, VESTING_DEPLOY_GAS, VestingDeployParams } from '../lib/vesting-minter';
import TonWeb from 'tonweb';
import { ContractDeployer } from '../lib/contract-deployer';
import WalletConnection from '../lib/wallet-connection';

const DeployVestingContract = () => {

  const [isLoading, setIsLoading] = useState(false);
  const address = useTonAddress(); // Get the connected wallet address
  const [tonconnect] = useTonConnectUI();
  const tokenAddressString = "kQDa88yRVMJVXbYlH5JwL1H8rP1Cuv6ydjK3JVV0XYJdqf2g";
  const convertedTokenAddress = Address.parse(tokenAddressString);
  const [vestingDetail, setVestingDetail] = useState<VestingDeployParams>({


  } as VestingDeployParams);

  const vestingFormDetail = [
    {
      type: "text",
      name: "id",
      placeholder: "Enter vesting ID, e.g., 1",
      value: vestingDetail?.onchainMetaData?.id,
      className: "form-control",
    },
    {
      type: "number",
      name: "cliffDuration",
      placeholder: "Cliff duration in days, e.g., 30",
      value: vestingDetail?.onchainMetaData?.cliffDuration,
      className: "form-control",
    },
    {
      type: "number",
      name: "vestingStartTime",
      placeholder: "Vesting start time (UNIX timestamp)",
      value: vestingDetail?.onchainMetaData?.vestingStartTime,
      className: "form-control",
    },
    {
      type: "number",
      name: "vestingDuration",
      placeholder: "Vesting duration in days, e.g., 90",
      value: vestingDetail?.onchainMetaData?.vestingDuration,
      className: "form-control",
    },
    {
      type: "number",
      name: "vestingInterval",
      placeholder: "Vesting interval in days, e.g., 30",
      value: vestingDetail?.onchainMetaData?.vestingInterval,
      className: "form-control",
    },
    {
      type: "number",
      name: "cliffPercentage",
      placeholder: "Cliff percentage, e.g., 20",
      value: vestingDetail?.onchainMetaData?.cliffPercentage,
      className: "form-control",
    },
    {
      type: "number",
      name: "startDateTime",
      placeholder: "Start date time (UNIX timestamp)",
      value: vestingDetail?.onchainMetaData?.startDateTime,
      className: "form-control",
    },
    {
      type: "number",
      name: "endDateTime",
      placeholder: "End date time (UNIX timestamp)",
      value: vestingDetail?.onchainMetaData?.endDateTime,
      className: "form-control",
    },
    {
      type: "number",
      name: "maxCap",
      placeholder: "Max cap, e.g., 100000",
      value: vestingDetail?.onchainMetaData?.maxCap,
      className: "form-control",
    },
    {
      type: "number",
      name: "minBuy",
      placeholder: "Minimum buy amount, e.g., 100",
      value: vestingDetail?.onchainMetaData?.minBuy,
      className: "form-control",
    },
    {
      type: "number",
      name: "maxBuy",
      placeholder: "Maximum buy amount, e.g., 1000",
      value: vestingDetail?.onchainMetaData?.maxBuy,
      className: "form-control",
    },
    {
      type: "number",
      name: "tokenPrice",
      placeholder: "Token price, e.g., 1",
      value: vestingDetail?.onchainMetaData?.tokenPrice,
      className: "form-control",
    },
    {
      type: "text",
      name: "projectName",
      placeholder: "Project name, e.g., My Project",
      value: vestingDetail?.onchainMetaData?.projectName,
      className: "form-control",
    },
    {
      type: "text",
      name: "tokenAddress",
      placeholder: "Token address",
      value: vestingDetail?.onchainMetaData?.tokenAddress,
      className: "form-control",
    },
    {
      type: "text",
      name: "projectOwner",
      placeholder: "Project owner address",
      value: vestingDetail?.onchainMetaData?.projectOwner,
      className: "form-control",
    }
  ];

  const deployContractVesting = async (data: VestingDeployParams) => {
    let vestingDeployParams: VestingDeployParams = {
      owner: Address.parse(address),
      onchainMetaData: vestingDetail?.onchainMetaData
    }

    console.log(vestingDeployParams);
    if (!address || !vestingDeployParams) return;
    const stateInitCell = new Cell();


    // Serialize Cell object to a base64 string
    const stateInitString = stateInitCell.toBoc().toString('base64'); // Adjust if using different encoding

    try {
      // await WalletConnection.initializeClient("https://testnet.toncenter.com/api/v2/jsonRPC"); // Replace with your desired endpoint
      const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC')); // Example endpoint
      const deployParams = createVestingDeployParams(vestingDeployParams);
      const contractAddress = new ContractDeployer().addressForContract(deployParams);

      const isDeployed = await WalletConnection.isContractDeployed(contractAddress);
      console.log(isDeployed, "ISdeployed", deployParams);
      if (isDeployed) {
       
        setIsLoading(false);
        return;
      }
      // try {
        const result = await vestingDeployController.createVesting(vestingDeployParams, tonconnect);
        console.log(result, "result");
    

      console.log('Contract deployed successfully!');
    } catch (error) {
      console.error('Failed to deploy contract:', error);
    }

  }
  console.log(vestingDetail);
  return (
    <div>
      <TonConnectButton />
      <div className="grid-cols-3 mr-2">
        {vestingFormDetail.map((item: any, index: number) => (
          <>
            <div key={index}>
              <label >{item.name.toUpperCase()} :</label>
              <input
                type="text"
                placeholder={item.placeholder}
                name={item.name}
                id="token-name"
                className="h-10 font-medium border-b-2 border-green-600 focus:outline-none focus:border-green-800 w-full"
                onChange={(e) => setVestingDetail((prev: any) => ({ ...prev, onchainMetaData: { ...prev.onchainMetaData, [e.target.name]: e.target.value } }))}
              />
            </div>
          </>
        ))}
      </div>
      <div className="justify-center">
        <button type='button' className='border-2 border-green-600 w-full h-10 text-center font-bold m-3' onClick={() => deployContractVesting(vestingDetail)}>Deploy Vesting Contract</button>
      </div>
    </div>
  );
}
export default DeployVestingContract