import loginPage from './loginPage.js'

class directoryPage {
    element = {
        buttonDirectory: () => cy.get('body > div:nth-child(3) > div:nth-child(1) > div:nth-child(1) > aside:nth-child(1) > nav:nth-child(1) > div:nth-child(2) > ul:nth-child(2) > li:nth-child(9) > a:nth-child(1) > span:nth-child(2)'),
        hiddenFilter: () => cy.get('oxd-icon bi-caret-up-fill')
    }

    successLogin () {
        // Berhasil akses web
        loginPage.visitWeb()
        //cy.contains('Login').should('be.visible')
        // Berhasil login
        cy.fixture('dataLogin').then((loginData) => {
            const validuser = loginData.validData
            loginPage.inputUsername(validuser.username).inputPassword(validuser.password)
                 .clickLogin()
        })
        loginPage.assertionSuccessLogin()
    }

    clickDirectory () {
        this.element.buttonDirectory().click()
        return this
    }

    clickDropdownJobTitle () {
        cy.contains('.oxd-input-group', 'Job Title')
        .find('.oxd-select-text')
        .click()
    }

    clickDropdownLocation () {
        cy.contains('.oxd-input-group', 'Location')
        .find('.oxd-select-text')
        .click()
    }

    clickSearch () {
        cy.get('button[type="submit"]').contains('Search').click()
    }

    clickReset () {
        cy.contains('button', 'Reset').scrollIntoView().click()
    }

    pageDirectory () {
        this.successLogin()
        this.clickDirectory().assertionDirectoryPage()
    }

    assertionDirectoryPage() {
        // Assertion berhasil akses halaman directory
        cy.url().should('include','/directory')
        cy.contains('Directory').should('be.visible')
        return this
    }

    assertionDropdownJobTitleOpen () {
        cy.get('.oxd-select-dropdown').should('be.visible')
        return this
    }

    assertionDropdownLocationOpen () {
        cy.get('.oxd-select-dropdown').should('be.visible')
        cy.get('.oxd-select-option').its('length').should('be.gt', 0)
        return this
    }

    checkRecord () {
        cy.contains(/Record(s)? Found/i).should('be.visible')
        return this
    }

    selectDropdownOption (optionText) {
        cy.get('.oxd-select-dropdown').contains(optionText).click()
    }

    assertionTableFiltered (jobTitle) {
        this.checkRecord()
        cy.get('.orangehrm-directory-card').each(($card) => {
            cy.wrap($card).find('.orangehrm-directory-card-subtitle').then(($subtitle) => {
            if ($subtitle.is(':visible')) {
                cy.wrap($subtitle).should('contain.text', jobTitle)
            } else {
                cy.log('Card tanpa Job Title ditemukan — dilewati')
            }
        })
        })
    }

    assertionTableFilteredCombination (jobTitle, location) {
        cy.get('.orangehrm-directory-card').each(($card) => {
            cy.wrap($card)
            .find('.orangehrm-directory-card-subtitle')
            .should('be.visible')
            .and('contain.text', jobTitle)

            cy.wrap($card)
            .contains(location)
            .should('be.visible')
        })
    }

    assertionFilterReset () {
        cy.contains('.oxd-input-group', 'Job Title').should('contain.text', '-- Select --')
        cy.contains('.oxd-input-group', 'Location').should('contain.text', '-- Select --')
    }
}
export default new directoryPage()