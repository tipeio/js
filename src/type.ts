export interface IGetPagesByTypeOptions {
  name: string
  status?: string
}

export interface IGetPageByIdOptions {
  id: string
}

export interface IGetPagesByParamsOptions {
  name: string
  routeParams: {
    k: string
    v: string
  }
  status?: string
}

export interface IGetPageByTipeIdOptions {
  id: string
}

export interface ITipeClientPageOptions {
  name: string
  status?: string,
  routeParams?: {
    k: string
    v: string
  }
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
  page?: string
}

export interface IGetPagesByTemplate {
  template: string
}

export type APIFetcher = (
  restMethod: string,
  path: string,
  contentConfig: IFetchConfig,
  fetchConfig?: ITipeClientOptions
) => Promise<{[key: string]: any}>