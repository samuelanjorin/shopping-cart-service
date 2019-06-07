# turing-shopping-cart-service

This is on one the services of Turing Eccomerce Microservices. 

# Deployed on Port http://3.130.189.86:7003

# Gateway Path :  http://3.130.189.86:8000/shopping-carts-service/ 

It handles the below Shopping Cart features:

1. Generate Unique Cart ID: http://3.130.189.86:8000/shopping-carts-service/v1/api/shoppingcart/generateUniqueId
2. Get Cart By ID: http://3.130.189.86:8000/shopping-carts-service/v1/api/shoppingcart/idQepBW4c
3. Add Item to Cart: http://3.130.189.86:8000/shopping-carts-service/v1/api/shoppingcart/add
4. Update Item in Cart: http://3.130.189.86:8000/shopping-carts-service/v1/api/shoppingcart/update/1
5. Remove Item from Cart: http://3.130.189.86:8000/shopping-carts-service/v1/api/shoppingcart/removeProduct/1
6. Empty Cart: http://localhost:8000/shopping-carts-service/v1/api/shoppingcart/empty/idQepBW4c
7. Move Item to Cart: http://3.130.189.86:8000/shopping-carts-service/v1/api/shoppingcart/moveToCart/2
8. Save Item for Later: http://localhost:8000/shopping-carts-service/v1/api/shoppingcart/saveforlater/2
9. Get Saved Item in Carts: http://3.130.189.86:8000/shopping-carts-service/v1/api/shoppingcart/getsaved/12345
10. Get TotalAmount in Cart: http://3.130.189.86:8000/shopping-carts-service/v1/api/shoppingcart/totalAmount/12345
