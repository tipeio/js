import fetch from 'cross-fetch'
import {
  ITipeOptions,
  TipeFetcher,
  IDocumentListOptions,
  IDocumentGetOptions
} from './type'

const fetcher: TipeFetcher = async (method = 'POST', path, contentConfig, config) => {
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

    const data = await res.json()
    return data.data

  } catch (err) {
    console.error(err)
  }
}

export default (config: ITipeOptions) => ({
  document: {
    list(options?: IDocumentListOptions) {
      const o = options || {}
      
      if (o.template) {
        return fetcher('POST', 'documentsByTemplate', o, config)
      }

      return fetcher('POST', 'documentsByProjectId', o, config)
    },
    get(options: IDocumentGetOptions) {
      if (options.document) {
        return fetcher('POST', 'documentById', {document: options.document}, config)
      } else if (options.param) {
        return fetcher('POST', 'documentByParam', {param: options.param}, config)
      } else if (options.preview) {
        return fetcher('POST', 'documentForPreview', {preview: options.preview}, config)
      }

      throw new Error('Must supply a document id, preview id, or document param')
    }
  },
  post: {
    list() {
      return 'hello'
    },
    get() {
      return 'hello'
    }
  },
  status: {
    draft: 'DRAFT',
    published: 'PUBLISHED'
  }
})
