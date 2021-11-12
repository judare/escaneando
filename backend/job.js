process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// Dependecies
import config from './config/config';
import schedule from 'node-schedule';
import Models from './models';
import Crons from "./crons";
import nodemailer from "nodemailer";

var db = new Models(null, null);
db.mailTransporter = nodemailer.createTransport(config.mail);


var crons = new Crons(null, db, services);

schedule.scheduleJob('0 * * * *', crons.cronsBills.process);

schedule.scheduleJob('0 * * * *', crons.cronsDevices.process);
schedule.scheduleJob('0 6 * * *', crons.cronsDevices.productivity);

schedule.scheduleJob('12 * * * *', crons.cronsAlerts.tickets);
