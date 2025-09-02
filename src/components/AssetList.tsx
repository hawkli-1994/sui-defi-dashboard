import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { usePortfolioStore } from "@/store/usePortfolioStore"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { TrendingUp, TrendingDown, ExternalLink } from "lucide-react"

export function AssetList() {
  const { assets } = usePortfolioStore()

  // 模拟数据
  const mockAssets = assets.length > 0 ? assets : [
    {
      symbol: "SUI",
      name: "Sui",
      balance: 1250.5,
      value: 2501.0,
      price: 2.0,
      change24h: 5.2,
      protocol: "Native"
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      balance: 15000,
      value: 15000,
      price: 1.0,
      change24h: 0.1,
      protocol: "Circle"
    },
    {
      symbol: "WETH",
      name: "Wrapped Ethereum",
      balance: 2.5,
      value: 6250,
      price: 2500,
      change24h: -2.1,
      protocol: "Wormhole"
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      balance: 8500,
      value: 8500,
      price: 1.0,
      change24h: -0.05,
      protocol: "Tether"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          资产列表
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            查看详情
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockAssets.map((asset) => (
            <div key={asset.symbol} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-sm">{asset.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-sm text-muted-foreground">{asset.protocol}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium">{asset.balance.toLocaleString()} {asset.symbol}</div>
                <div className="text-sm text-muted-foreground">{formatCurrency(asset.value)}</div>
              </div>
              
              <div className="text-right">
                <div className="font-medium">{formatCurrency(asset.price)}</div>
                <div className={`text-sm flex items-center gap-1 ${
                  asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {asset.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {formatPercentage(asset.change24h)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}