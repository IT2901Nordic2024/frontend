describe('AnalyticsPage', () => {
  before(() => {
    // Visit the home page and login
    cy.visit('/')
    cy.get('input[name="username"]').type('FrodeFrydmann')
    cy.get('input[name="password"]').type('Passord123')
    cy.get('form').submit()
    cy.url().should('include', '/my-habits')

    // Add a habit once after logging in
    cy.get('button').contains('Add Habit').click()
    cy.get('input[placeholder="Name of your habit"]').type('Exercise')

    cy.get('.select-side-trigger').click()
    cy.get('.select-side-5').click()

    cy.get('.select-type-trigger').click()
    cy.get('.select-count-trigger').click()

    cy.get('button').contains('Add').click()
  })

  beforeEach(() => {
    // Ensure we're on the main page before each test
    // if url is not myhabits, login
    cy.url().then((url) => {
      if (!url.includes('my-habits')) {
        cy.visit('/')
        cy.get('input[name="username"]').type('FrodeFrydmann')
        cy.get('input[name="password"]').type('Passord123')
        cy.get('form').submit()
      }
    })
  })

  it('Analytics page displays', () => {
    cy.get('.habit-card').contains('Exercise').click()
    cy.url().should('match', /\/my-habits\/\d+/)
  })
  it('Handle goals correctly', () => {
    cy.get('.habit-card').contains('Exercise').click()
    cy.get('button').contains('Add Goal').click()
    cy.get('input[placeholder="e.g. How many hours did I sleep"]').type('Did you exercise today')
    cy.get('input[placeholder="e.g. 10"]').type('5')

    cy.get('.select-frequency-trigger').click()
    cy.get('.select-frequency-day').click()

    cy.get('button').contains('Add').click()

    cy.get('.goal-chart').should('exist')

    cy.get('.goal-chart').contains('Did you exercise today')
  })

  it('Goal changes work', () => {
    cy.get('.habit-card').contains('Exercise').click()
    cy.get('.edit-button').contains('Edit').should('exist')

    cy.get('.edit-button').contains('Edit').click()

    cy.get('input[placeholder="e.g. How many hours did I sleep"]').type('Changed question')
    cy.get('input[placeholder="e.g. 10"]').type('5')

    cy.get('.select-frequency-trigger').click()
    cy.get('.select-frequency-day').click()

    cy.get('.submit-changes').contains('Save changes').click()

    cy.get('.goal-chart').contains('Changed question')
  })

  after(() => {
    // Cleanup code that runs once after all tests
    cy.get('.delete-habit-button').contains('Delete Habit').click()
    cy.contains('Are you sure you want to delete your habit forever?').should('be.visible')
    cy.get('.confirm-delete').contains('Yes').click()

    cy.get('.habit-card').should('not.contain', 'Exercise')
  })
})
