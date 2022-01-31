describe("Typing in input", () => {

    const newTodo = { id: 55, title: "Runnig in the morning", completed: false };

    beforeEach(() => {
        cy.seedAndVisit();
    });

    it("Add a new todo item", () => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/ToDoModels',
            response: newTodo
        }).as('save');

        cy.fixture('todos').then(text => {
            cy.route('GET', '/ToDoModels', [...text, newTodo]).as('second-load');
        });

        cy.get("#title").type(newTodo.title).type('{enter}');
        cy.wait('@save');
        cy.wait('@second-load');

        cy.get('.task-wrapper').should('have.length', 6);
    });


    it("Edit a todo item", () => {
        cy.get('.task-wrapper button.edit').first().click(); // Click in edit button
        cy.get("#title").clear().type(newTodo.title).should('have.value', newTodo.title).type('{enter}'); // update title task
    });

    it.only("Delete a todo item", () => {
        cy.server();

        cy.route({
            method: 'DELETE',
            url: '/ToDoModels',
            response: newTodo
        })
        cy.get('.task-wrapper').should('have.length', 4);
    });

    it("Done a specific todo", () => {
        cy.get("span[class='title']").contains('One').click();
    });

});