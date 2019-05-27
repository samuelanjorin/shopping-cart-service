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

async function findItem (item_id) {
  return await shopping_cart.findOne({
    where: {
      item_id
    }
  })
}

async function newCart (payload) {
  return await shopping_cart.create(payload)
}

async function emptyCart (cart_id) {
  return await shopping_cart.destroy({
    where: {
      cart_id
    }
  })
}

async function findAllCartItems (cart_id) {
  return await shopping_cart.findAll({
    where: {
      cart_id,
      buy_now: constants.CART.MOVE_TO_CART
    }
  })
}

async function findAllSavedItems (cart_id) {
  return await shopping_cart.findAll({
    where: {
      cart_id,
      buy_now: constants.CART.SAVE_FOR_LATER
    }
  })
}

async function updateItemInCart (item_id, quantity) {
  await shopping_cart.update(
    quantity,
    {
      returning: true,
      where: { item_id: item_id } }
  )
  let item = await findItem(item_id)
  return item
}

// async function findItem (item_id) {
//   return await shopping_cart.findOne({
//     where: {
//       item_id
//     }
//   })
// }

async function incrQuantity (cart, quantity) {
  quantity = cart.quantity + parseInt(quantity)
  return await shopping_cart.update(
    { quantity },
    { returning: true, where: { cart_id: cart.cart_id, product_id: cart.product_id } }
  )
}

async function moveOrSafeToCart (item_id, payload) {
  // shoppingCart.buy_now = payload
  // await shopping_cart.create(shoppingCart)
  console.log(payload)
  return await shopping_cart.update(
    payload,
    { returning: true, where: { item_id } }
  )
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
  emptyCart,
  moveOrSafeToCart,
  //   createCart,
  //   findProducts,
  findItem,
  //   findCart,
  updateItemInCart,
  findAllSavedItems,
  findAllCartItems,
  findProduct }
