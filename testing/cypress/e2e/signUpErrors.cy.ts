describe("Sign Up Page Error Handling ", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/signup");
  });
  it("should display error messages for invalid inputs", () => {
    //submit with all empty field inputs
    cy.getByData("cypress-signupBtn").click();
    cy.contains("Please make sure to fill all the fields").should("be.visible");
    //fill in username and email but leave password empty
    cy.getByData("cypress-userNameInput").type("John");
    cy.getByData("cypress-userEmailInput").type("john@example.com");
    cy.getByData("cypress-userPasswordInput").clear();
    cy.getByData("cypress-userPreferEng").check();

    // cy.getByData('cypress-signupBtn').click()
    // cy.contains('Password must be at least 6 characters long').should('be.visible')

    cy.getByData("cypress-userPasswordInput").type("short");
    cy.getByData("cypress-signupBtn").click();
    cy.contains("Password must be at least 6 characters long").should(
      "be.visible"
    );

    cy.getByData("cypress-userNameInput").clear().type("yas");
    cy.getByData("cypress-userEmailInput").clear().type("john@example.com");
    cy.getByData("cypress-userPasswordInput").clear().type("password123");
    cy.getByData("cypress-signupBtn").click();
    cy.contains("Username must have at least 8 characters").should(
      "be.visible"
    );
  });

  it.only("should display error message when email already exists", () => {
    cy.intercept("POST", "/api/auth/signup", {
      statusCode: 401, // Typically, 400 is used for client errors like "Bad Request"
      body: {
        error: "Email address is already in use",
      },
    }).as("signupRequest");
    cy.getByData("cypress-userNameInput").type("Johndoa123");
    cy.getByData("cypress-userEmailInput").type("existing.email@example.com");
    cy.getByData("cypress-userPasswordInput").type("password1234");
    cy.getByData("cypress-userPreferEng").check();
    cy.getByData("cypress-signupBtn").click();
    cy.wait("@signupRequest");
    cy.contains("Email address is already in use").should("be.visible");
    cy.url().should('eq', 'http://localhost:5173/signup')
  });
});
