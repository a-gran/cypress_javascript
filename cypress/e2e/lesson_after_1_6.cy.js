describe('Проверка авторизации', () => {
    beforeEach('Начало теста', () => {
        cy.visit('/')
        cy.get('#forgotEmailButton').should(
            'have.css',
            'color',
            'rgb(0, 85, 152)'
        )
    })

    afterEach('Конец теста', () => {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible')
    })

    // 1 Проверку на позитивный кейс авторизации
    it('Верный пароль и верный логин', () => {
        cy.get('#mail').type('german@dolnikov.ru')
        cy.get('#pass').type('iLoveqastudio1')
        cy.get('#loginButton').click()
        cy.get('#messageHeader').should('be.visible')
        cy.get('#messageHeader').contains('Авторизация прошла успешно')
    })

    // 2 Проверка логики восстановления пароля
    it('Восстановление пароля', () => {
        cy.get('#forgotEmailButton').click()
        cy.get('#mailForgot').type('german@dolnikov.ru')
        cy.get('#restoreEmailButton').click()
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail')
    })

    // 3 Проверка на негативный кейс авторизации (неправильный пароль)
    it('Верный логин и неверный пароль', () => {
        cy.get('#mail').type('german@dolnikov.ru')
        cy.get('#pass').type('iLoveqastudio2')
        cy.get('#loginButton').click()
        cy.get('#messageHeader').should('be.visible')
        cy.get('#messageHeader').contains('Такого логина или пароля нет')
    })

    // 4 Проверка на негативный кейс авторизации (неправильный логин)
    it('Неверный логин и верный пароль', () => {
        cy.get('#mail').type('german@dolnikov1.ru')
        cy.get('#pass').type('iLoveqastudio1')
        cy.get('#loginButton').click()
        cy.get('#messageHeader').should('be.visible')
        cy.get('#messageHeader').contains('Такого логина или пароля нет')
    })

    // 5 Напиши проверку на негативный кейс валидации (Ввести логин без @)
    it('Валидация на наличие @', () => {
        cy.get('#mail').type('germandolnikov.ru')
        cy.get('#pass').type('iLoveqastudio1')
        cy.get('#loginButton').click()
        cy.get('#messageHeader').should('be.visible')
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации')
    })

    // 6 Проверка на приведение к строчным буквам в логине
    it('Логин со строчными буквами и верный пароль', () => {
        cy.get('#mail').type('GerMan@Dolnikov.ru')
        cy.get('#pass').type('iLoveqastudio1')
        cy.get('#loginButton').click()
        cy.get('#messageHeader').should('be.visible')
        cy.get('#messageHeader').contains('Авторизация прошла успешно')
    })
})

// npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
