// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

//inicializacion de rutas de reporte y ss para limpieza 
//const directoryPath_reportes = 'cypress/reports';
//const directoryPath_screenshots = 'cypress/screenshots';

//control de error de home page de chileautos.cl entregado para pruebas
Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test
    return false;
});

// before(() => {
//     cy.task('removeDirectory', directoryPath_screenshots).then(() => {
//         // Validacion de eliminado
//         cy.log(`Directory ${directoryPath_screenshots} has been removed.`);
//     });

//     cy.task('removeDirectory', directoryPath_reportes).then(() => {
//         // Validacion de eliminado
//         cy.log(`Directory ${directoryPath_reportes} has been removed.`);
//     });
// })