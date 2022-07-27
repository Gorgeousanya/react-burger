/// <reference types="cypress" />

context('Cypress-тесты для страницы «Конструктор»', () => {
    it('Запуск сервера', () => {
        cy.visit('http://localhost:3000');
    });

    it('Перетаскивание ингредиентa в конструктор', () => {
        const dataTransfer = new DataTransfer()
        cy.contains('[class=burger-ingredients_link__2-zFo]', 'Краторная булка N-200i').trigger('dragstart', {
                dataTransfer
            });
        cy.wait(2000);
        cy.get('.burger-constructor_main__O9C0W').trigger('drop', {
            dataTransfer
        });
        cy.contains('[class="burger-ingredients_link__2-zFo"]', 'Соус Spicy-X')
            .trigger('dragstart', {
                dataTransfer
            })
        cy.wait(2000);
        cy.get('.burger-constructor_main__O9C0W').trigger('drop', {
            dataTransfer
        });
    })

    it('открытие модального окна с описанием ингредиента', () => {
        cy.wait(2000);
        cy.contains('[class=burger-ingredients_link__2-zFo]', 'Краторная булка N-200i').click();
    })

    it('отображение в модальном окне данных ингредиента', () => {
        cy.wait(2000);
        cy.contains('Детали ингредиента').should('exist');
        cy.get('p').contains('Краторная булка').should("exist");
        cy.wait(2000);
        cy.get('.button_button__33qZ0.button_button_type_secondary__3-tsA.button_button_size_small__3cR13').click();
        cy.location('pathname').should('eq', '/');
    })

    it('открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»', () => {
        cy.wait(2000);
        cy.contains('Оформить заказ').click();
        cy.location('pathname').should('eq', '/login');
        cy.get('input[name=email]').click().type('aplokhotnyuk@rambler.ru');
        cy.get('input[name=password]').click().type('Anna1234$');
        cy.contains('Войти').click();
        cy.location('pathname').should('eq', '/');
        cy.contains('Оформить заказ').click();
        cy.wait(20000);
        cy.get('.order_component__3RloR').should("exist");
    })

    it('закрытие модальных окон при клике на кнопку закрытия', () => {
        cy.wait(2000);
        cy.get('.button_button__33qZ0.button_button_type_secondary__3-tsA.button_button_size_small__3cR13').click();
        cy.location('pathname').should('eq', '/');
    })
});