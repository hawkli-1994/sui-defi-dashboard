import { PortfolioOverview } from "@/components/PortfolioOverview"
import { AssetList } from "@/components/AssetList"
import { LendingPositions } from "@/components/LendingPositions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area } from 'recharts'

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
      {/* Header Section */}
      <div className="animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight">
          DeFi 投资组合<span className="text-gradient">总览</span>
        </h1>
        <p className="text-muted-foreground mt-3 text-lg">
          管理您的 Sui 生态 DeFi 投资，实时监控风险和收益
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="animate-slide-up animate-delay-100">
        <PortfolioOverview />
      </div>

      {/* Chart and Assets Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="hover-lift animate-slide-up animate-delay-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              投资组合价值趋势
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockChartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis 
                    dataKey="date" 
                    className="text-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    className="text-muted-foreground"
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.75rem',
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`, '投资组合价值']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    fill="url(#colorValue)"
                    dot={{ 
                      fill: 'hsl(var(--primary))',
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{ 
                      r: 6,
                      stroke: 'hsl(var(--primary))',
                      strokeWidth: 2,
                      fill: 'hsl(var(--background))',
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 animate-slide-up animate-delay-300">
          <AssetList />
        </div>
      </div>

      {/* Lending Positions */}
      <div className="animate-slide-up animate-delay-300">
        <LendingPositions />
      </div>
    </div>
  )
}