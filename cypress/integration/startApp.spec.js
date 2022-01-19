describe("App intialization", () => {

    it("Displays todos from API on load", () => {
        cy.server(); // Start a server to begin routing responses to cy.route() and to change the behavior of network requests.
        cy.route('GET', '/ToDoModels', []); // To manage the behavior of network requests.
        cy.visit("/");
        cy.get('.task-wrapper').should('have.length', 3);
    });

});