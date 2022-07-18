import { ethers } from 'ethers'
import {
  getApeAddress,
} from "utils/addressHelper";
import { simpleRpcProvider } from 'utils/providers'

import ape from "config/apeabi.json";

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getApeContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ape, getApeAddress(), signer)
}
