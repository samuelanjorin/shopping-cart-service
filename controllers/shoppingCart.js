/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
import isEmpty from 'lodash.isempty'
import service from '../services/shoppingCart'
import formatCart, { prepareSavedItems } from '../utils/cart'
import constants from '../constants/index'
import asyncF from '../middlewares/async'
import globalfunc from '../utils/globalfunc'

function generateUniqueId () {
  return asyncF((req, res) => {
    res.json({ cart_id: globalfunc.getUniqueId() }).status(constants.HTTP_SUCCESS)
  })
}

// function addProductToCart () {
//   return asyncF(async (req, res) => {
//     /// // find product
//     const { body: { cart_id, product_id, attributes } } = req
//     const cart = await service.findOneCart(cart_id, attributes, product_id)

//     if (isEmpty(cart)) {
//       await service.createCart({
//         cart_id,
//         product_id,
//         buy_now: constants.CART.MOVE_TO_CART,
//         attributes,
//         quantity: 1,
//         added_on: new Date()
//       })
//     } else {
//       await cart.increment('quantity')
//     }

//     const allProductsInCart = await service.getProducts(cart_id)
//     return res.json(formatCart(allProductsInCart)).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//   })
// }

// function findItemsFromCart () {
//   return asyncF(async (req, res) => {
//     const { cart_id } = req.params
//     const items = await service.findProducts(cart_id)
//     if (!isEmpty(items)) {
//       return res.json(formatCart(items)).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//     }
//     return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//       code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CRT_01),
//       message: constants.ERROR_CODES.CRT_01,
//       field: 'cart_id'
//     })
//   })
// }

// function updateItemInCart () {
//   return asyncF(async (req, res) => {
//     if (globalfunc.isValueValid(req.params.item_id)) {
//       let item = await service.findItem()
//       if (item === null) {
//         return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//           code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_02),
//           message: constants.ERROR_CODES.ITM_02,
//           field: 'item_id'
//         })
//       }
//       const { body: { quantity } } = req
//       await item.updateItem(quantity)
//       const cart_id = item.get('cart_id')
//       const items = await service.getProducts(cart_id, false)
//       return res.json(items).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//     }
//     return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//       code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_01),
//       message: constants.ERROR_CODES.ITM_01,
//       field: 'item_id'
//     })
//   })
// }

// function findtotalAmountFromCart () {
//   return asyncF(async (req, res) => {
//     const { cart_id } = req.params

//     const products = await service.findProducts(cart_id)
//     if (!isEmpty(products)) {
//       const totalCount = products.reduce((total_amount, item) => {
//         return total_amount += item.quantity * item.Product.price -
//                             item.Product.discounted_price
//       }, 0)
//       const result = {
//         total_amount: totalCount
//       }
//       return res.json(result).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//     }
//     return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//       code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CRT_01),
//       message: constants.ERROR_CODES.CRT_01,
//       field: 'cart_id'
//     })
//   })
// }

// function saveProductForLater () {
//   return asyncF(async (req, res) => {
//     const { item } = req
//     await item.saveOrMoveToCart(constants.CART.SAVE_FOR_LATER)
//     return res.json([]).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//   })
// }

// function findItemsSavedForLater () {
//   return asyncF(async (req, res) => {
//     const { cart_id } = req.params
//     const allItems = await service.findAllSavedItems(cart_id)
//     if (!isEmpty(allItems)) {
//       const items = prepareSavedItems(allItems)
//       return res.json(items).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//     }
//     return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//       code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.SVD_02),
//       message: constants.ERROR_CODES.SVD_02,
//       field: 'item_id'
//     })
//   })
// }

// function moveToCart () {
//   return asyncF(async (req, res) => {
//     if (globalfunc.isValueValid(req.params.item_id)) {
//       let item = await service.findItem()
//       if (item === null) {
//         return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//           code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_02),
//           message: constants.ERROR_CODES.ITM_02,
//           field: 'item_id'
//         })
//       }
//       await item.saveOrMoveToCart(constants.CART.MOVE_TO_CART)
//       return res.json([]).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//     }
//     return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//       code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_01),
//       message: constants.ERROR_CODES.ITM_01,
//       field: 'item_id'
//     })
//   })
// }

// function removeItemFromCart () {
//   return asyncF(async (req, res) => {
//     if (globalfunc.isValueValid(req.params.item_id)) {
//       let item = await service.findItem()
//       if (item === null) {
//         return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//           code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_02),
//           message: constants.ERROR_CODES.ITM_02,
//           field: 'item_id'
//         })
//       }
//       await item.destroy()
//       return res.json([]).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//     }
//     return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//       code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.ITM_01),
//       message: constants.ERROR_CODES.ITM_01,
//       field: 'item_id'
//     })
//   })
// }

// function emptyCart () {
//   return asyncF(async (req, res) => {
//     const { cart_id } = req.params
//     const cart = await service.getProducts(cart_id, false)
//     if (!isEmpty(cart)) {
//       await service.dropCart(cart_id)
//       return res.json([]).status(constants.NETWORK_CODES.HTTP_SUCCESS)
//     }
//     return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
//       code: globalfunc.findKeyByValue(constants.ERROR_CODES, constants.ERROR_CODES.CRT_01),
//       message: constants.ERROR_CODES.CRT_01,
//       field: 'cart_id'
//     })
//   })
// }
export default {
//   emptyCart,
//   addProductToCart,
//   updateItemInCart,
//   removeItemFromCart,
//   moveToCart,
//   findItemsSavedForLater,
//   saveProductForLater,
//   findtotalAmountFromCart,
//   findItemsFromCart,
   generateUniqueId
}
