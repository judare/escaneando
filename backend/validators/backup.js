// import {check} from 'express-validator/check';
// import validOrAbort from '../middleware/validate';
// import checkAuthMiddleWare from '../middleware/check-auth';
import checkDeviceMiddleWare from '../middleware/device-find';
import BackupFindMiddleWare from '../middleware/backup-find';
import canMiddleWare from '../middleware/can';

export default function(app, db) {
  // const checkAuth = checkAuthMiddleWare(app, db);
  const checkDevice = checkDeviceMiddleWare(app, db);
  const backupFind = BackupFindMiddleWare(app, db);
  const can = canMiddleWare(app, db);

  return {
    list: [
      can("backups.list"),
      checkDevice
    ],

    get: [
      can("backups.list"),
      backupFind
    ],

    delete: [
      can("backups.delete"),
      backupFind
    ],

    download: [
      can("backups.download"),
      backupFind
    ]

  };
}

