// env.d.ts
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // можешь добавить другие переменные, если нужно
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
