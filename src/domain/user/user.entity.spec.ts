import { User } from './user.entity'

describe('User', () => {
  const createArgs = {
    name: 'Tanaka',
    email: 'tanaka@example.com',
  }

  it('作成すると、正しいインスタンスが返ってくる', () => {
    const user = User.create(createArgs)

    expect(user).toBeInstanceOf(User)
    expect(user).toEqual(expect.objectContaining(createArgs))
  })

  it('update に更新したい値を渡すと、渡した値が変更された新しいインスタンスが生成される', () => {
    const user = User.create(createArgs)

    const updatedUser = user.update({ name: 'Yamada' })

    expect(updatedUser.name).toBe('Yamada')
  })
})
