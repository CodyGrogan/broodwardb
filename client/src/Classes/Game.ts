class Game{

    constructor(players: string[], winner: string[], tournament: string, matchup: string, youtubelink: string, date: string, gamenum: string, map: string, scraces: string[]){
        this.players = players;
        this.winner = winner;
        this.tournament = tournament;
        this.matchup = matchup;
        this.youtubelink = youtubelink;
        this.date = date;
        this.gamenum = gamenum;
        this.map = map;
        this.scraces = scraces;
    }
    players: string[];
    winner: string[];
    tournament: string; 
    matchup: string; 
    youtubelink: string; 
    date: string;
    gamenum: string;
    map: string;
    scraces: string[];


}

export default Game;