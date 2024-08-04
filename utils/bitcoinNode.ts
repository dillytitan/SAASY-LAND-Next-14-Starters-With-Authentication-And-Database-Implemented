// utils/bitcoinNode.ts
import axios from 'axios';
import { type BlockchainInfo, type NetworkInfo } from './types';

const bitcoinNodeUrl = process.env.BITCOIN_NODE_URL as string;
const bitcoinNodeUser = process.env.BITCOIN_NODE_USER as string;
const bitcoinNodePassword = process.env.BITCOIN_NODE_PASSWORD as string;

if (!bitcoinNodeUrl || !bitcoinNodeUser || !bitcoinNodePassword) {
  throw new Error('Missing necessary environment variables');
}

const auth = {
  username: bitcoinNodeUser,
  password: bitcoinNodePassword,
};

console.log('Bitcoin Node URL:', bitcoinNodeUrl); // Logging the URL for debugging

interface JsonRpcResponse<T> {
  result: T;
  error?: {
    code: number;
    message: string;
  };
  id: string;
}

export async function getNodeStatus(): Promise<BlockchainInfo> {
  try {
    const response = await axios.post<JsonRpcResponse<BlockchainInfo>>(
      bitcoinNodeUrl,
      {
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'getblockchaininfo',
        params: [],
      },
      { auth }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error in getNodeStatus:', error);
    throw error;
  }
}

export async function getNetworkInfo(): Promise<NetworkInfo> {
  try {
    const response = await axios.post<JsonRpcResponse<NetworkInfo>>(
      bitcoinNodeUrl,
      {
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'getnetworkinfo',
        params: [],
      },
      { auth }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error in getNetworkInfo:', error);
    throw error;
  }
}

export async function getUptime(): Promise<number> {
  try {
    const response = await axios.post<JsonRpcResponse<number>>(
      bitcoinNodeUrl,
      {
        jsonrpc: '1.0',
        id: 'curltext',
        method: 'uptime',
        params: [],
      },
      { auth }
    );

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    return response.data.result;
  } catch (error) {
    console.error('Error in getUptime:', error);
    throw error;
  }
}
