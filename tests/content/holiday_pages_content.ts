const landingPage_content = {
    pageTitle: "Calculate holiday entitlement",
    pText1: "Use this tool to calculate holiday entitlement for:",
    pText2: "If an employee works irregular hours or for part of the year, you also use this calculator to work out how much leave they’ve built up (‘accrued’) over a pay period.",
    liText1: "a full leave year",
    liText2: "part of a leave year, if the job started or finished part way through the year",
} as const;

const page2_content = {
    caption: "Calculate holiday entitlement",
    question: "Does the employee work irregular hours or for part of the year?",
    pText: "‘Irregular hours’ means the number of hours an employee works in a pay period often or always changes. ‘Part of the year’ means there are periods of at least a week in a leave year where the employee does not need to work and is not paid.",
    buttonText1: "Yes",
    buttonText2: "No",
} as const;

const page3_content = {
    caption: "Calculate holiday entitlement",
    question: "When does the leave year start?",
    pText2: "This is usually in the employment contract. If it is not and the job was started after 1 October 1998, the leave year will start on the 1st day of the job. If the job was started on or before 1 October 1998, the leave year will start on 1 October.",
    pText3: "Your answers",
} as const;

const employee_hours_worked_page_content = {
    caption: "Calculate holiday entitlement",
    question: "How many hours has the employee worked in the pay period?",
    buttonText: "Continue",
    pText: "Your answers",
} as const;

const holiday_entitlement_based_on_page_content = {
    caption: "Calculate holiday entitlement",
    question: "Is the holiday entitlement based on:",
    radioOption1: "days worked per week",
    radioOption2: "hours worked per week",
    radioOption3: "annualised hours",
    radioOption4: "compressed hours",
    radioOption5: "shifts",
    buttonText: "Continue",
    pText: "Check the employment contract if you're not sure about the holiday entitlement.",
    choice1Uri: "days-worked-per-week",
    choice2Uri: "hours-worked-per-week",
    choice3Uri: "annualised-hours",
    choice4Uri: "compressed-hours",
    choice5Uri: "shift-worker",
} as const;

const duration_of_work_holiday_page_content = {
    caption: "Calculate holiday entitlement",
    question: "Do you want to work out holiday:",
    radioOption1: "for a full leave year",
    radioOption2: "for someone starting part way through a leave year",
    radioOption3: "for someone leaving part way through a leave year",
    radioOption4: "for someone starting and leaving part way through a leave year",
    buttonText: "Continue",
    pText: "Your answers",
    choice1Uri: "full-year",
    choice2Uri: "starting",
    choice3Uri: "leaving",
    choice4Uri: "starting-and-leaving",
} as const;

const page5_content = {
    caption: "Calculate holiday entitlement:",
    header: "Information based on your answers",
    pText: "The statutory entitlement for this pay period is 1 hour.",
    pText2: "Employees cannot accrue more than 28 days (5.6 weeks) over the leave year.",
} as const;

export { landingPage_content };
export { page2_content };
export { page3_content };
export { employee_hours_worked_page_content };
export { holiday_entitlement_based_on_page_content };
export { duration_of_work_holiday_page_content };
export { page5_content };
    
const employment_start_date_page_content = {
    caption: "Calculate holiday entitlement",
    question: "What was the employment start date?",
} as const;

const employment_end_date_page_content = {
    caption: "Calculate holiday entitlement",
    question: "What was the employment end date?",
} as const;

const shift_hours_page_content = {
    question: "How many hours in each shift?",
} as const;

const shifts_per_pattern_page_content = {
    question: "How many shifts will be worked per shift pattern?",
} as const;

const days_in_pattern_page_content = {
    question: "How many days in the shift pattern?",
} as const;

const entitlement_result_page_content = {
    header: "Information based on your answers",
    annualisedHoursResult: "The statutory holiday entitlement is 5.6 weeks holiday.",
} as const;

export {
    employment_start_date_page_content,
    employment_end_date_page_content,
    shift_hours_page_content,
    shifts_per_pattern_page_content,
    days_in_pattern_page_content,
    entitlement_result_page_content,
};
