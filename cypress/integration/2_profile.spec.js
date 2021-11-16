/**
 * uuid analog
 */
function generateHash() {
  return '--' + Date.now();
}

describe('Profile page is functioning right', () => {
  beforeEach(() => {
    /**
     * check good auth data submition
     */
    cy.visit('http://localhost:3000/auth');

    cy.get('input').eq(0).type('test');
    cy.get('input').eq(1).type('test');

    cy.get('button[class^="Button_button"]').eq(0).click();

    cy.url().should('eq', 'http://localhost:3000/profile');

    cy.visit('http://localhost:3000/profile/own');
  });

  it('shows page content', () => {
    cy.get('input').should('have.length', 5);
  });

  // it('shows page content', () => {});
});
