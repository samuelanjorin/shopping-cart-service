/* eslint-disable no-return-await */
/* eslint-disable camelcase */
import db from '../models/index'
import constants from '../constants/index'
import cache from '../utils/cache'
import networkRequest from '../utils/networkRequest'

const { shopping_cart } = db

// async function findProducts (cart_id, option = true) {
//   return shopping_cart.findAll({
//     where: {
//       cart_id,
//       buy_now: constants.CART.MOVE_TO_CART
//     }
//   })
// }

async function checkCart (cart_id, attributes, product_id) {
  return shopping_cart.findOne({
    where: {
      cart_id,
      attributes,
      product_id
    }
  })
}

async function newCart (payload) {
  console.log('shopping_cart:', shopping_cart)
  return await shopping_cart.create(payload)
}

// async function dropCart (cart_id) {
//   return await shopping_cart.destroy({
//     where: {
//       cart_id
//     }
//   })
// }

async function findAllSavedItems (cart_id) {
  return await shopping_cart.findAll({
    where: {
      cart_id,
      buy_now: constants.CART.MOVE_TO_CART
    }
  })
}

// async function findCart (cart_id) {
//   return await shopping_cart.findOne({
//     where: {
//       cart_id
//     }
//   })
// }

// async function findItem (item_id) {
//   return await shopping_cart.findOne({
//     where: {
//       item_id
//     }
//   })
// }

async function incrQuantity (cart) {
  let quantity = cart.quantity + 1
  return await shopping_cart.update(
    { quantity },
    { returning: true, where: { cart_id: cart.cart_id, product_id: cart.product_id } }
  )
}

async function saveOrMoveToCart (payload) {
  // shoppingCart.buy_now = payload
  // await shopping_cart.create(shoppingCart)
}
async function findProduct (product_id) {
  let productPath = process.env.PRODUCT_PATH + '' + product_id
  let product = await cache.checkCache(productPath)
  if (product !== null) {
    return product
  }
  let url = process.env.PRODUCT_URL + '' + product_id
  product = await networkRequest.getRequest(url)
  return product
}

export default {
//   findAllSavedItems,
  checkCart,
  newCart,
  incrQuantity,
  //   dropCart,
  //   createCart,
  //   findProducts,
  //   findItem,
  //   findCart,
  //   updateItem,
  //   saveOrMoveToCart,
  findAllSavedItems,
  findProduct }
