# @tipe/js

Tipe client for JavaScript and Node.js

```js
// esm
import Tipe from '@tipe/js'
const tipe = Tipe({ key: 'api-key', project: 'project-id' })

// cjs
const tipe = require('@tipe/js')({ key: 'api-key', project: 'project-id' })

tipe.document.list().then(results => {
  console.log(results)
})

tipe.document
  .list({ template: 'home', status: tipe.status.draft })
  .then(results => {
    console.log(results)
  })

tipe.document.get({ document: 'document-id' }).then(result => {
  console.log(result)
})
```
