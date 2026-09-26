const baseurl = Cypress.config('baseUrl')

class loginPage {
    // Object untuk element yang di login
    element = {
        userName: () => cy.get('input[name="username"]'),
        passWord: () => cy.get('input[name="password"]'),
        buttonLogin: () => cy.get('.orangehrm-login-button')
    }

    // Method untuk akses web memalui link
    visitWeb () {
        cy.visit(baseurl)
        //cy.wait(5000)
        return this
    }
    
    inputUsername (username) {
        this.element.userName().should('be.visible').type(username)
        return this
    }

    inputPassword (password) {
        this.element.passWord().type(password)
        return this
    }

    clickLogin () {
        this.element.buttonLogin().click()
        return this
    }

    assertionSuccessLogin () {
        cy.wait(8200)
        cy.url().should('include','/dashboard')
        cy.contains('Dashboard').should('be.visible')
        return this
    }

    assertionGagalLogin () {
        cy.wait(8000)
        cy.contains('Invalid credentials').should('be.visible')
        return this
    }

    assertionRequired () {
        cy.wait(7000)
        cy.contains('span', 'Required').should('be.visible')
        return this
    }
}
// Untuk mengirim object agar bisa digunakan di file lain
export default new loginPage()