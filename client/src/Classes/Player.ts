
class Player{
    constructor(name: string, dob: string, scrace: string, elo: number, _id: string, wiki: string){

        this.name = name;
        this.dob = dob;
        this.scrace = scrace;
        this.elo = elo;
        this._id = _id;
        this.wiki = wiki;
    }

    name: string;
    dob: string;
    scrace: string;
    elo: number;
    _id: string;
    wiki: string;

    

}

export default Player;