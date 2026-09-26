import loginPage from './loginPage.js'

class recruitmentPage {
    element = {
        buttonRecruitment: () => cy.get(':nth-child(5) > .oxd-main-menu-item > .oxd-text'),
        buttonHiddenFilter: () => cy.get('.oxd-table-filter-header-options > :nth-child(3) > .oxd-icon-button > .oxd-icon'),
        inputCandidateName: () => cy.contains('.oxd-input-group', 'Candidate Name').find('input'),
        inputDateFrom: () => cy.contains('.oxd-input-group', 'Date of Application').find('input').first(),
        inputDateTo: () => cy.contains('.oxd-input-group', 'Date of Application').find('input').last(),
        buttonSearch: () => cy.contains('button', 'Search'),
        buttonReset: () => cy.contains('button', 'Reset'),
        tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
        buttonAddCandidate: () => cy.contains('button', 'Add')
    }

    successLogin () {
        // Berhasil akses web
        loginPage.visitWeb()
        // Berhasil login
        cy.fixture('dataLogin').then((loginData) => {
            const validuser = loginData.validData
            loginPage.inputUsername(validuser.username).inputPassword(validuser.password)
                    .clickLogin()
        })
        loginPage.assertionSuccessLogin()
        return this
    }

    clickRecruitment () {
        this.element.buttonRecruitment().click()
        return this
    }

    assertionRecruitmentPage() {
        // Assertion berhasil akses halaman recruitment
        cy.url().should('include','/recruitment')
        cy.contains('Recruitment').should('be.visible')
        return this
    }

    clickTabCandidates () {
        cy.contains('Candidates').click()
        return this
    }

    clickTabVacancies () {
        cy.contains('Vacancies').click()
        return this
    }

    assertionCandidates () {
        // Cek endpoint
        cy.url().should('include', '/recruitment/viewCandidates')
        // Cek halaman candidates memang muncul
        cy.contains('h5', 'Candidates').should('be.visible')
        // Cek filter muncul
        cy.contains('.oxd-input-group', 'Job Title').should('be.visible')
        cy.contains('.oxd-input-group', 'Vacancy').should('be.visible')
        cy.contains('.oxd-input-group', 'Hiring Manager').should('be.visible')
        cy.contains('.oxd-input-group', 'Status').should('be.visible')
        cy.contains('.oxd-input-group', 'Candidate Name').should('be.visible')
        cy.contains('.oxd-input-group', 'Keywords').should('be.visible')
        cy.contains('.oxd-input-group', 'Date of Application').should('be.visible')
        cy.contains('.oxd-input-group', 'Method of Application').should('be.visible')
        // Cek tabel muncul
        cy.get('.oxd-table-header').should('be.visible')
        cy.contains('.oxd-table-header', 'Vacancy').should('be.visible')
        cy.contains('.oxd-table-header', 'Candidate').should('be.visible')
        cy.contains('.oxd-table-header', 'Hiring Manager').should('be.visible')
        cy.contains('.oxd-table-header', 'Date of Application').should('be.visible')
        cy.contains('.oxd-table-header', 'Status').should('be.visible')
        cy.contains('.oxd-table-header', 'Actions').should('be.visible')

        return this
    }

    assertionVacancies () {
        cy.url().should('include', '/recruitment/viewJobVacancy')
        cy.contains('h5', 'Vacancies').should('be.visible')
        return this
    }

    pageRecruitment() {
        this.successLogin()
        this.clickRecruitment().assertionRecruitmentPage()
        return this
    }

    assertionFilterHidden () {
        const filterLabels = [
            'Job Title', 'Vacancy', 'Hiring Manager', 'Status',
            'Candidate Name', 'Keywords', 'Date of Application', 'Method of Application'
        ]
        filterLabels.forEach((label) => {
            cy.contains(label).should('not.be.visible')
        })
        return this
    }

    assertionFilterVisible () {
        const filterLabels = [
            'Job Title', 'Vacancy', 'Hiring Manager', 'Status',
            'Candidate Name', 'Keywords', 'Date of Application', 'Method of Application'
        ]
        filterLabels.forEach((label) => {
            cy.contains(label).should('be.visible')
        })
        return this
    }

    clickHiddenFilter () {
        this.element.buttonHiddenFilter().click()
        return this
    }

    clickDropdown(label) {
        cy.contains('.oxd-input-group', label).find('.oxd-select-text').click()  
        cy.wait(6000)
        cy.get('.oxd-select-dropdown').should('be.visible') 
        return this
    }

    assertionDropdown() {
        cy.get('.oxd-select-dropdown').should('be.visible')
        cy.get('.oxd-select-option').its('length').should('be.gt', 0)
        return this
    }

    selectDropdownOption (optionText) {
        cy.get('.oxd-select-dropdown').contains(optionText).click()
        return this
    }

    inputCandidateName (name) {
        this.element.inputCandidateName().type(name)
        return this
    }

    inputDateFrom (date) {
        this.element.inputDateFrom().type(date)
        return this
    }

    inputDateTo (date) {
        this.element.inputDateTo().type(date)
        return this
    }

    clickSearch () {
        this.element.buttonSearch().click()
        return this
    }

    clickReset () {
        this.element.buttonReset().click()
        return this
    }

    assertionCandidatesFilteredCombination (filter) {
        this.element.tableRows().each(($row) => {
            cy.wrap($row).contains(filter.vacancy).should('be.visible')
        })
        return this
    }

    clickAddCandidate () {
        this.element.buttonAddCandidate().click()
        return this
    }

    assertionAddCandidatePage () {
        cy.url().should('include', '/recruitment/addCandidate')
        cy.contains('Add Candidate').should('be.visible')

        // Full Name (First, Middle, Last)
        cy.contains('Full Name').should('be.visible')
        cy.get('input[name="firstName"]').should('be.visible')
        cy.get('input[name="middleName"]').should('be.visible')
        cy.get('input[name="lastName"]').should('be.visible')

        // Vacancy
        cy.contains('.oxd-input-group', 'Vacancy').should('be.visible')

        // Email & Contact Number
        cy.contains('Email').should('be.visible')
        cy.contains('Contact Number').should('be.visible')

        // Resume upload
        cy.contains('Resume').should('be.visible')
        cy.contains('No file selected').should('be.visible')

        // Keywords & Date of Application
        cy.contains('Keywords').should('be.visible')
        cy.contains('Date of Application').should('be.visible')

        // Notes & Consent checkbox
        cy.contains('Notes').should('be.visible')
        cy.contains('Consent to keep data').should('be.visible')

        // Tombol Cancel & Save
        cy.contains('button', 'Cancel').should('be.visible')
        cy.contains('button', 'Save').should('be.visible')
        return this
    }
}
export default new recruitmentPage()