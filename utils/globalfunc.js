/* eslint-disable camelcase */
import shortId from 'shortid'
import service from '../services/shoppingCart'
import constants from '../constants/index'
function getKeyByValue (object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

function getUniqueId () {
  return shortId.generate()
}
function getPageParams (request) {
  const { page, limit, description_length } = request
  const numberOfPage = parseInt(page, 10) || 1
  const pageLimit = parseInt(limit, 10) || 20
  const descriptionLength = parseInt(description_length, 10) || 200

  return { numberOfPage, pageLimit, descriptionLength }
}

const isValueValid = (id) => {
  let valid = false
  const parsedId = parseInt(id, 10)
  !isNaN(parsedId) && (valid = true)
  return { valid, parsedId }
}

function convertObjectValuesRecursive (obj, target, replacement) {
  obj = { ...obj }
  Object.keys(obj).forEach((key) => {
    if (obj[key] === target) {
      obj[key] = replacement
    } else if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      obj[key] = convertObjectValuesRecursive(obj[key], target, replacement)
    }
  })
  return obj
}

function getToken (req) {
  const { user_key } = req
  const userKey = user_key.split(' ')
  return userKey[1]
}
async function getItemInfo (cart_id, option) {
  let items
  if (option === constants.CART.MOVE_TO_CART) {
    items = await service.findAllCartItems(cart_id)
  } else {
    items = await service.findAllSavedItems(cart_id)
  }

  var itemArray = []
  let subtotal = 0

  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    let response = await service.findProduct(item.dataValues.product_id)
    if (response.status !== constants.NETWORK_CODES.HTTP_SUCCESS) {
      return { itemArray: null, subtotal: null, error: response }
    }
    let product = response.data || response
    let newPrice = product.price * item.dataValues.quantity
    newPrice = Math.round(newPrice * 100) / 100
    subtotal = parseFloat(subtotal) + parseFloat(newPrice)
    subtotal = Math.round(subtotal * 100) / 100
    let productObj = {
      item_id: item.dataValues.item_id,
      name: product.name,
      attributes: item.dataValues.attributes,
      product_id: item.dataValues.product_id,
      price: newPrice,
      quantity: item.dataValues.quantity,
      image: product.image,
      subtotal
    }
    itemArray.push(productObj)
  }
  return { itemArray, subtotal, error: null }
}

export default { getKeyByValue,
  getUniqueId,
  getPageParams,
  isValueValid,
  getItemInfo,
  convertObjectValuesRecursive,
  getToken
}
