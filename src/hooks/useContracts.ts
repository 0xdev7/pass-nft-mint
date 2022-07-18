import { useMemo } from 'react'
import {
  getApeContract,
} from "utils/contractHelpers";

import useActiveWeb3React from 'hooks/useActiveWeb3React'

export const useApeContract = () => {
  const { library } = useActiveWeb3React()
  return useMemo(() => getApeContract(library.getSigner()), [library])
}
