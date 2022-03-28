//signup using random mail and add tshirt and verify cart details
describe("automationPracticeAssignment", () => {
    before(function () {
        cy.fixture("testData").then(function (data) { //calling fixture testData 
            this.data = data
        })
        cy.fixture("locatorsData").then(function (locator) {      //calling locators
            this.locator = locator
        })
    })
    let r = (Math.random()).toString(36).substring(9);   //random mail id formula using random() function
    const testname = "xyz" + r + "@gmail.com"

    it("signup_login_tshirts_addToCart_verify", function () {
        cy.visit(this.data.url)                 //url visit
        cy.signIn(this.locator.signIn)          //sign-in button    
        cy.get(this.locator.emailCreate).type(testname);    //random mail id creation
        cy.createAc(this.locator.createAcBtn);              //create a/c btn using random mail id 
        cy.wait(3000)
        //signup form filling 
        cy.personalInfo(this.locator.genderMr, this.data.firstName, this.data.lastName, this.data.passWord);
        cy.yourAddress(this.data.address, this.data.city, this.data.postalCode, this.data.mobilePhone, this.data.addressAlias)
        cy.get(this.locator.stateSlct).select(this.data.state)
        cy.registerButton(this.locator.register)        //register button to a/c creation
        cy.verifyWelcomeMsg(this.data.welcomeMsg)       //verifying user signed in with Welcome message
        cy.verifyHomePage(this.data.myAccount, this.data.contactUs, this.data.signOut)//verifying the content of home page
        cy.womenTshirts()   //womenTshirts
        cy.contains('Add to cart').click()      //Tshirt add to cart
        cy.wait(2000)
        //Cart popup verify
        cy.popupVerify(this.data.prodAddedScsMsg, this.data.prodName, this.data.prodColorSize, this.data.quantity,  //cart product verify
            this.data.total, this.data.totalProducts, this.data.totalShipping, this.data.totalValue)
        cy.continueShpng_proceedChckoutBtns()       //ContinueShopping and ProceedtoCheckout buttons visiblity
    })
})