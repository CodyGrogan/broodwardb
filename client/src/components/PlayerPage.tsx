import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Player from '../Classes/Player';
import Navbar from '../components/Navbar';
import Game from '../Classes/Game';
import PlayerGameTableItem from './PlayerGameTableItem';
import WinRateLine from './WinRateLine';



//FOR TESTING LAYOUT

let tempPlayer = new Player('Test Player', '2022/06/02','Zerg', 1500, 'notarealid', '/')


//

interface PlayerWinRates {
    vT: number;
    vP: number;
    vZ: number
}

interface MatchupWinrate {
    year: string;
    vT: number;
    vZ: number;

    vP: number;

}

let defaultLineData: MatchupWinrate[] = [{year: '2020', vT: 55, vP: 66, vZ: 63}, {year: '2021', vT: 88, vP: 44, vZ: 22}, {year: '2022', vT: 63, vP: 51, vZ: 63}]

function PlayerPage(){

    const [thisPlayer, setThisPlayer] = useState<Player>();
    const [gameData, setGameData] = useState<Game[]>([]);
    const [gameTableArr, setGameTableArr] = useState<JSX.Element[]>();
    const [winRates, setWinRates] = useState<PlayerWinRates>({vT: 0, vZ: 0, vP: 0});
    const [winLoss, setWinLoss] = useState<number[]>([0,0])
    const [lineData, setLineData] = useState<MatchupWinrate[]>(defaultLineData);
    let { id } = useParams(); //this actually uses names to query

    function getPlayer(){
        fetch(`/api/player/${id}`).then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
            setThisPlayer(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            setThisPlayer(tempPlayer);
        })
    }

    function getGameTable(){
        fetch(`/api/gamewithplayer/${thisPlayer?.name}`).then(response => response.json()).then(data =>{
            console.log('received game data json');
            console.log(data);
            setGameData(data);
            buildGameTable(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            console.log('cannot retrieve game data');

        })
    }

    function parseGameData(gameData: Game[]){

        let totalWins = 0;
        let totalLosses = 0;

        
        let vTGames: Game[] = [];
        let vZGames: Game[] = [];
        let vPGames: Game[] = [];

        for (let i = 0; i < gameData.length; i++){

            let opponentRace;

            if (gameData[i].winner[0] == thisPlayer?.name){
                totalWins++
            }
            else{
                totalLosses++
            }

            if (gameData[i].players[0] != thisPlayer?.name){
                opponentRace = gameData[i].scraces[0];
                
            }
            else{
                opponentRace = gameData[i].scraces[1];
            }

            if (opponentRace == 'Terran'){
                vTGames.push(gameData[i]);
            }
            else if (opponentRace == 'Zerg'){
                vZGames.push(gameData[i]);
            }
            else if (opponentRace == 'Protoss'){
                vPGames.push(gameData[i]);
            }
          
        }

        setWinLoss([totalWins, totalLosses]);

       let vTWin = getWinRate(vTGames, 'Terran');
       let vZWin = getWinRate(vZGames, 'Zerg');
       let vPWin = getWinRate(vPGames, 'Protoss');

       let winrates: PlayerWinRates = {vT: vTWin, vZ: vZWin, vP: vPWin};
       setWinRates(winrates);

  



    }

    function getWinRate(data: Game[], raceOne: string){
        let thisplayerwins = 0;
        for (let i = 0; i < data.length; i ++){
            
            let winnerrace: string = '';

            if (data[i].winner[0] == thisPlayer?.name){
                thisplayerwins++;
            }
          

            
        }

        // this sets the Win / Loss value
    

        let percentWins = thisplayerwins / data.length;
        console.log(percentWins);
         percentWins = Math.round(percentWins*100);
         console.log(percentWins);

         return percentWins;

    }

    function buildGameTable(data: Game[]){

        let jsxArr: JSX.Element[] = [];

        for (let i = 0; i < data.length; i++){
            let opponentName: string;
            let result: string = "";

            //this code will determine who the opponent is
            //this will need to be modified if 2v2 games are later included
            if (data[i].players[0] != thisPlayer?.name){
                opponentName = data[i].players[0];
                
            }
            else{
                opponentName = data[i].players[1];
            }

            //this code check if this player won

            if (data[i].winner[0] == opponentName){
                result = 'Lose';
            }
            else{
                if (thisPlayer?.name !=null){
                result = "Win";
                }
            }

            let newjsx = <PlayerGameTableItem opponent = {opponentName} date = {data[i].date} result ={result} map = {data[i].map} tournament = {data[i].tournament} youtubelink={data[i].youtubelink} />

            jsxArr.push(newjsx);

        }

        setGameTableArr(jsxArr);

    }



    function getYearlyWinRate(gameData: Game[], race: string){

        interface GameYear{
            year: string,
            data: Game[]

        }

        interface yearRate{
            year: string,
            winRate: number;
        }
        
        let firstYear = gameData[0].date.slice(0,4);
        let years: GameYear[] = [{year: firstYear, data: [gameData[0]]}];
        
        for (let i = 1; i < gameData.length; i++){

            let yearString = gameData[i].date.slice(0,4);
            let yearFound = false;

            for (let j = 0; j < years.length; j++){
                if (yearString == years[j].year){
                    years[j].data.push(gameData[i]);
                    yearFound = true;
                }
            }

            if (yearFound == false){
                let newYear: GameYear = {year: yearString, data: [gameData[i]]};
                years.push(newYear);
            }

        }

        //after this all games should be sorted by year into different arrays

        
        let YearRateArr = []
        for (let i = 0; i < years.length; i++){
            let newRate: yearRate = {year: years[i].year, winRate: getWinRate(years[i].data, race)}
            YearRateArr.push(newRate);


        }

        console.log(YearRateArr);


    }



    useEffect(()=>{
        if (id != undefined){
        getPlayer();
        }
    
    },
    [])

    useEffect(()=>{

        if (thisPlayer?.name != undefined){
        getGameTable();
        }
    },
    [thisPlayer]);

    useEffect(()=>{

        if (gameData != undefined){
        parseGameData(gameData);
        }
    },
    [gameData]);

    
    return(
        <div>
                <Navbar/>

                <br/> <br/>


          


            <div className="container">
                <div className="row justify-content-start">

                    <div className="col-sm-3">

                        <div className="card">
                            <div className="card-header">
                            {thisPlayer?.name}
                            </div>
                            <div className="card-body">
                        
                            {thisPlayer?.scrace} <br/>
                            DOB: {thisPlayer?.dob} <br/>
                            Elo: {thisPlayer?.elo} <br/>
                            Win/Loss: {winLoss[0]} / {winLoss[1]}<br/>

                            vT: {winRates.vT}%<br/>
                            vP: {winRates.vP}%<br/>
                            vZ: {winRates.vZ}%<br/>
                            <a href={thisPlayer?.wiki} target="_blank">Liquipedia</a>


                            </div>
                        </div>
                       
                    </div>

                    <div className="col-sm-9">
                        <div className="card">
                                <div className="card-header">
                                Game History
                                </div>
                                <div className="card-body">
                                    <table className='table'>
                                        <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Opponent</th>
                                        <th>Result</th>
                                        <th>Map</th>
                                        <th>Tourny</th>
                                        <th>Link</th>


                                        

                                    </tr>
                                    </thead>

                                    <tbody>
                                        {gameTableArr}
                                    </tbody>

                                    </table>
                                </div>
                        </div>
                       
                    </div>
                </div>

                <div className="row justify-content-start">

                <div className="col-sm-9">

                            <div className="card">
                                    <div className="card-header">
                                  
                                        Matchup Win Rates
                                      

                                    </div>

                                    <div className="card-body">
                                    <WinRateLine data={lineData} />
                                    </div>
                                </div>

                        </div>

                </div>

            </div>
        </div>
    )
}

export default PlayerPage;