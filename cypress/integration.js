it('test the pagination', () => {
  // https://on.cypress.io/clear
  cy.get('.action-clear')
      .type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '');
});
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
