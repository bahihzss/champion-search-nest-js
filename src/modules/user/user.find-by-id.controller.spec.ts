import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { UserModule } from './user.module'
import { PrismaService } from '../../infra/shared/prisma.service'
import { initializeApp } from '../../shared/e2e-test'

describe('UserFindByIdController (e2e)', () => {
  let app: INestApplication

  const existsUser = {
    id: 'fAmMrvP65OMjx56xAHQv',
    name: 'Tanaka',
    email: 'tanaka@example.com',
  }

  beforeEach(async () => {
    app = await initializeApp([UserModule])

    const prisma = app.get<PrismaService>(PrismaService)
    await prisma.user.deleteMany({})
    await prisma.user.create({ data: existsUser })
  })

  it('/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/user/' + existsUser.id)
      .expect(200)
      .then((res) => {
        expect(res.body.statusCode).toBe(200)
        expect(res.body.item).toEqual(existsUser)
      })
  })

  it('/user/:id (GET) Not Found', () => {
    return request(app.getHttpServer()).get('/user/not-exist').expect(404)
  })
})
