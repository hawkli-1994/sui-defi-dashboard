import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { formatCurrency } from "@/lib/utils"
import { TrendingUp, Calendar, BarChart3 } from "lucide-react"

const portfolioHistory = [
  { date: '12/1', value: 95000, pnl: -2000 },
  { date: '12/8', value: 98000, pnl: 1000 },
  { date: '12/15', value: 102000, pnl: 4000 },
  { date: '12/22', value: 108000, pnl: 6000 },
  { date: '12/29', value: 112000, pnl: 4000 },
  { date: '1/5', value: 118000, pnl: 6000 },
  { date: '1/12', value: 125420, pnl: 7420 },
]

const protocolAllocation = [
  { name: 'Scallop', value: 35, amount: 43897 },
  { name: 'Navi', value: 28, amount: 35118 },
  { name: 'Cetus', value: 20, amount: 25084 },
  { name: 'Bucket', value: 17, amount: 21321 },
]

const monthlyReturns = [
  { month: '8月', return: 8.5 },
  { month: '9月', return: -2.1 },
  { month: '10月', return: 12.3 },
  { month: '11月', return: 15.7 },
  { month: '12月', return: 9.8 },
  { month: '1月', return: 18.2 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">历史分析</h1>
          <p className="text-muted-foreground mt-2">
            深入分析您的投资表现和历史数据
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border rounded-md">
            <Calendar className="h-4 w-4" />
            最近30天
          </button>
        </div>
      </div>

      {/* 关键指标 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">总收益率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+25.42%</div>
            <div className="text-sm text-muted-foreground">自开始以来</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">最大回撤</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-5.2%</div>
            <div className="text-sm text-muted-foreground">历史最大</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">夏普比率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.85</div>
            <div className="text-sm text-muted-foreground">风险调整收益</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">胜率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <div className="text-sm text-muted-foreground">盈利交易占比</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">收益表现</TabsTrigger>
          <TabsTrigger value="allocation">资产配置</TabsTrigger>
          <TabsTrigger value="returns">月度收益</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                投资组合价值变化
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'value' ? formatCurrency(Number(value)) : formatCurrency(Number(value)),
                        name === 'value' ? '投资组合价值' : '损益'
                      ]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="value"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pnl" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="pnl"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>协议分配</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={protocolAllocation}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {protocolAllocation.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, '占比']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>协议详情</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {protocolAllocation.map((protocol, index) => (
                    <div key={protocol.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="font-medium">{protocol.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(protocol.amount)}</div>
                        <div className="text-sm text-muted-foreground">{protocol.value}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="returns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                月度收益率
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyReturns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${Number(value).toFixed(1)}%`, '月收益率']}
                    />
                    <Bar 
                      dataKey="return" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}