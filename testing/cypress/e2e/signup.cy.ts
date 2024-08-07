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

  it('should allow user to input text into form fields', ()=>{
    cy.getByData('cypress-userNameInput').type('johnDoe').should('have.value', 'johnDoe')
    cy.getByData('cypress-userEmailInput').type('john.doe@example.com').should('have.value', 'john.doe@example.com')
    cy.getByData('cypress-userPasswordInput').type('password@1234').should('have.value','password@1234')
  })

  it('render and interact with language checkbox', ()=>{
    cy.getByData('cypress-userPreferEng').should('be.visible')
    cy.getByData('cypress-userPreferSpan').should('be.visible')

    cy.getByData('cypress-userPreferSpan').should('not.be.checked')
    cy.getByData('cypress-userPreferEng').should('not.be.checked')

    cy.getByData('cypress-userPreferSpan').click()
    cy.getByData('cypress-userPreferSpan').should('be.checked')
    cy.getByData('cypress-userPreferEng').should('not.be.checked')

    cy.getByData('cypress-userPreferEng').click()
    cy.getByData('cypress-userPreferEng').should('be.checked')
    cy.getByData('cypress-userPreferSpan').should('not.be.checked')

  })

  // it('ensures the signup btn is disabled while loading', () =>{
  //   cy.getByData('cypress-signupBtn').should('be.disabled')
  // })
  it('checks the form submission process', ()=>{
    cy.getByData('cypress-userNameInput').type('JohnDoe')
    cy.getByData('cypress-userEmailInput').type('john.doe@example.com')
    cy.getByData('cypress-userPasswordInput').type('password@1234')
    cy.getByData('cypress-userPreferEng').click()
    cy.getByData('cypress-signupBtn').click()
  })

  it('verify navigation to the login page', () =>{
    cy.get('a[href="/login"]').click()
    cy.url().should('include', '/login')
  })

 
})