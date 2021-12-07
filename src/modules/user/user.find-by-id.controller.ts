import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
} from '@nestjs/common'
import { UserRepository } from '../../domain/user/user.repository'

@Controller('user')
export class UserFindByIdController {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  @Get(':id')
  async handle(@Param('id') id: string) {
    const user = await this.userRepository.findById(id)

    if (user === null) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_FOUND,
          error: 'Not Found',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return {
      statusCode: HttpStatus.OK,
      item: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
