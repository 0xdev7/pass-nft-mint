import React, { useState, useEffect, useRef, ReactNode, useCallback } from 'react'
import useRefresh from './useRefresh'

const useGetPublicSale = () => {
  const [publicSale, setPublicSale] = useState(false)
  const {slowRefresh, fastRefresh} = useRefresh()

  useCallback( async (apeContract) => {
    const sale = await apeContract.methods.publicSale().call()
  }, [])

  return publicSale
}

export default useGetPublicSale