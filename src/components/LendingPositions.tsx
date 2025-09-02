import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { usePortfolioStore } from "@/store/usePortfolioStore"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { AlertTriangle, Shield, TrendingUp } from "lucide-react"

export function LendingPositions() {
  const { lendingPositions } = usePortfolioStore()

  // 模拟数据
  const mockPositions = lendingPositions.length > 0 ? lendingPositions : [
    {
      id: "1",
      protocol: "Scallop",
      asset: "SUI",
      supplied: 5000,
      borrowed: 2000,
      apy: 8.5,
      healthFactor: 2.8,
      liquidationThreshold: 0.8
    },
    {
      id: "2", 
      protocol: "Navi",
      asset: "USDC",
      supplied: 10000,
      borrowed: 6000,
      apy: 12.3,
      healthFactor: 1.9,
      liquidationThreshold: 0.85
    },
    {
      id: "3",
      protocol: "Bucket",
      asset: "WETH",
      supplied: 3000,
      borrowed: 1200,
      apy: 15.7,
      healthFactor: 3.2,
      liquidationThreshold: 0.75
    }
  ]

  const getHealthColor = (healthFactor: number) => {
    if (healthFactor > 2.5) return "text-green-600"
    if (healthFactor > 1.5) return "text-yellow-600"
    return "text-red-600"
  }

  const getHealthIcon = (healthFactor: number) => {
    if (healthFactor > 2.5) return Shield
    if (healthFactor > 1.5) return AlertTriangle
    return AlertTriangle
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          借贷位置监控
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockPositions.map((position) => {
            const HealthIcon = getHealthIcon(position.healthFactor)
            const utilizationRate = (position.borrowed / position.supplied) * 100
            
            return (
              <div key={position.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold">{position.asset}</span>
                    </div>
                    <div>
                      <div className="font-medium">{position.protocol}</div>
                      <div className="text-sm text-muted-foreground">{position.asset} 池</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <HealthIcon className={`h-4 w-4 ${getHealthColor(position.healthFactor)}`} />
                      <span className={`font-medium ${getHealthColor(position.healthFactor)}`}>
                        {position.healthFactor.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">健康度</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">供应</div>
                    <div className="font-medium">{formatCurrency(position.supplied)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">借贷</div>
                    <div className="font-medium">{formatCurrency(position.borrowed)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">APY</div>
                    <div className="font-medium text-green-600 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {formatPercentage(position.apy)}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>利用率</span>
                    <span>{utilizationRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={utilizationRate} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    调整仓位
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    还款
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}