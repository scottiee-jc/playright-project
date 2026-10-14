import { Page } from 'playwright';
import {expect} from "@playwright/test";
import {page3_content} from "../content/holiday_pages_content";

class LeaveYearStartsPage {
    private readonly url: string;
    private readonly caption: string;
    private readonly question: string;
    private readonly text: string;
    private readonly inputField: string;

    constructor() {
        this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year';
        this.caption = `.govuk-caption-l`
        this.question = `.govuk-fieldset__heading`
        this.text = `.gem-c-hint`
        this.inputField = '.gem-c-input';
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all([     
            expect(page.locator(this.caption)).toContainText(page3_content.caption),
            expect(page.locator(this.question)).toContainText(page3_content.question),         
            expect(page.locator(this.text)).toContainText(page3_content.pText2),            
        ]);
    }

    async inputDDMMYYYY(page: Page, day: string, month: string, year: string): Promise<void> {
        const inputField = page.locator(this.inputField);
        if (inputField != null) {
            // Input the day, month, and year into the respective fields
            await page.fill('input[name="response[day]"]', day);
            await page.fill('input[name="response[month]"]', month);
            await page.fill('input[name="response[year]"]', year);
        } else {
            throw new Error("Input field not found");
        }
    }

    async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default LeaveYearStartsPage;