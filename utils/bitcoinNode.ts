import axios from 'axios';
import { type BlockchainInfo, type NetworkInfo, type PeerInfo, type BlockInfo, type MiningInfo, type RawTransaction } from './types';

// Fetching environment variables
const bitcoinNodeUrl = process.env.BITCOIN_NODE_URL || 'http://144.217.71.104:8332';
const bitcoinNodeUser = process.env.BITCOIN_NODE_USER || 'zoot';
const bitcoinNodePassword = process.env.BITCOIN_NODE_PASSWORD || 'orangecube';

if (!bitcoinNodeUrl || !bitcoinNodeUser || !bitcoinNodePassword) {
  console.error('Missing necessary environment variables:', {
    BITCOIN_NODE_URL: bitcoinNodeUrl,
    BITCOIN_NODE_USER: bitcoinNodeUser,
    BITCOIN_NODE_PASSWORD: bitcoinNodePassword ? 'set' : 'not set',
  });
  throw new Error('Missing necessary environment variables');
}

const auth = {
  username: bitcoinNodeUser,
  password: bitcoinNodePassword,
};

console.log('Bitcoin Node URL:', bitcoinNodeUrl);
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
  console.log(`Fetching RPC method: ${method}, params: ${JSON.stringify(params)}`);
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

    console.log(`Response for method ${method}:`, response.data);

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (typeof response.data.result === 'undefined') {
      throw new Error('Invalid response: result is undefined');
    }

    return response.data.result;
  } catch (error) {
    console.error(`Error in fetchRpc method ${method}:`, error);
    throw error;
  }
}

// General Info Commands
export async function getNodeStatus(): Promise<BlockchainInfo> {
  return fetchRpc<BlockchainInfo>('getblockchaininfo');
}

export async function getNetworkInfo(): Promise<NetworkInfo> {
  return fetchRpc<NetworkInfo>('getnetworkinfo');
}

export async function getPeerInfo(): Promise<PeerInfo[]> {
  return fetchRpc<PeerInfo[]>('getpeerinfo');
}

export async function getMiningInfo(): Promise<MiningInfo> {
  return fetchRpc<MiningInfo>('getmininginfo');
}

// Block Commands
export async function getBlockCount(): Promise<number> {
  return fetchRpc<number>('getblockcount');
}

export async function getBestBlockHash(): Promise<string> {
  return fetchRpc<string>('getbestblockhash');
}

export async function getBlockHash(index: number): Promise<string> {
  return fetchRpc<string>('getblockhash', [index]);
}

export async function getBlock(hash: string): Promise<BlockInfo> {
  return fetchRpc<BlockInfo>('getblock', [hash]);
}

// Transaction Commands
export async function getRawMempool(): Promise<string[]> {
  return fetchRpc<string[]>('getrawmempool');
}

export async function getRawTransaction(txid: string): Promise<string> {
  return fetchRpc<string>('getrawtransaction', [txid]);
}

export async function decodeRawTransaction(rawtx: string): Promise<RawTransaction> {
  return fetchRpc<RawTransaction>('decoderawtransaction', [rawtx]);
}

export async function getUptime(): Promise<number> {
  return fetchRpc<number>('uptime');
}
