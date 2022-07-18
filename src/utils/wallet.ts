// Set of helper functions to facilitate wallet setup

import { BASE_BSC_SCAN_URL } from '../config'
import { nodes } from './getRpcUrl'

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async () => {
  

console.log("Wallet Setup Network")

    if (window.ethereum) {
      const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
      try {
        
          await window.ethereum
            .request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: `0x${chainId.toString(16)}` }],
            })
            
        return true
      } catch (error) {
        console.error(error);
        return false
      }
    }

    return false

  // const provider = window.ethereum
  // if (provider) {
  //   const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
  //   console.log("chainId : ", chainId)
  //   try {
  //     await provider.request({
  //       method: 'wallet_addEthereumChain',
  //       params: [
  //         {
  //           chainId: `0x${chainId.toString(16)}`,
  //           chainName: 'Ethereum Smart Chain Mainnet',
  //           nativeCurrency: {
  //             name: 'Ethereum',
  //             symbol: 'ETH',
  //             decimals: 18,
  //           },
  //           rpcUrls: nodes,
  //           blockExplorerUrls: [`${BASE_BSC_SCAN_URL}/`],
  //         },
  //       ],
  //     })
  //     return true
  //   } catch (error) {
  //     console.error('Failed to setup the network in Metamask:', error)
  //     return false
  //   }
  // } else {
  //   console.error("Can't setup the Ethereum network on metamask because window.ethereum is undefined")
  //   return false
  // }
}
