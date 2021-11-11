import React, { createContext, useContext } from 'react';

import { is_production, contracts } from 'config';

import { WalletService } from '..';

declare global {
  interface Window {
    ethereum: any;
    kardiachain: any;
  }
}

const walletConnectorContext = createContext<{
  connect: () => void;
  disconnect: () => void;
  walletService: WalletService;
  address: string;
}>({
  connect: (): void => {},
  disconnect: (): void => {},
  walletService: new WalletService(),
  address: '',
});

class Connector extends React.Component<
  any,
  {
    provider: WalletService;
    address: string;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: new WalletService(),
      address: '',
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    if (localStorage.walletconnect) {
      this.connect();
    }
  }

  connect = async () => {
    try {
      const isConnected = await this.state.provider.initWalletConnect(
        'Binance-Smart-Chain',
        'WalletConnect',
      );
      if (isConnected) {
        this.state.provider.getAccount().subscribe(
          (userAccount: any) => {
            if (this.state.address && userAccount.address !== this.state.address) {
              this.disconnect();
            } else {
              this.setState({
                address: userAccount.address,
              });

              const promises: Array<Promise<any>> = contracts.names.map((contract) => {
                const { address, abi } = contracts.params[contract][
                  is_production ? 'mainnet' : 'testnet'
                ];

                return this.state.provider.connectWallet.addContract({
                  name: contract,
                  address,
                  abi,
                });
              });

              Promise.all(promises).catch(() => this.disconnect());
            }
          },
          () => {
            alert(
              `Wrong Network, please select ${
                is_production ? 'mainnet' : 'testnet'
              } network in your wallet and try again`,
            );
            this.disconnect();
          },
        );
      }
    } catch (err) {
      console.error(err);
      this.disconnect();
    }
  };

  disconnect() {
    delete localStorage.walletconnect;
    this.setState({
      address: '',
    });
  }

  render() {
    return (
      <walletConnectorContext.Provider
        value={{
          walletService: this.state.provider,
          connect: this.connect,
          disconnect: this.disconnect,
          address: this.state.address,
        }}
      >
        {this.props.children}
      </walletConnectorContext.Provider>
    );
  }
}

export default Connector;

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}
