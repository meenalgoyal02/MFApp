import { agent } from 'src/models/agent';

export interface emi
{
    id: number;
    emiPayDate: Date | string;
    amount: number;
    dueStartDate: Date | string;
    agent: agent;
    totalAmountPaid:number;
}