import { NumberLiteralType } from "typescript";

class SCMap{
    constructor(name: string, maxPlayers: number,  gamesPlayed: number){

        this.name = name;
        this.maxPlayers = maxPlayers;
        this.gamesPlayed = gamesPlayed
    }

    name: string;
    maxPlayers: number;
    gamesPlayed: number;
    

}

export default SCMap;