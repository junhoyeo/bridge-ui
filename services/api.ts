import { appConfig } from "@/config/default";
import { LatestBlockInfo } from "@/stores/lastestBlockInfo";
import { AccountStorageProof, merkleProof } from "@/types/transaction";

const CORS_HEADERS = new Headers({ "Access-Control-Allow-Origin": "*" });

/**
 * @description Fetches the merkle proof for a given blockhash and index
 * @flow AVAIL -> ETH
 *
 * @param blockhash
 * @param index
 * @returns merkleProof
 */
export const getMerkleProof = async (blockhash: string, index: number) => {
  const request = new Request(
    `${appConfig.bridgeApiBaseUrl}/eth/proof/${blockhash}?index=${index}`,
    { method: "GET", headers: CORS_HEADERS }
  );
  const response = await fetch(request);
  const proof: merkleProof = await response.json();
  return proof;
};

/**
 * @description Fetches the latest eth block on avail
 * @returns LatestBlockInfo["avlhead"]
 */
export async function fetchAvlHead(): Promise<{
  data: LatestBlockInfo["avlHead"];
}> {
  const request = new Request(`${appConfig.bridgeApiBaseUrl}/avl/head`, {
    headers: CORS_HEADERS,
    method: "GET",
  });
  const response = await fetch(request);

  const avlHead: LatestBlockInfo["avlHead"] = await response.json();
  return { data: avlHead };
}

/**
 * @description Fetches the latest slot on eth
 * @returns LatestBlockInfo["ethHead"]
 */
export async function fetchEthHead(): Promise<{
  data: LatestBlockInfo["ethHead"];
}> {
  const request = new Request(`${appConfig.bridgeApiBaseUrl}/eth/head`, {
    method: "GET",
    headers: CORS_HEADERS,
  });
  const response = await fetch(request);
  const ethHead: LatestBlockInfo["ethHead"] = await response.json();
  return { data: ethHead };
}

/**
 * @description Fetches the latest blockhash for a given slot
 * @param slot
 * @returns LatestBlockInfo["latestBlockhash"]
 */
export async function fetchLatestBlockhash(
  slot: LatestBlockInfo["ethHead"]["slot"]
): Promise<{ data: LatestBlockInfo["latestBlockhash"] }> {
  const request = new Request(
    `${appConfig.bridgeApiBaseUrl}/beacon/slot/${slot}`,
    { method: "GET", headers: CORS_HEADERS }
  );
  const response = await fetch(request);
  const latestBlockhash: LatestBlockInfo["latestBlockhash"] =
    await response.json();
  return { data: latestBlockhash };
}

/**
 * @description Fetches the account storage proofs for a given blockhash and messageid
 * @flow ETH -> AVAIL
 *
 * @param blockhash
 * @param messageid
 * @returns  AccountStorageProof
 */
export async function getAccountStorageProofs(
  blockhash: string,
  messageid: number
) {
  const request = new Request(
    `${appConfig.bridgeApiBaseUrl}/avl/proof/${blockhash}/${messageid}`,
    { method: "GET", headers: CORS_HEADERS }
  );
  const response = await fetch(request).catch((e) => {
    console.log(e);
    return Response.error();
  });

  const result: AccountStorageProof = await response.json();
  return result;
}
