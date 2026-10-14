import { test } from "@playwright/test";
import LandingPage from "./pages/landingPage";
import EmployeeHoursWorkedPage from "./pages/employeeHoursWorkedPage";
import SummaryPage from "./pages/summaryPage";  
import LeaveYearStartsPage from "./pages/leaveYearStartsPage";
import {holiday_entitlement_based_on_page_content, duration_of_work_holiday_page_content, employment_start_date_page_content, employment_end_date_page_content, shift_hours_page_content, shifts_per_pattern_page_content, days_in_pattern_page_content, entitlement_result_page_content} from "./content/holiday_pages_content";
import EmployeeSchedulePage from "./pages/employeeHoursPage";
import EntitlementBasedOnPage from "./pages/entitlementBasedOnPage";
import WorkOutHolidayBasedOnPage from "./pages/workOutHolidayBasedOnPage";
import EmploymentDatePage from "./pages/employmentDatePage";
import NumberInputPage from "./pages/numberInputPage";
import EntitlementResultPage from "./pages/entitlementResultPage";
import axeTest from "./helpers/accessibility";

test(`Page object model happy path for second test`, async ({ page }): Promise<void> => {
    test.setTimeout(6000)
    const landingPage: LandingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await landingPage.continueOn(page);

    const page2EmployeeHours: EmployeeSchedulePage = new EmployeeSchedulePage();
    await page2EmployeeHours.checkPageLoads(page);
    await page2EmployeeHours.selectYesOrNo(page, "Yes");
    await page2EmployeeHours.continueOn(page);

    const page3LeaveYearStarts: LeaveYearStartsPage = new LeaveYearStartsPage();
    await page3LeaveYearStarts.checkPageLoads(page);
    await page3LeaveYearStarts.inputDDMMYYYY(page, "01", "12", "2026");
    await page3LeaveYearStarts.continueOn(page);

    const page4EmployeeHoursWorked: EmployeeHoursWorkedPage = new EmployeeHoursWorkedPage("2026-12-01");
    await page4EmployeeHoursWorked.checkPageLoads(page);
    const hoursWorked = 10.0;
    await page4EmployeeHoursWorked.inputHoursWorked(page, hoursWorked);
    await page4EmployeeHoursWorked.continueOn(page);

    const page5EmployeeHoursWorked: SummaryPage = new SummaryPage("2026-12-01", hoursWorked.toString(), "");
    await page5EmployeeHoursWorked.checkPageLoads(page);
});

test(`Page object model holiday entitlement for a full leave year with annualised hours and other options`, async ({ page }): Promise<void> => {
    test.setTimeout(60000)
    const landingPage: LandingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await axeTest(page);
    await landingPage.continueOn(page);

    const page2EmployeeHours: EmployeeSchedulePage = new EmployeeSchedulePage();
    await page2EmployeeHours.checkPageLoads(page);
    await page2EmployeeHours.selectYesOrNo(page, "Yes");
    await axeTest(page);
    await page2EmployeeHours.continueOn(page);

    const page3LeaveYearStarts: LeaveYearStartsPage = new LeaveYearStartsPage();
    await page3LeaveYearStarts.checkPageLoads(page);
    await page3LeaveYearStarts.inputDDMMYYYY(page, "01", "01", "2024");
    await axeTest(page);
    await page3LeaveYearStarts.continueOn(page);

    const page4EmployeeHoursWorked: EntitlementBasedOnPage = new EntitlementBasedOnPage("2024-01-01");
    await page4EmployeeHoursWorked.checkPageLoads(page);
    const basedOn = holiday_entitlement_based_on_page_content.radioOption3;
    await page4EmployeeHoursWorked.selectOption(page, basedOn);
    await axeTest(page);
    await page4EmployeeHoursWorked.continueOn(page);

    const page5WorkOutHolidayBasedOn: WorkOutHolidayBasedOnPage = new WorkOutHolidayBasedOnPage("2024-01-01", holiday_entitlement_based_on_page_content.choice3Uri);
    await page5WorkOutHolidayBasedOn.checkPageLoads(page);
    const workOutHolidayBasedOn = duration_of_work_holiday_page_content.radioOption1;
    await page5WorkOutHolidayBasedOn.selectOption(page, workOutHolidayBasedOn);
    await axeTest(page);
    await page5WorkOutHolidayBasedOn.continueOn(page);

    const page6Result: EntitlementResultPage = new EntitlementResultPage(`2024-01-01/${holiday_entitlement_based_on_page_content.choice3Uri}/${duration_of_work_holiday_page_content.choice1Uri}`, entitlement_result_page_content.annualisedHoursResult);
    await page6Result.checkPageLoads(page);
    await axeTest(page);
});

