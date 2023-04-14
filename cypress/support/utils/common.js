const randomString = (length) => {
  return Array(length)
    .fill(0)
    .map(() => Math.random().toString(36).charAt(2))
    .join('')
}

module.exports = {
  randomString,
}
