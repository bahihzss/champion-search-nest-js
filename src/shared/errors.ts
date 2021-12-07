export class NotFoundError extends Error {
  constructor(
    public message: string = 'リクエストされたエンティティが見つかりません',
  ) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError)
    }

    this.name = this.constructor.name
  }
}
