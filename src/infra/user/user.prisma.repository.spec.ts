import { User } from '../../domain/user/user.entity'
import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../shared/prisma.service'
import { UserPrismaRepository } from './user.prisma.repository'

describe('UserPrismaRepository', () => {
  let userRepository: UserPrismaRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, UserPrismaRepository],
    }).compile()

    userRepository = app.get<UserPrismaRepository>(UserPrismaRepository)

    const prisma = app.get<PrismaService>(PrismaService)
    await prisma.user.deleteMany({})
  })

  const createdUser = User.create({
    name: 'Tanaka',
    email: 'tanaka@example.com',
  })

  test('save で追加したものを findBy で取得できる', async () => {
    await userRepository.save(createdUser)
    const foundUser = await userRepository.findById(createdUser.id)

    expect(foundUser).toStrictEqual(createdUser)
  })
})
