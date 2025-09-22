describe('Check all Todos Functionality', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGQwYjRjYWExNWJhMjc5MjgyOWU0ZiIsImZpcnN0TmFtZSI6IkhhdGVtICIsImxhc3ROYW1lIjoiSGF0YW1sZWgiLCJpYXQiOjE2Mzc0MTIxMTR9._5AzYiLpD4n5noImOYb1AF1kS-InkHnDfTGDNHV3vug","userID":"618d0b4caa15ba2792829e4f","firstName":"Ahmad "}'
    );

    cy.intercept('GET', '**/api/v1/tasks', {
      fixture: 'tasks',
    });
  });

  it('should show the not completed task correctly', () => {
    cy.visit('/todo');
    cy.get('[data-testid="todo-item"]')
      .first()
      .should(
        'have.css',
        'background-color',
        'rgb(63, 81, 181)'
      );

    cy.get('[data-testid="complete-task"]')
      .first()
      .should('not.have.attr', 'checked');
  });

  it('should show the completed task correctly', () => {
    cy.visit('/todo');
    cy.get('[data-testid="todo-item"]')
      .last()
      .should(
        'have.css',
        'background-color',
        'rgb(33, 76, 97)'
      );

    cy.get('[data-testid="complete-task"]')
      .last()
      .should('have.attr', 'checked');

    cy.get('[data-testid="todo-text"]')
      .last()
      .should(
        'css',
        'text-decoration',
        'line-through solid rgb(145, 158, 171)'
      );
  });

  it('should show the pagination if the number of tasks is more than 5 ', () => {
    cy.intercept('GET', '**/api/v1/tasks', {
      fixture: 'tasksPagination',
    });
    cy.visit('/todo');
    cy.get('[data-test-id="pagination-link"]')
      .should('be.visible')
      .and('have.length', 2);
  });
});
