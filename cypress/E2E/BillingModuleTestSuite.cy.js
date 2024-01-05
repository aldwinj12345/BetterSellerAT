/// <reference types="cypress" />
import UpsellItems from "../pageObjects/BillingUpsellItemsTableAssertions.js"

let testdata;
let loginmodule;
let alertmessagepopup;
let modulebutton;
let linktextfolder;
let clientmodulelocator;
let billingmodulelocator;


before('Connecting to Different Json Files at Fixture',()=>{

    //calling testData.json
    cy.fixture('testData').then((data)=>{
        testdata = data;
    })
    //calling LoginModuleLocators
    cy.fixture('LoginModuleLocators').then((data)=>{
        loginmodule = data;
    })
    //calling alertmessages
    cy.fixture('alertmessages').then((data)=>{
        alertmessagepopup = data;
    })
    //calling modulenavigationbuttons
    cy.fixture('modulenavigationbuttons').then((data)=>{
        modulebutton = data
    })
    //calling linktextfolders
    cy.fixture('linktextfolders').then((data)=>{
        linktextfolder = data
    })
    //calling clientmodulelocators
    cy.fixture('clientmodulelocators').then((data)=>{
        clientmodulelocator = data
    })
    //calling billingmodulelocators
    cy.fixture('billingmodulelocators').then((data)=>{
        billingmodulelocator = data
    })

})


beforeEach('Launch BS Login Page',()=>{

    cy.visit(testdata.URL[0].testURL)
      .wait(3000)

    //change the window size of the browser
    cy.viewport(1600, 1100)

    //assert url - when launched sucessfully
    cy.url().should('contain','/sign-in')

})

