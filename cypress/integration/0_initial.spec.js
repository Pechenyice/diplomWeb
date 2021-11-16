describe('App loads right', () => {
  it('shows landing content', () => {
    cy.visit('http://localhost:3000');

    /**
     * check page renders without errors
     */
    cy.xpath('/html/body/div/section/section[1]/div[1]/h1').should(
      'have.text',
      'Business area for business idea'
    );

    /**
     * go to 1_auth spec
     */
    cy.xpath('/html/body/div/section/header/div[2]/a[3]').click();
    cy.url().should('eq', 'http://localhost:3000/auth');
  });
});
