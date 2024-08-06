//tests to be written
//form inputs: insure that the inputs are correctly rendered and can accept user input
//language checkbox: verify that the checkbox for selecting the prefered language works as expected
//form submisstion: test the form submission process to ensure that the 'sign up' function is called with the correct data
//button disabled state: check that the sign up button is disabled while loading and shows the correct text
//navigation: ensure that the link to the login page works 



describe('test signup page', () => {
  beforeEach(()=>{
    cy.visit('http://localhost:5173/signup')
  });

  it('render the form inputs correctly', ()=>{
    cy.getByData('cypress-userNameInput').should('be.visible')
    cy.getByData('cypress-userEmailInput').should('be.visible')
    cy.getByData('cypress-userPasswordInput').should('be.visible')
  });

 
})