const ERROR_CODES = Object.freeze({
  AUT_01: 'Authorization code is empty.',
  AUT_02: 'Access Unauthorized.',
  NOAUTH: 'NoAuth',
  CRT_02: 'No cart exist with this ID',
  CRT_01: 'The cart is empty',
  PRD_01: 'No product with this ID',
  ITM_01: 'No item exist with this ID'

})
const CART = Object.freeze({
  MOVE_TO_CART: 1,
  SAVE_FOR_LATER: 2
})
const NETWORK_CODES = Object.freeze({
  HTTP_SUCCESS: 200,
  HTTP_CREATED: 201,
  HTTP_BAD_REQUEST: 400,
  HTTP_UN_AUTHORISED: 401,
  HTTP_NOT_FOUND: 404,
  HTPP_INTERNAL_SERVER: 500

})

const CACHE_TYPES = Object.freeze({
  hour: 'hour',
  day: 'day'

})
const CACHE_HOUR = Object.freeze({
  one: 3600,
  twenty_hour: 86400

})

export default Object.assign({}, { ERROR_CODES, NETWORK_CODES, CACHE_TYPES, CACHE_HOUR, CART })
