import { stringify } from "postcss";
import { useState, useEffect } from "react";
import { initOnboard } from "../utils/onboard";
import { config } from "../dapp.config";
import { 
  getTotalMinted, 
  getMaxSupply, 
  isPausedState, 
  isPublicSaleState, 
  isPreSaleState,
  presaleMint, 
  publicMint } 
  from '../utils/interact';
export default function Mint() {
  const [maxSupply, setMaxSupply] = useState(0)
  const [totalMinted, setTotalMinted] = useState(0)
  const [maxMintAmount, setMaxMintAmount] = useState(0)
  const [paused, setPaused] = useState(false)
  const [isPublicSale, setIsPublicSale] = useState(false)
  const [isPreSale, setIsPreSale] = useState(false)
  const [status, setStatus] = useState(null)
  const [mintAmount, setMintAmount] = useState(1)
  const [isMinting, setIsMinting] = useState(false)
  const [onboard, setOnboard] = useState(null)
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    const init = async () => {
      setMaxSupply(await getMaxSupply())
      setTotalMinted(await getTotalMinted())

      setPaused(await isPausedState())
      setIsPublicSale(await isPublicSaleState())
      const isPreSale = await isPreSaleState()
      setIsPreSale(isPreSale)

      setMaxMintAmount(
        isPreSale ? config.presaleMaxMintAmount : config.maxMintAmount
      )
    }

    init()
  }, [])

  useEffect(() => {
    const onboardData = initOnboard({
      address: (address) => setWalletAddress(address ? address : ''),
      wallet: (wallet) => {
        if (wallet.provider) {
          window.localStorage.setItem('selectedWallet', wallet.name)
        } else {
          window.localStorage.removeItem('selectedWallet')
        }
      }
    })

    setOnboard(onboardData)
  }, [])

  const previouslySelectedWallet =
    typeof window !== 'undefined' &&
    window.localStorage.getItem('selectedWallet')

  useEffect(() => {
    if (previouslySelectedWallet !== null && onboard) {
      onboard.walletSelect(previouslySelectedWallet)
    }
  }, [onboard, previouslySelectedWallet])

  const connectWalletHandler = async () => {
    const walletSelected = await onboard.walletSelect()
    if (walletSelected) {
      await onboard.walletCheck()
      window.location.reload(true)
    }
  }

  const incrementMintAmount = () => {
    if (mintAmount < maxMintAmount) {
      setMintAmount(mintAmount + 1)
    }
  }

  const decrementMintAmount = () => {
    if (mintAmount > 1) {
      setMintAmount(mintAmount - 1)
    }
  }
  const presaleMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await presaleMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }
  const publicMintHandler = async () => {
    setIsMinting(true)

    const { success, status } = await publicMint(mintAmount)

    setStatus({
      success,
      message: status
    })

    setIsMinting(false)
  }
return(
  
  <div className="nakedBG">
    <h1>{paused ? 'Paused': isPreSale ? 'Pre-Sale' : 'Public Sale'}</h1>
        <h3>{walletAddress ? walletAddress.slice(0,8) + '...' + walletAddress.slice(-4) : ''}</h3>
        <p><span>{ totalMinted }</span>/{ maxSupply }</p>
        <img src="/images/9.png"/>
        <button onClick={incrementMintAmount} >+</button>
        <p>{mintAmount}</p>
        <button onClick={decrementMintAmount} >-</button>
        <p>Max Mint Amount: {maxMintAmount}</p>
        <p>Total</p>
        <p>{Number.parseFloat(config.price * mintAmount).toFixed(2)} { ' ' }ETH 
        <span>+ GAS</span></p>
        
        {/* Mint Button && Connect Wallet Button */}
        {walletAddress ? (
                  <button
                    className={` ${
                      paused || isMinting
                        ? 'bg-gray-900 cursor-not-allowed'
                        : 'bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg hover:shadow-pink-400/50'
                    } font-coiny mt-12 w-full px-6 py-3 rounded-md text-2xl text-white  mx-4 tracking-wide uppercase`}
                    disabled={paused || isMinting}
                    onClick={isPreSale ? presaleMintHandler : publicMintHandler}
                  >
                    {isMinting ? 'Minting...' : 'Mint'}
                  </button>
                ) : (
                  <button
                    className="font-coiny mt-12 w-full bg-gradient-to-br from-brand-purple to-brand-pink shadow-lg px-6 py-3 rounded-md text-2xl text-white hover:shadow-pink-400/50 mx-4 tracking-wide uppercase"
                    onClick={connectWalletHandler}
                  >
                    Connect Wallet
                  </button>
                )}
        {/* Status */}
        {status && (
              <div
                className={`border ${
                  status.success ? 'border-green-500' : 'border-brand-pink-400 '
                } rounded-md text-start h-full px-4 py-4 w-full mx-auto mt-8 md:mt-4"`}
              >
                <p className="flex flex-col space-y-2 text-white text-sm md:text-base break-words ...">
                  {status.message}
                </p>
              </div>
            )}
        
        {/* Contract Address */}
        <h3>Contract Address</h3>
        <a href="#" target="_blank" rel="noopener noreferrer"><span>4889990300039888987787235423542345</span></a>       
  </div>
);
}

