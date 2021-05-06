describe('Create multiple rows and move them', () => {
    beforeEach( () => {
        cy.visit('/');
        
        cy.get('#newRow')
        .click();

        cy.get('input[type="text"]')
            .type('Names');
        
        cy.get('select')
            .select('Text');
        
        cy.get('input[type="submit"]')
            .click();

        cy.get('.text')
            .dblclick()
            .type('Gerar Almonte{enter}');
    });

    it('Create multiple rows and information', () => {
        cy.get('#newRow')
            .click();
           
        cy.get('td[class=text]')
            .eq(1)
            .dblclick()
            .type('Samus Aran{enter}');
        
        cy.get('td:not(.text)')
            eq(1)
    });
})