import directoryPage from '../../pages/directoryPage.js'
const directUrl = Cypress.config('directUrl')

describe('Akses Halaman Directory', () => {
  // TC-019
  it('Berhasil akses menu Directory', () => {
    // Berhasil login
    directoryPage.successLogin()
    // Akses halaman directory
    directoryPage.clickDirectory().assertionDirectoryPage()
  })

  // TC-020
  it('Gagal akses menu Directory', () => {
    cy.visit(directUrl)
    // Assertion diarahkan ke halaman login
    cy.url().should('include', '/web/index.php/auth/login')
  })
})

describe('Filter Halaman Directory', () => {
    // TC-021
    it('Tombol hidden filter berfungsi', () => {
        // Sudah berada di halaman Directory login
        directoryPage.pageDirectory()
        cy.get(':nth-child(3) > .oxd-icon-button > .oxd-icon').should('be.visible')
        cy.get(':nth-child(3) > .oxd-icon-button > .oxd-icon').click()

        const filterLabel = ['Employee Name', 'Job Title', 'Location']
        // Assertion filter menutup
        filterLabel.forEach((label) => {
            cy.contains(label).should('not.be.visible')
        })
        // Assertion filter membuka
        cy.get(':nth-child(3) > .oxd-icon-button > .oxd-icon').click()
        filterLabel.forEach((label) => {
            cy.contains(label).should('be.visible')
        })
    })
    // TC-024
    it('Filter Job Title menampilkan isi dropdown ketika di klik', () => {
        // Sudah berada di halaman Directory
        directoryPage.pageDirectory()
        // Klik dropdown Job Title
        directoryPage.clickDropdownJobTitle()
        // Assertion dropdown menampilkan isi dropdown
        directoryPage.assertionDropdownJobTitleOpen()
    })
    // TC-025
    it('Filter Job Title berfungsi dan menampilkan data sesuai pilihan dropdown', () => {
        // Sudah berada di halaman Directory
        cy.fixture('dataTest').then((datatest) => {
            datatest.dataJobTitle.forEach((datatest) => {
                directoryPage.pageDirectory()
                directoryPage.clickDropdownJobTitle()
                directoryPage.selectDropdownOption(datatest)
                directoryPage.clickSearch()
                directoryPage.assertionTableFiltered(datatest)
                cy.get('.oxd-userdropdown-tab').click()
                cy.contains('Logout').click()
            })
        })
    })

    // TC-026
    it('Filter Location menampilkan isi dropdown ketika di klik', () => {
        // Sudah berada di halaman Directory
        directoryPage.pageDirectory()
        // Klik dropdown Job Title
        directoryPage.clickDropdownLocation()
        // Assertion dropdown menampilkan isi dropdown
        directoryPage.assertionDropdownLocationOpen()
    })

    // TC-027
    it('Filter Location berfungsi dan menampilkan data sesuai pilihan dropdown', () => {
        // Sudah berada di halaman Directory
        cy.fixture('dataTest').then((datatest) => {
            datatest.dataLocation.forEach((location) => {
                directoryPage.pageDirectory()
                directoryPage.clickDropdownLocation()
                directoryPage.selectDropdownOption(location)
                directoryPage.clickSearch()
                directoryPage.assertionTableFiltered(location)
                cy.get('.oxd-userdropdown-tab').click()
                cy.contains('Logout').click()
            })
        })
    })

    // TC-028
    it('Check menggunakan kombinasi 2 filter', () => {
        directoryPage.pageDirectory()
        cy.fixture('dataTest').then((datatest) => {
            const jobTitle = datatest.dataFilter.jobTitle
            const location = datatest.dataFilter.location
            // Pilih Job Title
            directoryPage.clickDropdownJobTitle()
            directoryPage.selectDropdownOption(jobTitle)
            // Pilih Location
            directoryPage.clickDropdownLocation()
            directoryPage.selectDropdownOption(location)
            // Klik tombol Search
            directoryPage.clickSearch()
            // Assert hasil sesuai kombinasi
            directoryPage.assertionTableFilteredCombination(jobTitle, location)

            // TC-031 Check tombol Reset berfungsi
            // Reset filter
            directoryPage.clickReset()
            // Assert filter benar-benar kembali ke default
            directoryPage.assertionFilterReset()
        })
    })

})