import { Page } from 'playwright';
import {expect} from "@playwright/test";
import {holiday_entitlement_based_on_page_content} from "../content/holiday_pages_content";

class EntitlementBasedOnPage {
    private readonly url: string;
    private readonly caption: string;
    private readonly question: string;
    private readonly text: string;
    private readonly radioOption: string;
    private readonly yearStarts: string;
    
    constructor(yearStarts: string) {
        this.yearStarts = yearStarts;
        this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/' + yearStarts;
        this.caption = `.govuk-caption-l`
        this.question = `.govuk-fieldset__heading`
        this.text = `.gem-c-hint`
        this.radioOption = '.gem-c-radio';
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all([     
            expect(page.locator(this.caption)).toContainText(holiday_entitlement_based_on_page_content.caption),
            expect(page.locator(this.question)).toContainText(holiday_entitlement_based_on_page_content.question),         
            expect(page.locator(this.radioOption).first()).toContainText(holiday_entitlement_based_on_page_content.radioOption1),   
            expect(page.locator(this.radioOption).nth(1)).toContainText(holiday_entitlement_based_on_page_content.radioOption2),            
            expect(page.locator(this.radioOption).nth(2)).toContainText(holiday_entitlement_based_on_page_content.radioOption3),            
            expect(page.locator(this.radioOption).nth(3)).toContainText(holiday_entitlement_based_on_page_content.radioOption4),            
            expect(page.locator(this.radioOption).nth(4)).toContainText(holiday_entitlement_based_on_page_content.radioOption5),            
        ]);
    }

    async selectOption(page: Page, answer: string): Promise<void> {
        // Click the "Yes" or "No" option based on the provided answer
        if (answer == holiday_entitlement_based_on_page_content.radioOption1) {
            await page.locator(`input[type='radio'][id='response-0']`).click();
        } else if (answer == holiday_entitlement_based_on_page_content.radioOption2) {
            await page.locator(`input[type='radio'][id='response-1']`).click();
        } else if (answer == holiday_entitlement_based_on_page_content.radioOption3) {
            await page.locator(`input[type='radio'][id='response-2']`).click();
        } else if (answer == holiday_entitlement_based_on_page_content.radioOption4) {
            await page.locator(`input[type='radio'][id='response-3']`).click();
        } else if (answer == holiday_entitlement_based_on_page_content.radioOption5) {
            await page.locator(`input[type='radio'][id='response-4']`).click();
        } else {
            throw new Error(`Invalid answer provided: ${answer}`);
        }
    }

    async continueOn(page: Page): Promise<void> {
        // Click the continue button
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default EntitlementBasedOnPage;