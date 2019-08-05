import Tipe, { createClient } from '../src'
import stringify from 'fast-json-stable-stringify'
import fetch from 'cross-fetch'
jest.mock('cross-fetch');

describe('Tipe', () => {
  describe('client', () => {
    test('should work', () => {
      expect(Tipe).not.toBe(undefined)
    })
    test('should createClient', () => {
      let tipe = createClient({key: 'asdf', project: 'sdaf'})
      expect(tipe instanceof Tipe).toBe(true)

      tipe = new Tipe({key: 'asdf', project: 'sdaf'})
      expect(tipe instanceof Tipe).toBe(true)
    })
  })

  describe('pages by project id', () => {
    test('calls api with correct args', async () => {
      const projectId = 'asdf'
      const options = {key: '1', project: projectId}
      const pageConfig = { page: 1, limit: 5, status: 'DRAFT' }
      const tipe = new Tipe(options)
      const expectedResults = {data: {}}
      tipe.api = jest.fn().mockResolvedValue(expectedResults)

      const results = await tipe.getPagesByProjectId(pageConfig)

      expect(tipe.api).toHaveBeenNthCalledWith(1, `POST`, `pagesByProjectId`, { ...pageConfig, projectId })
      expect(results).toBe(expectedResults)
    })
  })

  describe('page by params', () => {
    test('calls api with correct args', async ()=> {
      const options = { key: '1', project: '12' }
      const pageConfig = {id: 'home', searchParam: 'home-123', status: 'DRAFT'}
      const tipe = new Tipe(options)
      const expectedResults = { data: {} }
      
      tipe.api = jest.fn().mockResolvedValue(expectedResults)
      
      const results = await tipe.getPageByParam(pageConfig, options)
      
      expect(tipe.api).toHaveBeenNthCalledWith(1, `POST`, `pageByParam`, {id: 'home', searchParam: 'home-123', status: 'DRAFT'}, options)
      expect(results).toBe(expectedResults)
    })
  })
  
  describe('pages by template', () => {
    test('calls api with correct args', async ()=> {
      const options = {key: 'fakesecret', project: 'fakeproj'}
      const pageConfig = {id: 'home', status: 'DRAFT'}
      const tipe = new Tipe(options)
      const expectedResults = { data: {} }
      
      tipe.api = jest.fn().mockResolvedValue(expectedResults)
      
      const results = await tipe.getPagesByTemplate(pageConfig, options)
      
      expect(tipe.api).toHaveBeenNthCalledWith(1, `POST`, `pagesByTemplate`, pageConfig , options)
      expect(results).toBe(expectedResults)
    })
  })

  describe('api', () => {
    test('formats the correct request', async () => {
      const path = 'getPageBySomething'
      const params = {fields: {name: 'Jason'}}
      const config = {key: 'key', project: 'project123'}
      const tipe = new Tipe(config)
      
      await tipe.api('GET', path, params, config)
      const body = stringify(params)

      expect(fetch).toHaveBeenNthCalledWith(1, `https://api.tipe.io/api/${config.project}/${path}`, {
        body,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: config.key
        },
        cache: 'no-cache'
      })
    })
  })

    // describe('page by id', () => {
  //   test('calls api with correct args', async () => {
  //     const projectId = '12'
  //     const options = {key: '1', project: projectId}
  //     const tipe = new Tipe(options)
  //     const expectedResults = {data: {}}
  //     tipe.api = jest.fn().mockResolvedValue(expectedResults)
  
  //     const id = 'the_id'
  //     const results = await tipe.getPageById({id}, options)
  
  //     expect(tipe.api).toHaveBeenNthCalledWith(1, `POST`, `pageById`, {id}, options)
  //     expect(results).toBe(expectedResults)
  //   })
  // })
})
