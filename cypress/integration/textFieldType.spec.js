const { assert } = require("console");

describe("Typing in input", () => {

    const newTodo = { id: 456, title: "Runnig in the morning", completed: false };

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


    it.only("Edit a todo item", () => {

        let elementButton = cy.get('.task-wrapper button.edit').first();


        elementButton.click(); // Click in edit button

        cy.get("#title").clear().type(newTodo.title).should('have.value', newTodo.title).type('{enter}'); // update title task
    });

});