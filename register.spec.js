import faker from 'faker';

describe('Test all register API test cases', () => {
  it('should return an error if the first name is not part of the body', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        lastName: 'hatamleh',
        email: 'hatem.hataamleh@gmail.com',
        password: 'Test123!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        '"firstName" is required'
      );
    });
  });

  it('should return an error if the first name less than two characters', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        firstName: 'h',
        lastName: 'hatamleh',
        email: 'hatem.hataamleh@gmail.com',
        password: 'Test123!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        '"firstName" length must be at least 3 characters long'
      );
    });
  });

  it('should return an error if the last name is not part of the body', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        firstName: 'hatem',
        email: 'hatem.hataamleh@gmail.com',
        password: 'Test123!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        '"lastName" is required'
      );
    });
  });

  it('should return an error if the last name less than two characters', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        firstName: 'hatem',
        lastName: 'h',
        email: 'hatem.hataamleh@gmail.com',
        password: 'Test123!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        '"lastName" length must be at least 3 characters long'
      );
    });
  });

  it('should return an error if the email is not part of the body', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        firstName: 'hatem',
        lastName: 'hatamleh',
        password: 'Test123!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        '"email" is required'
      );
    });
  });

  it('should return an error if the email wrong', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        firstName: 'hatem',
        lastName: 'hatamleh',
        email: 'hatem.hataamleh',
        password: 'Test123!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        '"email" must be a valid email'
      );
    });
  });

  it('should return an error if the password is not part of the body', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        firstName: 'hatem',
        lastName: 'hatamleh',
        email: 'hatem.hataamleh@gmail.com',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.eql(
        '"password" is required'
      );
    });
  });

  it('should return an error if the password is wrong', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        firstName: 'hatem',
        lastName: 'hatamleh',
        email: 'hatem.hataamleh@gmail.com',
        password: 'Test1',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(400);
      expect(res.body.message).to.contain(
        'fails to match the required pattern'
      );
    });
  });

  it('should register a user correctly', () => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/register',
      method: 'POST',
      body: {
        firstName: 'hatem',
        lastName: 'hatamleh',
        email: faker.internet.email(),
        password: 'Test123!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eql(201);
      expect(res.body.firstName).to.eql('hatem');
    });
  });
});
