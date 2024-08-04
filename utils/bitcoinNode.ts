import axios from 'axios';
import { type BlockchainInfo, type NetworkInfo } from './types';

const bitcoinNodeUrl = process.env.NEXT_PUBLIC_BITCOIN_NODE_URL as string;
const bitcoinNodeUser = process.env.NEXT_PUBLIC_BITCOIN_NODE_USER as string;
const bitcoinNodePassword = process.env.NEXT_PUBLIC_BITCOIN_NODE_PASSWORD as string;

if (!bitcoinNodeUrl || !bitcoinNodeUser || !bitcoinNodePassword) {
  console.error('Missing necessary environment variables:', {
    NEXT_PUBLIC_BITCOIN_NODE_URL: bitcoinNodeUrl,
    NEXT_PUBLIC_BITCOIN_NODE_USER: bitcoinNodeUser,
    NEXT_PUBLIC_BITCOIN_NODE_PASSWORD: bitcoinNodePassword ? 'set' : 'not set',
  });
  throw new Error('Missing necessary environment variables');
}

const auth = {
  username: bitcoinNodeUser,
  password: bitcoinNodePassword,
};

console.log('Bitcoin Node URL:', bitcoinNodeUrl); // Logging the URL for debugging
console.log('Bitcoin User:', bitcoinNodeUser);
console.log('Bitcoin Password:', bitcoinNodePassword ? 'set' : 'not set');

interface JsonRpcError {
  code: number;
  message: string;
}

interface JsonRpcResponse<T> {
  result: T;
  error?: JsonRpcError;
  id: string;
}

async function fetchRpc<T>(method: string, params: unknown[] = []): Promise<T> {
  try {
    const response = await axios.post<JsonRpcResponse<T>>(
      bitcoinNodeUrl,
      {
        jsonrpc: '1.0',
        id: 'curltext',
        method,
        params,
      },
      { auth }
    );

    if (response.data.error) {
      console.error('RPC Error:', response.data.error);
      throw new Error(response.data.error.message);
    }

    if (typeof response.data.result === 'undefined') {
      console.error('Invalid response:', response.data);
      throw new Error('Invalid response: result is undefined');
    }

    return response.data.result;
  } catch (error) {
    console.error('Error in fetchRpc:', error);
    throw error;
  }
}

export async function getNodeStatus(): Promise<BlockchainInfo> {
  try {
    return await fetchRpc<BlockchainInfo>('getblockchaininfo');
  } catch (error) {
    console.error('Error in getNodeStatus:', error);
    throw error;
  }
}

export async function getNetworkInfo(): Promise<NetworkInfo> {
  try {
    return await fetchRpc<NetworkInfo>('getnetworkinfo');
  } catch (error) {
    console.error('Error in getNetworkInfo:', error);
    throw error;
  }
}

export async function getUptime(): Promise<number> {
  try {
    return await fetchRpc<number>('uptime');
  } catch (error) {
    console.error('Error in getUptime:', error);
    throw error;
  }
}
