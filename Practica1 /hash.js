
const crypto = require('crypto')
// const texto=''

let hash = crypto.createHash('md5').update('160c0022aba29d61267cf0cd6e268b40d3ffea38d4299acfe6a8f47fcd498173d6f0ee53').digest("hex")
console.log(hash)
