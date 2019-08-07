# @tipe/js
Tipe client for JavaScript and Node.js

```js
// esm
import { createClient } from '@tipe/js'

// cjs
const { createClient } = require('@tipe/js')

const tipe = createClient({
  project: 'projectId',
  key: 'projectKey'
})

tipe.getPagesByProjectId({ page: 1, limit: 10, status: 'DRAFT' })
.then(data => {
  // data = []
  console.log(data)
})

tipe.getPagesByTemplate({ id: 'blog', page: 1, limit: 10, status: 'PUBLISHED' })
.then(data => {
  // data = []
  console.log(data)
})

tipe.getPageById({ id: 'abc123', status: 'PUBLISHED' })
.then(data => {
  // data = []
  console.log(data)
})

tipe.getPageByParam({ searchParam: 'blog-1-get-tipe', id: 'blog', status: 'PUBLISHED' })
.then(data => {
  // data = []
  console.log(data)
})

```
