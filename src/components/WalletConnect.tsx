import { Button } from "@/components/ui/button"
import { Wallet, LogOut } from "lucide-react"
import { shortenAddress } from "@/lib/utils"
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-md">
          <Wallet className="h-4 w-4" />
          <span className="text-sm font-medium">{shortenAddress(address)}</span>
        </div>
        <Button variant="outline" size="sm" onClick={() => disconnect()}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <>
      {connectors.map((connector) => (
        <Button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="flex items-center gap-2"
        >
          <Wallet className="h-4 w-4" />
          连接钱包
        </Button>
      ))}
    </>
  )
}