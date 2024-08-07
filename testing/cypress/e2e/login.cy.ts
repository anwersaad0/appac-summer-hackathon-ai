describe('test login page', () => {
  beforeEach(()=>{
    cy.visit("http://localhost:5173/login")
  });
  it('checks the forem submission process and navigation', () => {
   
    cy.getByData('cypress-inputUserName').type('Yasmine Elnadi')
    cy.getByData('cypress-inputPassword').type("Yasmine1234")
    cy.getByData('cypress-loginbtn').click()
    cy.url().should('eq','http://localhost:5173/')
  })
})
