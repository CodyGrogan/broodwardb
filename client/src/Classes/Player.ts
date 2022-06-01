import internal from "stream";

class Player{
    constructor(name: string, dob: string, scrace: string, elo: number, _id: string){

        this.name = name;
        this.dob = dob;
        this.scrace = scrace;
        this.elo = elo;
        this._id = _id;
    }

    name: string;
    dob: string;
    scrace: string;
    elo: number;
    _id: string;

    

}

export default Player;