process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// Dependecies
import config from './config/config';
import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import Models from './models';
// import services from './ws';
import Routes from './routes';
import AwsHelper from "./helpers/aws.js";
import LangHelper from "./helpers/langs.js";
import cluster from 'cluster';
import v8 from 'v8';
import helmet from 'helmet';
import response from "./helpers/response.js";
import validateBodyMiddleware from "./middleware/_validate-body.js";
import services from './ws';
import test from "./routes/test";

const clog = (st, text) => console.log(st, text);

var db = new Models(express, services);
var routes = new Routes(express, db, services);
db.mailTransporter = nodemailer.createTransport(config.mail);
services.connect(db);

const app = express();
let server;

const runningServer = function () {
  clog('\x1b[36m%s\x1b[0m', `Lintening in ${config.domain}:${config.port}`);
};

const runServer = () => {
  const router = express.Router();

  clog('\x1b[37m', 'Putting headers');

  app.disable('x-powered-by');
  app.use(helmet());

  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });



  app.use( LangHelper(express, db, services) );
  app.use(validateBodyMiddleware(express, db, services));
  app.use( AwsHelper(express, db, services) );

  clog('\x1b[37m', 'Creating Controllers');

  router.use('/alerts', routes.Alerts);
  router.use('/auth', routes.Auth);
  router.use('/bills', routes.Bills);
  router.use('/devices', routes.Devices);
  router.use('/tickets', routes.Tickets);
  router.use('/users', routes.Users);
  router.use('/devices-os', routes.DeviceOs);
  router.use('/learning', routes.Learning);
  router.use('/areas', routes.Areas);
  router.use('/backup', routes.Backup);
  router.use('/productivity', routes.Productivity);
  router.use('/rols', routes.Rols);
  router.use('/test', test(express, db, services));

  app.use('/api/v1', router);


  app.use((err, req, res, next) => {
    return response(res, req)( null, { err, status: 500, code: "server.error" } );
  });

  let total = v8.getHeapStatistics().total_available_size;
  let gb = (total/1024/1024/1024).toFixed(2);
  clog('\x1b[33m', `Memory Limit: ${gb} GB`)
}

if (cluster.isMaster) {
  if (config.onlyCore) {
    runServer();
    server = app.listen(config.port, runningServer);
    server.timeout = 2 * 60 * 1000;  

  } else {
    const numCpus = require('os').cpus().length;
    for (let i = 0; i < numCpus; ++i) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log('Worker %d died :(', worker.id);
      cluster.fork();
    });

  }
} else {

  runServer();
  server = app.listen(config.port, runningServer);
  server.timeout = 2 * 60 * 1000;
}