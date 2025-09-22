describe('Test all tasks functionality', () => {
  let token;
  let taskID;

  before(() => {
    cy.request({
      url: 'http://localhost:8080/api/v1/users/login',
      method: 'POST',
      body: {
        email: 'me@hatemhatamleh.com',
        password: 'Test123!',
      },
      failOnStatusCode: false,
    }).then((res) => {
      token = res.body.access_token;
    });
  });

  it('should be able to add a new task', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:8080/api/v1/tasks',
      body: {
        item: 'Play Chess',
        isCompleted: false,
      },
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      taskID = res.body.addedTask._id;
      expect(res.status).to.eql(201);
    });
  });

  it('should return all the tasks', () => {
    cy.request({
      method: 'GET',
      url: 'http://localhost:8080/api/v1/tasks',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      expect(res.status).to.eql(200);
    });
  });

  it('should be able to update a task', () => {
    cy.request({
      method: 'PUT',
      url: 'http://localhost:8080/api/v1/tasks/' + taskID,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: {
        isCompleted: 'true',
        item: 'Hello',
      },
    }).then((res) => {
      expect(res.status).to.eql(200);
    });
  });

  it('should be able to delete a task', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/api/v1/tasks/' + taskID,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => {
      expect(res.status).to.eql(200);
    });
  });
});
