export interface IGetPagesByTypeOptions {
  name: string
  status?: string
}

export interface IGetPageByIdOptions {
  id: string
}

export interface IGetPagesByParamsOptions {
  name: string
  searchParam: string
  status?: string
}

export interface IGetPageByTipeIdOptions {
  id: string
}

export interface ITipeClientPageOptions {
  id: string
  status?: string,
  searchParam?: string
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
}

export interface IGetPagesByTemplate {
  id: string
  status?: string
}

export interface IGetPagesByProjectId {
  limit?: number
  page?: number
  status?: string
}

export type APIFetcher = (
  restMethod: string,
  path: string,
  contentConfig: IFetchConfig,
  fetchConfig?: ITipeClientOptions
) => Promise<{[key: string]: any}>
