import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePortfolioStore } from "@/store/usePortfolioStore"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react"

export function PortfolioOverview() {
  const { totalValue, totalPnl, assets, lendingPositions } = usePortfolioStore()

  const totalAssets = assets.length
  // const activeLending = lendingPositions.length
  const avgHealthFactor = lendingPositions.length > 0 
    ? lendingPositions.reduce((sum, pos) => sum + pos.healthFactor, 0) / lendingPositions.length 
    : 0

  const stats = [
    {
      title: "总资产价值",
      value: formatCurrency(totalValue || 125420),
      change: "+12.5%",
      icon: DollarSign,
      positive: true
    },
    {
      title: "24小时收益",
      value: formatCurrency(totalPnl || 2340),
      change: "+1.9%",
      icon: TrendingUp,
      positive: true
    },
    {
      title: "资产数量",
      value: totalAssets.toString() || "8",
      change: "+2",
      icon: Activity,
      positive: true
    },
    {
      title: "平均健康度",
      value: avgHealthFactor.toFixed(2) || "2.45",
      change: avgHealthFactor > 2 ? "安全" : "警告",
      icon: avgHealthFactor > 2 ? TrendingUp : TrendingDown,
      positive: avgHealthFactor > 2
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className={`text-xs flex items-center gap-1 ${
                stat.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.positive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}