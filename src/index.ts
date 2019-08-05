import fetch from 'cross-fetch'
import {
  ITipeClientOptions,
  ITipeClientPageOptions,
  APIFetcher,
  // IGetPageByTipeIdOptions,
  IGetPageByIdOptions,
  IGetPagesByTemplate,
  IGetPagesByProjectId
} from './type'

// import stringify from 'fast-json-stable-stringify'

export default class Client {
  public static createClient = createClient
  public config: ITipeClientOptions

  constructor(config: ITipeClientOptions) {
    this.config = config
  }

  public getPagesByProjectId = (pageConfig: IGetPagesByProjectId, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    const projectId = this.config.project
    const { page, limit, status } = pageConfig
    const payload = {
      page,
      limit,
      status
    }
    console.log('TCL: Client -> payload', payload)

    return this.api(`POST`, `pagesByProjectId`, { projectId: this.config.project, page: payload.page, limit: payload.limit, status: payload.status  })
  }
  
  public getPageById = (pageConfig: IGetPageByIdOptions, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api('POST', 'pageById', pageConfig, options)
  }

  public getPageByParam = (pageConfig: ITipeClientPageOptions, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    return this.api(`POST`, `pageByParams`, {id: pageConfig.id, searchParam: pageConfig.searchParam, status: pageConfig.status}, options)
  }

  public getPagesByTemplate = (pageConfig: IGetPagesByTemplate, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api(`POST`, `pagesByTemplate`, pageConfig, options)
  }

  // public getPageByTipeId = (pageConfig: IGetPageByTipeIdOptions,  options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
  //   return this.api('POST', 'pageByTipeId', pageConfig, options)
  // }

  public api: APIFetcher = (restMethod = 'GET', path, contentConfig, fetchConfig) => {
    const config = {
      ...this.config,
      ...fetchConfig
    }

    const domain = config.domain || 'https://api.tipe.io'
    const url = `/api/${config.project}/${path}`
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: config.key
    }

    const options = {
      method: restMethod,
      headers,
      body: JSON.stringify(contentConfig),
      cache: 'no-cache',
      // timeout: config.timeout || 5000
    }

    return fetch(`${domain}${url}`, {
      method: restMethod,
      headers,
      body: JSON.stringify(contentConfig),
      cache: 'no-cache'
    })
  }
}

export function createClient (config: ITipeClientOptions) {
  return new Client(config)
}
