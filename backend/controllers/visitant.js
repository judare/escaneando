import response from "../helpers/response.js";
import Apagar from "../ws/class/apagar"

export default function(app, db) {

  const {
    Visit,
    People,
    ProductCategory,
    Product,
    Review,
    Insight,
    Transaction
  } = db;

  const Controller = {
    getCommerce: async function( req, res, next ) {
      let { commerce } = req;

      let business = await commerce.getBusiness();

      return response(res, req, next)({
        Commerce: {
          id: commerce.id,
          name: commerce.name,
          cellphone: commerce.cellphone,
          logo: commerce.logo,
          facebook: commerce.facebook,
          instagram: commerce.instagram,
          paymentsEnabled: business.paymentsEnabled
        }
      });
    },


    registerVisitant: async function( req, res, next ) {

      let { commerce, body: { data: { cellphone } } } = req;

      await Insight.register(commerce.businessId, "user.activity.firstScan");

      let people = await People.findOrCreate(cellphone);

      let visit = await Visit.visit(people, commerce);

      return response(res, req, next)({
        token: visit.token,
        Commerce: {
          id: commerce.id,
          name: commerce.name,
          cellphone: commerce.cellphone,
          logo: commerce.logo,
        }
      });
    },

    listProducts: async function(req, res, next) {
      let { commerce } = req;
      let list = [];

      let queryBuilder = {
        include: [{
          model: Product
        }],
        where: {
          commerceId: commerce.id
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

      return response(res, req, next)({
        Products: list
      });
    },



    createReview: async function(req, res, next) {
      let { visitant } = req;

      await Review.create({
        personId: visitant.peopleId,
        commerceId: visitant.commerceId,
        review: req.body.data.review,
        product: req.body.data.product,
        prices: req.body.data.prices,
        attention: req.body.data.attention,
      });

      return response(res, req, next)(null);
    },


    processPay: async function( req, res, next ) {

      let { commerce, paymentMethod, visitant } = req;
      await Insight.register(commerce.businessId, "user.activity.firstPay");

      let business = await commerce.getBusiness();

      let apagar = new Apagar.class();
      apagar.setToken(business.meta.apagarToken);

      let call = await apagar.createOrder({
        amount: req.body.data.amount,
        People: req.body.data.People
      }, paymentMethod);

      if (call.errorCode) {
        return response(res, req, next)(null, {
          status: call.status,
          code: call.errorCode
        });
      }

      let transaction = await Transaction.create({
        commerceId: commerce.id,
        businessId: business.id,
        personId: visitant.Person.id,
        transactionStatusId: 1,
        costs: 0,
        amount: req.body.data.amount,
        codeProvider: `${call.data.Resource.id},${call.data.Resource.data}`,
        paymentMethodId: paymentMethod.id
      });

      return response(res, req, next)({
        ...call.data,
        transactionId: transaction.id
      });
    },

    confirmDaviplata: async function(req, res, next) {
      let { commerce, transaction } = req;
      let business = await commerce.getBusiness();
      let apagar = new Apagar.class();
      let code = transaction.codeProvider.split(",");

      apagar.setToken(business.meta.apagarToken);

      let call = await apagar.confirmDaviplata(req.body.data.otp, code[1]);
      if (call.errorCode) {
        return response(res, req, next)(null, {
          status: call.status,
          code: call.errorCode
        });
      }

      await transaction.update({ transactionStatusId: 2 });

      return response(res, req, next)();
    }
  }

  return Controller;
};
