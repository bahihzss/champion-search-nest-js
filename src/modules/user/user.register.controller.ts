import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common'
import { User } from '../../domain/user/user.entity'
import { UserRepository } from '../../domain/user/user.repository'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterUserDto {
  @IsNotEmpty()
  readonly name: string

  @IsEmail()
  readonly email: string
}

@Controller('user')
export class UserRegisterController {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() registerUserDto: RegisterUserDto) {
    const user = User.create(registerUserDto)

    await this.userRepository.save(user)

    return {
      statusCode: HttpStatus.CREATED,
      item: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    }
  }
}
