describe('Check all adding new todo functionalities', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGQwYjRjYWExNWJhMjc5MjgyOWU0ZiIsImZpcnN0TmFtZSI6IkhhdGVtICIsImxhc3ROYW1lIjoiSGF0YW1sZWgiLCJpYXQiOjE2Mzc0MTIxMTR9._5AzYiLpD4n5noImOYb1AF1kS-InkHnDfTGDNHV3vug","userID":"618d0b4caa15ba2792829e4f","firstName":"Ahmad "}'
    );

    cy.intercept('GET', '**/api/v1/tasks', {
      fixture: 'tasks',
    });

    cy.intercept('POST', '/api/v1/tasks', {}).as('newTask');
    cy.visit('/todo');
    cy.get('[data-testid=add]').click();
  });

  it('should navigate to Todos page', () => {
    cy.url().should('contain', '/todo/new');
  });

  it('should show an error if the task is less than 3 characters', () => {
    cy.get('[data-testid=new-todo]').type('TC');
    cy.get('[data-testid=submit-newTask]').click();
    cy.contains(
      'it should be more than 3 characters'
    ).should('be.visible');
  });

  it('should send the correct data to the server', () => {
    cy.get('[data-testid=new-todo]').type('Learn Appium');
    cy.get('[data-testid=submit-newTask]').click();
    cy.wait('@newTask').then((xhr) => {
      expect(xhr.request.body.item).to.eq('Learn Appium');
    });
  });
});
