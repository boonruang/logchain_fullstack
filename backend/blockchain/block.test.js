const Block = require('./block')

describe('Block', () => {
  beforeEach(() => {
    data = {
      user: 'สมศักดิ์ แสนจันทร์ศรี',
      action: 'กรอกแบบฟอร์ม รง.9',
      api: '/api/form8',
      login: '2022-5-19 12:05:29.751',
      logout: '2022-5-19 12:25:29.751',
    }
    lastBlock = Block.genesis()
    block = Block.mineBlock(lastBlock, data)
  })

  it('sets the `data` to match the input ', () => {
    expect(block.data).toEqual(data)
  })

  it('sets the `lasthash` to match the hash of the last block', () => {
    expect(block.lastHash).toEqual(lastBlock.hash)
  })
})
