/* eslint-disable no-return-await */
/* eslint-disable camelcase */
import db from '../models/index'
import constants from '../constants/index'
import cache from '../utils/cache'
import networkRequest from '../utils/networkRequest'
import logger from '../utils/errors/errorlogger'

const { shopping_cart } = db

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

async function incrQuantity (cart, quantity) {
  quantity = cart.quantity + parseInt(quantity)
  return await shopping_cart.update(
    { quantity },
    { returning: true, where: { cart_id: cart.cart_id, product_id: cart.product_id } }
  )
}

async function moveOrSafeToCart (item_id, payload) {
  return await shopping_cart.update(
    payload,
    { returning: true, where: { item_id } }
  )
}
async function findProduct (product_id) {
  let productPath = process.env.PRODUCT_PATH + '' + product_id
  let response = await cache.checkCache(productPath)
  try {
    if (response !== null) {
      response.status = 200
      //return response
    }
    let url = process.env.PRODUCT_URL + '' + product_id
    response = await networkRequest.getRequest(url)
    return response
  } catch (err) {
    logger.error(err.response)
    return err.response
  }
}

async function removeItem (item_id) {
  return await shopping_cart.destroy({
    where: {
      item_id
    }
  })
}

export default {
  checkCart,
  newCart,
  incrQuantity,
  emptyCart,
  moveOrSafeToCart,
  findItem,
  removeItem,
  updateItemInCart,
  findAllSavedItems,
  findAllCartItems,
  findProduct }
