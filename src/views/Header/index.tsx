import BigNumber from 'bignumber.js'
import React, { Fragment, useEffect, useState } from 'react'
import { useMatchBreakpoints } from '@pancakeswap/uikit'
import styled from 'styled-components'
import ConnectWalletButton from 'components/ConnectWalletButton'

const Logo = styled.img`
  width: 300px;
`
const Nav = styled.nav`
  padding: 20px;
`

const Header: React.FC = () => {
  const { isMobile } = useMatchBreakpoints()

  return (
    <header id="header container">
      <Nav data-aos="zoom-out" data-aos-delay={800}>
        <div className={!isMobile ? 'headercomponents' : 'headercomponentsmobile'}>
          <Logo src="./img/logo.png" alt="Logo" />
          <span style={{ display: 'flex' }}>
            <a href="https://twitter.com/temp" className="socialbutton">
              <img src="./img/social.png" alt="Twitter" />
            </a>
            <ConnectWalletButton />
          </span>
        </div>
      </Nav>
    </header>
  )
}

export default Header
