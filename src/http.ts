import fetch from 'cross-fetch'
import urlJoin from 'url-join'

export class HttpClient {
  public options: IHttpClientOptions
  public root: string
  public auth: object

  constructor(options: IHttpClientOptions) {
    this.options = options
    this.auth = { Authorization: this.options.apiKey }

    const root = this.options.endpoint || 'https://api.tipe.io'
    this.root = urlJoin(root, this.options.project)
  }

  private fetch(options: IFetchOptions): Promise<any> {
    const body = options.body || {}
    const config: RequestInit = {
      method: options.method,
      mode: 'cors',
      headers: (options.headers || {}) as Headers,
      body: JSON.stringify(body)
    }

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

  public post(path: string, body: object): Promise<any> {
    const fullPath = urlJoin(this.root, path)
    return this.fetch({
      body,
      url: fullPath,
      headers: { ...this.auth },
      method: 'POST'
    })
  }
}
