describe("Form input", () => {

    beforeEach(() => {
        cy.visit("/");
    });

    it("Focuses the input on load", () => {
        cy.focused().should("have.id", "title"); // Focused: Get the DOM element that is currently focused.
    });

    it.only("Accepts input", () => {
        cy.get('#title').type("New todo").should('have.value', "New todo");
    });
});