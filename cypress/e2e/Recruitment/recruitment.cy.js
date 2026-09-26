const rectUrl = Cypress.config('rectUrl')
import recruitmentPage from '../../pages/recruitmentPage.js'

// describe('Akses Halaman Recruitment', () => {
//     // TC-040
//     it('Berhasil akses menu Recruitment', () => {
//         // Berhasil login
//         recruitmentPage.successLogin()
//         // Akses halaman directory
//         recruitmentPage.clickRecruitment().assertionRecruitmentPage()
//     })

//     // TC-041
//     it('Gagal akses menu Recruitment', () => {
//         cy.visit(rectUrl)
//         // Assertion diarahkan ke halaman login
//         cy.url().should('include', '/web/index.php/auth/login')
//     })
// })

// describe('Verifikasi tab Candidates dan Vacancies dapat diakses', () => {
//     beforeEach(() => {                            
//         cy.intercept('GET', '**/api/v2/recruitment/candidates**').as('getCandidates')  
//         cy.intercept('GET', '**/api/v2/recruitment/vacancies**').as('getVacancies')    
//     })

//     // TC-042
//     it('Cek tab Candidates dan Vacancies berfungsi', () => {
//       // Sudah berada di halaman recruitment
//       recruitmentPage.pageRecruitment()
//       // Klik tab Candidates
//       recruitmentPage.clickTabCandidates()
//       cy.wait('@getCandidates').then((interception) => {                               
//           expect(interception.response.statusCode).to.eq(200)                          
//       })
//       recruitmentPage.assertionCandidates()
//       // Klik tab Vacancies
//       recruitmentPage.clickTabVacancies()
//       recruitmentPage.assertionVacancies()
//     })
// })

describe('Verifikasi filter halaman candidates berfungsi', () => {
    // beforeEach(() => {                          
    //     cy.intercept('GET', '**/api/v2/recruitment/candidates**').as('getCandidates')  
    // })

    // // TC-042
    // it('Tombol hidden filter berfungsi pada tab Candidates', () => {
    //   // Sudah berada di halaman recruitment
    //   recruitmentPage.pageRecruitment()
    //   // Klik tab Candidates
    //   recruitmentPage.clickTabCandidates()
    //   cy.wait('@getCandidates') 
    //   recruitmentPage.assertionCandidates()
    //   // Klik tombol hidden filter
    //   recruitmentPage.clickHiddenFilter()
    //   recruitmentPage.assertionFilterHidden()
    //   // Klik tombol hidden filter kembali untuk menampilkan filter
    //   recruitmentPage.clickHiddenFilter()
    //   recruitmentPage.assertionFilterVisible()
    // })

    // // TC-043
    // it('Filter dropdown menampilkan isi dropdown - Tab Candidates', () => {
    //   // Sudah berada di halaman recruitment
    //   recruitmentPage.pageRecruitment()
    //   // Klik tab Candidates
    //   recruitmentPage.clickTabCandidates()
    //   // Daftar filter ada dropdown
    //   const dropdownFilters = ['Job Title', 'Vacancy', 'Hiring Manager', 'Status', 'Method of Application']
    //   dropdownFilters.forEach((label) => {
    //       recruitmentPage.clickDropdown(label)
    //       recruitmentPage.assertionDropdown()
    //       // Tutup dropdown dulu sebelum lanjut ke dropdown berikutnya
    //       cy.get('body').click(0, 0) // untuk klik diluar dropdown, di pojok kiri atas
    //   })
    // })

    // TC-044
    it('Filter berfungsi menampilkan data sesuai dengan kombinasi filter yang dipilih', () => {
        recruitmentPage.pageRecruitment()
        recruitmentPage.clickTabCandidates()

        cy.fixture('dataTest').then((datatest) => {
            const filter = datatest.filterCandidates

            recruitmentPage
                .clickDropdown('Job Title')
                .selectDropdownOption(filter.jobTitle)
                .clickDropdown('Vacancy')
                .selectDropdownOption(filter.vacancy)
                .clickDropdown('Method of Application')
                .selectDropdownOption(filter.methodOfApplication)
                .clickSearch()
                .assertionCandidatesFilteredCombination(filter)
        })
    })
})

// describe('Berhasil tambah data Candidates', () => {
//   // TC-045
//     it('Tombol tambah data Candidates berfungsi', () => {
//         recruitmentPage.pageRecruitment()
//         recruitmentPage.clickTabCandidates()
//         recruitmentPage.clickAddCandidate()
//         recruitmentPage.assertionAddCandidatePage()
//     })

// })