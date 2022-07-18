import {
  getApeAddress,
} from "utils/addressHelper";

import ape from "config/apeabi.json";
import { useWeb3 } from "./useWeb3";

const useContract = (abi: any, add: any) => {
  const web3 = useWeb3();
  return new web3.eth.Contract(abi, add);
};
/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useSignerApeContract = () => {
  return useContract(ape, getApeAddress());
};

export default useContract;
  