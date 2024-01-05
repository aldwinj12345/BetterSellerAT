/// <reference types="cypress" />

class UpsellItems
{
    assertColumn1Name(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .then((text)=>{
            expect(text.text().trim()).to.equal(nname)
          })
    }
    assertColumn2Code(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .then((text)=>{
            expect(text.text().trim()).to.equal(nname)
          })
    }
    assertColumn3Description(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .then((text)=>{
            expect(text.text().trim()).to.equal(nname)
          })
    }
    assertColumn4Price(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .then((text)=>{
            expect(text.text().trim()).to.equal(nname)
          })
    }
    assertColumn5CreatedBy(locator, initial, nname)
    {
        cy.get(locator)
          .should('exist')
          .within(()=>{
            cy.get(' > span')  //account specialist name
              .should('exist')
              .then((text)=>{
                expect(text.text().replace(/\s+/g, ' ').trim()).to.equal(nname)
              })
            cy.get(' > div > div > span')  //the initial logo
              .should('exist')
              .and('have.text', initial)
              .and('have.css', 'color', 'rgb(255, 255, 255)')         //text color
              .and('have.css', 'background-color', 'rgb(0, 47, 93)')  //background color
              .and('have.css', 'border-radius', '9999px')             //the curve edge that form the background color like a circle
          })
    }
    assertColumn6Action(locator)
    {
        cy.get(locator)
              .should('exist')
              .find('button')
              .each($button => {
                cy.wrap($button)
                  .should('exist')
                  .and('not.be.disabled');
              })
    }
}
export default UpsellItems