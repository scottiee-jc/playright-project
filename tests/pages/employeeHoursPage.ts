import { Page } from 'playwright';
import {expect} from "@playwright/test";
import {page2_content} from "../content/holiday_pages_content";

class EmployeeSchedulePage {
    private readonly url: string;
    private readonly caption: string;
    private readonly question: string;
    private readonly text: string;

    constructor() {
        this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement/y';
        this.caption = `.govuk-caption-l`
        this.question = `.govuk-fieldset__heading`
        this.text = `.gem-c-hint`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all([     
            expect(page.locator(this.caption)).toContainText(page2_content.caption),
            expect(page.locator(this.question)).toContainText(page2_content.question),         
            expect(page.locator(this.text)).toContainText(page2_content.pText),            
        ]);
    }

    async selectYesOrNo(page: Page, answer: string): Promise<void> {
        // Click the "Yes" or "No" option based on the provided answer
        await page.locator(`input[type='radio'][id='response-${answer === "Yes" ? 0 : 1}']`).click();
    }

    async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default EmployeeSchedulePage;