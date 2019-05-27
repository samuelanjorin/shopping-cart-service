/* eslint-disable camelcase */
import shortId from 'shortid'
import service from '../services/shoppingCart'
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
async function getCartInfo (cart_id) {
  let items = await service.findAllSavedItems(cart_id)

  var itemArray = []
  let subtotal = 0

  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    let product = await service.findProduct(item.dataValues.product_id)
    subtotal = parseInt(subtotal) + parseInt(product.price)
    let productObj = {
      item_id: item.dataValues.item_id,
      name: product.name,
      attributes: item.dataValues.attributes,
      product_id: item.dataValues.product_id,
      price: product.price,
      quantity: item.dataValues.quantity,
      image: product.image,
      subtotal
    }
    itemArray.push(productObj)
  }
  return itemArray
}

export default { getKeyByValue,
  getUniqueId,
  getPageParams,
  isValueValid,
  getCartInfo,
  convertObjectValuesRecursive,
  getToken
}
