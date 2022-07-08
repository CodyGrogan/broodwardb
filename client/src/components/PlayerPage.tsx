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
    All: number;

}

interface GameYear{
    year: string,
    data: Game[]

}

interface yearRate{
    year: string,
    winRate: number;
}


let defaultLineData: MatchupWinrate[] = [{year: '2020', vT: 0, vP: 0, vZ: 0, All: 0}]

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

    function parseGameData(data: Game[]){

        let totalWins = 0;
        let totalLosses = 0;

        
        let vTGames: Game[] = [];
        let vZGames: Game[] = [];
        let vPGames: Game[] = [];

        for (let i = 0; i < data.length; i++){

            let opponentRace;

            if (data[i].winner[0] == thisPlayer?.name){
                totalWins++
            }
            else{
                totalLosses++
            }

            if (data[i].players[0] != thisPlayer?.name){
                opponentRace = data[i].scraces[0];
                
            }
            else{
                opponentRace = data[i].scraces[1];
            }

            if (opponentRace == 'Terran'){
                vTGames.push(data[i]);
            }
            else if (opponentRace == 'Zerg'){
                vZGames.push(data[i]);
            }
            else if (opponentRace == 'Protoss'){
                vPGames.push(data[i]);
            }
          
        }

        setWinLoss([totalWins, totalLosses]);
        
        

        //let firstYear = gameData[0].date;
       console.log(gameData[0].date);
       let vtYearData: yearRate[] = [];
       let vzYearData: yearRate[] = [];
       let vpYearData: yearRate[] = [];
       let totalYearData: yearRate[] = [];


        totalYearData = getYearlyWinRate(data, 'All');

       console.log('vtgames length is' + vTGames.length);
        if (vTGames.length > 0){
              vtYearData = getYearlyWinRate(vTGames, 'Terran');
        }
        console.log(vtYearData);
        if (vZGames.length > 0){
             vzYearData = getYearlyWinRate(vZGames, 'Zerg');

        }

        if (vPGames.length > 0){
             vpYearData = getYearlyWinRate(vPGames, 'Protoss');
        }
      


       let yearMap: Map<string, boolean> = new Map();

       for (let i = 0; i < vtYearData.length; i++){
        yearMap.set(vtYearData[i].year, true);
       }
       for (let i = 0; i < vpYearData.length; i++){
        yearMap.set(vpYearData[i].year, true);
       }
       for (let i = 0; i < vzYearData.length; i++){
        yearMap.set(vzYearData[i].year, true);
       }



       let yearKeys = Array.from(yearMap.keys());
       yearKeys.sort();

       console.log(yearKeys);
    
       let winRateOverTime: MatchupWinrate[] = [];

       for (let i = 0; i < yearKeys.length; i++){

        let vtWinRate: number = 0;
        let vzWinRate: number = 0;
        let vpWinRate: number = 0;
        let allWinRate: number = 0;



        let vtrate = vtYearData.find(({ year }) => year == yearKeys[i] );
        let vzrate = vzYearData.find(({ year }) => year == yearKeys[i] );
        let vprate = vpYearData.find(({ year }) => year == yearKeys[i] );
        let allrate = totalYearData.find(({year}) => year == yearKeys[i]);



        if (vtrate != null && vtrate != undefined){
            // if the vtrate to be found is null, provide a value of 0 instead
            vtWinRate = vtrate.winRate;
        }
        if (vzrate != null && vzrate != undefined){
            // if the vtrate to be found is null, provide a value of 0 instead
            vzWinRate = vzrate.winRate;
        }
        if (vprate != null && vprate != undefined){
            // if the vtrate to be found is null, provide a value of 0 instead
            vpWinRate = vprate.winRate;
        }

        if (allrate != null && allrate != undefined){
            // if the vtrate to be found is null, provide a value of 0 instead
            allWinRate = allrate.winRate;
        }


        let newMatchup: MatchupWinrate = {year: yearKeys[i], vT: vtWinRate, vP: vpWinRate , vZ: vzWinRate, All: allWinRate};
        winRateOverTime.push(newMatchup);
       }

       console.log(winRateOverTime);
       setLineData(winRateOverTime);


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



    function getYearlyWinRate(data: Game[], race: string){

        console.log('getting yearly win rate')

      
        let firstYear = data[0].date.slice(0,4);
        console.log(firstYear);
        let years: GameYear[] = [{year: firstYear, data: [data[0]]}];
        console.log(years);
        
        for (let i = 1; i < data.length; i++){

            let yearString = data[i].date.slice(0,4);
            let yearFound = false;

            for (let j = 0; j < years.length; j++){
                if (yearString == years[j].year){
                    years[j].data.push(data[i]);
                    yearFound = true;
                }
            }

            if (yearFound == false){
                let newYear: GameYear = {year: yearString, data: [data[i]]};
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
        return YearRateArr;


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

        if (gameData != undefined && gameData.length != 0){
         
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


                        <div className="card">
                                <div className="card-header">
                                Game History
                                </div>
                                <div className="card-body">
                                    <table className='table'>
                                        <thead>
                                    <tr>
                                       <th><button className='btn btn-info'>Date</button> </th>
                                       <th><button className='btn btn-info'>  Opponent</button> </th> 
                                          <th><button className='btn btn-info'>Result</button> </th> 
                                        <th><button className='btn btn-info'>Map</button> </th> 
                                        <th><button className='btn btn-info'>Tourny</button> </th> 
                                       <th><button className='btn btn-info'>Link</button> </th>


                                        

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


                </div>

            </div>
        </div>
    )
}

export default PlayerPage;