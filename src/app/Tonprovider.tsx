"use client"
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { createContext, useEffect, useState } from 'react';


export default function TonProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const manifestUrl = 'https://kritika-github-pages.github.io/tonconnect-manifest.json';
  return (

    // <TonConnectUIProvider manifestUrl="https://minter.ton.org/tonconnect-manifest.json" >
    <TonConnectUIProvider manifestUrl={manifestUrl} >
      {children}
    </TonConnectUIProvider>
  );
}

export const EnvContext = createContext({
  isSandbox: false,
  isTestnet: false,
});