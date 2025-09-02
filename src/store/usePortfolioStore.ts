import { create } from 'zustand'

export interface Asset {
  symbol: string
  name: string
  balance: number
  value: number
  price: number
  change24h: number
  protocol: string
}

export interface LendingPosition {
  id: string
  protocol: string
  asset: string
  supplied: number
  borrowed: number
  apy: number
  healthFactor: number
  liquidationThreshold: number
}

export interface PoolPosition {
  id: string
  protocol: string
  pair: string
  liquidity: number
  apy: number
  rewards: number
}

interface PortfolioState {
  totalValue: number
  totalPnl: number
  assets: Asset[]
  lendingPositions: LendingPosition[]
  poolPositions: PoolPosition[]
  setAssets: (assets: Asset[]) => void
  setLendingPositions: (positions: LendingPosition[]) => void
  setPoolPositions: (positions: PoolPosition[]) => void
  updateTotalValue: () => void
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  totalValue: 0,
  totalPnl: 0,
  assets: [],
  lendingPositions: [],
  poolPositions: [],
  setAssets: (assets) => set({ assets }),
  setLendingPositions: (lendingPositions) => set({ lendingPositions }),
  setPoolPositions: (poolPositions) => set({ poolPositions }),
  updateTotalValue: () => {
    const { assets, lendingPositions, poolPositions } = get()
    const assetValue = assets.reduce((sum, asset) => sum + asset.value, 0)
    const lendingValue = lendingPositions.reduce((sum, pos) => sum + (pos.supplied - pos.borrowed), 0)
    const poolValue = poolPositions.reduce((sum, pos) => sum + pos.liquidity, 0)
    set({ totalValue: assetValue + lendingValue + poolValue })
  },
}))