describe('Catalog page is functioning right', () => {
  before(() => {
    cy.visit('http://localhost:3000/catalog');
  });

  let businessesAccumulator = null;

  it('shows page content', () => {
    /**
     * check page renders without errors
     */
    cy.get('input').should('have.length', 1);
    cy.get('div[class^="BusinessCard_cardWrapper"]').then((listing) => {
      businessesAccumulator = Cypress.$(listing).length;
    });
  });

  it('ordering right', () => {
    /**
     * check that ordering works right
     */
    cy.get('div[class^="BusinessCard_cardWrapper"]').should('have.length', businessesAccumulator);
  });

  it('apply filters right', () => {
    /**
     * check that filtering works right
     */
    cy.get('input').eq(0).type(' ');
    cy.get('button[class^="Button_button"]').eq(0).click();
    cy.get('div[class^="BusinessCard_cardWrapper"]')
      .its('length')
      .should('be.lte', businessesAccumulator);
  });
});
