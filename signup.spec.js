/// <reference types="Cypress" />

describe('should check all the functionalities of the signup page', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('should show an error if the first name in empty', () => {
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and('contain', 'First Name is required');
  });

  it('should show an error if the first name is less than 3 characters', () => {
    cy.get('[data-testid=first-name]').type('ab');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and('contain', 'First Name is required');
  });

  it('should not show the error message if the first name is more or equal 3 characters', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and('contain', 'Last Name is required');
  });

  // Last name test cases

  it('should show an error if the last name in empty', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and('contain', 'Last Name is required');
  });

  it('should show an error if the last name is less than 3 characters', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('ab');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and('contain', 'Last Name is required');
  });

  it('should not show the error message if the last name is more or equal 3 characters', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('abcd');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Please Insert a correct Email format'
      );
  });

  // email test cases

  it('should show an error if the email in empty', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('abcd');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Please Insert a correct Email format'
      );
  });

  it('should show an error if the email is not correct', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('abcd');
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
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('abcd');
    cy.get('[data-testid=email]').type('hatem@gmail.com');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Password must be Minimum eight characters'
      );
  });

  // email test cases

  it('should show an error if the password in empty', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('abcd');
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
        cy.get('[data-testid=first-name]').type('abcd');
        cy.get('[data-testid=last-name]').type('abcd');
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

  it('should not show the error message if the password is correct', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('abcd');
    cy.get('[data-testid=email]').type('hatem@gmail.com');
    cy.get('[data-testid=password]').type('Test123!');
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Second password does not match the first Password'
      );
  });

  // Confirm password

  it('should show the error message the password and confirm password are not the same', () => {
    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('abcd');
    cy.get('[data-testid=email]').type('hatem@gmail.com');
    cy.get('[data-testid=password]').type('Test123!');
    cy.get('[data-testid=confirm-password]').type(
      'Test123!!'
    );
    cy.get('[data-testid=submit]').click();
    cy.get('.MuiFormHelperText-root')
      .should('be.visible')
      .and(
        'contain',
        'Second password does not match the first Password'
      );
  });

  it('should send the correct data when registering a user', () => {
    cy.intercept('POST', '**/api/v1/users/register', {
      fixture: 'register',
      statusCode: 201,
    }).as('register');

    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('efg');
    cy.get('[data-testid=email]').type(
      'testhatem1@gmail.com'
    );
    cy.get('[data-testid=password]').type('Test123!');
    cy.get('[data-testid=confirm-password]').type(
      'Test123!'
    );
    cy.get('[data-testid=submit]').click();

    cy.wait('@register').then((xhr) => {
      expect(xhr.request.body.email).to.eq(
        'testhatem1@gmail.com'
      );
      expect(xhr.request.body.firstName).to.eq('abcd');
      expect(xhr.request.body.lastName).to.eq('efg');
      expect(xhr.request.body.password).to.eq('Test123!');
    });
  });

  it('should show that the user is already registered', () => {
    cy.intercept('POST', '**/api/v1/users/register', {
      fixture: 'registerError',
      statusCode: 400,
    }).as('register');

    cy.get('[data-testid=first-name]').type('abcd');
    cy.get('[data-testid=last-name]').type('efg');
    cy.get('[data-testid=email]').type(
      'testhatem1@gmail.com'
    );
    cy.get('[data-testid=password]').type('Test123!');
    cy.get('[data-testid=confirm-password]').type(
      'Test123!'
    );
    cy.get('[data-testid=submit]').click();
    cy.get('[data-testid=error]').should('be.visible');
  });
});
