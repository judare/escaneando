import response from "../helpers/response.js";
import moment from "moment";

export default function(app, db, services) {
  const {
    Train,
    TrainUser,
    TrainResource,
    TrainUserResource,
    User
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let { filters } = req.body.data;

        let queryBuilder = {
          include: [{
            model: User,
            required: true
          }],
          where: {
            companyId: req.user.companyId
          },
          order: [["createdAt", "DESC"]]
        };

        if (filters && filters.search) {
          queryBuilder.where.name = { [db.Op.like]: `%${filters.search}%` }
        }

        let items = await Train.findAll(queryBuilder);

        items = items.map(item => ({
          id: item.id,
          name: item.name,
          area: item.area,
          // percent: item.percent,
          createdAt: moment(item.createdAt).format("DD/MM/YY HH:mm"),
          User: {
            id: item.User.id,
            name: item.User.name,
            image: item.User.image,
          }
        }))

        return response(res, req, next)({ Items: items });
      } catch( err ) {
        return response(res, req)( null, { err, status: 400, code: "server.error" } );
      }
    },


    get: async function( req, res, next ) {
      let { train } = req;

      try {
        let queryBuilder = {};

        let sequences = await train.getTrainResources();

        queryBuilder = {
          where: {
            userId: req.user.id,
            trainResourceId: { [db.Op.in]: sequences.map(s => s.id) }
          }
        }
        let viewed = await TrainUserResource.findAll(queryBuilder);
        let json = viewed.reduce((ac, item) => {
          ac[item.trainResourceId] = item;
          return ac;
        }, {});

        sequences = sequences.map(val => ({
          id: val.id,
          name: val.name,
          viewed: !!json[val.id],
          type: val.type,
        }));

        let dataTrain = {
          id: train.id,
          name: train.name,
          area: train.area,
          percent: (viewed.length / sequences.length) * 100 || 0,
          TrainResources: sequences,
          User: {
            id: train.User.id,
            name: train.User.name,
            image: train.User.image,
          }
        };

        return response(res, req, next)({ Train: dataTrain });
      } catch( err ) {
        return response(res, req)( null, { err, status: 400, code: "server.error" } );
      }
    },

    getResource: async function( req, res, next ) {
      let { train } = req;
        
      try {
        let queryBuilder = {
          where: {
            trainId: train.id,
            id: req.body.data.trainResourceId,
          }
        }
        let resource = await TrainResource.findOne(queryBuilder);

        await TrainUserResource.markUser(req.user, resource)

        return response(res, req, next)({
          TrainResource: {
            id: resource.id,
            type: resource.type,
            content: resource.content,
          }
        });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },


    create: async function( req, res, next ) {
      try {

        let train = await Train.create({
          name: req.body.data.name,
          expiresAt: req.body.data.expiresAt,
          userId: req.user.id,
          companyId: req.user.companyId
        });

        for (let index in req.resources) {
          let resource = req.resources[index];
          await resource.update({
            trainId: train.id
          });
        }

        let trainUsers = [];
        
        for (let userKey in req.users) {
          let u = req.users[userKey];

          await services.Mail.sendMail({
            from: "noresponder@bybinary.co",
            fromName: "ByBinary",
            to: u.email,
            subject: `Capacitación sobre (${req.body.data.name})`
          }, {
            nameView: "train-user",
            context: {
              trainName: req.body.data.name,
              fromName: req.user.name,
              fullName: u.name,
            },
            attachments: []
          });

          trainUsers.push({
            userId: u.id,
            trainId: train.id
          })
        };
        await TrainUser.bulkCreate(trainUsers);

        return response(res, req, next)();
      } catch( err ) {
        return response(res, req)( null, { err, status: 400, code: "server.error" } );
      }
    },

    createResource: async function( req, res, next ) {
      try {
        let content = req.body.content;
        let file = req.file;

        if (file) {
          let name = Date.now() + file.originalname;
          content = await req.uploadFile(`resources/${name}`, file.buffer);
        }

        let resource = await TrainResource.create({
          name: req.body.name,
          content,
          type: req.body.type,
          userId: req.user.id
        });
        
        let data = {
          TrainResource: {
            id: resource.id
          }
        }

        return response(res, req, next)(data);
      } catch( err ) {
        return response(res, req)( null, { err, status: 400, code: "server.error" } );
      }
    },


    stats: async function( req, res, next ) {
      let { train } = req;
        
      try {
        let queryBuilder = {
          include: [{
            model: User,
            required: true
          }]
        }
        let users = await train.getTrainUsers(queryBuilder);

        let sequences = await train.getTrainResources();
        queryBuilder = {
          where: {
            trainResourceId: { [db.Op.in]: sequences.map(s => s.id) }
          }
        }
        let viewed = await TrainUserResource.findAll(queryBuilder);

        let json = viewed.reduce((ac, item) => {
          if (!ac[item.userId]) ac[item.userId] = 0;
          ac[item.userId] += 1;
          return ac;
        }, {});

        users = users.map(u => ({
          id: u.User.id,
          name: u.User.name,
          image: u.User.image,
          percent: ((json[u.User.id] || 0) / sequences.length) * 100 || 0,
        }));

        return response(res, req, next)({
          Stats: {
            Users: users
          }
        });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

  }

  return Controller;
};
