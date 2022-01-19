describe("App intialization", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("Displays todos from API on load", () => {
        cy.get('.task-wrapper').should('have.length', 3);
    });
});