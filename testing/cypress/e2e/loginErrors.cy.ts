describe("Login page - Non-Existent-User", ()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:5173/login")

        cy.intercept('POST', '/api/auth/login', {
            statusCode: 402,
            body:{
                error:"User does not exist"
            }
        }).as('loginRequest')
    })
    it('displays an error for non-existant user',()=>{
        cy.getByData("cypress-inputUserName").type('NonExistentUser')
        cy.getByData("cypress-inputPassword").type('wrongpassword')
        cy.getByData('cypress-loginbtn').click()

        cy.wait('@loginRequest');
        cy.contains("User does not exist").should("be.visible");
    })
})