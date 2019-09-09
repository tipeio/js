import Tipe from '../src'
// import stringify from 'fast-json-stable-stringify'
// import fetch from 'cross-fetch'
jest.mock('cross-fetch');

describe('Tipe', () => {
  describe('client', () => {
    test('should work', () => {
      expect(Tipe).not.toBe(undefined)
    })
    test('should create tipe client', () => {
      const tipe = Tipe({key: 'asdf', project: 'sdaf'})
      expect(tipe.document).toBeTruthy()
    })
  })
})
