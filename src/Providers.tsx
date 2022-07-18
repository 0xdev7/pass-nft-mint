import React from 'react'
import { ModalProvider, light, dark } from '@pancakeswap/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { HelmetProvider } from 'react-helmet-async'
import { getLibrary } from 'utils/web3React'
import { Provider } from 'react-redux'
import { LanguageProvider } from 'contexts/Localization'
import { ThemeProvider } from 'styled-components'
import { ToastsProvider } from 'contexts/ToastsContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'

const ThemeProviderWrapper = (props) => {
  // const [isDark] = useThemeManager()
  const isDark = true
  return <ThemeProvider theme={isDark ? dark : light} {...props} />
}

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ToastsProvider>
        <HelmetProvider>
          <ThemeProviderWrapper>            
            <LanguageProvider>
              <RefreshContextProvider>
                <ModalProvider>{children}</ModalProvider> 
                </RefreshContextProvider>           
            </LanguageProvider>
          </ThemeProviderWrapper>
        </HelmetProvider>
      </ToastsProvider>
    </Web3ReactProvider>
  )
}

export default Providers
