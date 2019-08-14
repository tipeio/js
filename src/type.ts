export interface IGetPagesByProjectId {
  page?: number
  limit?: number
  status?: string
}

export interface IGetPageByIdOptions {
  id: string
}

export interface IGetPageByParam {
  id: string
  searchParam: string
  status?: string
}

export interface IGetPageForPreview {
  id: string
  searchParam?: string
  template?: string
}

export interface IGetPagesByTemplate {
  id: string
  page?: number
  limit?: number
  status?: string
}

export interface ITipeClientOptions {
  key: string
  project: string
  domain?: string
  timeout?: number
}

export interface ITipeParams {
  [key: string]: string
}

export interface IFetchConfig {
  [key: string]: any
  status?: string
  page?: number
  limit?: number
}

export type APIFetcher = (
  restMethod: string,
  path: string,
  contentConfig: IFetchConfig,
  fetchConfig?: ITipeClientOptions
) => Promise<{[key: string]: any}>
