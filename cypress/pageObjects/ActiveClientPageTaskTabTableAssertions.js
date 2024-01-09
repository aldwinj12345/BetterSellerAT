/// <reference types="cypress" />

class TaskTabTable
{
    assertColumn1Taskname(locator, taskName)
    {
        cy.get(locator)
          .should('exist')
          .within(()=>{
            //assert there is a radio button sort of
            cy.get('button')
              .should('exist')
              .and('not.be.disabled')
              .and('have.css', 'background-color', 'rgb(255, 255, 255)')
              .and('have.css', 'border-color', 'rgb(190, 190, 190)')
              .and('have.css', 'border-radius', '9999px')
              .find('svg').should('not.exist') // default because it is not yet click
            //assert Task Name
            cy.get('p')
              .should('exist')
              .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
              .then((textname)=>{
                expect(textname.text().trim()).to.equal(taskName)
              })
          })
    }
    assertColumn2TaskDescription(locator, text)
    {
        cy.get(locator)
          .should('exist')
          .and('have.css', 'color', 'rgb(102, 102, 102)') //text color
          .then((textname)=>{
            expect(textname.text().trim()).to.equal(text)
          })
    }
    assertColumn3DueDate(locator)
    {
        cy.get(locator)
          .should('exist')
          .and('not.be.disabled')
    }
    assertColumn4Assignees(locator)
    {
        cy.get(locator)
          .should('exist')
          .and('not.be.disabled')
    }
    assertColumn5Action(locator, nname)
    {
        cy.get(locator)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', nname)
          .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          .and('have.css', 'border-color', 'rgb(148, 148, 148)')
          .and('have.css', 'border-radius', '12px')
    }
}
export default TaskTabTable;