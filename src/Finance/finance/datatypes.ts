export interface User{
    id: string;
    name: string;
    email: string;
    project: string;
    subteam: string;
    permissions: string[];
    address: Address;
    phoneNumber: number;
}

export interface Address{
    street: string;
    city: string;
    state: string;
    zipCode: number;
}

export interface BudgetItem{
    request: Request;
    status: string;
    approval: Approval;
    adminApproval: Approval;
    submission: Submission;
    verification: string;
    advisorDate: string;
    notes: string;
}

//This handles the approval of a request
export interface Approval{
    approver: string;
    date: string;
}

//This handles the initial request
export interface Request{
    requestee: string;
    date: string;
    cost: number;
    project: string;
    subteam: string;
    description: string;
    link: string;
    index: string;
    account: string;
}

export interface Submission{
    cost: number;
    tax: number;
    reciept: string;
    date: string;
}

export interface SubmissionOptions{
    adminThreashold: number,
    budgetOptions: string[],
    projectOptions: string[],
    subteamOptions: string[]
}

// Function to create a blank user
export const createBlankUser = (): User => ({
    id: '',
    name: '',
    email: '',
    project: '',
    subteam: '',
    permissions: [],
    address: {street: '', city: '', state: '', zipCode: 0 },
    phoneNumber: 0, // Assuming 0 is a placeholder
});

//Function to create a blank budget item
export const createBlankApproval = (): Approval => ({approver: '', date: ''});
export const createBlankRequest = (): Request => ({
    requestee: '', date: '', cost: 0, project: '', subteam: '', description: '', link: '', index: '', account: ''});
export const createBlankSubmission = (): Submission => ({cost: 0, tax: 0, reciept: '', date: ''});
export const createBlankBudgetItem = (): BudgetItem => ({
    request: createBlankRequest(), status: 'invalid', approval: createBlankApproval(), adminApproval: createBlankApproval(),
    submission: createBlankSubmission(), verification: '', advisorDate: '', notes: ''});
