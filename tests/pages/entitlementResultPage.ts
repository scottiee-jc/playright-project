import { Page } from "playwright";
import { expect } from "@playwright/test";
import { checkAccessibility } from "../helpers/accessibility";

class EntitlementResultPage {
    private readonly url: string;
    private readonly resultText: string;

    constructor(path: string, resultText: string) {
        this.url = "https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/" + path;
        this.resultText = resultText;
    }

    async checkPageLoads(page: Page): Promise<void> {
        await page.goto(this.url);
        await expect(page.locator("main p").filter({ hasText: this.resultText }).first()).toBeVisible();
    }

    async checkAccessibility(page: Page): Promise<void> {
        await checkAccessibility(page);
    }
}

export default EntitlementResultPage;
