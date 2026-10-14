import { Page } from 'playwright';
import {expect} from "@playwright/test";
import {employee_hours_worked_page_content} from "../content/holiday_pages_content";

class EmployeeHoursWorkedPage {
    private readonly url: string;
    private readonly caption: string;
    // private readonly question: string;
    private readonly text: string;
    private readonly inputField: string;
    private readonly page3Answer: string;

    constructor(page3Answer: string) {
        this.page3Answer = page3Answer; // Replace with the actual value from page 3
        this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/' + this.page3Answer;
        this.caption = `.govuk-caption-l`
        // this.question = `.gem-c-label`
        this.text = `.gem-c-heading`
        this.inputField = '.gem-c-input';
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all([     
            expect(page.locator(this.caption)).toContainText(employee_hours_worked_page_content.caption),
            // expect(page.locator(this.question)).toContainText(employee_hours_worked_page_content.question),         
            expect(page.locator(this.text)).toContainText(employee_hours_worked_page_content.pText),            
        ]);
    }

    async inputHoursWorked(page: Page, hoursWorked: number): Promise<void> {
        const inputField = page.locator(this.inputField);
        if (inputField != null) {
            // Input the hours worked into the respective field
            await page.fill('input[name="response"]', hoursWorked.toString());
        } else {
            throw new Error("Input field not found");
        }
    }

    async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default EmployeeHoursWorkedPage;