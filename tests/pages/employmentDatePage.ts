import { Page } from "playwright";
import { expect } from "@playwright/test";
import { checkAccessibility } from "../helpers/accessibility";

type DatePageContent = { readonly caption: string; readonly question: string };

class EmploymentDatePage {
    private readonly url: string;
    private readonly content: DatePageContent;

    // path is the answers-so-far segment of the URL, e.g. "2024-01-01/shift-worker/starting-and-leaving"
    constructor(path: string, content: DatePageContent) {
        this.url = "https://www.gov.uk/calculate-your-holiday-entitlement/y/irregular-hours-and-part-year/" + path;
        this.content = content;
    }

    async checkPageLoads(page: Page): Promise<void> {
        await page.goto(this.url);
        await Promise.all([
            expect(page.locator(".govuk-caption-l")).toContainText(this.content.caption),
            expect(page.locator(".govuk-fieldset__heading")).toContainText(this.content.question),
        ]);
    }

    async checkAccessibility(page: Page): Promise<void> {
        await checkAccessibility(page);
    }

    async inputDDMMYYYY(page: Page, day: string, month: string, year: string): Promise<void> {
        await page.fill('input[name="response[day]"]', day);
        await page.fill('input[name="response[month]"]', month);
        await page.fill('input[name="response[year]"]', year);
    }

    async continueOn(page: Page): Promise<void> {
        await page.getByRole("button", { name: "Continue" }).click();
    }
}

export default EmploymentDatePage;
