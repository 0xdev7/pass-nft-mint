import React from 'react'
import { Link, Text } from '@pancakeswap/uikit'
import { getBscScanLink } from 'utils'

interface DescriptionWithTxProps {
  description?: string
  txHash?: string
}

const DescriptionWithTx: React.FC<DescriptionWithTxProps> = ({ txHash, children }) => {

  return (
    <>
      {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
    </>
  )
}

export default DescriptionWithTx
