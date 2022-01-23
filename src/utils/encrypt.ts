import * as bcrypt from "bcrypt";

export class Encrypt {
    declare private readonly salt: number;

    constructor(){ this.salt = 10 }

    hash = async (id: string): Promise<string> => {
        const salt = await bcrypt.genSalt(this.salt);
        const hashedId = await bcrypt.hash(id, salt);
        return hashedId;
    }

    compare = async (id: string, hash: string): Promise<boolean> => {
        const result = await bcrypt.compare(id, hash);
        return result;
    }
}
