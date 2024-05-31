import * as main_page from '../locators/main_page.json'
import * as recovery_password_page from '../locators/recovery_password_page.json'
import * as result_page from '../locators/result_page.json'

describe('Проверка авторизации', () => {
    beforeEach('Начало теста', () => {
        cy.visit('/')
        cy.get(main_page.fogot_pass_btn).should(
            'have.css',
            'color',
            'rgb(0, 85, 152)'
        )
    })

    afterEach('Конец теста', () => {
        cy.get(result_page.close).should('be.visible')
    })

    it('Верный пароль и верный логин', () => {
        cy.get(main_page.email).type('german@dolnikov.ru')
        cy.get(main_page.password).type('iLoveqastudio1')
        cy.get(main_page.login_button).click()
        cy.get(result_page.title).should('be.visible')
        cy.get(result_page.title).contains('Авторизация прошла успешно')
    })

    it('Верный логин и неверный пароль', () => {
        cy.get(main_page.email).type('german@dolnikov.ru')
        cy.get(main_page.password).type('iLoveqastudio2')
        cy.get(main_page.login_button).click()
        cy.get(result_page.title).should('be.visible')
        cy.get(result_page.title).contains('Такого логина или пароля нет')
    })

    it('Неверный логин и верный пароль', () => {
        cy.get(main_page.email).type('german@dolnikov1.ru')
        cy.get(main_page.password).type('iLoveqastudio1')
        cy.get(main_page.login_button).click()
        cy.get(result_page.title).should('be.visible')
        cy.get(result_page.title).contains('Такого логина или пароля нет')
    })

    it('Валидация на наличие @', () => {
        cy.get(main_page.email).type('germandolnikov.ru')
        cy.get(main_page.password).type('iLoveqastudio')
        cy.get(main_page.login_button).click()
        cy.get(result_page.title).should('be.visible')
        cy.get(result_page.title).contains('Нужно исправить проблему валидации')
    })

    it('Восстановление пароля', () => {
        cy.get(main_page.fogot_pass_btn).click()
        cy.get(recovery_password_page.email).type('german@dolnikov.ru')
        cy.get(recovery_password_page.send_button).click()
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail')
    })

    it('Логин со строчными буквами и верный пароль', () => {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru')
        cy.get(main_page.password).type('iLoveqastudio1')
        cy.get(main_page.login_button).click()
        cy.get(result_page.title).should('be.visible')
        cy.get(result_page.title).contains('Авторизация прошла успешно')
    })
})

// npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome