import loginPage from '../../pages/loginPage.js'

describe('Verifikasi Gagal Login', () => {
    beforeEach(() => {
        // Akses halaman login berhasil
        loginPage.visitWeb()
        cy.fixture('dataLogin').as('loginData')
    })

    // TC-009
    it('Login dengan field email dan field password kosong', () => {
        // Tidak mengisi username dan password
        loginPage.clickLogin()
        // Assertion gagal login
        loginPage.assertionRequired()
    })

    // TC-010
    // Intercept 4 - Simulasi credential salah
    it('Login dengan spasi di awal username dan password valid', function () {
        cy.intercept('POST', '**/auth/validate').as('gagalLoginRequest')
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(invaliduser.spacedUsername1)
                 .inputPassword(validuser.password)
                 .clickLogin()
        cy.wait('@gagalLoginRequest').its('response.statusCode').should('eq',302)
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })

    // TC-011
    // Intercept 5 - Simulasi koneksi putus/hilang
    it('Login dengan spasi di akhir username dan password valid', function () {
        cy.intercept('POST', '**/auth/validate', { forceNetworkError: true }).as('loginNetworkFail')
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(invaliduser.spacedUsername2)
                 .inputPassword(validuser.password)
                 .clickLogin()
        cy.wait('@loginNetworkFail')
        //loginPage.assertionSuccessLogin()
    })

    // TC-012
    it('Login dengan username dan password yang di switch', function () {
        const validuser = this.loginData.validData
        // Locator Name
        loginPage.inputUsername(validuser.password).inputPassword(validuser.username)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })

    // TC-013
    it('Login dengan password valid huruf kapital dan username valid', function () {
        const validuser = this.loginData.validData
        const invaliduser = this.loginData.invalidData
        // Locator Name
        loginPage.inputUsername(validuser.username).inputPassword(invaliduser.passwordKapital)
                 .clickLogin()
        // Assertion gagal login
        loginPage.assertionGagalLogin()
    })
})