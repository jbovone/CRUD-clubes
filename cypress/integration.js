
context('Pagination', () => {
  beforeEach(() => {
    cy.visit('https://localhost:8080');
  });
  it('tests a page number',() => {
    cy.get('#team-list').click()
    .find('a[href="/teams/2"]')
    cy.get('#team-list').click() 

    })
});
