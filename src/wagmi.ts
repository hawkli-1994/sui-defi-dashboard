import { http, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID'

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism],
  connectors: [
    injected(),
    walletConnect({
      projectId,
      showQrModal: false,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
  },
})