/**
 * uuid analog
 */
function generateHash() {
  return '--' + Date.now();
}

describe('Auth page is functioning right', () => {
  it('shows page content', () => {
    cy.visit('http://localhost:3000/auth');

    /**
     * check page renders without errors
     */
    cy.get('input').should('have.length', 7);
  });

  it('validates empty fields', () => {
    /**
     * check empty field validation
     */
    cy.get('input').eq(0).type('root');

    cy.get('button[class^="Button_button"]').eq(0).click();

    cy.get('div[class*="EventsSection_error"]')
      .eq(0)
      .should('have.text', 'Need to correct fields!');
  });

  it('checks wrong password server response', () => {
    /**
     * check wrong password server answer
     */
    cy.get('input').eq(1).type('root1');

    cy.get('button[class^="Button_button"]').eq(0).click();

    cy.get('div[class*="EventsSection_error"]').should('have.length', 2); // if check second elem right here, it will fail, but it knows about length = 2 WOW
    cy.get('div[class*="EventsSection_error"]')
      .eq(1)
      .should('have.text', 'No such user, please check login or password!');
  });

  it('checks right server response', () => {
    /**
     * check good auth data submition
     */
    cy.get('input').eq(1).clear();
    cy.get('input').eq(1).type('root');

    cy.get('button[class^="Button_button"]').eq(0).click();

    cy.url().should('eq', 'http://localhost:3000/profile');
  });

  it('checks right server check token response', () => {
    /**
     * exit, we didn't finished
     * part of 2_profile.spec testing
     */
    cy.visit('http://localhost:3000/profile/own');

    cy.url().should('eq', 'http://localhost:3000/auth');
  });

  it('checks wrong sign up server response', () => {
    /**
     * check wrong sign up data submition
     */
    cy.get('button[class^="Button_button"]').eq(1).click();
    cy.get('div[class*="EventsSection_error"]')
      .eq(0)
      .should('have.text', 'Please, accept the terms!');

    cy.get('#checkbox').click();
    cy.get('button[class^="Button_button"]').eq(1).click();
    cy.get('div[class*="EventsSection_error"]')
      .eq(1)
      .should('have.text', 'Need to correct fields!');

    cy.get('input').eq(2).type('root');
    cy.get('input').eq(3).type('root');
    cy.get('input').eq(4).type('root');
    cy.get('input').eq(5).type('root');
    cy.get('button[class^="Button_button"]').eq(1).click();
    cy.get('div[class*="EventsSection_error"]').should('have.length', 3); // Same problem [GO TO line 26]
    cy.get('div[class*="EventsSection_error"]')
      .eq(2)
      .should('have.text', 'Duplicate login or nickname, change it please!');

    cy.get('input').eq(2).clear();
    cy.get('input').eq(3).clear();
    cy.get('input').eq(4).clear();
    cy.get('input').eq(5).clear();
  });

  it('checks right sign up server response', () => {
    /**
     * need run in TEST_DEV (isolated docker container gor example)
     * so it will create test accounts with rnd hash
     */
    let uniqueHash = generateHash();
    cy.get('input')
      .eq(2)
      .type('fakeRoot:TEST' + uniqueHash);
    cy.get('input')
      .eq(3)
      .type('fakeRoot:TEST' + uniqueHash);
    cy.get('input')
      .eq(4)
      .type('fakeRoot:TEST' + uniqueHash);
    cy.get('input')
      .eq(5)
      .type('fakeRoot:TEST' + uniqueHash);
    cy.get('button[class^="Button_button"]').eq(1).click({ force: true }); //want to set force option because of out of the view, it is very strange
  });

  /**
   * this is e2e test, so we shouldn't use mock for register users
   * cy.intercept('POST', '/api/addUser', []).as('register');
   * cy.wait('@register');
   */
});
