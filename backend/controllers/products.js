import moment from "moment";
import response from "../helpers/response.js";

export default function(app, db) {

  const {
    Product,
    Business,
    Commerce,
    ProductCategory
  } = db;

  const Controller = {
    list: async function( req, res, next ) {

      let { body: { data: { commerceId } } } = req;
      let list = [];

      let queryBuilder = {
        include: [{
          model: Product
        },
        {
          include: [{
            model: Business,
            required: true,
            where: {
              id: req.user.businessId
            }
          }],
          model: Commerce,
          required: true
        }],
        where: {
          commerceId
        }
      }
      let products = await ProductCategory.findAll(queryBuilder);

      list = products.map((c) => ({
        id: c.id,
        name: c.name,
        Products: c.Products.map(p => ({
          id: p.id,
          name: p.name,
          image: p.image,
          description: p.description,
          price: p.price,
        })),
      }));

      return response(res, req, next)({ Products: list });
    },



    create: async function( req, res, next ) {
      let { body: { data } } = req;

      await Product.create({
        image: "",
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        enabled: 1,
        creatorId: req.user.id,
        commerceId: req.commerce.id,
      });
      // TODO INSERT IMAGES
      return response(res, req, next)(null);
    },

    update: async function( req, res, next ) {
      let { product, body: { data } } = req;

      await product.update({
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId
      });
      // TODO INSERT IMAGES
      return response(res, req, next)(null);
    },

    delete: async function( req, res, next ) {
      let { product } = req;

      await product.destroy();
      return response(res, req, next)(null);
    },

    createCategory: async function( req, res, next ) {
      let { commerce, body: { data: { name } } } = req;

      await ProductCategory.create({
        commerceId: commerce.id,
        name: name,
      });
      return response(res, req, next)(null);
    },

    deleteCategory: async function( req, res, next ) {
      let { category } = req;

      let products = await category.getProducts();
      if (products.length > 0)  throw { code: "category.hasProducts" }

      await category.destroy();
      return response(res, req, next)(null);
    },
  }

  return Controller;
};
