//import Onboard from '@web3-onboard/core'
import Onboard from 'bnc-onboard'
import injectedModule from '@web3-onboard/injected-wallets'
import { onboardOptions } from '../dapp.config'

export const initOnboard = (subscriptions) => {
  return Onboard({
    subscriptions, 
    ...onboardOptions
  })
}