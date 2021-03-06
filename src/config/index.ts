import { IConnectWallet, IContracts } from 'typings';

import { bep20Abi, saleAbi } from './abi';
import { is_production } from './constants';

export * from './constants';

export const chains: {
  [key: string]: {
    name: string;
    chainId: number;
    provider: {
      [key: string]: any;
    };
    img?: any;
  };
} = {
  'Trust': {
    name: 'Trust Wallet',
    chainId: is_production ? 1 : 0,
    provider: {
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'bridge',
        provider: {
          bridge: {
            bridge: 'https://bridge.walletconnect.org',
          },
        },
      },
    },
  },
  'Binance-Smart-Chain': {
    name: 'Binance-Smart-Chain',
    chainId: is_production ? 56 : 97,
    provider: {
      MetaMask: { name: 'MetaMask' },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [is_production ? 56 : 97]: is_production
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            },
            chainId: is_production ? 56 : 97,
          },
        },
      },
    },
  },
};

export const connectWallet = (chainName: string): IConnectWallet => {
  const chain = chains[chainName];

  return {
    network: {
      name: chain.name.toString(),
      chainID: chain.chainId,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export enum tokenNames {
  LIMC = 'LIMC',
  USDT = 'USDT',
}

export enum ContractsNames {
  SALE = 'SALE',
  LIMC = 'LIMC',
  USDT = 'USDT',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contracts: IContracts = {
  type: is_production ? 'mainnet' : 'testnet',
  names: Object.keys(ContractsNames),
  decimals: 18,
  params: {
    SALE: {
      mainnet: {
        address: '0x45b71c4b18313fb58eed0f55fffac512d704288f',
        abi: saleAbi,
      },
      testnet: {
        address: '0xF21F8ECDe1cF11E8E5B2aEb15E881D184b3Da05D',
        abi: saleAbi,
      },
    },
    LIMC: {
      mainnet: {
        address: '0x078ca3af061603bd5a1ee2388116daace87244c3',
        abi: bep20Abi,
      },
      testnet: {
        address: '0x930718aD45a9C03f84E2b34f82A5bc4CfCd55096',
        abi: bep20Abi,
      },
    },
    USDT: {
      mainnet: {
        address: '0x55d398326f99059ff775485246999027b3197955',
        abi: bep20Abi,
      },
      testnet: {
        address: '0x6053E666Fd5bF0B93779B98b502ef13599BD6443',
        abi: bep20Abi,
      },
    },
  },
};
