import response from "../helpers/response.js";
import { getDistanceFromLatLonInKm } from "../helpers/geo.js";
import { getReadableFileSizeString } from "../helpers/helpers";
import moment from "moment";
import AdmZip from "adm-zip";

export default function(app, db) {
  const {
    Device,
    Activity,
    DeviceActivity,
    DeviceLog,
    DeviceLogStatus,
    DeviceBackup,
    DeviceMonitor
  } = db;

  const Controller = {
    registerDevice: async function( req, res, next ) {
      try {
        let data = req.body.data;
        let hash = Buffer.from(`${Date.now() + Math.random().toString("36")}`).toString("base64");

        let device = null;
        if (data.id) {
          let queryBuilder = {
            where: {
              id: data.id
            }
          }
          device = await Device.findOne(queryBuilder);
        } else {
          device = await Device.create({
            companyId: req.company.id,
            hash,
            lastActivity: Date.now(),
            memory: data.mem.total,
            space: data.mem.active,
            cores: data.cpu.cores,
            processor: data.cpu.brand,
            os: data.osInfo.distro,
            battery: data.battery.percent,
            name: data.osInfo.hostname,
            disks: data.diskLayout,
            extra: {}
          });
        }

        if (!device) {
          return response(res, req, next)( null, { status: 404, code: "devices.notFound" } );
        }

        return response(res, req, next)( { Device: { hash: device.hash, id: device.id } } );
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },


    updateDeviceStatus: async function( req, res, next ) {
      try {
        const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        let data = req.body.data;
        let device = req.device;
        let alerts = [];

        let name = `${data.system.model} - ${data.system.manufacturer}`;

        let monitor = {
          cores: { label: "Nucleos", value: data.cpu.cores, transform: (v) => v },
          processor: { label: "Procesador", value: data.cpu.brand, transform: (v) => v },
          os: { label: "Sistema Operativo", value: data.osInfo.distro, transform: (v) => v },
          name: { label: "Nombre", value: name, transform: (v) => v },
          memory: { label: "RAM", value: data.mem.total, transform: (v) => getReadableFileSizeString(v) }
        };
        
        for (let key in monitor) {
          const element = monitor[key];
          if (element.value && element.value != device[key]) {
            alerts.push({
              deviceLogStatusId: DeviceLogStatus.ALERT_PENDING,
              deviceId: device.id,
              action: "change_feature",
              description: `El dispositivo cambió (${element.label}) de ${element.transform(device[key])} a ${element.transform(element.value)}`,
            });
          }
        }

        if (data.geo.latitude) {
          let diff = getDistanceFromLatLonInKm(device.latitude, device.longitude, data.geo.latitude, data.geo.longitude);

          if (diff > 5) { // TODO
            alerts.push({
              deviceLogStatusId: DeviceLogStatus.ALERT_PENDING,
              deviceId: device.id,
              action: "change_position",
              description: `El dispositivo cambió de posición`,
            });
          }
        }

        await DeviceMonitor.create({
          deviceId: device.id,
          space: data.mem.active,
          battery: data.battery.percent,
          processor: data.currentLoad.currentload,
          disks: data.diskLayout,
          memory: data.mem.total,
          ipAddress,
          backupSize: device.backupSize,
        })

        device = await device.update({
          lastActivity: Date.now(),
          memory: data.mem.total,
          space: data.mem.active,
          cores: data.cpu.cores,
          processor: data.cpu.brand,
          os: data.osInfo.distro,
          battery: data.battery.percent,
          name,
          disks: data.diskLayout
        });

        if (alerts.length > 0) {
          await DeviceLog.bulkCreate(alerts);
          await device.increment("alerts", { by: alerts.length })
        }

        return response(res, req, next)( null );
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },

    updateDeviceActivity: async function( req, res, next ) {
      try {
        let data = req.body.data;
        let { activityTracker } = data;
        let device = req.device;
        let Updates = {};

        for (let activityKey in activityTracker) {
          let activity =  activityTracker[ activityKey ];
          let key = Buffer.from(activityKey).toString("base64");

          let deviceActivityInstance = null;
          let queryBuilder = null;
          let activityInstance = null;

          if (activity.id) {
            queryBuilder = {
              where: {
                id: activity.id,
                deviceId: device.id,
                date: moment().format("YYYY-MM-DD 00:00")
              }
            }
            deviceActivityInstance = await DeviceActivity.findOne(queryBuilder);
          }

          if (!deviceActivityInstance) {
            queryBuilder = {
              attributes: ["id"],
              where: {
                key
              }
            }
            activityInstance = await Activity.findOne(queryBuilder);
            if (!activityInstance) {
              let dataActivity = {
                name:  Buffer.from(activity.title).toString("ascii"),
                url: activity.url,
                key
              }
              activityInstance = await Activity.create(dataActivity);
            }

            queryBuilder = {
              attributes: ["id", "time"],
              where: {
                activityId: activityInstance.id,
                deviceId: device.id,
                date: moment().format("YYYY-MM-DD 00:00")
              }
            }

            deviceActivityInstance = await DeviceActivity.findOne(queryBuilder);
          }

          if (deviceActivityInstance) {
            let time = Math.floor(activity.time);

            if (deviceActivityInstance.time != time) {
              await deviceActivityInstance.update({
                time: time
              });
            }
          } else {
            let dataDeviceActivity = {
              activityId: activityInstance.id,
              deviceId: device.id,
              time: activity.time,
              date: moment().format("YYYY-MM-DD 00:00")
            }
            deviceActivityInstance = await DeviceActivity.create(dataDeviceActivity);
          }

          Updates[activityKey] = { id: deviceActivityInstance.id };
        }

        await device.update({ lastActivity: Date.now() });

        return response(res, req, next)({ Updates });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },


    updateLocation: async function( req, res, next ) {
      try {
        let data = req.body.data;
        

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },



    processBackup: async function( req, res, next ) {
      try {
        let device = req.device;

        let zip = new AdmZip(req.file.buffer);
        let zipEntries = zip.getEntries();

        let jsonFile = null;
        let size = 0;
        let entries = [];
        let entriesUpload = [];
        for(let index in zipEntries) {
          let entry = zipEntries[index];
          if (entry.entryName == "entry_logs.json") {
            jsonFile = JSON.parse(Buffer.from(entry.getData()).toString("utf-8"));
            continue;
          }
          entries.push(entry);
        }

        if (!jsonFile) {
          return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
        }

        for(let index in entries) {
          let entry = entries[index];
          let name = entry.entryName;
          if (name.substr(0, 8) == "updates/") {
            name = name.substr(8);
          }

          if (!jsonFile[name]) {
            continue;
          }

          if (!device.backup[name] || (jsonFile[name].cs != device.backup[name].cs)) {
            entriesUpload.push(entry);
            size += entry.header.size;
          }
        }

        if (!entriesUpload.length) {
          return response(res, req, next)({ DeviceBackup: jsonFile });
        }

        let newJson = {
          ...device.backup,
          ...jsonFile
        }

        let backup = await DeviceBackup.create({
          deviceId: device.id,
          size,
          expiresAt: moment().add(365, "days").format("YYYY-MM-DD"),
          meta: jsonFile
        });

        for(let index in entriesUpload) {
          let entry = entriesUpload[index];
          await req.uploadFile(`devices/backups/${backup.id}/${entry.rawEntryName}`, entry.getData());
        }

        await device.update({ backup: newJson });

        await device.increment("backupSize", { by: size })

        return response(res, req, next)({ DeviceBackup: jsonFile });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },


    getBackupStatus: async function( req, res, next ) {
      try {
        let device = req.device;
        return response(res, req, next)({ DeviceBackup: device.backup });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 500, code: "server.error" } );
      }
    },


    closeSession: async function( req, res, next ) {
      try {
        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req)( null, { err, status: 500, code: "server.error" } );
      }
    }
  }

  return Controller;
};
