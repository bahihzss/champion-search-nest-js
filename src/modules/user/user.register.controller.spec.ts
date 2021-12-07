import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { UserModule } from './user.module'
import { PrismaService } from '../../infra/shared/prisma.service'
import { initializeApp } from '../../shared/e2e-test'

describe('UserRegisterController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    app = await initializeApp([UserModule])

    const prisma = app.get<PrismaService>(PrismaService)
    await prisma.user.deleteMany({})
  })

  it('/user (POST)', () => {
    const postData = {
      name: 'Tanaka',
      email: 'tanaka@example.com',
    }

    return request(app.getHttpServer())
      .post('/user')
      .send(postData)
      .expect(201)
      .then((res) => {
        expect(res.body.statusCode).toBe(201)
        expect(res.body.item.id).toMatch(/^[a-zA-Z0-9]{20}$/)
        expect(res.body.item).toEqual(expect.objectContaining(postData))
      })
  })

  it('/user (POST) バリデーション', () => {
    const invalidPostData = {
      name: 'Tanaka',
      email: '',
    }

    return request(app.getHttpServer())
      .post('/user')
      .send(invalidPostData)
      .expect(400)
  })
})
