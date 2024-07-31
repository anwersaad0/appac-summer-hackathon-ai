describe('test login page', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/login')
    cy.getByData('cypress-loginbtn').should('be.visible').contains('Login')
    cy.get('a').should('be.visible').contains("Don't have an account?").click()
    cy.location("pathname").should("equal", "/signup")

  })
})
