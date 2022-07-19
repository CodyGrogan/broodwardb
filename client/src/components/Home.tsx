import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import Game from "../Classes/Game";
import Player from "../Classes/Player";
import MatchupBarChart from "./MatchupBarChart";
import SCRacePieChart from "./SCRacePieChart";
import Tournament from "../Classes/Tournament";
import Top10 from "./Top10";
import TotalRaceWinRateLine from "./TotalRaceWinRateLine";
import { Link } from "react-router-dom";
import SCMap from "../Classes/Map";
function Home(){

    interface Matchup {
        name: string;
        value: number;
      
      }

    interface RaceData{
        name: string,
        value: number;
    }

    interface MatchupWinrate {
        year: string;
        TvZ: number;
        TvP: number;
    
        PvZ: number;
    
    
    }

    interface yearRate{
        year: string,
        winRate: number;
    }
    interface GameYear{
        year: string,
        data: Game[]
    
    }

    const [gameData, setGameData] = useState<Game[]>([]);
    const [PlayerList, setPlayerList] = useState<Player[]>([]);
    const [mapList, setMapList] = useState<SCMap[]>([]);
    const [matchupData, setMatchupData] = useState<Matchup[]>();
    const [barChart, setBarChart] = useState<JSX.Element[]>();
    const [pieData, setPieData] = useState<RaceData[]>();
    const [racePie, setRacePie] = useState<JSX.Element[]>();
    const [Top10Table, setTop10Table] = useState<JSX.Element[]>();

    const [tournamentData, setTournamentData] = useState<Tournament[]>([]);

    const [winRateData, setWinRateData] = useState<MatchupWinrate[]>();

    const [lineChart, setLineChart] = useState<JSX.Element[]>();

    function getTournaments(){
        fetch(`/api/alltournaments`).then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
            setTournamentData(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            
        })
    }

    function getGameData(){
        fetch(`/api/allgames/`).then(response => response.json()).then(data =>{
            console.log('received game data json');
            console.log(data);
            setGameData(data);
            
        }).catch((error)=>{
            console.log('error: ' + error);
            console.log('cannot retrieve game data');
           
            

        })
    }

    function getPlayerList(){
        fetch('/api/allplayers').then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
            data.sort(function(a: any, b: any) {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            setPlayerList(data);
        }).catch((error)=>{
            console.log('error: ' + error);
        })
    }

    function getMapList(){
        fetch('/api/allmaps').then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
            data.sort(function(a: any, b: any) {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            setMapList(data);
        }).catch((error)=>{
            console.log('error: ' + error);
        })
    }

    function getRaceData(players: Player[]){

        let protoss = 0;
        let terran = 0;
        let zerg = 0;
        for (let i = 0; i < players.length; i++){
            if (players[i].scrace == "Protoss"){
                protoss++;
            }
            else if (players[i].scrace == "Zerg"){
                zerg++;
            }
            else if(players[i].scrace == "Terran"){
                terran++;
            }
        }
        let protossData: RaceData = {name: 'Protoss', value: protoss};
        let terranData: RaceData = {name: 'Terran', value: terran};
        let zergData: RaceData = {name: 'Zerg', value: zerg};
        setPieData([terranData, zergData, protossData]);
    }

    function getMatchupData(gameData: Game[]){
        console.log('getting matchup data');
        let tvt = 0;
        let tvp = 0;
        let tvz = 0;
        let pvz = 0;
        let pvp = 0;
        let zvz = 0;

        for (let i = 0; i < gameData.length; i++){
            if (gameData[i].scraces[0] == 'Terran' && gameData[i].scraces[1] == 'Terran'){
                tvt++
            }
            else if (gameData[i].scraces[0] == 'Terran' && gameData[i].scraces[1] == 'Protoss' || gameData[i].scraces[0] == 'Protoss' && gameData[i].scraces[1] == 'Terran'  ){
                tvp++
            }

            else if (gameData[i].scraces[0] == 'Terran' && gameData[i].scraces[1] == 'Zerg' || gameData[i].scraces[0] == 'Zerg' && gameData[i].scraces[1] == 'Terran'  ){
                tvz++
            }
            else if (gameData[i].scraces[0] == 'Protoss' && gameData[i].scraces[1] == 'Zerg' || gameData[i].scraces[0] == 'Zerg' && gameData[i].scraces[1] == 'Protoss'  ){
                pvz++
            }
            else if (gameData[i].scraces[0] == 'Protoss' && gameData[i].scraces[1] == 'Protoss' ){
                pvp++
            }
            else if (gameData[i].scraces[0] == 'Zerg' && gameData[i].scraces[1] == 'Zerg' ){
                zvz++
            }
            else{
                let num = gameData[i].gamenum
                console.log('when checking matchups something went wrong with' + num);
            }
        }

        setMatchupData([{name: 'TvT', value: tvt}, {name: 'TvP', value: tvp},{name: 'TvZ', value: tvz},{name: 'PvZ', value: pvz},{name: 'PvP', value: pvp},{name: 'ZvZ', value: zvz}])

    }

    function getTop10(players: Player[]){

        players.sort(function(a: Player, b: Player) {
            let numA = a.elo; // ignore upper and lowercase
            let numB = b.elo; // ignore upper and lowercase

            if (numA > numB) {
              return -1;
            }
            if (numA < numB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });


        let jsxArr = [];
        for (let i = 0; i < 10; i++){

            let rank = i + 1;
            let newJSX = <Top10 num={rank} name={players[i].name} scrace = {players[i].scrace} elo = {players[i].elo}/>
            jsxArr.push(newJSX);
        }
        setTop10Table(jsxArr);
    }



    function getYearlyWinRate(data: Game[], matchup: string){
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

        let race;
        if (matchup == 'PvZ'){
            race = 'Protoss';
        }
        else{
            race = 'Terran';
        }

        let YearRateArr = []
        for (let i = 0; i < years.length; i++){
            let newRate: yearRate = {year: years[i].year, winRate: calculateRate(years[i].data, race)}
            YearRateArr.push(newRate);


        }

        console.log(YearRateArr);
        return YearRateArr;


    }

    function parseWinRates(data: Game[]){

        let tvp: Game[] =[];
        let tvz: Game[] = [];
        let pvz: Game[] = [];
        for (let i = 0; i < data.length; i++){
            if (data[i].matchup == "TvP"){
                tvp.push(data[i]);
            }
            if (data[i].matchup == "TvZ"){
                tvz.push(data[i]);
            }
            if (data[i].matchup == 'PvZ'){
                pvz.push(data[i]);
            }

        }

        let tvpYearData: yearRate[] = [];
       let tvzYearData: yearRate[] = [];
       let pvzYearData: yearRate[] = [];



        if (tvp.length > 0){
              tvpYearData = getYearlyWinRate(tvp, 'TvP');
        }
        if (tvz.length > 0){
             tvzYearData = getYearlyWinRate(tvz, 'TvZ');

        }

        if (pvz.length > 0){
             pvzYearData = getYearlyWinRate(pvz, 'PvZ');
        }

        let yearMap: Map<string, boolean> = new Map();

       for (let i = 0; i < tvpYearData.length; i++){
        yearMap.set(tvpYearData[i].year, true);
       }
       for (let i = 0; i < tvzYearData.length; i++){
        yearMap.set(tvzYearData[i].year, true);
       }
       for (let i = 0; i < pvzYearData.length; i++){
        yearMap.set(pvzYearData[i].year, true);
       }

       let yearKeys = Array.from(yearMap.keys());

       yearKeys.sort();

       console.log(yearKeys);
    
       let winRateOverTime: MatchupWinrate[] = [];

       for (let i = 0; i < yearKeys.length; i++){

        let tvpWinRate: number = 0;
        let tvzWinRate: number = 0;
        let pvzWinRate: number = 0;



        let tvprate = tvpYearData.find(({ year }) => year == yearKeys[i] );
        let tvzrate = tvzYearData.find(({ year }) => year == yearKeys[i] );
        let pvzrate = pvzYearData.find(({ year }) => year == yearKeys[i] );



        if (tvprate != null && tvprate != undefined){
            // if the vtrate to be found is null, provide a value of 0 instead
            tvpWinRate = tvprate.winRate;
        }
        if (tvzrate != null && tvzrate != undefined){
            // if the vtrate to be found is null, provide a value of 0 instead
            tvzWinRate = tvzrate.winRate;
        }
        if (pvzrate != null && pvzrate != undefined){
            // if the vtrate to be found is null, provide a value of 0 instead
            pvzWinRate = pvzrate.winRate;
        }

      


        let newMatchup: MatchupWinrate = {year: yearKeys[i], TvP: tvpWinRate, TvZ: tvzWinRate , PvZ: pvzWinRate};
        winRateOverTime.push(newMatchup);
       }
       console.log(winRateOverTime);

       setWinRateData(winRateOverTime);

        

    }

    function calculateRate(data: Game[], race: string){

        //race should be Terran or Protoss, pass only games of the same matchup into this function


        let wins = 0;
        for (let i = 0; i < data.length; i++){
            //check race of winner;

            let winningrace = '';

            if (data[i].players[0] == data[i].winner[0]){
                winningrace = data[i].scraces[0]
            }
            else{
                winningrace = data[i].scraces[1];
            }

            if (race == winningrace){
                wins++
            }

        }

        console.log('total games is ' + data.length + 'total wins is ' + wins + 'matchup is ' + data[0].matchup + data[0].date)

        let winpercent = wins / data.length;
         winpercent = Math.round(winpercent*100);
        return winpercent;
    }

    useEffect(()=>{
      getPlayerList();
      getGameData();  
      getTournaments();
      getMapList();
    },
    []);

    useEffect(()=>{
        console.log('game data updated')
        if (gameData!=null){
       getMatchupData(gameData);
       parseWinRates(gameData);
       
        }
        
      },
      [gameData]);

      useEffect(()=>{
        console.log('player data updated')
        if (PlayerList!=null && PlayerList.length > 0){
       getRaceData(PlayerList);
        getTop10(PlayerList);
       
        }
        
      },
      [PlayerList]);


    useEffect(()=>{
        if (matchupData!=null){
            setBarChart([<MatchupBarChart data = {matchupData}/>]);
        }
    },
    [matchupData]);
    useEffect(()=>{

        if (pieData!= undefined){
        setRacePie([<SCRacePieChart data={pieData}/>])
        }

    },
    [pieData]);

    useEffect(()=>{

        if (winRateData!= undefined){
        setLineChart([<TotalRaceWinRateLine data={winRateData}/>])
        }

    },
    [winRateData]);
    
    return(
        <div>
            <Navbar/>

            <br/>
            <br/>

            <div className="container">
                <div className="row">
                    <div className="col-s-6">
                        Welcome to Brood War DB, a database of modern professional Starcraft Brood War players and tournaments. This project was inspired by the now defunct TLPD and was created as an exercise in building a React front end and a back end using NodeJS and MongoDB.
                        <br/>
                        This database includes a collection of {PlayerList.length} <Link to={'/players'}>players</Link>, and {gameData.length} <Link to={'/games'}>games</Link> played on {mapList.length} <Link to={'/maps'}>maps</Link> in {tournamentData.length} <Link to={'/tournaments'}>tournaments</Link>.


                    </div>
                </div>


                <div className="row">
                    <div className="col-sm-6">
                       
                    <div className="card">
                            <div className="card-header">
                            <strong>Top 10</strong>
                            </div>
                            <div className="card-body">
                        
                                <table className="table">
                                    <thead>
                                        <tr>

                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Race</th>
                                            <th>Elo</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Top10Table}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">


                    <div className="card">
                               <div className="card-header">
                               <strong>Matchups Played</strong>
                               </div>
                               <div className="card-body">
                           
                                   {barChart}
   
                               </div>
                    </div>
                  
                </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                       
                    <div className="card">
                            <div className="card-header">
                            <strong>Race Winrate</strong>
                            </div>
                            <div className="card-body">
                        

                                {lineChart}

                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6">
                       

                            
                    <div className="card">
                               <div className="card-header">
                               <strong>Race Distribution</strong>
                               </div>
                               <div className="card-body">
                           
                                   {racePie}
   
                               </div>
                           </div>
                       
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Home;