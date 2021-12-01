/**
 * uuid analog
 */
function generateHash() {
  return '--' + Date.now();
}

const PROJECT_NAME = 'test-project' + generateHash();

describe('Creating businesses functional is functioning right', () => {
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
    cy.get('input').eq(0).type(`${PROJECT_NAME}`);
    cy.get('textarea').eq(0).type(`${PROJECT_NAME} description`);
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

describe('Reading businesses functional is functioning right', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth');

    cy.get('input').eq(0).type('test');
    cy.get('input').eq(1).type('test');

    cy.get('button[class^="Button_button"]').eq(0).click();

    cy.url().should('eq', 'http://localhost:3000/profile');

    cy.visit('http://localhost:3000/catalog');

    cy.get('input').should('have.length', 1);
    cy.wait(1000);
    cy.get('input').eq(0).type(PROJECT_NAME);
    cy.get('button').eq(0).click();
    cy.get('div[class*="BusinessCard_cardWrapper"]').should('have.length', 1);
    cy.get('div[class*="BusinessCard_cardWrapper"]').eq(0).click();
  });

  it('shows page content', () => {
    cy.get('h2[class*="BusinessPlan_subTitle"]').should('have.length', 10);
  });
});

describe('Updating businesses functional is functioning right', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth');

    cy.get('input').eq(0).type('test');
    cy.get('input').eq(1).type('test');

    cy.get('button[class^="Button_button"]').eq(0).click();

    cy.url().should('eq', 'http://localhost:3000/profile');

    cy.visit('http://localhost:3000/catalog');

    cy.get('input').should('have.length', 1);
    cy.wait(1000);
    cy.get('input').eq(0).type(PROJECT_NAME);
    cy.get('button').eq(0).click();
    cy.get('div[class*="BusinessCard_cardWrapper"]').should('have.length', 1);
    cy.get('div[class*="BusinessCard_cardWrapper"]').eq(0).click();
  });

  it('shows page content', () => {
    cy.get('button').should('have.length', 4);
    cy.get('button').eq(0).click();
    cy.url().should('include', '/editPlan');
  });

  it('has actual content', () => {
    cy.get('button').should('have.length', 4);
    cy.get('button').eq(0).click();
    cy.url().should('include', '/editPlan');
    cy.get('input').should('have.length', 1);
    cy.get('input').eq(0).should('have.value', PROJECT_NAME);
  });

  it('changes content', () => {
    cy.get('button').should('have.length', 4);
    cy.get('button').eq(0).click();
    cy.url().should('include', '/editPlan');
    cy.get('input').eq(0).clear();
    cy.get('input').eq(0).type('ready for deletion business');
    cy.get('button').eq(0).click();
    cy.get('button').should('have.length', 2);
    cy.get('button').eq(0).click();
    cy.get('button').should('have.length', 2);
    cy.get('button').eq(0).click();
  });
});

describe('Deleting businesses functional is functioning right', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth');

    cy.get('input').eq(0).type('test');
    cy.get('input').eq(1).type('test');

    cy.get('button[class^="Button_button"]').eq(0).click();

    cy.url().should('eq', 'http://localhost:3000/profile');

    cy.visit('http://localhost:3000/catalog');

    cy.get('input').should('have.length', 1);
    cy.wait(1000);
    cy.get('input').eq(0).type('ready for deletion business');
    cy.get('button').eq(0).click();
    cy.get('div[class*="BusinessCard_cardWrapper"]').should('have.length', 1);
    cy.get('div[class*="BusinessCard_cardWrapper"]').eq(0).click();
  });

  it('deletes business', () => {
    cy.get('button').should('have.length', 4);
    cy.get('p[class*="BusinessPlan_deletion"]').eq(0).click();
    cy.get('p[class*="BusinessPlan_deletion"]').should('have.length', 2);
    cy.get('p[class*="BusinessPlan_deletion"]').eq(0).click();
    cy.url().should('eq', 'http://localhost:3000/profile/own');

    cy.get('div[class*="EventsSection_success"]')
      .eq(0)
      .should('have.text', 'Plan deleted succesfully!');
  });
});
