import { EmailsInterface } from "./emails";

export interface LabelInterface {
    id: string;
    userId: string;
    name: string;
    emails: string[]
}

export const labels: LabelInterface[] = [];