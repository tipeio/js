export interface IDocumentListOptions {
  page?: number
  limit?: number
  status?: string
  template?: string
}

export interface IPostListOptions {
  page?: number
  limit?: number
  status?: string
  skuIds?: [string]
}

export interface IPostGetOptions {
  id?: string
  preview?: string
  status?: string
}

export interface IDocumentGetOptions {
  id?: string
  skuId?: string
  preview?: string
  template?: string
  status?: string
}

export interface IDocumentCreateOptions {
  name: string
  template: string
  skuId?: string
  fields?: object
  refs?: object
}

export interface IDocumentUpdateOptions {
  name: string
  skuId?: string
  fields?: object
  refs?: object
}

export interface ITipeOptions {
  key: string
  project: string
  domain?: string
  timeout?: number
  offline?: boolean
  port?: number
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
