/// <reference types="Cypress" />

describe('should check all the functionalities of the Welcome message', () => {
  beforeEach(() => {
    localStorage.setItem(
      'user',
      '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGQwYjRjYWExNWJhMjc5MjgyOWU0ZiIsImZpcnN0TmFtZSI6IkhhdGVtICIsImxhc3ROYW1lIjoiSGF0YW1sZWgiLCJpYXQiOjE2Mzc0MTIxMTR9._5AzYiLpD4n5noImOYb1AF1kS-InkHnDfTGDNHV3vug","userID":"618d0b4caa15ba2792829e4f","firstName":"Ahmad "}'
    );

    cy.intercept('GET', '**/api/v1/tasks', {
      fixture: 'tasks',
    });
  });

  it('should show time to sleep message', () => {
    const now = new Date('February 12, 2021 01:00:00');
    cy.clock(now);
    cy.visit('/todo');
    cy.get('[data-testid=welcome]').should(
      'contain.text',
      'Time to sleep'
    );
  });

  it('should show good morning message', () => {
    const now = new Date('February 12, 2021 09:00:00');
    cy.clock(now);
    cy.visit('/todo');
    cy.get('[data-testid=welcome]').should(
      'contain.text',
      'Good morning'
    );
  });

  it('should show good afternoon message', () => {
    const now = new Date('February 12, 2021 14:00:00');
    cy.clock(now);
    cy.visit('/todo');
    cy.get('[data-testid=welcome]').should(
      'contain.text',
      'Good afternoon'
    );
  });

  it('should show good evening message', () => {
    const now = new Date('February 12, 2021 20:00:00');
    cy.clock(now);
    cy.visit('/todo');
    cy.get('[data-testid=welcome]').should(
      'contain.text',
      'Good Evening'
    );
  });

  it('should not show the first name if there is no first name properity in the local storage', () => {
    localStorage.setItem(
      'user',
      '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGQwYjRjYWExNWJhMjc5MjgyOWU0ZiIsImZpcnN0TmFtZSI6IkhhdGVtICIsImxhc3ROYW1lIjoiSGF0YW1sZWgiLCJpYXQiOjE2Mzc0MTIxMTR9._5AzYiLpD4n5noImOYb1AF1kS-InkHnDfTGDNHV3vug","userID":"618d0b4caa15ba2792829e4f"}'
    );
    cy.visit('/todo');
    cy.get('[data-testid=welcome]').should(
      'contain.text',
      'user'
    );
  });

  it('should not show the first name if the first name is less than 2 letters', () => {
    localStorage.setItem(
      'user',
      '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGQwYjRjYWExNWJhMjc5MjgyOWU0ZiIsImZpcnN0TmFtZSI6IkhhdGVtICIsImxhc3ROYW1lIjoiSGF0YW1sZWgiLCJpYXQiOjE2Mzc0MTIxMTR9._5AzYiLpD4n5noImOYb1AF1kS-InkHnDfTGDNHV3vug","userID":"618d0b4caa15ba2792829e4f","firstName":"A"}'
    );
    cy.visit('/todo');
    cy.get('[data-testid=welcome]').should(
      'contain.text',
      'user'
    );
  });

  it('should not show the first name if the first name contains @', () => {
    localStorage.setItem(
      'user',
      '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGQwYjRjYWExNWJhMjc5MjgyOWU0ZiIsImZpcnN0TmFtZSI6IkhhdGVtICIsImxhc3ROYW1lIjoiSGF0YW1sZWgiLCJpYXQiOjE2Mzc0MTIxMTR9._5AzYiLpD4n5noImOYb1AF1kS-InkHnDfTGDNHV3vug","userID":"618d0b4caa15ba2792829e4f","firstName":"Ahaha@aa"}'
    );
    cy.visit('/todo');
    cy.get('[data-testid=welcome]').should(
      'contain.text',
      'user'
    );
  });

  it('should not show the first name if the first name contains .', () => {
    localStorage.setItem(
      'user',
      '{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGQwYjRjYWExNWJhMjc5MjgyOWU0ZiIsImZpcnN0TmFtZSI6IkhhdGVtICIsImxhc3ROYW1lIjoiSGF0YW1sZWgiLCJpYXQiOjE2Mzc0MTIxMTR9._5AzYiLpD4n5noImOYb1AF1kS-InkHnDfTGDNHV3vug","userID":"618d0b4caa15ba2792829e4f","firstName":"Ahaha.aa"}'
    );
    cy.visit('/todo');
    cy.get('[data-testid=welcome]').should(
      'contain.text',
      'user'
    );
  });
});
