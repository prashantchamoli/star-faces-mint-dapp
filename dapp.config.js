const RPC_URL=process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL;

const config = {
  title: 'Star Faces Dapp',
  desc: 'Showcasing lates Star Faces NFT Collection',
  contractAddress: '0xE48EFec39D6b7A6D61321B6CeD27444DB22FDe19',
  maxMintAmount: 20,
  presaleMaxMintAmount: 3,
  price: 0.01

}
const onboardOptions = {
      dappId: process.env.NEXT_PUBLIC_DAPP_ID,
      networkId: 4, //rinkeby
      darkMode: true,
      walletSelect: {
      heading: 'Select your wallet',
      description: 'Select your wallet to connect to the website',
      agreement:{
      version: '1',
      termsUrl: "https://starheadtech.com",
      privacyUrl: "https://starheadtech.com",
    },
    wallets: [
      { walletName: 'metamask', preferred: true },
      { walletName: 'coinbase', preferred: true },
      {
        walletName: 'walletLink',
        preferred: true,
        rpcUrl: RPC_URL,
        appName: 'Starfaces dapp',
      },
      { walletName: 'trust', preferred: true, rpcUrl: RPC_URL },
      { walletName: 'authereum' },
      {
        walletName: 'ledger',
        rpcUrl: RPC_URL
      },
      {
        walletName: 'lattice',
        rpcUrl: RPC_URL,
        appName: 'Starfaces dapp'
      },
      {
        walletName: 'keepkey',
        rpcUrl: RPC_URL
      }
    ]
  },
  walletCheck: [
    { checkName: 'derivationPath' },
    { checkName: 'accounts' },
    { checkName: 'connect' },
    { checkName: 'network' }
  ]
}
export
  {
    config, onboardOptions
  }