describe("Typing in input", () => {

    beforeEach(() => {
        cy.seedAndVisit();
    });

    it("Writing a long text in input", () => {
        cy.fixture('invalid').then(text => {
            cy.get('#title').type(text.textCharacters);
            cy.get('#title').should('have.value', text.textCharacters);
        });
    });
});