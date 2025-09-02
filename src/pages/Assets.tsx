import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AssetList } from "@/components/AssetList"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { Plus, ArrowUpDown, Filter } from "lucide-react"

const protocolData = [
  { name: "Scallop", tvl: 45000000, apy: 8.5, assets: 4 },
  { name: "Navi", tvl: 32000000, apy: 12.3, assets: 6 },
  { name: "Bucket", tvl: 28000000, apy: 15.7, assets: 3 },
  { name: "Cetus", tvl: 22000000, apy: 18.2, assets: 8 },
]

export function Assets() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">资产管理</h1>
          <p className="text-muted-foreground mt-2">
            管理您在各个协议中的资产配置
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            筛选
          </Button>
          <Button variant="outline">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            排序
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            添加资产
          </Button>
        </div>
      </div>

      <Tabs defaultValue="assets" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assets">我的资产</TabsTrigger>
          <TabsTrigger value="protocols">协议概览</TabsTrigger>
          <TabsTrigger value="opportunities">投资机会</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-6">
          <AssetList />
        </TabsContent>

        <TabsContent value="protocols" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {protocolData.map((protocol) => (
              <Card key={protocol.name}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{protocol.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">TVL</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(protocol.tvl)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">平均 APY</span>
                    <span className="text-sm font-medium text-green-600">
                      {formatPercentage(protocol.apy)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">支持资产</span>
                    <span className="text-sm font-medium">{protocol.assets}</span>
                  </div>
                  <Button className="w-full mt-4" variant="outline" size="sm">
                    查看详情
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>高收益机会</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { protocol: "Cetus", pair: "SUI/USDC", apy: 24.5, risk: "中等" },
                  { protocol: "Turbos", pair: "WETH/USDT", apy: 19.8, risk: "高" },
                  { protocol: "Scallop", pair: "SUI 借贷", apy: 15.2, risk: "低" },
                ].map((opportunity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="font-medium">{opportunity.protocol}</div>
                      <div className="text-sm text-muted-foreground">{opportunity.pair}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-green-600">
                        {formatPercentage(opportunity.apy)} APY
                      </div>
                      <div className="text-sm text-muted-foreground">
                        风险: {opportunity.risk}
                      </div>
                    </div>
                    <Button size="sm">参与</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}