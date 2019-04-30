import { TipeClient } from './client'

const createClient = (options: ITipeClientOptions) => new TipeClient(options)
export default createClient
