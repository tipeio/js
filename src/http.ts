import fetch from 'cross-fetch'
import urlJoin from 'url-join'

export class HttpClient {
  options: IHttpClientOptions
  root: string
  auth: object

  constructor(options: IHttpClientOptions) {
    this.options = options
    this.auth = {Authorization: this.options.apiKey}

    const root = this.options.endpoint || 'https://api.tipe.io'
    this.root = urlJoin(root, this.options.project)
  }

  private fetch(options: IFetchOptions) {
    const body = options.body || {}
    const config = {
      method: options.method,
      mode: 'cors',
      headers: options.headers || {},
      body: JSON.stringify(body)
    } as RequestInit

    return fetch(options.url, config)
    .then(r => {
      if (!r.ok) {
        throw Error(r.statusText)
      }
      return r
    })
    .then(r => r.json())
    .then(r => r.data)
  }

  post(path: string, body: object) {
    const fullPath = urlJoin(this.root, path)
    return this.fetch({
      body,
      url: fullPath,
      headers: {...this.auth},
      method: 'POST'
    })
  }  
}
