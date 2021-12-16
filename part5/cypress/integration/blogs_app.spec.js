/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3004/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.signUp(user)
    cy.visit('http://localhost:3004')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai3')
      cy.get('#password').type('salainen3')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.get('#createBlogFormBtn').click()
      cy.get('#title').type('mluukkai blog')
      cy.get('#url').type('https://testing-library.com/docs/queries/bytestid/')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#createBlogBtn').click()
    })

    it('A blog can be created', function() {
      cy.contains('mluukkai blog Matti Luukkainen')
      cy.contains('view')
    })

    it('blog likes users if likes != 0', function() {
      cy.get('#viewBtn').click()
      cy.get('#addLikeBtn').click()
      cy.get('#likes').should('not.contain', 'likes 0')
    })

    it('the user who created a blog can delete it', function() {
      cy.get('#viewBtn').click()
      cy.get('#deleteBtn').click()
      cy.get('html').should('not.contain', 'mluukkai blog Matti Luukkainen')
    })

    it('the user who did not create a blog can not delete it', function() {
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai1',
        password: 'salainen1'
      }
      cy.signUp(user)
      cy.login(user)
      cy.get('#viewBtn').click()
      cy.get('.blog').should('not.have.text', 'Delete')
    })

    describe('Add second blog', function() {
      beforeEach(function() {
        cy.get('#createBlogFormBtn').click()
        cy.get('#title').type('mluukkai blog2')
        cy.get('#url').type('https://testing-library.com/docs/queries/bytestid/4')
        cy.get('#author').type('Matti Luukkainen')
        cy.get('#createBlogBtn').click()
      })

      it('the blog with the most likes being first', function() {
        cy.get(':nth-child(2) > div > [data-testid="handleViewBtn"]').click()
        cy.get('#addLikeBtn').click()
        cy.get('[data-testid="likes"]').should('contain', 'likes 1')
        cy.get(':nth-child(2) > div > [data-testid="handleViewBtn"]').click()
        cy.get(':nth-child(2) > [data-testid="likes"]').should('contain', 'likes 0')
      })
    })
  })
})