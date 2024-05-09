describe('AddHabitPage', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.get('input[name="username"]').type('FrodeFrydmann')
    cy.get('input[name="password"]').type('Passord123')
    cy.get('form').submit()
    cy.url().should('include', '/my-habits')
    cy.get('button').contains('Add Habit').click()
  })
  it('Validates user input', () => {
    // Fill in the habit name field
    cy.get('input[placeholder="Name of your habit"]').type('W')

    // Submit the form
    cy.get('form').submit()

    // Verify that the habit has been added
    cy.contains('Name must be at least 2 characters.')
    cy.contains('Please select a side.')
    cy.contains('Please select a type.')
  })
  it('Allows a user to add a habit', () => {
    // Intercept the request
    cy.intercept('PUT', '**/createHabit/**', {
      statusCode: 200,
      body: {},
    }).as('addHabitRequest')

    // Fill in the habit name
    cy.get('input[placeholder="Name of your habit"]').type('Exercise')

    // Open the side dropdown and select an item
    cy.get('.select-side-trigger').click()
    cy.get('.select-side-5').click()

    // Open the type dropdown and select an item
    cy.get('.select-type-trigger').click()
    cy.get('.select-count-trigger').click()

    // Submit the form
    cy.get('button').contains('Add').click()

    // Wait for the request to be made
    cy.wait('@addHabitRequest')

    // Check for success message
    cy.contains('Your habit has been added.').should('be.visible')
  })
})
