/// <reference types="Cypress" />

describe('should check all the functionalities of the login page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  // email test cases

  it('should show an error if the email in empty', () => {
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Please Insert a correct Email format'
      );
  });

  it('should show an error if the email is not correct', () => {
    cy.get('[data-testid=email]').type('hatem');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Please Insert a correct Email format'
      );
  });

  it('should not show the error message if the email is correct', () => {
    cy.get('[data-testid=email]').type('hatem@gmail.com');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Password must be Minimum eight characters'
      );
  });

  // password

  it('should show an error if the password in empty', () => {
    cy.get('[data-testid=email]').type('hatem@gmail.com');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Password must be Minimum eight characters'
      );
  });

  [
    'test',
    'testsahjdgjh',
    'trsad8989797878',
    'Tesadfgsad123',
  ].forEach((password) => {
    it(
      'should show an error if the password is ' + password,
      () => {
        cy.get('[data-testid=email]').type(
          'hatem@gmail.com'
        );
        cy.get('[data-testid=password]').type(password);
        cy.get('[data-testid=submit]').click();
        cy.get('.MuiFormHelperText-root')
          .should('be.visible')
          .and(
            'contain',
            'Password must be Minimum eight characters'
          );
      }
    );
  });

  it('should send the correct data when registering a user', () => {
    cy.intercept('POST', '**/api/v1/users/login', {
      fixture: 'register',
      statusCode: 200,
    }).as('register');

    cy.get('[data-testid=email]').type(
      'testhatem1@gmail.com'
    );
    cy.get('[data-testid=password]').type('Test123!');
    cy.get('[data-testid=submit]').click();

    cy.wait('@register').then((xhr) => {
      expect(xhr.request.body.email).to.eq(
        'testhatem1@gmail.com'
      );
      expect(xhr.request.body.password).to.eq('Test123!');
    });
  });

  it('should show that the user is already registered', () => {
    cy.intercept('POST', '**/api/v1/users/login', {
      fixture: 'registerError',
      statusCode: 400,
    }).as('register');

    cy.get('[data-testid=email]').type(
      'testhatem1@gmail.com'
    );
    cy.get('[data-testid=password]').type('Test123!');
    cy.get('[data-testid=submit]').click();
    cy.get('[data-testid=error-alert]').should(
      'be.visible'
    );
  });
});
