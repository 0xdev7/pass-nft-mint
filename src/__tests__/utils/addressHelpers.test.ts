import { getAddress } from 'utils/addressHelpers'

describe('getAddress', () => {
  const address = {
    137: '0x0b3006F5a3B3822Fd1713D30f4f3dB5e930F00c0',
    80001: '0xa6807bbf6e7BD221A64148669F509cDB430DC73e',
  }

  it(`get address for mainnet (chainId 137)`, () => {
    process.env.REACT_APP_CHAIN_ID = '137'
    const expected = address[137]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for testnet (chainId 80001)`, () => {
    process.env.REACT_APP_CHAIN_ID = '80001'
    const expected = address[80001]
    expect(getAddress(address)).toEqual(expected)
  })
  it(`get address for any other network (chainId 31337)`, () => {
    process.env.REACT_APP_CHAIN_ID = '31337'
    const expected = address[137]
    expect(getAddress(address)).toEqual(expected)
  })
})
