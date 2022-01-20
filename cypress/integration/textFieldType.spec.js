describe("Typing in input", () => {

    beforeEach(() => {
        cy.seedAndVisit();
    });

    afterEach(() => {
        cy.seedAndVisit();
    });

    it.only("Writing a long text in input", () => {
        cy.fixture('invalid').then(text => {
            cy.get('#title').type(text.textCharacters);
            cy.get('#title').should('have.value', text.textCharacters);
        });
        cy.get("[id^='submit']").click();

    });


    it("Writing a long text in input", () => {
        cy.fixture('invalid').then(text => {
            cy.get('#title').type(text.textNull);
            cy.get('#title').should('have.value', text.textCharacters);
        });
    });
});