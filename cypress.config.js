const { defineConfig } = require("cypress");
const fs = require('fs-extra');
//Inicializacion de rutas de carpetas de limpieza
const directoryPath_reportes = 'cypress/reports';
const directoryPath_screenshots = 'cypress/screenshots';

module.exports = defineConfig({
  reporter: 'mochawesome',
    "reporterOptions": {
    "charts": false,
    "html": true,
    "json": true,
    "reportDir": "cypress/reports/mochawesome_reports",
    "overwrite": false 
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        removeDirectory(path) {
          return new Promise((resolve, reject) => {
            fs.remove(path, (err) => { // Using recursive: true for non-empty directories
              if (err) {
                return reject(err);
              }
              resolve(null);
            });
          });
        },
      });
      //Limpieza de carpetas de reporte de pruebas 
      on('before:run', () => {
        fs.remove(directoryPath_reportes, (err) => {
          if (err) {
            return reject(err);
          }
        });
        fs.remove(directoryPath_screenshots, (err) => {
          if (err) {
            return reject(err);
          }
        });
      })
    },
    baseUrl: "https://latam-retail-merlin-homepage-web-frontend-ore.latam.csnglobal.net/",
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 80000,
    retries: {
      openMode: 1,
      runMode: 1
    },
    
  },
});
