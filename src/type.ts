export interface IDocumentListOptions {
  limit?: number
  status?: string
  template?: string
}

export interface IDocumentGetOptions {
  document?: string
  param?: string
  preview?: string
}

export interface ITipeOptions {
  key: string
  project: string
  domain?: string
  timeout?: number
}

export interface IFetchConfig {
  [key: string]: any
  param?: string
  preview?: string
  status?: string
  document?: string
  limit?: number
  template?: string
}

export type TipeFetcher = (
  restMethod: string,
  path: string,
  contentConfig: IFetchConfig,
  config: ITipeOptions
) => Promise<{[key: string]: any}>
