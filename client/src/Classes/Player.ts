import internal from "stream";

class Player{
    constructor(name: string, dob: string, scrace: string, elo: number){

        this.name = name;
        this.dob = dob;
        this.scrace = scrace;
        this.elo = elo;
    }

    name: string;
    dob: string;
    scrace: string;
    elo: number;

    

}

export default Player;