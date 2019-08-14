import fetch from 'cross-fetch'
import {
  ITipeClientOptions,
  IGetPageByParam,
  APIFetcher,
  IGetPageByIdOptions,
  IGetPagesByTemplate,
  IGetPagesByProjectId
  // IGetPageByTipeIdOptions,
} from './type'

// import stringify from 'fast-json-stable-stringify'

export default class Client {
  public static createClient = createClient
  public config: ITipeClientOptions

  constructor(config: ITipeClientOptions) {
    this.config = config
  }

  public getPagesByProjectId = (pageConfig: IGetPagesByProjectId, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    const { page, limit, status } = pageConfig
    const payload = {
      page,
      limit,
      status
    }

    return this.api(`POST`, `pagesByProjectId`, { projectId: this.config.project, page: payload.page, limit: payload.limit, status: payload.status  })
  }

  public getPagesByTemplate = (pageConfig: IGetPagesByTemplate, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api(`POST`, `pagesByTemplate`, pageConfig, options)
  }
  
  public getPageById = (pageConfig: IGetPageByIdOptions, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api('POST', 'pageById', pageConfig, options)
  }

  public getPageByParam = (pageConfig: IGetPageByParam, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    return this.api(`POST`, `pageByParam`, pageConfig, options)
  }

  public api: APIFetcher = async (method = 'GET', path, contentConfig, fetchConfig) => {
    const config = {
      ...this.config,
      ...fetchConfig
    }

    const domain = config.domain || 'https://beta-api.tipe.io'
    const url = `/api/${config.project}/${path}`
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: config.key
    }

    try {
      const res = await fetch(`${domain}${url}`, {
        method,
        headers,
        body: JSON.stringify(contentConfig),
        cache: 'no-cache'
      })
      
      if (res.status >= 400) {
        throw new Error('Bad request')
      }

      return res.json()

    } catch (err) {
      console.error(err)
    }
  }
}

export function createClient (config: ITipeClientOptions) {
  return new Client(config)
}
