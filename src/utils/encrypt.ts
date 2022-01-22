import * as bcryt from "bcrypt";

export class Encrypt {
    declare private readonly salt: number;

    constructor(){ this.salt = 10 }

    hash = async (id: string): Promise<string> => {
        const hashedId = await bcryt.hash(id, this.salt);
        return hashedId;
    }

    compare = async (id: string, hash: string): Promise<boolean> => {
        const result = await bcryt.compare(id, hash);''
        return result;
    }
}