/**
 * uuid analog
 */
function generateHash() {
  return '--' + Date.now();
}

describe('Creating businesses page is functioning right', () => {
  beforeEach(() => {
    /**
     * check good auth data submition
     */
    cy.visit('http://localhost:3000/auth');

    cy.get('input').eq(0).type('test');
    cy.get('input').eq(1).type('test');

    cy.get('button[class^="Button_button"]').eq(0).click();

    cy.url().should('eq', 'http://localhost:3000/profile');

    cy.visit('http://localhost:3000/newPlan');
  });

  it('shows page content', () => {
    cy.get('input').should('have.length', 1);
  });

  it('should validates empty fileds', () => {
    cy.get('button').should('have.length', 2);
    cy.get('button').eq(0).click();
    cy.get('button').should('have.length', 2);
    cy.get('button').eq(0).click();
    cy.get('button').should('have.length', 2);
    cy.get('button').eq(0).click();
    cy.get('div[class*="EventsSection_error"]')
      .eq(0)
      .should('have.text', 'Enter all * values please!');
  });

  it('should validates not number fileds', () => {
    cy.get('button').should('have.length', 2);
    cy.get('button').eq(0).click();
    cy.get('button').should('have.length', 2);
    cy.get('input').eq(0).type(`test`);
    cy.get('button').eq(0).click();
    cy.get('button').should('have.length', 2);
    cy.get('button').eq(0).click();
    cy.get('div[class*="EventsSection_error"]')
      .eq(0)
      .should('have.text', 'Enter all * values please!');
  });

  it('should creates business', () => {
    cy.get('button').should('have.length', 2);
    cy.get('input').eq(0).type(`new_test_project${generateHash()}`);
    cy.get('textarea').eq(0).type(`new_test_project${generateHash()} description`);
    cy.get('button').eq(0).click();

    cy.get('button').should('have.length', 2);
    cy.get('input').eq(0).type(`123`);
    cy.get('input').eq(1).type(`123`);
    cy.get('input').eq(2).type(`123`);
    cy.get('input').eq(3).type(`123`);
    cy.get('input').eq(4).type(`123`);
    cy.get('textarea').eq(0).type(`spendings description`);
    cy.get('button').eq(0).click();

    cy.get('button').should('have.length', 2);
    cy.get('input').eq(0).type(`123`);
    cy.get('input').eq(1).type(`incomings description`);
    cy.get('button').eq(0).click();

    cy.url().should('eq', 'http://localhost:3000/profile/own');

    cy.get('div[class*="EventsSection_success"]')
      .eq(0)
      .should('have.text', 'Plan created succesfully!');
  });
});
