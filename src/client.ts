import { HttpClient } from './http'
export class TipeClient {
  public options: ITipeClientOptions
  public http: HttpClient

  constructor(options: ITipeClientOptions) {
    this.options = options

    this.http = new HttpClient({
      endpoint: this.options.endpoint,
      project: this.options.project,
      apiKey: this.options.apiKey
    })
  }

  public pageById(id: string, status?: string): Promise<any> {
    return this.http.post('/pageById', { id, status })
  }

  public pageByParams(page: string, params: object): Promise<any> {
    return this.http.post('/pageByParams', { page, params })
  }
  public pagesByType(page: string): Promise<any> {
    return this.http.post('/pagesByType', { page })
  }
}
