class TablePage {

    constructor(page) {

      this.page = page;
      this.url = 'https://testpages.eviltester.com/styled/tag/table.html';
      this.tableRows = 'table#mytable tbody tr';

    }
  
    async goto() {

      await this.page.goto(this.url);

      
    }
  
    async getTableData() {
      await this.page.waitForSelector('table#mytable tbody tr');
  
      return await this.page.$$eval('table#mytable tbody tr', trs => {
        return trs.map(tr => {
          const cells = Array.from(tr.querySelectorAll('td'));
          return {
            name: cells[0] ? cells[0].innerText.trim() : '',
            age: cells[1] ? cells[1].innerText.trim() : '',
            height: cells[2] ? cells[2].innerText.trim() : '',
            weight: cells[3] ? cells[3].innerText.trim() : ''
          };
        });
      });
    }
  }
  
  module.exports = { TablePage };
  