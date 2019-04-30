interface ITipeClientOptions {
  endpoint?: string
  apiKey: string
  project: string
}

interface IHttpClientOptions {
  endpoint?: string
  apiKey: string
  project: string
}

interface IFetchOptions {
  url: string
  method: string
  headers?: object
  body?: object
}
