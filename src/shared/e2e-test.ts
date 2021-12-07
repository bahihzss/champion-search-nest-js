import { Test, TestingModule } from '@nestjs/testing'
import { ValidationPipe } from '@nestjs/common'
import { Type } from '@nestjs/common/interfaces/type.interface'
import { DynamicModule } from '@nestjs/common/interfaces/modules/dynamic-module.interface'
import { ForwardReference } from '@nestjs/common/interfaces/modules/forward-reference.interface'

type Module = Type | DynamicModule | Promise<DynamicModule> | ForwardReference

export const initializeApp = async (TargetModules: Array<Module>) => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: TargetModules,
  }).compile()

  const app = moduleFixture.createNestApplication()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  await app.init()

  return app
}
