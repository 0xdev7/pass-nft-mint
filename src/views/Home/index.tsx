import BigNumber from 'bignumber.js'
import React, { Fragment, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import ape from 'config/apeabi.json'
import StandardContractABI from 'config/StandardContract.json'
import { useApeContract } from 'hooks/useContracts'
import { useSignerApeContract } from 'hooks/useSignerContract'
import { getApeAddress, getStandardAddress } from 'utils/addressHelper'
import { mint } from 'utils/callHelper'
import useRefresh from 'hooks/useRefresh'
import { getFullDisplayBalance, getBalanceNumber, formatBigNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'

const StyledRightArrowButton = styled.div`
  color: white;
  width: 0px;
  height: 0px;
  border: 20px solid black;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: white;
  cursor: pointer;
`

const StyledLeftArrowButton = styled.div`
  color: white;
  width: 0px;
  height: 0px;
  border: 20px solid black;
  border-top-color: transparent;
  border-right-color: white;
  border-bottom-color: transparent;
  border-left-color: transparent;
  cursor: pointer;
`

const Home: React.FC = () => {
  const [validChainid, setValidChainId] = useState(parseInt(process.env.REACT_APP_CHAIN_ID, 10))
  // const validChainid = 1

  const { account, chainId } = useWeb3React()
  const [pendingTx, setpendingTx] = useState(false)
  const apeContract = useApeContract()
  const apeSignerContract = useSignerApeContract()

  const { fastRefresh } = useRefresh()

  const [redraw, setRedraw] = useState(false)

  // added for minting NFT
  const [maxSupply, setMaxSupply] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [mintNum, setMintNum] = useState<number>(1)
  const [mintprice, setMintPrice] = useState<BigNumber>(new BigNumber(0))
  const { isMobile } = useMatchBreakpoints()

  useEffect(() => {
    const fetchMintPrice = async () => {
      const price = await apeContract._price()
      setMintPrice(price)
    }

    const fetchMaxSupply = async () => {
      const _maxSupply = await apeContract.MAX_NFT_SUPPLY()
      setMaxSupply(_maxSupply)
    }

    if (apeContract) {
      fetchMintPrice()
      fetchMaxSupply()
    }
  }, [apeContract, account])

  useEffect(() => {
    const fetchTotalSupply = async () => {
      const _totalSupply = await apeContract.tokenMinted()
      setTotalSupply(_totalSupply)
    }

    if (apeContract) {
      fetchTotalSupply()
    }
  }, [apeContract, account, fastRefresh])

  const handleDecreaseNumber = async () => {
    if (mintNum > 1) {
      const tmp = mintNum - 1
      setMintNum(tmp)
    }
  }

  const handleIncreaseNumber = async () => {
    // const publicSale = await apeContract.methods.publicSale().call()
    // var tmp = mintNum + 1;
    // if(publicSale) {
    //   if (mintNum < 10){
    //     setMintNum(tmp);
    //   }
    // } else {
    //   if (mintNum < 5){
    //     setMintNum(tmp);
    //   }
    // }

    const tmp = mintNum + 1
    if (mintNum < 3) {
      setMintNum(tmp)
    }
  }

  const handleMint = async () => {
    try {
      setpendingTx(true)
      await mint(apeSignerContract, account, mintNum)
    } catch (e) {
      console.log('Mint failed')
    }
    setpendingTx(false)
  }

  return (
    <section style={{ padding: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '20px' }}>
        {/* **<!-- this is UNSTAKED part of Panel (LEFT)-->** */}
        <div className="pad">
          <h5>LITERALLY USELESS MINT AT OWN RISK</h5>
          <video
            className="nftvideo"
            src="./video.mp4"
            width="100%"
            height="100%"
            loop
            autoPlay
            muted
            style={{
              maxWidth: '400px',
            }}
          />
          <div
            className="bottomButton"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 30 }}
          >
            <div className="row centerpanel" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
              <StyledLeftArrowButton onClick={handleDecreaseNumber} />
              <div
                className="numpanel perfect-center"
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 20,
                  width: 50,
                  marginRight: 20,
                  marginLeft: 20,
                }}
              >
                {mintNum}
              </div>
              <StyledRightArrowButton onClick={handleIncreaseNumber} />
            </div>

            <button
              type="button"
              className="btn"
              disabled={pendingTx || chainId !== validChainid}
              style={{ letterSpacing: '0.2em' }}
              onClick={handleMint}
            >
              {pendingTx && (
                <FontAwesomeIcon
                  icon={faRefresh}
                  className="fa-spin"
                  style={{ marginRight: '5px', letterSpacing: '0.2em' }}
                />
              )}
              {pendingTx ? 'MINTING' : 'MINT NOW'}
            </button>
          </div>
          {chainId !== validChainid && <h5 style={{ textAlign: 'center', letterSpacing: '.2em' }}>Wrong Network</h5>}

          <div style={{ marginTop: '120px' }}>
            <p>Roadmap:</p>
            <p>uselesspass release</p>
            <p>uselesspass alpha</p>
            <p>development of uselesspass marketplace</p>
            <p>uselesspass merch and other physical</p>
            <p>items for holders</p>
            <br />
            <p>just kidding, this is useless (or maybe not???)</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
