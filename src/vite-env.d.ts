/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLETCONNECT_PROJECT_ID?: string
  // More env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}