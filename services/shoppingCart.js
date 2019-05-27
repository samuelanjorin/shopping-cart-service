/* eslint-disable no-return-await */
/* eslint-disable camelcase */
import models from '../models'
import constants from '../constants/index'

const { shopping_cart } = models

async function findProducts (cart_id, option = true) {
  return shopping_cart.findAll({
    where: {
      cart_id,
      buy_now: constants.CART.MOVE_TO_CART
    }
  })
}

async function findOneCart (cart_id, attributes, product_id) {
  return shopping_cart.findOne({
    where: {
      cart_id,
      attributes,
      product_id
    }
  })
}

async function createCart (payload) {
  return shopping_cart.create(payload)
}

async function dropCart (cart_id) {
  return await shopping_cart.destroy({
    where: {
      cart_id
    }
  })
}

async function findAllSavedItems (cart_id) {
  return shopping_cart.findAll({
    where: {
      cart_id,
      buy_now: constants.CART.MOVE_TO_CART
    }
  })
}

async function findCart (cart_id) {
  return await shopping_cart.findOne({
    where: {
      cart_id
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
async function updateItem (cart_id, quantity) {
  let shopping_cart = await findCart(cart_id)
  shopping_cart.quantity = quantity
  await this.save(shopping_cart)
}

async function saveOrMoveToCart (payload) {
 // shoppingCart.buy_now = payload
 // await shopping_cart.create(shoppingCart)
}

export default { findAllSavedItems, findOneCart, dropCart, createCart, findProducts, findItem, findCart, updateItem, saveOrMoveToCart }
