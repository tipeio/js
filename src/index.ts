import fetch from 'cross-fetch'
import {
  ITipeOptions,
  TipeFetcher,
  IDocumentListOptions,
  IDocumentGetOptions,
  IPostListOptions,
  IPostGetOptions,
  IDocumentUpdateOptions,
  IDocumentCreateOptions
} from './type'

const fetcher: TipeFetcher = async (method = 'POST', path, contentConfig, config) => {
  let domain = config.domain || 'https://api.tipe.io'

  if (config.offline) {
    const port = config.port || 8300
    domain = `http://localhost:${port}`
  }

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
      if (options.id) {
        return fetcher('POST', 'documentById', options, config)
      } else if (options.ids) {
        return fetcher('POST', 'documentsByIds', options, config)
      } else if (options.preview) {
        return fetcher('POST', 'documentForPreview', options, config)
      } else if (options.sku) {
        return fetcher('POST', 'documentBySku', options, config)
      }

      throw new Error('Must supply a document id, preview id, or document sku')
    },
    update(options: IDocumentUpdateOptions) {
      return fetcher('PUT', 'updateDocument', options, config)
    },
    create(options: IDocumentCreateOptions) {
      return fetcher('POST', 'createDocument', options, config)
    }
  },
  post: {
    list(options?: IPostListOptions) {
      const o = options || {}
      return fetcher('POST', 'postsByProjectId', o, config)
    },
    get(options?: IPostGetOptions) {
      const o = options || {}
      if (o.preview) {
        return fetcher('POST', 'postForPreview', o, config)
      } else if (o.id) {
        return fetcher('POST', 'postById', o, config)
      }
      throw new Error('Must supply a post id or preview id')
    }
  },
  status: {
    draft: 'DRAFT',
    published: 'PUBLISHED'
  }
})
