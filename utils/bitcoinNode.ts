// utils/bitcoinNode.ts
import axios from 'axios';
import { type BlockchainInfo, type NetworkInfo } from './types';

const bitcoinNodeUrl = process.env.NEXT_PUBLIC_BITCOIN_NODE_URL as string;
const bitcoinNodeUser = process.env.NEXT_PUBLIC_BITCOIN_NODE_USER as string;
const bitcoinNodePassword = process.env.NEXT_PUBLIC_BITCOIN_NODE_PASSWORD as string;

const auth = {
  username: bitcoinNodeUser,
  password: bitcoinNodePassword,
};

interface BitcoinNodeResponse<T> {
  result: T;
}

export async function getNodeStatus(): Promise<BlockchainInfo> {
  const response = await axios.post<BitcoinNodeResponse<BlockchainInfo>>(
    bitcoinNodeUrl,
    {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'getblockchaininfo',
      params: [],
    },
    { auth }
  );

  const { data } = response;
  return data.result;
}

export async function getNetworkInfo(): Promise<NetworkInfo> {
  const response = await axios.post<BitcoinNodeResponse<NetworkInfo>>(
    bitcoinNodeUrl,
    {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'getnetworkinfo',
      params: [],
    },
    { auth }
  );

  const { data } = response;
  return data.result;
}

export async function getUptime(): Promise<number> {
  const response = await axios.post<BitcoinNodeResponse<number>>(
    bitcoinNodeUrl,
    {
      jsonrpc: '1.0',
      id: 'curltext',
      method: 'uptime',
      params: [],
    },
    { auth }
  );

  const { data } = response;
  return data.result;
}
