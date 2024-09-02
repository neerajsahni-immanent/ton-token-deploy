
"use client"
import { TonConnectButton, useTonAddress, useTonConnectUI } from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react';
import TonWeb from 'tonweb';
import { createVestingContractCell, VESTING_DEPLOY_GAS, VestingDeployParams } from '../lib/vesting-minter';
import { Address, Cell } from 'ton';
import { vestingDeployController } from '../lib/vesting-controller';


const DeployVestingContract = () => {
    const tonweb = new TonWeb();
    const address = useTonAddress(); // Get the connected wallet address
    const [tonconnect ] = useTonConnectUI();
    const tokenAddressString ="kQDa88yRVMJVXbYlH5JwL1H8rP1Cuv6ydjK3JVV0XYJdqf2g"
    const convertedTokenAddress = Address.parse(tokenAddressString);
    const [vestingDetail, setVestingDetail]= useState<any>({});
    const vestingFormDetail = [
        {
          type: "text",
          name: "id",
          placeholder: "Enter vesting ID, e.g., 1",
          value: vestingDetail?.id,
          className: "form-control",
        },
        {
          type: "number",
          name: "cliffDuration",
          placeholder: "Cliff duration in days, e.g., 30",
          value: vestingDetail?.cliffDuration,
          className: "form-control",
        },
        {
          type: "number",
          name: "vestingStartTime",
          placeholder: "Vesting start time (UNIX timestamp)",
          value: vestingDetail?.vestingStartTime,
          className: "form-control",
        },
        {
          type: "number",
          name: "vestingDuration",
          placeholder: "Vesting duration in days, e.g., 90",
          value: vestingDetail?.vestingDuration,
          className: "form-control",
        },
        {
          type: "number",
          name: "vestingInterval",
          placeholder: "Vesting interval in days, e.g., 30",
          value: vestingDetail?.vestingInterval,
          className: "form-control",
        },
        {
          type: "number",
          name: "cliffPercentage",
          placeholder: "Cliff percentage, e.g., 20",
          value: vestingDetail?.cliffPercentage,
          className: "form-control",
        },
        {
          type: "number",
          name: "startDateTime",
          placeholder: "Start date time (UNIX timestamp)",
          value: vestingDetail?.startDateTime,
          className: "form-control",
        },
        {
          type: "number",
          name: "endDateTime",
          placeholder: "End date time (UNIX timestamp)",
          value: vestingDetail?.endDateTime,
          className: "form-control",
        },
        {
          type: "number",
          name: "maxCap",
          placeholder: "Max cap, e.g., 100000",
          value: vestingDetail?.maxCap,
          className: "form-control",
        },
        {
          type: "number",
          name: "minBuy",
          placeholder: "Minimum buy amount, e.g., 100",
          value: vestingDetail?.minBuy,
          className: "form-control",
        },
        {
          type: "number",
          name: "maxBuy",
          placeholder: "Maximum buy amount, e.g., 1000",
          value: vestingDetail?.maxBuy,
          className: "form-control",
        },
        {
          type: "number",
          name: "tokenPrice",
          placeholder: "Token price, e.g., 1",
          value: vestingDetail?.tokenPrice,
          className: "form-control",
        },
        {
          type: "text",
          name: "projectName",
          placeholder: "Project name, e.g., My Project",
          value: vestingDetail?.projectName,
          className: "form-control",
        },
        {
          type: "text",
          name: "tokenAddress",
          placeholder: "Token address",
          value: vestingDetail?.tokenAddress,
          className: "form-control",
        },
        {
          type: "text",
          name: "projectOwner",
          placeholder: "Project owner address",
          value: vestingDetail?.projectOwner,
          className: "form-control",
        }
      ];
     if(!address){
        return
     }
    // Define VestingDeployParams ensuring the owner is of the correct type
    const vestingDeployParams: VestingDeployParams = {
      onchainMetaData: {
        id: '1',
        cliffDuration: 30,
        vestingStartTime: 1672531200,  // Example UNIX timestamp
        vestingDuration: 90,
        vestingInterval: 30,
        cliffPercentage: 20,
        startDateTime: 1672531200,  // Example UNIX timestamp
        endDateTime: 1677721600,    // Example UNIX timestamp
        maxCap: 100000,
        minBuy: 100,
        maxBuy: 1000,
        tokenPrice: 1,
        projectName: 'My Project',
        tokenAddress: convertedTokenAddress,
        projectOwner:Address.parse(address),
      },
      owner: Address.parse(address),  // Correctly typed as Address
      offchainUri: ''
    };
    
    

    const deployContractVesting = async ()=>{

        if (!address || !vestingDeployParams) return;
        const stateInitCell = new Cell();
  
        
        // Serialize Cell object to a base64 string
        const stateInitString = stateInitCell.toBoc().toString('base64'); // Adjust if using different encoding
        
        try {
          const tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC')); // Example endpoint
          const deployParams = createVestingContractCell(vestingDeployParams);
        //   const contractAddress = new VestingDeployController().addressForContract(deployParams);
          // stateInitCell.bits.writeBuffer(JETTON_MINTER_CODE); // Example for setting code
          // stateInitCell.bits.writeBuffer(deployParams)
          console.log(tonweb, deployParams);
          // Sign and send the deploy transaction using Tonkeeper
          const deployTransaction = await tonconnect.sendTransaction({
            validUntil: Math.floor(Date.now() / 1000) + 3600,  // Example expiration time 1 hour from now
            from: address, // Ensure 'address' is the sender's address in '<wc>:<hex>' format
            messages: [
              {
                address: address,  // Receiver's address
                amount: VESTING_DEPLOY_GAS.toString(),  // Amount to send in nanoTon (convert to string if it's not)
                // stateInit: { code: JETTON_MINTER_CODE, data: deployParams },  // Include the contract's stateInit if needed
                // payload: deployParams.toString()  // Contract specific data to add to the transaction
              }
            ],
            // network: 'testnet'  // Specify the network (optional but recommended)
          });
    
          // const signedTransaction = await tonweb.signTransaction(deployTransaction);
          // await tonweb.sendTransaction(signedTransaction);
    
          console.log('Contract deployed successfully!');
        } catch (error) {
          console.error('Failed to deploy contract:', error);
        }
    
    }
    return (
        <div>
   <div className="justify-center">
   {<TonConnectButton />}
        {vestingFormDetail.map((item: any, index: number) => (
            <>
              <label>{item.name.toUpperCase()} :</label>
              <input
                type="text"
                placeholder={item.placeholder}
                name={item.name}
                id="token-name"
                className="h-10 font-medium border-b-2 border-green-600 focus:outline-none focus:border-green-800 w-full"
                onChange={(e)=> setVestingDetail((prev :any)=> ({...prev, [e.target.name]: e.target.value}))}
              />
            </>
          ))}
            <button type='button' onClick={()=>deployContractVesting()}>Deploy Vesting Contract</button>
        </div>
        </div>
    );
};

export default DeployVestingContract;
