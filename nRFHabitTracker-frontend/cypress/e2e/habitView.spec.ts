describe('MyHabitsPage', () => {
  beforeEach(() => {
    cy.visit('/my-habits')
  })
  it('Loads habits successfully', () => {
    //intercept API request and respond with mock data
    cy.intercept('GET', 'https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/habits/0', {
      statusCode: 200,
      body: {
        habits: [
          { habitId: 1, habitName: 'Sleeping', habitType: 'Time', deviceSide: 'Side 1' },
          { habitId: 2, habitName: 'Coffie', habitType: 'Count', deviceSide: 'Side 2' },
        ],
      },
    }).as('fetchHabits')
    cy.wait('@fetchHabits')

    //check for presecne of habit data in the DOM
    cy.contains('Sleeping').should('be.visible')
    cy.contains('Coffie').should('be.visible')
  })

  it('Displays a message when no habits are present', () => {
    //intercept API request and respond with empty data
    cy.intercept('GET', 'https://hk7sx4q7v9.execute-api.eu-north-1.amazonaws.com/habits/0', {
      statusCode: 200,
      body: { habits: [] },
    }).as('fetchHabits')
    cy.wait('@fetchHabits')

    //check for presence of message in the DOM
    cy.contains('No habits have been created yet. Start by adding a new habit!').should('be.visible')
  })
})
