// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const fs = require('fs');

//Eliminar Reports
Cypress.Commands.add('eliminar_reportes', () => {
    fs.promises.rmdir('./cypress/reports', { recursive: true, force: true }, (err) => {
        if (err) {
            console.error('Error removing directory:', err);
            return;
        }
        console.log('Directory removed successfully.');
    });
})


//Eliminar Screenshots
Cypress.Commands.add('eliminar_screenshots', () => {
    fs.promises.rm('./cypress/screenshots', { recursive: true, force: true })
})
