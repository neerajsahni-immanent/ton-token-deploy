"use client"
import Image from "next/image";
import { TonConnectButton, useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import { createDeployParams, DEFAULT_DECIMALS, toDecimalsBN } from "./lib/jetton-minter";
import { jettonDeployController, JettonDeployParams } from "./lib/jetton-controller";
import { Address } from "ton";
import { ContractDeployer } from "./lib/contract-deployer";
import WalletConnection from "./lib/wallet-connection";



export default function Home() {
  const address = useTonAddress();
  const walletAddress = useTonAddress();
  const [tonconnect] = useTonConnectUI();
  const [isLoading, setIsLoading] = useState(false);
  const [tokenDetail, setTokenDetail] = useState<any>({})
  const formDetail = [{
    type: "text",
    name: "name",
    placeholder: "Enter token name, e.g., MyToken",
    value: tokenDetail?.name,

  },
  {
    type: "text",
    name: "symbol",
    placeholder: "Enter token symbol, e.g., TKN",
    className: "form-control",
    value: tokenDetail?.symbol,

  }, {
    type: "text",
    name: "supply",
    placeholder: "Total supply, e.g., 1000000",
    className: "form-control",
    value: tokenDetail?.supply,

  }, {
    type: "text",
    name: "decimal",
    placeholder: "Number of decimals, e.g., 18",
    className: "form-control",
    value: tokenDetail?.decimal,

  }];

  async function fetchDecimalsOffchain(url: string): Promise<{ decimals?: string }> {
    let res = await fetch(url);
    let obj = await res.json();
    return obj;
  }

  async function deployContract(data: any) {
    if (!walletAddress || !tonconnect) {
      throw new Error("Wallet not connected");
    }
    console.log(data,"DATA");

    let decimals = data.decimals;
    if (data.offchainUri) {
      let res = await fetchDecimalsOffchain(
        data.offchainUri.replace("ipfs://", "https://ipfs.io/ipfs/"),
      );
      decimals = res.decimals;
    }

    const params: JettonDeployParams = {
      owner: Address.parse(walletAddress),
      onchainMetaData: {
        name: data.name,
        symbol: data.symbol,
        image: data.tokenImage,
        description: data.description,
        decimals: parseInt(decimals).toFixed(0),
      },
      offchainUri: data.offchainUri,
      amountToMint: toDecimalsBN(data.mintAmount || 10, decimals ?? DEFAULT_DECIMALS),
    };
    setIsLoading(true);
    const deployParams = createDeployParams(params, data.offchainUri);
    const contractAddress = new ContractDeployer().addressForContract(deployParams);

    const isDeployed = await WalletConnection.isContractDeployed(contractAddress);
console.log(isDeployed,"ISdeployed", deployParams, data);
    if (isDeployed) {
      // showNotification(
      //   <>
      //     Contract already deployed,{" "}
      //     <ReactRouterLink to={`${ROUTES.jetton}/${Address.normalize(contractAddress)}/`}>
      //       View contract
      //     </ReactRouterLink>
      //   </>,
      //   "warning",
      // );
      setIsLoading(false);
      return;
    }

    try {
      const result = await jettonDeployController.createJetton(params, tonconnect, walletAddress);
      console.log(result,"result");
      // analytics.sendEvent(
      //   AnalyticsCategory.DEPLOYER_PAGE,
      //   AnalyticsAction.DEPLOY,
      //   contractAddress.toFriendly(),
      // );

      // navigate(`${ROUTES.jetton}/${Address.ormalize(result)}`);
    } catch (err) {
      if (err instanceof Error) {
        // showNotification(<>{err.message}</>, "error");
        console.log("ERROR", err, walletAddress)
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div>Ton Integration
      {<TonConnectButton />}


      <div className="flex-wrap">
        <div className="justify-center">
          {formDetail.map((item: any, index: number) => (
            <>
              <label>{item.name.toUpperCase()} :</label>
              <input
                type="text"
                placeholder={item.placeholder}
                name={item.name}
                id="token-name"
                className="h-10 font-medium border-b-2 border-green-600 focus:outline-none focus:border-green-800 w-full"
                onChange={(e)=> setTokenDetail((prev :any)=> ({...prev, [e.target.name]: e.target.value}))}
              />
            </>
          ))}
        <button className="btn" onClick={()=>deployContract(tokenDetail)} >Create Token</button>

        </div>
      </div>
    </div>
  );
}
