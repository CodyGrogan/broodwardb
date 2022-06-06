
class Tournament{
    constructor(name: string, startDate: string, endDate: string, top4: string[], winnerrace: string){
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.top4 = top4;
        this.winnerrace = winnerrace;

    }

    name: string;
    startDate: string;
    endDate: string;
    top4: string[];
    winnerrace: string;
}

export default Tournament;