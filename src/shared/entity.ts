export const randomId = (len = 20) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let autoId = ''
  for (let i = 0; i < len; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return autoId
}
