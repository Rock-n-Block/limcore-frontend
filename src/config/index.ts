// import { chainsEnum, IConnectWallet, IContracts } from 'typings';

// import {
//   erc20Abi,
// } from './abi';

// export const is_production = false;

// export const chains: {
//   [key: string]: {
//     name: chainsEnum;
//     chainId: number;
//     provider: {
//       [key: string]: any;
//     };
//     img?: any;
//     explorer: string;
//   };
// } = {
//   [chainsEnum.Tron]: {
//     name: chainsEnum.Tron,
//     chainId: is_production ? 1 : 0,
//     provider: {
//       TronLink: { name: 'TronLink' },
//     },
//     explorer: is_production ? 'https://tronscan.org' : 'https://shasta.tronscan.org',
//   },
// }

// export const connectWallet = (
//   chainName: chainsEnum,
// ): IConnectWallet & {
//   blockchains: Array<string>;
// } => {
//   const chain = chains[chainName];

//   return {
//     wallets: ['MetaMask', 'WalletConnect'],
//     blockchains: ['Ethereum', 'Binance Smart Chain', 'Polygon'],
//     network: {
//       name: chain.name.toString(),
//       chainID: chain.chainId,
//     },
//     provider: chain.provider,
//     settings: { providerType: true },
//   };
// };

// export const contracts: IContracts = {
//   type: is_production ? 'mainnet' : 'testnet',
//   names: [],
//   decimals: 18,
//   params: {
//     TOKEN: {
//       mainnet: {
//         address: '',
//         abi: erc20Abi,
//       },
//       testnet: {
//         address: '',
//         abi: erc20Abi,
//       },
//     },
//   },
// };
