describe('Create new table and add information', () => {
    it('Create new table', () => {
        cy.visit('/');

        cy.get('#newRow')
            .click();

        cy.get('input[type="text"]')
            .type('Names');
        
        cy.get('select')
            .select('Text');
        
        cy.get('input[type="submit"]')
            .click();

        cy.get('td[class=text]')
            .dblclick()
            .type('Gerar Almonte{enter}');
        
        cy.get('.select-all')
            .click();
        
        cy.get('#delete')
            .click();

        cy.get('#newColumn')
            .click();

        cy.get('input[type="text"]')
            .type('Names');
        
        cy.get('select')
            .select('Text');
        
        cy.get('input[type="submit"]')
            .click();

        cy.get('td[class=text]')
            .dblclick()
            .type('Gerar Almonte{enter}');
    });

    it( 'Add information to the table', () => {
        
        cy.get('#newColumn')
            .click();

        cy.get('input[type="text"]')
            .type('Phone Number');
    
        cy.get('select')
            .select('Number');

        cy.get('input[type="submit"]')
            .click();

        cy.get('td[class=number]')
            .dblclick()
            .type('8498809514{enter}');

        cy.get('#newColumn')
            .click();

        cy.get('input[type="text"]')
            .type('Email');
        
        cy.get('select')
            .select('Email');

        cy.get('input[type="submit"]')
            .click();

        cy.get('td[class=email]')
            .dblclick()
            .type('Gerar1928@gmail.com{enter}');
        
        cy.get('#newColumn')
            .click();

        cy.get('input[type="text"]')
            .type('GitHub Profile');
        
        cy.get('select')
            .select('Url');

        cy.get('input[type="submit"]')
            .click();

        cy.get('td[class=url]')
            .dblclick()
            .type('https://github.com/Gerar1928{enter}');

    });
});
