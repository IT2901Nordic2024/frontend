describe('MyHabitsPage', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.get('input[name="username"]').type('FrodeFrydmann')
    cy.get('input[name="password"]').type('Passord123')
    cy.get('form').submit()
    cy.url().should('include', '/my-habits')
  })

  it('Loads and Displays Habits', () => {
    cy.visit('/my-habits') // Visit the page URL

    cy.intercept('GET', '**/api/habits').as('getHabits')

    // Check if the heading is displayed
    cy.get('h1').should('contain', 'My Habits')

    // Check if the Add Habit button is present
    cy.get('button').contains('Add Habit').should('be.visible')

    // Check if habit cards are displayed
    cy.get('.habit-card').should('have.length.greaterThan', 0)
  })

  it('Redirects to Login if User Not Logged In', () => {
    // Clear cookies to simulate logged out state
    cy.clearCookies()

    // Visit the page URL
    cy.visit('/my-habits')

    // Check if redirected to the login page
    cy.url().should('include', '/')
  })
})
