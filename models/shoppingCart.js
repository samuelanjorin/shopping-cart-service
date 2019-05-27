export default (sequelize, Sequelize) => {
  const shoppingCartSchema = {
    item_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      allowNull: false
    },
    cart_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    attributes: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    buy_now: {
      type: Sequelize.INTEGER
    },
    added_on: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }

  const shoppingCart = sequelize.define('shopping_cart', shoppingCartSchema, {
    freezeTableName: true,
    timestamps: false
  })

  // shoppingCart.associate = db => {
  //   shoppingCart.belongsTo(db.Product, {
  //     foreignKey: 'product_id',
  //     target: 'product_id',
  //     onDelete: 'CASCADE'
  //   })
  // }

  return shoppingCart
}
