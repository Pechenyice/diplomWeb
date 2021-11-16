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

  it('validates empty fields', () => {
    cy.get('input').should('have.length', 5);
    cy.get('input').eq(1).clear();
    cy.get('button').eq(0).click();

    cy.get('div[class*="EventsSection_error"]')
      .eq(0)
      .should('have.text', 'Cannot save empty nickname!');
  });

  it('updates nickname', () => {
    cy.get('input').should('have.length', 5);
    cy.get('input').eq(1).clear();
    cy.get('input').eq(1).type(`tester${generateHash()}`);
    cy.get('button').eq(0).click();

    cy.get('div[class*="EventsSection_success"]').should('have.length', 1);
    cy.get('div[class*="EventsSection_success"]')
      .eq(0)
      .should('have.text', 'Nickname changed succesfully!');
  });

  it('validates wrong new password', () => {
    cy.get('input').should('have.length', 5);
    cy.get('input').eq(2).type(`test`);
    cy.get('input').eq(3).type(`neverWillBeSuchPassword123`);
    cy.get('input').eq(4).type(`neverWillBeSuchPassword`);
    cy.get('button').eq(1).click();

    cy.get('div[class*="EventsSection_error"]')
      .eq(0)
      .should('have.text', 'New passwords are not equal!');
  });

  it('validates wrong current password', () => {
    cy.get('input').should('have.length', 5);
    cy.get('input').eq(2).type(`neverWillBeSuchPassword`);
    cy.get('input').eq(3).type(`neverWillBeSuchPassword123`);
    cy.get('input').eq(4).type(`neverWillBeSuchPassword123`);
    cy.get('button').eq(1).click();

    cy.get('div[class*="EventsSection_error"]')
      .eq(0)
      .should('have.text', 'Cannot update password!');
  });

  it('updates password', () => {
    cy.get('input').should('have.length', 5);
    cy.get('input').eq(2).type(`test`);
    cy.get('input').eq(3).type(`test123`);
    cy.get('input').eq(4).type(`test123`);
    cy.get('button').eq(1).click();

    cy.get('div[class*="EventsSection_success"]')
      .eq(0)
      .should('have.text', 'Password changed succesfully!');

    cy.get('input').eq(2).clear();
    cy.get('input').eq(3).clear();
    cy.get('input').eq(4).clear();
    cy.get('input').eq(2).type(`test123`);
    cy.get('input').eq(3).type(`test`);
    cy.get('input').eq(4).type(`test`);
    cy.get('button').eq(1).click();

    cy.get('div[class*="EventsSection_success"]').should('have.length', 2);
    cy.get('div[class*="EventsSection_success"]')
      .eq(1)
      .should('have.text', 'Password changed succesfully!');
  });
});
