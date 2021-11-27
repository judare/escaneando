import moment from "moment";
import response from "../helpers/response.js";

export default function(app, db) {

  const {
    Product,
    Business,
    Commerce,
    ProductCategory,
    Insight
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
        },
        order: [ ["id", "ASC"] ]
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
          categoryId: p.categoryId,
        })),
      }));

      return response(res, req, next)({ Products: list });
    },



    create: async function( req, res, next ) {
      let { body: { data }, user } = req;

      await Insight.register(user.businessId, "user.activity.createProduct");

      await Product.create({
        image: data.image || "/icons/backoffice/default-product.png",
        name: data.name,
        description: data.description,
        price: data.price,
        categoryId: data.categoryId,
        enabled: 1,
        creatorId: req.user.id,
        commerceId: req.commerce.id,
      });
      return response(res, req, next)(null);
    },

    update: async function( req, res, next ) {
      let { product, body: { data } } = req;

      await product.update({
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image || "/icons/backoffice/default-product.png",
        categoryId: data.categoryId
      });
      return response(res, req, next)(null);
    },

    delete: async function( req, res, next ) {
      let { product } = req;

      await product.destroy();
      return response(res, req, next)(null);
    },

    createCategory: async function( req, res, next ) {
      let { commerce, body: { data: { name } }, user } = req;

      await Insight.register(user.businessId, "user.activity.createCategory");

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

    updateCategory: async function( req, res, next ) {
      let { category } = req;

      await category.update({
        name: req.body.data.name
      });
      return response(res, req, next)(null);
    },


    uploadImage: async function( req, res, next ) {
      let url = await req.uploadFile(`resources/` + Date.now() + req.file.originalname, req.file.buffer);
      return response(res, req, next)({
        Resource: {
          url
        }
      });
    },
  }

  return Controller;
};
