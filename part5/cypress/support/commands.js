/* eslint-disable no-undef */
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
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3004/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogsappUser', JSON.stringify(body))
    cy.visit('http://localhost:3004')
  })
})

Cypress.Commands.add('signUp', user => {
  cy.request('POST', 'http://localhost:3004/api/users/', user)
})


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
