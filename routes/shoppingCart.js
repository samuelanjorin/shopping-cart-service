import { Router } from 'express'
import controller from '../controllers/shoppingCart'
import authenticate from '../middlewares/authenticate'
import constants from '../constants/index'
import validate from '../middlewares/validateRequest'

const router = Router()

router.get('/generateUniqueId', controller.generateUniqueId())
router.post('/add', authenticate.verifyUser, validate, controller.addItemToCart())
router.get('/:cart_id', controller.findItemsInCart())
router.put('/update/:item_id', controller.updateItemInCart())
router.delete('/empty/:cart_id', controller.emptyCart())
router.get('/moveToCart/:item_id', controller.moveItemToCartOrSafeForLater(constants.CART.MOVE_TO_CART))
router.get('/saveForLater/:item_id', controller.moveItemToCartOrSafeForLater(constants.CART.SAVE_FOR_LATER))
router.get('/totalAmount/:cart_id', controller.findtotalAmountFromCart())
router.get('/getSaved/:cart_id', controller.findSavedForLaterItems())
router.delete('/removeProduct/:item_id', controller.removeItemFromCart())

export default router
