/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import isEmpty from 'lodash.isempty'
import service from '../services/shoppingCart'
import constants from '../constants/index'
import asyncF from '../middlewares/async'
import globalfunc from '../utils/globalfunc'

function generateUniqueId () {
  return asyncF((req, res) => {
    res.json({ cart_id: globalfunc.getUniqueId() }).status(constants.HTTP_SUCCESS)
  })
}

function addItemToCart () {
  return asyncF(async (req, res) => {
    const { body: { cart_id, product_id, attributes } } = req
    let attributesArray = []
    attributesArray = attributes.split(' ')
    let attributesData
    let productAttributes = await service.findProductAtrribute(product_id)
    if (productAttributes.status !== constants.NETWORK_CODES.HTTP_SUCCESS) {
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_03),
        message: constants.ERROR_CODES.ITM_03,
        field: 'product_id'
      })
    }
    if (productAttributes.data === 'cache') {
      attributesData = productAttributes
    } else {
      attributesData = productAttributes.data
    }

    const setAttributes = new Set()
    let invalid = null
    attributesData.forEach((productAttribute) => {
      setAttributes.add(productAttribute.attribute_value)
    })
    attributesArray.forEach((attribute) => {
      if (setAttributes.has(attribute) === false) {
        invalid = attribute
      }
    })
    if (!isEmpty(invalid)) {
      return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
        code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_02),
        message: constants.ERROR_CODES.ITM_02,
        field: invalid
      })
    }
    const cart = await service.checkCart(cart_id, attributes, product_id)
    if (cart === null) {
      await service.newCart({
        cart_id,
        product_id,
        attributes,
        quantity: 1,
        buy_now: constants.CART.MOVE_TO_CART,
        added_on: new Date() })
    } else {
      await service.incrQuantity(cart, 1)
    }

    let { itemArray } = await globalfunc.getItemInfo(cart_id, constants.CART.MOVE_TO_CART)
    return res.json(itemArray).status(constants.NETWORK_CODES.HTTP_SUCCESS)
  })
}

function updateItemInCart () {
  return asyncF(async (req, res) => {
    let item_id = req.params.item_id
    if (globalfunc.isValueValid(item_id)) {
      let item = await service.updateItemInCart(item_id, { quantity: parseInt(req.body.quantity) })

      if (item === null) {
        return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
          code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_02),
          message: constants.ERROR_CODES.ITM_02,
          field: 'item_id'
        })
      }
      let { itemArray } = await globalfunc.getItemInfo(item.cart_id, constants.CART.MOVE_TO_CART)
      return res.json(itemArray).status(constants.NETWORK_CODES.HTTP_SUCCESS)
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_01),
      message: constants.ERROR_CODES.ITM_01,
      field: 'item_id'
    })
  })
}

function findtotalAmountFromCart () {
  return asyncF(async (req, res) => {
    const { cart_id } = req.params
    const { subtotal } = await globalfunc.getItemInfo(cart_id, constants.CART.MOVE_TO_CART)
    return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json({ totalAmount: subtotal })
  })
}

function findItemsInCart () {
  return asyncF(async (req, res) => {
    const { cart_id } = req.params
    const allItems = await service.findAllCartItems(cart_id)
    if (!isEmpty(allItems)) {
      let { itemArray, error } = await globalfunc.getItemInfo(cart_id, constants.CART.MOVE_TO_CART)
      if (error === null) {
        return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json(itemArray)
      }
      return res.status(error.status).json({
        code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CRT_02),
        message: error.data.message,
        field: 'item_id'
      })
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CRT_02),
      message: constants.ERROR_CODES.CRT_02,
      field: 'item_id'
    })
  })
}

function moveItemToCartOrSafeForLater (option) {
  return asyncF(async (req, res) => {
    let item_id = req.params.item_id
    if (globalfunc.isValueValid(item_id)) {
      let item = await service.findItem(item_id)
      if (item === null) {
        return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
          code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_02),
          message: constants.ERROR_CODES.ITM_02,
          field: 'item_id'
        })
      }
      await service.moveOrSafeToCart(item_id, { buy_now: option })
      return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json([])
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_01),
      message: constants.ERROR_CODES.ITM_01,
      field: 'item_id'
    })
  })
}
function findSavedForLaterItems () {
  return asyncF(async (req, res) => {
    const { cart_id } = req.params
    const allItems = await service.findAllSavedItems(cart_id)
    if (!isEmpty(allItems)) {
      let { itemArray } = await globalfunc.getItemInfo(cart_id, constants.CART.SAVE_FOR_LATER)
      return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json(itemArray)
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CRT_02),
      message: constants.ERROR_CODES.CRT_02,
      field: 'item_id'
    })
  })
}
function removeItemFromCart () {
  return asyncF(async (req, res) => {
    let item_id = req.params.item_id
    if (globalfunc.isValueValid(item_id)) {
      let item = await service.findItem(item_id)
      if (item === null) {
        return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
          code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_02),
          message: constants.ERROR_CODES.ITM_02,
          field: 'item_id'
        })
      }
      await service.removeItem(item_id)
      return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json([])
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_01),
      message: constants.ERROR_CODES.ITM_01,
      field: 'item_id'
    })
  })
}

function emptyCart () {
  return asyncF(async (req, res) => {
    const { cart_id } = req.params
    let { itemArray } = await globalfunc.getItemInfo(cart_id, constants.CART.MOVE_TO_CART)
    if (!isEmpty(itemArray)) {
      await service.emptyCart(cart_id)
      return res.status(constants.NETWORK_CODES.HTTP_SUCCESS).json([])
    }
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      code: globalfunc.getKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CRT_01),
      message: constants.ERROR_CODES.CRT_01,
      field: 'cart_id'
    })
  })
}
export default {
  addItemToCart,
  findItemsInCart,
  updateItemInCart,
  emptyCart,
  moveItemToCartOrSafeForLater,
  removeItemFromCart,
  findSavedForLaterItems,
  findtotalAmountFromCart,
  generateUniqueId
}
