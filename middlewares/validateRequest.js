import { check, validationResult } from 'express-validator/check'
import { validator } from '../validations/validator'
import {
  addShoppingCartSchema
} from '../validations/schemas/schema'
import constants from '../constants/index'
import errorformatter from '../utils/errors/errorFormat'

const getSchema = req => {
  const schemas = {
    '/add': addShoppingCartSchema
  }

  return schemas[`/${req.originalUrl.split('/').pop()}`]
}

/**
 * Validate input
 *
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next callback
 * @returns {funcion} HTTP response
 */
export default async (req, res, next) => {
  const validation = await validator(req.body, getSchema(req))
  if (validation.hasError) {
    return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
      errors: validation.errors
    })
  }
  req.body = validation.fields
  return next()
}

export const checkUpdateCartValidity = () => {
  return [
    check('quantity').isNumeric().withMessage('quantity must be a number')
      .isLength({ min: 1 }).withMessage('quantity field is empty'),
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(constants.NETWORK_CODES.HTTP_BAD_REQUEST).json({
          errors: errorformatter(errors.array())
        })
      }
      return next()
    }
  ]
}
