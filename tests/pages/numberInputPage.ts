import { Page } from "playwright";
import { expect } from "@playwright/test";
import { checkAccessibility } from "../helpers/accessibility";

// Single text input question page (hours per shift, shifts per pattern, days in pattern)
class NumberInputPage {
    private readonly url: string;
    private readonly question: string;

    constructor(path: string, question: string) {
        this.url = "https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/" + path;
        this.question = question;
    }

    async checkPageLoads(page: Page): Promise<void> {
        await page.goto(this.url);
        await expect(page.locator("label.govuk-label--l")).toContainText(this.question);
    }

    async checkAccessibility(page: Page): Promise<void> {
        await checkAccessibility(page);
    }

    async inputValue(page: Page, value: string): Promise<void> {
        await page.fill("input#response", value);
    }

    async continueOn(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default NumberInputPage;
