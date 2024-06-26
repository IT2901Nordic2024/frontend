describe('LoginPage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('allows a user to log in with correct credentials', () => {
    const username = 'FrodeFrydmann'
    const password = 'Passord123'

    // Fill in the username and password fields
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type(password)

    // Submit the form
    cy.get('form').submit()

    // Verify navigation to the destination page (to be changed)
    cy.url().should('include', '/my-habits')
  })

  it('validates sign up correctly', () => {
    cy.contains('Sign up').click()
    cy.url().should('include', '/signup')

    // less than 2 characters username
    cy.get('input[name="username"]').type('1')

    // invalid email
    cy.get('input[name="email"]').type('email')

    // less than 6 characters password
    cy.get('input[name="password"]').type('pass')

    // password does not match
    cy.get('input[name="confirmPassword"]').type('password')

    // device id less than 6 characters
    cy.get('input[name="deviceid"]').type('12345')

    cy.get('form').submit()

    // Verify error messages
    cy.contains('Username must be at least 2 characters long.')
    cy.contains('Invalid email address.')
    cy.contains('Password must be at least 6 characters long.')
    cy.contains('Passwords do not match.')
    cy.contains('Device ID must be at least 6 characters long.')
  })
})
