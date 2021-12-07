import { randomId } from '../../shared/entity'

export interface UserCreateArgs {
  email: string
  name: string
}

export interface UserReconstructArgs extends UserCreateArgs {
  id: string
}

export type UserUpdateArgs = Partial<UserCreateArgs>

export class User {
  private constructor(
    readonly id: string,
    readonly email: string,
    readonly name: string,
  ) {}

  static create(args: UserCreateArgs) {
    return User.reconstruct({ ...args, id: randomId() })
  }

  static reconstruct({ id, email, name }: UserReconstructArgs) {
    return new User(id, email, name)
  }

  update(args: UserUpdateArgs) {
    return User.reconstruct({ ...this, ...args })
  }
}
