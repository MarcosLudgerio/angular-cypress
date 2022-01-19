describe("Form input", () => {
    it("Focuses the input on load", () => {
        cy.visit("/");
        cy.focused().should("have.id", "title"); // Focused: Get the DOM element that is currently focused.
    });
});