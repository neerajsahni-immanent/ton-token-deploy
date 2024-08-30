import { TonClient } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";


const endpointP = getHttpEndpoint({
  // network: getNetwork(new URLSearchParams(window.location.search)),
  network: "testnet",
});

async function _getClient() {
  return new TonClient({
    endpoint: await endpointP,
  });
}

const clientP = _getClient();

export async function getClient() {
  return clientP;
}

export async function getEndpoint() {
  return endpointP;
}
