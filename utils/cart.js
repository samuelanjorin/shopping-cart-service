export default (allProducts) => {
    const products = [];
    allProducts.forEach((product) => {
        products.push({
            item_id: product.item_id,
            name: product.Product.name,
            attributes: product.attributes,
            product_id: product.product_id,
            image: product.Product.image,
            price: product.Product.price,
            quantity: product.quantity,
            subtotal: product.Product.price * product.quantity
        });
    });
    return products;
};


export const prepareSavedItems = (allItems) => {
    const items = [];
    allItems.forEach(item => {
        items.push({
            item_id: item.item_id,
            name: item.Product.name,
            attributes: item.attributes,
            price: item.Product.price
        });
    });
    return items;
};
