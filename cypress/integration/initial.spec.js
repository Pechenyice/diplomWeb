describe('App loads right', () => {
  it('show landing content', () => {
    cy.visit('http://localhost:3000');
    cy.xpath('/html/body/div/section/section[1]/div[1]/h1')
      .should(
        "have.text",
        "Business area for business idea"
      );
  });
});
