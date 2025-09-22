describe('Test all the E2E scenarios', () => {
  it('should be able to add, update and delete a task', () => {
    cy.visit('/');

    cy.login('me@hatemhatamleh.com', 'Test123!');

    cy.get('[data-testid=welcome]').should('be.visible');
    cy.get('[data-testid=add]').click();
    cy.get('[data-testid=new-todo]').type('learn Cypress');
    cy.get('[data-testid=submit-newTask]').click();
    cy.get('[data-testid=todo-text]')
      .first()
      .should('contain.text', 'learn Cypress');
    cy.get('[data-testid=complete-task]').first().check();
    cy.get('[data-testid=todo-item]')
      .first()
      .should(
        'have.css',
        'background-color',
        'rgb(33, 76, 97)'
      );
    cy.get('[data-testid=delete]').first().click();
    cy.get('[data-testid=no-todos]').should('be.visible');
  });
});
