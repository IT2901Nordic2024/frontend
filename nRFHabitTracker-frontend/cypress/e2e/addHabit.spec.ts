describe('AddHabitPage', () => {
    beforeEach(() => {
        cy.visit('/add-habit');
    });
    it('Validates user input', () => {
        // Fill in the habit name field
        cy.get('input[placeholder="Name of your habit"]').type('W');


        // Submit the form
        cy.get('form').submit();

        // Verify that the habit has been added
        cy.contains('Name must be at least 2 characters.');
        cy.contains('Please select a side.');
        cy.contains('Please select a type.');
    });
    it('Allows a user to add a habit', () => {
        cy.intercept('PUT', 'https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/createHabit/0/firmwareSimulatorThing/Coffee/count/1', {
            statusCode: 200
        }).as('addHabit');

         // Verify that the habit has been added
         cy.window().then((win) => {
            cy.spy(win.console, 'log').as('consoleLog');
        });

        // Fill in the habit name field
        cy.get('input[placeholder="Name of your habit"]').type('Coffee')

        cy.contains('Select a side').click();
        cy.contains('Side 1').click();

        cy.contains('Select a type').click();
        cy.contains('Count').click()

        // Submit the form
        cy.get('form').submit()

        cy.wait('@addHabit');

        cy.get('@consoleLog').should('be.calledWith', 'Habit added successfully');

    });
});

