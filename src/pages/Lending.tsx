import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { LendingPositions } from "@/components/LendingPositions"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import { AlertTriangle, Shield, TrendingUp, Bell } from "lucide-react"

const riskAlerts = [
  {
    id: 1,
    type: "warning",
    protocol: "Navi",
    asset: "USDC",
    message: "健康度接近清算线，建议增加抵押或减少借贷",
    healthFactor: 1.9,
    action: "立即处理"
  },
  {
    id: 2,
    type: "info", 
    protocol: "Scallop",
    asset: "SUI",
    message: "利率上升，当前借贷成本增加 0.5%",
    healthFactor: 2.8,
    action: "查看详情"
  }
]

export function Lending() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">借贷监控</h1>
          <p className="text-muted-foreground mt-2">
            实时监控借贷位置，预防清算风险
          </p>
        </div>
        <Button>
          <Bell className="h-4 w-4 mr-2" />
          风险提醒设置
        </Button>
      </div>

      {/* 风险警报 */}
      {riskAlerts.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              风险警报
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.type === 'warning' ? 'bg-red-500' : 'bg-yellow-500'
                    }`} />
                    <div>
                      <div className="font-medium text-sm">
                        {alert.protocol} - {alert.asset}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {alert.message}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-sm font-medium">健康度: {alert.healthFactor}</div>
                    </div>
                    <Button size="sm" variant={alert.type === 'warning' ? 'destructive' : 'outline'}>
                      {alert.action}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 总体风险概览 */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              总体健康度
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">2.45</div>
            <div className="text-sm text-muted-foreground">安全范围</div>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">总借贷价值</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(9200)}</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              利用率 61.3%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">平均借贷利率</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(12.2)}</div>
            <div className="text-sm text-muted-foreground">加权平均</div>
          </CardContent>
        </Card>
      </div>

      {/* 借贷位置详情 */}
      <LendingPositions />

      {/* 快速操作 */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2">
              <Shield className="h-6 w-6" />
              一键还款
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <TrendingUp className="h-6 w-6" />
              增加抵押
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <AlertTriangle className="h-6 w-6" />
              风险分析
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Bell className="h-6 w-6" />
              设置提醒
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}