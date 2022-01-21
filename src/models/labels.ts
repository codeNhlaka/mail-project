import { EmailsInterface } from "./emails";

export interface LabelInterface {
    id: string;
    userId: string;
    name: string;
    emails: EmailsInterface[]
}

export const labels: LabelInterface[] = [];