// @ts-check
import { test, expect } from '@playwright/test';
const { AutomationExercisePage } = require('../Pages/AutomationExercisePage');



test('Testcases 1 verify user is able to open the web site', async ({ page }) => {
    const automationExercisePage = new AutomationExercisePage(page);
    await automationExercisePage.goto()
    await page.waitForLoadState('domcontentloaded')
    await expect( page.locator('img[alt="Website for automation practice"]')).toBeVisible()
})

test('Testcases 2 verify user is able to expand the testcases steps', async ({page})=> {
    const automationExercisePage = new AutomationExercisePage(page);
    await automationExercisePage.goto('https://www.automationexercise.com/test_cases')
    await automationExercisePage.clickonExpandTestcases()
    await automationExercisePage.verifyTestcasesExpanded()
})