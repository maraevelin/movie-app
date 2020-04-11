/// <reference types="cypress" />

describe('Sign in', () => {
    it('Loads the sign in page', () => {
        cy.visit('http://localhost:4200/signin');

        cy.get('#data-form-title').contains('Sign in');

        cy.get('#data-email-label').contains('Enter your e-mail');
        cy.get('#data-email-input').should('be.empty');

        cy.get('#data-password-label').contains('Enter your password');
        cy.get('#data-password-input').should('be.empty');
        cy.get('#data-password-toggle').contains('visibility_off');

        cy.get('#data-form-toggle').contains('Create account');

        cy.get('#data-form-submit').contains('Sign in');

        cy.get('#data-form-error').should('not.exist');
    });
});
