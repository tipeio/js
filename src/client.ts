import { HttpClient } from './http'
export class TipeClient {
  options: ITipeClientOptions
  http: HttpClient

  constructor(options: ITipeClientOptions) {
    this.options = options

    this.http = new HttpClient({
      endpoint: this.options.endpoint,
      project: this.options.project,
      apiKey: this.options.apiKey
    })
  }

  pageById(id: string, status?: string) {
    return this.http.post('/pageById', {id, status})
  }

  pageByParams(page: string, params: object) {
    return this.http.post('/pageByParams', {page, params})
  }
  pagesByType(page: string) {
    return this.http.post('/pagesByType', {page})
  }
}
