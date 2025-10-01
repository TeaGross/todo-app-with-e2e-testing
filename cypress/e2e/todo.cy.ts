/// <reference types="cypress" />

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174') 
  })

  it('renders two todos in beginning', () => {
      cy.get('ul > li').should('have.length', 2)
      cy.get('li span').first().should('have.text', "Njut av livet")  
      cy.get('li span').last().should('have.text', "Mejla handledare")      
  })

  it('First todo isDone the second isnt', () => {
    cy.get('ul > li').first().find('input[type="checkbox"]').should('be.checked')
    cy.get('ul > li').last().find('input[type="checkbox"]').should('not.be.checked')
  })

  it('button is disabled when not done', () => {
    cy.get('ul > li').last().as('secondTodo')
    cy.get('@secondTodo').find('input[type="checkbox"]').should('not.be.checked')
    cy.get('@secondTodo').find('button').should('be.disabled')
  })

  it('User can add new todo', () => {
    cy.get('ul > li').should('have.length', 2)

    cy.get('textarea').type('Plocka svamp')
    cy.contains('button', 'Lägg till').click()

    cy.get('ul > li').should('have.length', 3)
    cy.get('li span').last().should('have.text', "Plocka svamp")
  })

  // ta bort todo
  it('user can delete todo if marked as done', () => {
    cy.get('ul > li').should('have.length', 2)

    cy.get('ul > li').first().find('input[type="checkbox"]').should('be.checked');
    cy.get('ul > li').first().find('button').click()

    cy.get('ul > li').should('have.length', 1)
  })

  it('user can delete todo after marked as done', () => {
    cy.get('ul > li').should('have.length', 2)

    cy.get('ul > li').last().find('input[type="checkbox"]').click()
    cy.get('ul > li').last().find('button').click()

    cy.get('ul > li').should('have.length', 1)
  })

  it('user cant delete todo if not marked as done', () => {
    cy.get('ul > li').should('have.length', 2)

    cy.get('ul > li').last().find('input[type="checkbox"]').should('not.be.checked')
    cy.get('ul > li').last().find('button').click({force: true})
    
    cy.get('ul > li').should('have.length', 2)
  })

  // toggla state för todo

  it('user can toggle todo between done and not done', () => {
    cy.get('ul > li').first().as('firstTodo')
    cy.get('@firstTodo').find('input[type="checkbox"]').should('be.checked')
    cy.get('@firstTodo').find('span').should('have.class', 'line-through')

    cy.get('@firstTodo').find('input[type="checkbox"]').uncheck()
    cy.get('@firstTodo').find('input[type="checkbox"]').should('not.be.checked')
    cy.get('@firstTodo').find('span').should('not.have.class', 'line-through')

    cy.get('@firstTodo').find('input[type="checkbox"]').check()
    cy.get('@firstTodo').find('input[type="checkbox"]').should('be.checked')

  })
})