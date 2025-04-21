// tests/extract-table.spec.js
const { test, expect } = require('@playwright/test');
const { TablePage } = require('../Pages/TablePage');
const { setTable, getTable } = require('../Utils/readtable');
const { SearchPage } = require('../Pages/SearchPage');

test(' verify getting table data from the table page, save the data to a veriable', async ({ page }) => {
  const tablePage = new TablePage(page);
  await tablePage.goto();
  await page.waitForTimeout(5000)
  const data = await tablePage.getTableData();

  await setTable(data);
  console.log(data[1].name)
  expect(data.length).toBeGreaterThan(0);

});

test('Searching the saved variable in a search webpage', async ({ page }) => {
    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await page.waitForTimeout(5000)

    const data = getTable();


    for(let i = 1; i < data.length; i++){

    console.log(data[i].name)
    await searchPage.searchNameFromTableData(data[i].name)
    await searchPage.verifySearchedNameFromSearchResults(data[i].name)
     
    }
});
