const { expect } = require('@playwright/test');

class SearchPage {



    constructor(page) {

        this.page = page;
        this.url = 'https://testpages.eviltester.com/styled/search';
  
      }


      async goto() {

        await this.page.goto(this.url);
  
        
      }

      async searchNameFromTableData(name){
        name = name.trim()

        await this.page.waitForSelector(('input[title="Search"]'))

        await this.page.locator('input[title="Search"]').clear()

        await this.page.locator('input[title="Search"]').fill(name)

        await this.page.locator('input[type="submit"]').click()

      }

      async verifySearchedNameFromSearchResults(name) {

        name = name.trim()
        // let waitresult = await this.page.getByText(`${name}`,{ strict: false })
        await this.page.waitForTimeout(5000)
        let searchResult = await this.page.getByText(`${name}`).all()
        await this.page.waitForLoadState('networkidle');
        if(searchResult.length>1) {

          console.log(`${name} is present in searchResult, and total results rows are ::  `, await searchResult.length)

        } else {

          console.log(`${name} is not having any search results !!!`)
        }
        

      }
}

module.exports = { SearchPage  };