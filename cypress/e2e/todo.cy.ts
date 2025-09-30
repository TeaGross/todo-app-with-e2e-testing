/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174') 
  })

  it('renders two todos in beginning', () => {
      cy.get('ul li').should('have.length', 2)
      cy.get('li span').first().should('have.text', "Njut av livet")  
      cy.get('li span').last().should('have.text', "Mejla handledare")      
  })

  it('First todo isDone the second isnt', () => {
    cy.get('ul > li').first().find('input[type="checkbox"]').should('be.checked')
    cy.get('ul > li').last().find('input[type="checkbox"]').should('not.be.checked')

  })


  //Test:
  // disable button when isDone is false
})