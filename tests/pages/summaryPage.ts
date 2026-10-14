import { Page } from 'playwright';
import {expect} from "@playwright/test";
import {page5_content} from "../content/holiday_pages_content";

class SummaryPage {
    private readonly url: string;
    private readonly caption: string;
    private readonly text: string;
    private readonly page3Answer: string;
    private readonly page4Answer: string;
    private readonly page5Answer: string;
    private readonly header: string;

    constructor(page3Answer: string, page4Answer: string, page5Answer: string) {
        this.page3Answer = page3Answer; // Replace with the actual value from page 3
        this.page4Answer = page4Answer; // Replace with the actual value from page 4
        this.page5Answer = page5Answer; // Replace with the actual value from page 5
        if (this.page5Answer == "") {
            this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/' + this.page3Answer + "/" + this.page4Answer
        } else {
            this.url = 'https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/' + this.page3Answer + "/" + this.page4Answer + "/" + this.page5Answer;
        }
        this.caption = `.gem-c-heading__context`
        this.header = `.gem-c-heading__text`
        this.text = `p`
    }

    async checkPageLoads(page: Page): Promise<void> {
        // Navigate to the landing page
        await page.goto(this.url);

        // Check elements of the page
        await Promise.all([     
            expect(page.locator(this.caption)).toContainText(page5_content.caption),
            expect(page.locator(this.header).first()).toContainText(page5_content.header), 
            expect(page.locator('p').filter({ hasText: page5_content.pText }).first()).toBeVisible(),
            expect(page.locator('p').filter({ hasText: page5_content.pText2 }).first()).toBeVisible(),
        ]);
    }
}

export default SummaryPage;