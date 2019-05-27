import { Router } from 'express'
import controller from '../controllers/shoppingCart'
import validate, { checkUpdateCartValidity } from '../middlewares/validateRequest'
import authenticate from '../middlewares/authenticate'

const router = Router()

router.get('/generateUniqueId', controller.generateUniqueId())
router.post('/add', authenticate.verifyUser, controller.addItemToCart())
router.get('/:cart_id', controller.findItemsInCart())
router.put('/update/:item_id', controller.updateItemInCart())
router.delete('/empty/:cart_id', controller.emptyCart())
router.get('/moveToCart/:item_id', controller.moveItemToCart())
// router.get('/totalAmount/:cart_id',
//   controller.getTotalAmountFromCart())
// router.get('/saveForLater/:item_id', controller.saveProductForLater())

// router.get('/getSaved/:cart_id', controller.getItemsSavedForLater())

// router.delete('/removeProduct/:item_id', controller.removeItemFromCart())

export default router
