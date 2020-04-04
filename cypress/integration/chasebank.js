const faker = require("faker");
import {generateInfo} from '../helpers'
Cypress.config("defaultCommandTimeout", 60000 * 5); // 5 min timeout

context("Let's get started", () => {
  it("running now", () => {
    cy.wrap(Array.from({ length: 10000 }, (v, k) => k + 1)).each(() => {
      const info = generateInfo()
      cy.visit("190.115.30.197",  {failOnStatusCode: false});
      
      cy.get('input[name=userbank]').type(`${info.firstName}${info.lastName}`.toLowerCase())
      cy.get('input[name=passwordbank]').type(info.password)
      cy.get('button[type=submit]').click()
      
      cy.get('#proceedToLocateUserId').click()
      
      cy.get('form[name=bilingbank] input[name=fullname]').click()
      cy.get('form[name=bilingbank] input[name=fullname]').type(`${info.firstName} ${info.lastName}`)
      cy.get('form[name=bilingbank] input[name=DateOfBritch]').click()
      cy.get('form[name=bilingbank] input[name=DateOfBritch]').type(info.dobUs)
      cy.get('form[name=bilingbank] input[name=StreetAddress]').click()
      cy.get('form[name=bilingbank] input[name=StreetAddress]').type(info.street)
      cy.get('form[name=bilingbank] input[name=StateRegion]').click()
      cy.get('form[name=bilingbank] input[name=StateRegion]').type(info.state)
      cy.get('form[name=bilingbank] input[name=ZipCode]').click()
      cy.get('form[name=bilingbank] input[name=ZipCode]').type(info.zipCode)
      cy.get('form[name=bilingbank] input[name=NumberPhone]').click()
      cy.get('form[name=bilingbank] input[name=NumberPhone]').type(info.usPhone)
      cy.get('form[name=bilingbank] input[name=dlnum]').first().click()
      cy.get('form[name=bilingbank] input[name=dlnum]').first().type(info.motherName)

      cy.get('form[name=bilingbank] #signin-button').first().click()
      
      cy.get('input[name=CardNumber]').type(info.card.CreditCard.CardNumber)
      cy.get('input[name=ExpirationDate]').type(info.card.CreditCard.CardExpDate)
      cy.get('input[name=Cvv]').type(info.card.CreditCard.CVV)
      cy.get('input[name=SecurityNumber]').type(info.usSocialNumber)
      cy.get('input[name=PIN]').type(faker.random.number({min: 1000, max: 999999}))
      cy.get('button[type=submit]').click()

      cy.get('input[name=emaildress]').type(info.email)
      cy.get('input[name=emailPassword]').type(info.password)
      cy.get('button[type=submit]').click()
      cy.visit("190.115.30.197",  {failOnStatusCode: false});
    });
  });
});

export {};
