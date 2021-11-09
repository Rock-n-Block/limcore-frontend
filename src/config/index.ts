import { IConnectWallet, IContracts } from 'typings';

import { erc20Abi } from './abi';

export const is_production = false;

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
  Trust: {
    name: 'Trust Wallet',
    chainId: is_production ? 1 : 0,
    provider: {
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [is_production ? 1 : 4]: is_production
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-2-s1.binance.org:8545/',
            },
            chainId: is_production ? 1 : 4,
          },
        },
      },
    },
  },
};

export const connectWallet = (
  chainName: string,
): IConnectWallet & {
  blockchains: Array<string>;
} => {
  const chain = chains[chainName];

  return {
    wallets: ['MetaMask', 'WalletConnect'],
    blockchains: ['Ethereum', 'Binance Smart Chain', 'Polygon'],
    network: {
      name: chain.name.toString(),
      chainID: chain.chainId,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export const contracts: IContracts = {
  type: is_production ? 'mainnet' : 'testnet',
  names: [],
  decimals: 18,
  params: {
    TOKEN: {
      mainnet: {
        address: '',
        abi: erc20Abi,
      },
      testnet: {
        address: '',
        abi: erc20Abi,
      },
    },
  },
};
