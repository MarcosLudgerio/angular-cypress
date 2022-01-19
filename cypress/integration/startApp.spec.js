describe("App intialization", () => {

    it("Displays todos from API on load", () => {
        cy.server(); // Start a server to begin routing responses to cy.route() and to change the behavior of network requests.
        /**
         * fixture('todos').then(res => {
         * cy.route('GET', '/ToDoModels', res); // To manage the behavior of network requests.
        });
        */
        cy.route('GET', '/ToDoModels', "fixture:todos").as("load"); // Alternative form for execute the test 
        // as: Assign an alias for later use. Reference the alias later within a cy.get() or cy.wait() command with an @ prefix.
        cy.wait("@load"); // wait: Wait for a number of milliseconds or wait for an aliased resource to resolve before moving on to the next command.
        cy.visit("/");
        cy.get('.task-wrapper').should('have.length', 5);
    });

});