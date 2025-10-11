/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // adicione mais variáveis conforme necessário
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}