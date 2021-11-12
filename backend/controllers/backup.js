import response from "../helpers/response.js";
import moment from "moment";
import { getReadableFileSizeString } from "../helpers/helpers";

export default function(app, db) {
  const {
    Device,
    DeviceBackup
  } = db;

  const Controller = {
    list: async function( req, res, next ) {
      try {
        let queryBuilder = {
          include: [{
            model: Device,
            required: true
          }],
          where: {
            deviceId: req.device.id
          },
          order: [ ["id", "DESC"] ]
        };
        let list = await DeviceBackup.findAll(queryBuilder);

        list = list.map(backup => ({
          "id": backup.id,
          "size": getReadableFileSizeString(backup.size),
          "location": backup.location,
          "createdAt": moment(backup.createdAt).format("DD/MM/YY"),
          "expiresAt": moment(backup.expiresAt).format("DD/MM/YY"),
        }))

        return response(res, req, next)({ Backups: list });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

    get: async function( req, res, next ) {
      try {
        let { backup } = req;

        let BackupData = {
          "id": backup.id,
          "size": getReadableFileSizeString(backup.size),
          "location": backup.location,
          "createdAt": moment(backup.createdAt).format("DD/MM/YY"),
          "time": moment(backup.createdAt).format("HH:mm:ss"),
          "expiresAt": moment(backup.expiresAt).format("DD/MM/YY"),
          "filesChange": Object.keys(backup.meta)
        }

        return response(res, req, next)({ Backup: BackupData });
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },


    download: async function( req, res, next ) {
      try {
        let { backup } = req;

        let queryBuilder = {
          where: {
            deviceId: backup.deviceId,
            id: { [db.Op.lte]: backup.id }
          }
        };
        let list = await DeviceBackup.findAll(queryBuilder);
        list = list.sort((a,b) => a.id - b.id);

        let files = {};
        list.map(backup => {
          for(let file in backup.meta) {
            files[file] = {
              file: `devices/backups/${backup.id}/${file}`,
              backupId: backup.id,
              name: file
            };
          }
        });

        let filesArr = Object.values(files)
        
        const mfStream = req.multiFilesStream(filesArr);
        
        mfStream.pipe(res);
        mfStream.finalize();

      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },


    delete: async function( req, res, next ) {
      try {
        let { backup } = req;

        await backup.destroy();

        return response(res, req, next)(null);
      } catch( err ) {
        return response(res, req, next)( null, { err, status: 400, code: "server.error" } );
      }
    },

  }

  return Controller;
};