test(`Page object model holiday entitlement for someone starting and leaving part way through a leave year with shifts and other options`, async ({ page }): Promise<void> => {
    test.setTimeout(60000)
    const leaveYearStart = "2024-01-01";
    const basedOn = holiday_entitlement_based_on_page_content.radioOption5;
    const workOutHoliday = duration_of_work_holiday_page_content.radioOption4;
    const answersPath = `${leaveYearStart}/${holiday_entitlement_based_on_page_content.choice5Uri}/${duration_of_work_holiday_page_content.choice4Uri}`;

    const landingPage: LandingPage = new LandingPage();
    await landingPage.checkPageLoads(page);
    await axeTest(page);
    await landingPage.continueOn(page);

    const page2EmployeeHours: EmployeeSchedulePage = new EmployeeSchedulePage();
    await page2EmployeeHours.checkPageLoads(page);
    await axeTest(page);
    await page2EmployeeHours.selectYesOrNo(page, "Yes");
    await page2EmployeeHours.continueOn(page);

    const page3LeaveYearStarts: LeaveYearStartsPage = new LeaveYearStartsPage();
    await page3LeaveYearStarts.checkPageLoads(page);
    await axeTest(page);
    await page3LeaveYearStarts.inputDDMMYYYY(page, "01", "01", "2024");
    await page3LeaveYearStarts.continueOn(page);

    const page4EntitlementBasedOn: EntitlementBasedOnPage = new EntitlementBasedOnPage(leaveYearStart);
    await page4EntitlementBasedOn.checkPageLoads(page);
    await axeTest(page);
    await page4EntitlementBasedOn.selectOption(page, basedOn);
    await page4EntitlementBasedOn.continueOn(page);

    const page5WorkOutHolidayBasedOn: WorkOutHolidayBasedOnPage = new WorkOutHolidayBasedOnPage(leaveYearStart, holiday_entitlement_based_on_page_content.choice5Uri);
    await page5WorkOutHolidayBasedOn.checkPageLoads(page);
    await axeTest(page);
    await page5WorkOutHolidayBasedOn.selectOption(page, workOutHoliday);
    await page5WorkOutHolidayBasedOn.continueOn(page);

    const page6StartDate = new EmploymentDatePage(answersPath, employment_start_date_page_content);
    await page6StartDate.checkPageLoads(page);
    await axeTest(page);
    await page6StartDate.inputDDMMYYYY(page, "01", "03", "2024");
    await page6StartDate.continueOn(page);

    const page7EndDate = new EmploymentDatePage(`${answersPath}/2024-03-01`, employment_end_date_page_content);
    await page7EndDate.checkPageLoads(page);
    await axeTest(page);
    await page7EndDate.inputDDMMYYYY(page, "01", "09", "2024");
    await page7EndDate.continueOn(page);

    const page8ShiftHours = new NumberInputPage(`${answersPath}/2024-03-01/2024-09-01`, shift_hours_page_content.question);
    await page8ShiftHours.checkPageLoads(page);
    await axeTest(page);
    await page8ShiftHours.inputValue(page, "8");
    await page8ShiftHours.continueOn(page);

    const page9ShiftsPerPattern = new NumberInputPage(`${answersPath}/2024-03-01/2024-09-01/8`, shifts_per_pattern_page_content.question);
    await page9ShiftsPerPattern.checkPageLoads(page);
    await axeTest(page);
    await page9ShiftsPerPattern.inputValue(page, "4");
    await page9ShiftsPerPattern.continueOn(page);

    const page10DaysInPattern = new NumberInputPage(`${answersPath}/2024-03-01/2024-09-01/8/4`, days_in_pattern_page_content.question);
    await page10DaysInPattern.checkPageLoads(page);
    await axeTest(page);
    await page10DaysInPattern.inputValue(page, "7");
    await page10DaysInPattern.continueOn(page);

    const page11Result = new EntitlementResultPage(`${answersPath}/2024-03-01/2024-09-01/8/4/7`, "The statutory holiday entitlement is 11.33 shifts for the year. Each shift being 8.0 hours.");
    await page11Result.checkPageLoads(page);
    await axeTest(page);
});
