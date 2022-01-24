describe("Form submit", () => {

    const newTodo = { id: 456, title: "Runnig in the morning", completed: false };

    it.only("Adds a new todo item", () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/ToDoModels',
            response: newTodo
        }).as('save');

        cy.seedAndVisit();

        cy.fixture('todos').then(text => {
            cy.route('GET', '/ToDoModels', [...text, newTodo]).as('second-load');
        });

        cy.get("#title").type(newTodo.title).type('{enter}');
        cy.wait('@save');
        cy.wait('@second-load');

        cy.get('.task-wrapper').should('have.length', 6);
    });

    it("Shows error message for a failed submission", () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/ToDoModels',
            response: {},
            status: 500
        }).as('save');

        cy.seedAndVisit();

        cy.get("#title").type(newTodo.title).type('{enter}');
        cy.wait('@save');

        cy.on('window:alert', text => {
            expect(text).to.contains('500');
        });

        cy.get('.task-wrapper').should('have.length', 5);
    });

});