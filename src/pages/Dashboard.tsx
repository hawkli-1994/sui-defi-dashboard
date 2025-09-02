import { PortfolioOverview } from "@/components/PortfolioOverview"
import { AssetList } from "@/components/AssetList"
import { LendingPositions } from "@/components/LendingPositions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockChartData = [
  { date: '1/1', value: 100000 },
  { date: '1/2', value: 102000 },
  { date: '1/3', value: 98000 },
  { date: '1/4', value: 105000 },
  { date: '1/5', value: 108000 },
  { date: '1/6', value: 112000 },
  { date: '1/7', value: 125420 },
]

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">DeFi 投资组合总览</h1>
        <p className="text-muted-foreground mt-2">
          管理您的 Sui 生态 DeFi 投资，实时监控风险和收益
        </p>
      </div>

      <PortfolioOverview />

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>投资组合价值趋势</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '投资组合价值']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <AssetList />
        </div>
      </div>

      <LendingPositions />
    </div>
  )
}