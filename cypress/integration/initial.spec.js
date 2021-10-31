// const cy = require('cypress');

describe('App loads right', () => {
  it('show landing content', () => {
    cy.visit('http://localhost:3000');
  });
});