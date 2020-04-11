/// <reference types="cypress" />

describe('Auth component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/signin');
    });

    it('Loads sign in from first', () => {
        cy.get('#data-form-title').contains('Sign in');

        cy.get('#data-email-label').contains('Enter your e-mail');
        cy.get('#data-email-input').should('be.empty');

        cy.get('#data-password-label').contains('Enter your password');
        cy.get('#data-password-input').should('be.empty');
        cy.get('#data-password-toggle').contains('visibility_off');

        cy.get('#data-form-toggle').contains('Create account');

        cy.get('#data-form-submit').should('be.disabled').contains('Sign in');

        cy.get('#data-form-error').should('not.exist');
    });

    it('Switches to sign up form', () => {
        cy.get('#data-form-toggle').click();

        cy.get('#data-form-title').contains('Sign up');

        cy.get('#data-email-label').contains('Enter your e-mail');
        cy.get('#data-email-input').should('be.empty');

        cy.get('#data-password-label').contains('Enter your password');
        cy.get('#data-password-input').should('be.empty');
        cy.get('#data-password-toggle').contains('visibility_off');

        cy.get('#data-form-toggle').contains('Already have an account?');

        cy.get('#data-form-submit').should('be.disabled').contains('Sign up');

        cy.get('#data-form-error').should('not.exist');
    });

    it('Reacts to interactions with the input fields', () => {
        cy.get('#data-email-input')
            .should('be.empty')
            .should('not.have.focus')
            .click()
            .should('have.focus')
            .blur()
            .should('have.attr', 'aria-invalid', 'true');

        cy.get('#data-password-input')
            .should('be.empty')
            .should('not.have.focus')
            .click()
            .should('have.focus')
            .blur()
            .should('have.attr', 'aria-invalid', 'true');
    });

    it('Toggles password visibility', () => {
        const password = 'pwd';

        cy.get('#data-password-toggle').contains('visibility_off');
        cy.get('#data-password-input').type(password).should('not.have.value');

        cy.get('#data-password-toggle').click().contains('visibility');
        cy.get('#data-password-input').should('have.value', password);

        cy.get('#data-password-toggle').click().contains('visibility_off');
        cy.get('#data-password-input').should('not.have.value');
    });
});