describe('Billing Module Test Suite',()=>{


    //calling BillingUpsellItemsTableAssertions
    const UpsellItemAddonItem = new UpsellItems();


    it('Testcase ID: BUI0001 - Add Addons/Upsell Items', ()=>{

        //Login using account specialist
        cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

        //Click the Billing Navigation Module
        cy.get(modulebutton.BillingModuleButton)
          .click()
          .wait(2000) 

        //verify Upsell Items link text folder, click if found
        cy.get(linktextfolder.BillingModule[0].UpsellItems)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Upsell Items')
          .click()
          .wait(1000)

        //verify expected url destination
        cy.url().should('contain', '/addons')
        
        //verify Upsell Items Page title
        cy.get(billingmodulelocator.UpsellItemsPage[0].pageTitle)
          .should('exist')
          .and('have.text', 'Addons / Upsell Items')
          .and('have.css', 'font-weight', '700') // font bold

        //verify Add button and then click if found
        cy.get(billingmodulelocator.UpsellItemsPage[0].AddButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', ' Add')
          .and('have.css', 'color', 'rgb(75, 85, 99)') //text color
          .and('have.css', 'border-color', 'rgb(75, 85, 99)')
          .and('have.css', 'border-radius', '24px')
          .click()
          .wait(1000)

        //verify Create Upsell Item modal popup
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modal)
          .should('exist')

        ///////// CREATE UPSELL ITEM MODAL ELEMENTS ASSERTIONS STARTS HERE /////////////

        //verify Modal title
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modaltitle)
          .should('exist')
          .and('have.text', 'Create Upsell Item')
          .and('have.css', 'font-weight', '700') // font bold

        //verify Invoice Item Name label and its input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemNameLabelandInputfield)
          .should('exist')
          .within(()=>{
            //assert Invoice Item Name Label
            cy.get('label')
              .should('exist')
              .and('have.text', 'Invoice Item Name *')
              .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
              .find('sup').should('have.text', '*').and('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
            //assert Input field
            cy.get(' > input[name="name"]')
              .should('exist')
              .and('not.be.disabled')
              .and('have.value', '') //empty by default
              .and('have.attr', 'placeholder', 'Add Invoice Item Name')
          })

        //verify Invoice Item Code label and its input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
          .should('exist')
          .within(()=>{
            //assert Invoice Item Code Label
            cy.get('label')
              .should('exist')
              .and('have.text', 'Invoice Item Code *')
              .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
              .find('sup').should('have.text', '*').and('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
            //assert Input field
            cy.get(' > input[name="addonCode"]')
              .should('exist')
              .and('not.be.disabled')
              .and('have.value', '') //empty by default
              .and('have.attr', 'placeholder', 'Add Invoice Item Code')
          })

        //verify Item Description label and textarea field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].ItemDescriptionLabelandTextareafield)
          .should('exist')
          .within(()=>{
            //assert Item Descriptoin Label
            cy.get('label')
              .should('exist')
              .and('have.text', 'Item Description')
              .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
            //assert Textarea field
            cy.get(' > textarea[name="description"]')
              .should('exist')
              .and('not.be.disabled')
              .and('have.value', '') //empty by default
              .and('have.attr', 'placeholder', 'Add information related to this upsell')
          })

        //verify One Time Fee label and input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
          .should('exist')
          .within(()=>{
            //assert One Time Fee Label
            cy.get('label')
              .should('exist')
              .and('have.text', 'One Time Fee *')
              .and('have.css', 'color', 'rgb(107, 114, 128)') //text color
              .find('sup').should('have.text', '*').and('have.css', 'color', 'rgb(237, 46, 46)') //asterisk color
            //assert Input field
            cy.get(' > input[name="price"]')
              .should('exist')
              .and('not.be.disabled')
              .and('have.value', '') //empty by default
              .and('have.attr', 'placeholder', '$ Price')
          })

        //verify Cancel Button
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].CancelButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Cancel')
          .and('have.css', 'font-weight', '700') // font bold
          .and('have.css', 'color', 'rgb(24, 121, 216)')//text color

        //verify Save Button
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.css', 'font-weight', '700') // font bold
          .and('have.text', 'Save')
          .and('have.css', 'color', 'rgb(250, 250, 250)')
          .and('have.css', 'background-color', 'rgb(0, 47, 93)')
          .and('have.css', 'border-radius', '9999px')

        ///////// CREATE UPSELL ITEM MODAL ELEMENTS ASSERTIONS ENDS HERE /////////////
        
        ///////// REQUIRED ASSERTIONS STARTS HERE //////////////

        //without enter any data, click right away the Save button
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
          .click()
          .wait(1000)

        //verify that the Create Upsell modal should remains open
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modal)
          .should('exist')

        //verify Error Text - Required under the Invoice Item Name input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemNameLabelandInputfield)
          .should('exist')
          .find('div').should('have.text', 'Required').and('have.css', 'color', 'rgb(185, 28, 28)')

        //verify Error Text - Required under the Invoice Item Code input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
          .should('exist')
          .find('div').should('have.text', 'Required').and('have.css', 'color', 'rgb(185, 28, 28)')

        //verify Error Text - Required under the One Time Fee input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
          .should('exist')
          .find('div').should('have.text', 'Required').and('have.css', 'color', 'rgb(185, 28, 28)')

        //Now Enter Invoice Item Name
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemNameLabelandInputfield)
          .find('input[name="name"]')
          .clear()
          .type('000111 Test Name')
          .wait(700)
          .should('have.value', '000111 Test Name')

        //Click Save button
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
          .click()
          .wait(1000)

        //verify that the Create Upsell modal should remains open
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modal)
          .should('exist')

        //verify that the Error Text beneath it, should not be visible
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemNameLabelandInputfield)
          .should('exist')
          .find('div').should('not.exist')

        //verify Error Text - Required under the Invoice Item Name input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
          .should('exist')
          .find('div').should('have.text', 'Required').and('have.css', 'color', 'rgb(185, 28, 28)')

        //verify Error Text - Required under the Invoice Item Code input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
          .should('exist')
          .find('div').should('have.text', 'Required').and('have.css', 'color', 'rgb(185, 28, 28)')

        //Now Enter Invoice Item Code
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
          .find('input[name="addonCode"]')
          .clear()
          .type('Testcode01234567890')
          .wait(700)
          .should('have.value', 'Testcode01234567890')

        //Click Save button
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
          .click()
          .wait(1000)

        //verify that the Create Upsell modal should remains open
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modal)
          .should('exist')

        //verify there is no more Error Text - Required beneath the Invoice Item Code input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
          .should('exist')
          .find('div').should('not.exist')

        //verify Error Text - Required under the Invoice Item Code input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
          .should('exist')
          .find('div').should('have.text', 'Required').and('have.css', 'color', 'rgb(185, 28, 28)')

        //Now finally Enter One Time Fee
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
          .find('input[name="price"]')
          .clear()
          .type('345.95')
          .wait(700)
          .should('have.value', '345.95')

        //verify there is no more Error Text - Required under the Invoice Item Code input field
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
          .should('exist')
          .find('div').should('not.exist')

        //Enter Item Description
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].ItemDescriptionLabelandTextareafield)
          .find('textarea[name="description"]')
          .clear()
          .type('This is just a test description and I will reuse this over and over again.')
          .wait(700)
          .should('have.value', 'This is just a test description and I will reuse this over and over again.')

        ///////// REQUIRED ASSERTIONS ENDS HERE ///////////////

        //Click the Save button
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
          .click()
          .wait(3000)

        //verify alert-success message popup 
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Invoice item added')
        //cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Addon Added')
        
        //Now since I use a name that I know it would end up on row 1 in the table, and so i will verify row 1 each columns
        ///////// ADDONS / UPSELL ITEMS TABLE LIST ASSERTIONS STARTS HERE ////////
          
        //verify first the expected column names
        const columnNames =[
            'Name',
            'Code',
            'Description',
            'Price ($)',
            'Created By',
            'Action'
        ]
        cy.get('table > thead > tr > th').each(($cols, index)=>{
          cy.wrap($cols)
            .should('exist')
            .and('have.text', columnNames[index])
            .and('have.css', 'color', 'rgb(190, 190, 190)')
          cy.log(columnNames[index])
        })

        //Then verify Row 1 each columns
        cy.get('table > tbody > tr:first-child').within(()=>{
          //assert column 1 > Name
          UpsellItemAddonItem.assertColumn1Name(' > td:nth-child(1)', '000111 Test Name')
          //assert column 2 > Code
          UpsellItemAddonItem.assertColumn2Code(' > td:nth-child(2)', 'Testcode01234567890')
          //assert column 3 > description
          UpsellItemAddonItem.assertColumn3Description(' > td:nth-child(3)', 'This is just a test description and I will reuse this over and over again.')
          //assert colummn 4 > price
          UpsellItemAddonItem.assertColumn4Price(' > td:nth-child(4) > span', '$345.95')
          //assert column 5 > create by
          UpsellItemAddonItem.assertColumn5CreatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
          //assert coluumn 6 > action: edit and delete button
          UpsellItemAddonItem.assertColumn6Action(' > td:nth-child(6) > div')
        })

        ///////// ADDONS / UPSELL ITEMS TABLE LIST ASSERTIONS ENDS HERE /////////
    })
    it('Testcase ID: BUI0002 - Add New Upsell Item but the Invoice Item Code is existing on another existing Upsell item. ', ()=>{

        //Login using account specialist
        cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

        //Click the Billing Navigation Module
        cy.get(modulebutton.BillingModuleButton)
          .click()
          .wait(2000) 

        //verify Upsell Items link text folder, click if found
        cy.get(linktextfolder.BillingModule[0].UpsellItems)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Upsell Items')
          .click()
          .wait(1000)

        //verify expected url destination
        cy.url().should('contain', '/addons')
        
        //verify Upsell Items Page title
        cy.get(billingmodulelocator.UpsellItemsPage[0].pageTitle)
          .should('exist')
          .and('have.text', 'Addons / Upsell Items')
          .and('have.css', 'font-weight', '700') // font bold

        //verify Add button and then click if found
        cy.get(billingmodulelocator.UpsellItemsPage[0].AddButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', ' Add')
          .and('have.css', 'color', 'rgb(75, 85, 99)') //text color
          .and('have.css', 'border-color', 'rgb(75, 85, 99)')
          .and('have.css', 'border-radius', '24px')
          .click()
          .wait(1000)

        //verify Create Upsell Item modal popup
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modal)
          .should('exist')

        ////// CREATE ADDON/UPSELL ITEM STARTS HERE /////////

        //Enter Invoice Item Name
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemNameLabelandInputfield)
          .find('input[name="name"]')
          .clear()
          .type('000111 Test Name')
          .wait(700)
          .should('have.value', '000111 Test Name')

        //Now Enter Invoice Item Code - use an existing invoice code from an existing addon/upsell item you can find in the table list
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
          .find('input[name="addonCode"]')
          .clear()
          .type('admin-fee')
          .wait(700)
          .should('have.value', 'admin-fee')

        //Enter Item Description
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].ItemDescriptionLabelandTextareafield)
          .find('textarea[name="description"]')
          .clear()
          .type('This is just a test description and I will reuse this over and over again.')
          .wait(700)
          .should('have.value', 'This is just a test description and I will reuse this over and over again.')

        //Now finally Enter One Time Fee
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
          .find('input[name="price"]')
          .clear()
          .type('345.95')
          .wait(700)
          .should('have.value', '345.95')

        //Click the Save button
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
          .click()
          .wait(3000)

        ////// CREATE ADDON/UPSELL ITEM ENDS HERE //////////

        //verify alert-success message popup 
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Failed to add invoice item')
        cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'already exists')

    })
    it('Testcase ID: BUI0003 - Edit an existing Addons/Upsell Items', ()=>{

         //Login using account specialist
         cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

         //Click the Billing Navigation Module
         cy.get(modulebutton.BillingModuleButton)
           .click()
           .wait(2000) 
 
         //verify Upsell Items link text folder, click if found
         cy.get(linktextfolder.BillingModule[0].UpsellItems)
           .should('exist')
           .and('not.be.disabled')
           .and('have.text', 'Upsell Items')
           .click()
           .wait(1000)
 
         //verify expected url destination
         cy.url().should('contain', '/addons')
         
         //verify Upsell Items Page title
         cy.get(billingmodulelocator.UpsellItemsPage[0].pageTitle)
           .should('exist')
           .and('have.text', 'Addons / Upsell Items')
           .and('have.css', 'font-weight', '700') // font bold
 
         //verify Add button and then click if found
         cy.get(billingmodulelocator.UpsellItemsPage[0].AddButton)
           .should('exist')
           .and('not.be.disabled')
           .and('have.text', ' Add')
           .and('have.css', 'color', 'rgb(75, 85, 99)') //text color
           .and('have.css', 'border-color', 'rgb(75, 85, 99)')
           .and('have.css', 'border-radius', '24px')
           .click()
           .wait(1000)
 
         //verify Create Upsell Item modal popup
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modal)
           .should('exist')
 
         ////// CREATE ADDON/UPSELL ITEM STARTS HERE /////////
 
         //Enter Invoice Item Name
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemNameLabelandInputfield)
           .find('input[name="name"]')
           .clear()
           .type('00001 Edit Test')
           .wait(700)
           .should('have.value', '00001 Edit Test')
 
         //Now Enter Invoice Item Code
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
           .find('input[name="addonCode"]')
           .clear()
           .type('test000111')
           .wait(700)
           .should('have.value', 'test000111')
 
         //Enter Item Description
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].ItemDescriptionLabelandTextareafield)
           .find('textarea[name="description"]')
           .clear()
           .type('This is just a test description and I will reuse this over and over again.')
           .wait(700)
           .should('have.value', 'This is just a test description and I will reuse this over and over again.')
 
         //Now finally Enter One Time Fee
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
           .find('input[name="price"]')
           .clear()
           .type('345.95')
           .wait(700)
           .should('have.value', '345.95')
 
         //Click the Save button
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
           .click()
           .wait(3000)
 
         ////// CREATE ADDON/UPSELL ITEM ENDS HERE //////////
 
         //verify alert-success message popup 
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Invoice item added')
        //cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Addon Added')
      
        ///////// ADDONS / UPSELL ITEMS TABLE LIST ASSERTIONS STARTS HERE ////////
    
        cy.get('table > tbody > tr:first-child').within(()=>{
          //assert column 1 > Name
          UpsellItemAddonItem.assertColumn1Name(' > td:nth-child(1)', '00001 Edit Test')
          //assert column 2 > Code
          UpsellItemAddonItem.assertColumn2Code(' > td:nth-child(2)', 'test000111')
          //assert column 3 > description
          UpsellItemAddonItem.assertColumn3Description(' > td:nth-child(3)', 'This is just a test description and I will reuse this over and over again.')
          //assert colummn 4 > price
          UpsellItemAddonItem.assertColumn4Price(' > td:nth-child(4) > span', '$345.95')
          //assert column 5 > create by
          UpsellItemAddonItem.assertColumn5CreatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
          //assert coluumn 6 > action: edit and delete button
          UpsellItemAddonItem.assertColumn6Action(' > td:nth-child(6) > div')
        })

        ///////// ADDONS / UPSELL ITEMS TABLE LIST ASSERTIONS ENDS HERE /////////

        //Click the Edit button under the Action
        cy.get('table > tbody > tr:first-child > td:nth-child(6) > div > button:nth-child(1)')
          .click()
          .wait(2000)

        //verify Create/Update Upsell Item Modal popup
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modal)
           .should('exist')

        //Edit Invoice Item Name
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemNameLabelandInputfield)
           .find('input[name="name"]')
           .clear()
           .type('00001 Edit Test Name Only')
           .wait(700)
           .should('have.value', '00001 Edit Test Name Only')
 
         //verify that the Invoice Item Code input field is disabled
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
           .find('input[name="addonCode"]')
           .should('be.disabled')

        //Edit Item Description
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].ItemDescriptionLabelandTextareafield)
          .find('textarea[name="description"]')
          .clear()
          .type('This test description is already editted')
          .wait(700)
          .should('have.value', 'This test description is already editted')

        //Now finally Enter One Time Fee
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
          .find('input[name="price"]')
          .clear()
          .type('275.45')
          .wait(700)
          .should('have.value', '275.45')

        //Click the Save button
        cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
          .click()
          .wait(3000)

         //verify alert-success message popup 
         cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Invoice item edited')
         cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Addon updated')
        
         ///////// ADDONS / UPSELL ITEMS TABLE LIST ASSERTIONS STARTS HERE ////////
      
        cy.get('table > tbody > tr:first-child').within(()=>{
            //assert column 1 > Name
            UpsellItemAddonItem.assertColumn1Name(' > td:nth-child(1)', '00001 Edit Test Name Only')
            //assert column 3 > description
            UpsellItemAddonItem.assertColumn3Description(' > td:nth-child(3)', 'This test description is already editted')
            //assert colummn 4 > price
            UpsellItemAddonItem.assertColumn4Price(' > td:nth-child(4) > span', '$275.45')
            //assert column 5 > create by
            UpsellItemAddonItem.assertColumn5CreatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
            //assert coluumn 6 > action: edit and delete button
            UpsellItemAddonItem.assertColumn6Action(' > td:nth-child(6) > div')
          })
  
          ///////// ADDONS / UPSELL ITEMS TABLE LIST ASSERTIONS ENDS HERE /////////
    })
    it('Testcase ID: BUI0004 - Verify user can Delete an existing Addons/Upsell Items category', ()=>{

         //Login using account specialist
         cy.userlogin(loginmodule.EmailAddressInputfield, loginmodule.PasswordInputfield, loginmodule.SigninButton, testdata.userAccounts[0].accountspecialist1, testdata.userAccounts[0].accountspecialistandprojectmanagerpassword)

         //Click the Billing Navigation Module
         cy.get(modulebutton.BillingModuleButton)
           .click()
           .wait(2000) 
 
         //verify Upsell Items link text folder, click if found
         cy.get(linktextfolder.BillingModule[0].UpsellItems)
           .should('exist')
           .and('not.be.disabled')
           .and('have.text', 'Upsell Items')
           .click()
           .wait(1000)
 
         //verify expected url destination
         cy.url().should('contain', '/addons')
         
         //verify Upsell Items Page title
         cy.get(billingmodulelocator.UpsellItemsPage[0].pageTitle)
           .should('exist')
           .and('have.text', 'Addons / Upsell Items')
           .and('have.css', 'font-weight', '700') // font bold
 
         //verify Add button and then click if found
         cy.get(billingmodulelocator.UpsellItemsPage[0].AddButton)
           .should('exist')
           .and('not.be.disabled')
           .and('have.text', ' Add')
           .and('have.css', 'color', 'rgb(75, 85, 99)') //text color
           .and('have.css', 'border-color', 'rgb(75, 85, 99)')
           .and('have.css', 'border-radius', '24px')
           .click()
           .wait(1000)
 
         //verify Create Upsell Item modal popup
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].modal)
           .should('exist')
 
         ////// CREATE ADDON/UPSELL ITEM STARTS HERE /////////
 
         //Enter Invoice Item Name
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemNameLabelandInputfield)
           .find('input[name="name"]')
           .clear()
           .type('00000 To be deleted')
           .wait(700)
           .should('have.value', '00000 To be deleted')
 
         //Now Enter Invoice Item Code
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].InvoiceItemCodeLabelandInputfield)
           .find('input[name="addonCode"]')
           .clear()
           .type('test00011122')
           .wait(700)
           .should('have.value', 'test00011122')
 
         //Enter Item Description
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].ItemDescriptionLabelandTextareafield)
           .find('textarea[name="description"]')
           .clear()
           .type('This is just a test description and I will reuse this over and over again.')
           .wait(700)
           .should('have.value', 'This is just a test description and I will reuse this over and over again.')
 
         //Now finally Enter One Time Fee
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].OneTimeFeeLabelandInputfield)
           .find('input[name="price"]')
           .clear()
           .type('345.95')
           .wait(700)
           .should('have.value', '345.95')
 
         //Click the Save button
         cy.get(billingmodulelocator.UpsellItemsPage[0].CreateUpsellItemModal[0].SaveButton)
           .click()
           .wait(3000)
 
         ////// CREATE ADDON/UPSELL ITEM ENDS HERE //////////
 
         //verify alert-success message popup 
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Invoice item added')
        //cy.GETAlertMessagepopup(alertmessagepopup.SubMessage, 'Addon Added')
      
        ///////// ADDONS / UPSELL ITEMS TABLE LIST ASSERTIONS STARTS HERE ////////
    
        cy.get('table > tbody > tr:first-child').within(()=>{
          //assert column 1 > Name
          UpsellItemAddonItem.assertColumn1Name(' > td:nth-child(1)', '00000 To be deleted')
          //assert column 2 > Code
          UpsellItemAddonItem.assertColumn2Code(' > td:nth-child(2)', 'test00011122')
          //assert column 3 > description
          UpsellItemAddonItem.assertColumn3Description(' > td:nth-child(3)', 'This is just a test description and I will reuse this over and over again.')
          //assert colummn 4 > price
          UpsellItemAddonItem.assertColumn4Price(' > td:nth-child(4) > span', '$345.95')
          //assert column 5 > create by
          UpsellItemAddonItem.assertColumn5CreatedBy(' > td:nth-child(5) > div', 'LP', 'Logan Paul')
          //assert coluumn 6 > action: edit and delete button
          UpsellItemAddonItem.assertColumn6Action(' > td:nth-child(6) > div')
        })

        ///////// ADDONS / UPSELL ITEMS TABLE LIST ASSERTIONS ENDS HERE /////////

        //Click the Delete button under the Action
        cy.get('table > tbody > tr:first-child > td:nth-child(6) > div > button:nth-child(2)')
          .click()
          .wait(2000)

        //verify Confirm Delete Item modal popup
        cy.get(billingmodulelocator.UpsellItemsPage[0].ConfirmDeleteItemModal[0].modal)
          .should('exist')

        //verify modal title
        cy.get(billingmodulelocator.UpsellItemsPage[0].ConfirmDeleteItemModal[0].modaltitle)
          .should('exist')
          .and('have.text', 'Confirm Delete Item')
          .and('have.css', 'font-weight', '700') // font bold

        //verify 'Are you sure you want to delete this addon/upsell item? '
        cy.get(billingmodulelocator.UpsellItemsPage[0].ConfirmDeleteItemModal[0].AreYouSureYouWantToDeleteThisAddonupsellitemTEXT)
          .should('exist')
          .and('have.text', 'Are you sure you want to delete this addon/upsell item? ')

        //verify No Button
        cy.get(billingmodulelocator.UpsellItemsPage[0].ConfirmDeleteItemModal[0].NoButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'No')
          .and('have.css', 'color', 'rgb(148, 148, 148)') //text color
          .and('have.css', 'font-weight', '700') // font bold

        //verify Yes Button
        cy.get(billingmodulelocator.UpsellItemsPage[0].ConfirmDeleteItemModal[0].YesButton)
          .should('exist')
          .and('not.be.disabled')
          .and('have.text', 'Yes')
          .and('have.css', 'color', 'rgb(255, 255, 255)') //text color
          .and('have.css', 'font-weight', '700') // font bold
          .and('have.css', 'background-color', 'rgb(5, 150, 105)')
          .and('have.css', 'border-radius', '40px')

        //Now I click the Yes button
        cy.get(billingmodulelocator.UpsellItemsPage[0].ConfirmDeleteItemModal[0].YesButton)
          .click()
          .wait(3000)

        //verify alert-success message popup 
        cy.GETAlertMessagepopup(alertmessagepopup.TopMessage, 'Invoice item deleted')
    })


})