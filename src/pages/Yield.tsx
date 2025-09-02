import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { TrendingUp, Zap, Target, Star } from "lucide-react"

const yieldOpportunities = [
  {
    protocol: "Cetus",
    strategy: "SUI/USDC 流动性挖矿",
    apy: 24.5,
    tvl: 12000000,
    risk: "中等",
    minDeposit: 100,
    rewards: ["CETUS", "SUI"]
  },
  {
    protocol: "Scallop",
    strategy: "SUI 借贷收益",
    apy: 15.2,
    tvl: 8500000,
    risk: "低",
    minDeposit: 50,
    rewards: ["SCA"]
  },
  {
    protocol: "Navi",
    strategy: "多资产借贷策略",
    apy: 18.7,
    tvl: 6200000,
    risk: "中等",
    minDeposit: 200,
    rewards: ["NAVX"]
  },
  {
    protocol: "Bucket",
    strategy: "稳定币套利",
    apy: 12.8,
    tvl: 4800000,
    risk: "低",
    minDeposit: 500,
    rewards: ["BUCK"]
  }
]

const optimizationSuggestions = [
  {
    title: "重新平衡投资组合",
    description: "将 20% 的 USDC 转移到 Cetus 流动性池以获得更高收益",
    impact: "+$234/月",
    difficulty: "简单"
  },
  {
    title: "优化借贷策略",
    description: "在 Scallop 增加 SUI 抵押，借入 USDC 参与高收益策略",
    impact: "+$156/月",
    difficulty: "中等"
  },
  {
    title: "收益复投",
    description: "自动将获得的奖励代币复投到原策略中",
    impact: "+$89/月",
    difficulty: "简单"
  }
]

export function Yield() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">收益优化</h1>
          <p className="text-muted-foreground mt-2">
            发现最佳收益机会，优化您的投资策略
          </p>
        </div>
        <Button>
          <Zap className="h-4 w-4 mr-2" />
          一键优化
        </Button>
      </div>

      {/* 收益概览 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              当前收益率
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12.4%</div>
            <div className="text-sm text-muted-foreground">年化收益率</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">月收益</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(1247)}</div>
            <div className="text-sm text-green-600">+18.5% vs 上月</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">优化潜力</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">+{formatCurrency(479)}</div>
            <div className="text-sm text-muted-foreground">月增收益潜力</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">活跃策略</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm text-muted-foreground">个收益策略</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-6">
        <TabsList>
          <TabsTrigger value="opportunities">收益机会</TabsTrigger>
          <TabsTrigger value="optimization">优化建议</TabsTrigger>
          <TabsTrigger value="strategies">我的策略</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-6">
          <div className="grid gap-4">
            {yieldOpportunities.map((opportunity, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="font-semibold text-sm">
                          {opportunity.protocol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{opportunity.strategy}</div>
                        <div className="text-sm text-muted-foreground">
                          {opportunity.protocol} • 风险: {opportunity.risk}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        {formatPercentage(opportunity.apy)}
                      </div>
                      <div className="text-sm text-muted-foreground">APY</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <div className="text-sm text-muted-foreground">TVL</div>
                      <div className="font-medium">{formatCurrency(opportunity.tvl)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">最小投入</div>
                      <div className="font-medium">{formatCurrency(opportunity.minDeposit)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">奖励代币</div>
                      <div className="font-medium">{opportunity.rewards.join(", ")}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">
                      <Star className="h-4 w-4 mr-2" />
                      参与策略
                    </Button>
                    <Button variant="outline">详情</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                智能优化建议
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {optimizationSuggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-lg">{suggestion.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {suggestion.description}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-sm font-medium text-green-600">
                            {suggestion.impact}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            难度: {suggestion.difficulty}
                          </span>
                        </div>
                      </div>
                      <Button size="sm">
                        执行
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategies" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>活跃策略</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>您还没有活跃的收益策略</p>
                <Button className="mt-4">
                  开始第一个策略
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}