Cypress.Commands.add("getByTestId", (testId) => {
  return cy.get(`[data-test-id='${testId}']`);
});
