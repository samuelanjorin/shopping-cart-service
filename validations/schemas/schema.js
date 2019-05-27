/* eslint-disable camelcase */
import Joi from 'joi'

const cart_id = Joi.string()
  .required()
  .label('cart_id')

const product_id = Joi.number()
  .integer()
  .required()
  .label('product_id')

const attributes = Joi.string()
  .required()
  .trim()
  .label('attributes')

export const addShoppingCartSchema = Joi.object().keys({
  cart_id,
  product_id,
  attributes
})
