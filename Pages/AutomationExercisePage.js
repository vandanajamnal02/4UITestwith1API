const { expect } = require('@playwright/test');

class AutomationExercisePage {


    constructor(page) {

        this.page = page;
        this.url = 'https://www.automationexercise.com';
  
      }

      async goto(url) {

        console.log('url value :::', url)

        if(url != null) {
          this.url = url
          await this.page.goto( this.url);
        }
          await this.page.goto(this.url);
        
      }

      async clickonExpandTestcases(){

        await this.page.waitForSelector('#form .container div.panel-group:nth-child(2) h4 a')
        await this.page.locator('#form .container div.panel-group:nth-child(2) h4 a').focus()
        await this.page.locator('#form .container div.panel-group:nth-child(2) h4 a').click()

      }

      async verifyTestcasesExpanded(){

        await expect(this.page.locator('#form .container div.panel-group:nth-child(2) .panel-collapse.in')).toBeVisible()
        await expect(this.page.locator('#form .container div.panel-group:nth-child(2) .panel-collapse.in ul li:nth-child(1)')).toHaveText('1. Launch browser')

      }
}

module.exports = { AutomationExercisePage  };