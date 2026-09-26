import loginPage from '../../pages/loginPage.js'

describe('Akses Halaman Login', () => {
  // TC-001
  it('Akses halaman login melalui halaman beranda', () => {
    loginPage.visitWeb()
    cy.contains('Login').should('be.visible')
  })
})

describe('Verifikasi Login Berhasil', () => {
  beforeEach(() => {
    // Akses halaman login berhasil
    loginPage.visitWeb()
    //cy.wait(3000)
    cy.fixture('dataLogin').as('loginData')
  })

  /// TC-002
  // Intercept 1 - Hanya mengamati request dan tidak mengubah apapun
  it('Login dengan valid username dan password', function () {
    cy.intercept('POST','**/auth/validate').as('loginRequest')
    const validuser = this.loginData.validData
    // Locator Name
    loginPage.inputUsername(validuser.username).inputPassword(validuser.password)
             .clickLogin()
    
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.request.method).to.eq('POST')
      expect(interception.response.statusCode).to.eq(302)
    })
    // Assertion berhasil login
    loginPage.assertionSuccessLogin()
  })

  // TC-003
  // Intercept 2 - Simulasi server error 500
  it('Login dengan username valid huruf kapital dan password valid', function () {
    cy.intercept('POST', '**/auth/validate', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('loginServerError')

    const validuser = this.loginData.validData
    // Locator Name
    loginPage.inputUsername(validuser.usernameKapital).inputPassword(validuser.password)
             .clickLogin()
    cy.wait('@loginServerError').its('response.statusCode').should('eq', 500)
  })
})

describe('Verifikasi Gagal Login', () => {
  beforeEach(() => {
    // Akses halaman login berhasil
    loginPage.visitWeb()
    cy.fixture('dataLogin').as('loginData')
  })

    // TC-004
    // Intercept 3 - Simulasikan credential salah (401)
    it('Login dengan invalid username dan invalid password', function () {
      cy.intercept('POST', '**/auth/validate', {
        statusCode: 401,
        body: { error: 'Invalid credentials' },
      }).as('loginUnauthorized')

      const invaliduser = this.loginData.invalidData
      // Locator Name
      loginPage.inputUsername(invaliduser.invalidUsername).inputPassword(invaliduser.invalidPassword)
                  .clickLogin()
      // Assertion gagal login
      cy.wait('@loginUnauthorized')
      // cy.wait(7000)
      cy.contains('Invalid credentials').should('be.visible')
    })

    // TC-005
    it('Login dengan invalid username dan valid password', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(invaliduser.invalidUsername).inputPassword(validuser.password)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })

    // TC-006
    it('Login dengan valid username dan invalid password', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData

        // Locator Name
        loginPage.inputUsername(validuser.username).inputPassword(invaliduser.invalidPassword)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })

    // TC-007
    it('Login dengan hanya mengisi field username dengan data valid', function () {
        const validuser = this.loginData.validData
        // Locator Name
        loginPage.inputUsername(validuser.username).clickLogin()
        // Assertion gagal login
        loginPage.assertionRequired()
    })

    // TC-008
    it('Login dengan hanya mengisi field password dengan data valid', function () {
        const validuser = this.loginData.validData
         // Locator Name
        loginPage.inputPassword(validuser.password).clickLogin()
        // Assertion gagal login
        loginPage.assertionRequired()
    })
})