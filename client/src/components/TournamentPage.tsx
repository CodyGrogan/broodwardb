import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Game from "../Classes/Game";
import GamesTableItem from "./GamesTableItem";
import Tournament from "../Classes/Tournament";
import TournamentRank from "./TournamentRank";
import SpoilerFreeTableItem from "./SpoilerFreeTableItem";
import TournamentPlayerTableItem from "./TournamentPlayerTableItem";
import SCRacePieChart from "./SCRacePieChart";
import MatchupBarChart from "./MatchupBarChart";
import GamesTable from "./GamesTable";
import TournamentWinRateChart from "./TournamentWinRateChart";

function TournamentPage(props: any){

    interface RaceData{
        name: string,
        value: number;
    }
    interface Matchup {
        name: string;
        value: number;
      
      }

      interface WinRateData{
        tvz: number,
        tvp: number,
        pvz: number
    }

    const [thisTournament, setThisTournament] = useState<Tournament>();
    const [gameData, setGameData] = useState<Game[]>();
    const [spoilerTable, setSpoilerTable] = useState<JSX.Element[]>();
    const [spoilerFreeTable, setSpoilerFreeTable] = useState<JSX.Element[]>();
    const [pieData, setPieData] = useState<RaceData[]>();
    const [racePie, setRacePie] = useState<JSX.Element[]>();
    const [matchupData, setMatchupData] = useState<Matchup[]>();
    const [barChart, setBarChart] = useState<JSX.Element[]>();
    const [winData, setWinData] = useState<Matchup[]>();
    const [winBarChart, setWinBarChart] = useState<JSX.Element[]>();


    const [tournamentName, setTournamentName] = useState<string>("");

    const [playerTable, setPlayerTable] = useState<JSX.Element[]>();

    const [rankTable, setRankTable] = useState<JSX.Element[]>();
    let {tournament} = useParams();

    function getTournament(){
        fetch(`/api/getonetournament/${tournament}`).then(response => response.json()).then(data =>{
            console.log('received tournament json');
            console.log(data);
            setThisTournament(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            
        })
    }

    function getGames(){
        fetch(`/api/getallgamesintournament/${tournament}`).then(response => response.json()).then(data =>{
            console.log('received tournament games json');
            console.log(data);
            setGameData(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            
        })
    }


    function buildGameTable(data: Game[]){

        let jsxArr: JSX.Element[] = [];

        for (let i = 0; i < data.length; i++){
            let opponentName: string;
            let winner: string = data[i].winner[0];
            let loser: string = "";



            //this code check if this player won

            if (data[i].winner[0] == data[i].players[0]){
                loser = data[i].players[1];
            }
            else{
                loser = data[i].players[0];

            }

            let newjsx = <GamesTableItem date = {data[i].date} tournament={data[i].tournament} winner ={winner} loser={loser} map = {data[i].map} gameNum={data[i].gamenum} youtubelink={data[i].youtubelink}/>

            jsxArr.push(newjsx);

        }

        setSpoilerTable(jsxArr);

    }

    function buildSpoilerFreeTable(data: Game[]){

        let jsxArr: JSX.Element[] = [];

        for (let i = 0; i < data.length; i++){
           

            let newjsx = <SpoilerFreeTableItem date = {data[i].date} gameNum={data[i].gamenum} youtubelink={data[i].youtubelink}/>

            jsxArr.push(newjsx);

        }

        setSpoilerFreeTable(jsxArr);

    }

    function getRaceNumbers(raceMap: Map<string, string>){
        let names = [...raceMap.keys()];
        let zergNum = 0;
        let terranNum = 0;
        let protossNum = 0;

        for (let i = 0; i< names.length; i++){

            let playerRace = raceMap.get(names[i])
            if (playerRace == 'Terran'){
                terranNum++;
            }
            else if (playerRace == 'Zerg'){
                zergNum++;
            }
            else{
                protossNum++
            }
            
            
        }

        let protossData: RaceData = {name: 'Protoss', value: protossNum};
        let terranData: RaceData = {name: 'Terran', value: terranNum};
        let zergData: RaceData = {name: 'Zerg', value: zergNum};
        setPieData([terranData, zergData, protossData]);

    }

    function getMatchupData(gameData: Game[]){
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

    function parseGameData(gameData: Game[]){

        let tvpGames: Game[] = [];
        let tvzGames: Game[] = [];
        let pvzGames: Game[] = [];
        let mirrors: Game[] = [];

        for (let i = 0; i < gameData.length; i++){
            if (gameData[i].matchup == 'TvP'){
                tvpGames.push(gameData[i]);
            }
            else if (gameData[i].matchup == 'TvZ'){
                tvzGames.push(gameData[i]);
            }
            else if (gameData[i].matchup == 'PvZ'){
                pvzGames.push(gameData[i]);
            }
            else {
                mirrors.push(gameData[i]);
            }
        }

       let tvpWin = getWinRate(tvpGames, 'Terran');
       let tvzWin = getWinRate(tvzGames, 'Terran');
       let pvzWin = getWinRate(pvzGames, 'Protoss');

       let tvpMatch: Matchup = {name: 'TvP', value: tvpWin};
       let tvzMatch: Matchup = {name: 'TvZ', value: tvzWin};
       let pvzMatch: Matchup = {name: 'PvZ', value: pvzWin};


       let windata = [tvpMatch, tvzMatch, pvzMatch];

       setWinData(windata);



    }

    function getWinRate(data: Game[], raceOne: string){
        let race1wins = 0;
        for (let i = 0; i < data.length; i ++){
            
            let winnerrace: string = '';



            //check race of game winner

            if (data[i].winner[0] == data[i].players[0]){
                winnerrace = data[i].scraces[0];
            }
            else{
                winnerrace = data[i].scraces[1];

            }

            if (winnerrace == raceOne){
                race1wins++
            }


        }

        let percentWins = race1wins / data.length;
        console.log(percentWins);
         percentWins = Math.round(percentWins*100);
         console.log(percentWins);

         return percentWins;

    }


    useEffect(()=>{

        getTournament();
        getGames();

    },
    []);

    useEffect(()=>{

        if (pieData!= undefined){
        setRacePie([<SCRacePieChart data={pieData}/>])
        }

    },
    [pieData]);

    useEffect(()=>{
        if (matchupData!=undefined){
            setBarChart([<MatchupBarChart data = {matchupData}/>]);
        }
    },
    [matchupData])

    

    useEffect(()=>{
        if (gameData!=null && thisTournament!=null){
        setTournamentName(thisTournament.name)
        let raceMap = determinePlayerRace(gameData);
        buildSpoilerFreeTable(gameData);
        //buildGameTable(gameData); not necessary with reusable gametable
        setSpoilerTable([<GamesTable data={gameData} />])
        setPlayerTable(buildPlayerTable(raceMap));
        setRankTable(buildRankTable(thisTournament, raceMap));
        getRaceNumbers(raceMap);
        getMatchupData(gameData);
        parseGameData(gameData);

        }
    },
    [gameData, thisTournament]);

    useEffect(()=>{

        if (winData!=undefined){
            setWinBarChart([<TournamentWinRateChart data = {winData}/>]);
        }

    },
    [winData]);

    function buildPlayerTable(raceMap: Map<string, string>){
        let playerArr = [];
        let names = [...raceMap.keys()];
        names.sort(function(a: any, b: any) {
            const nameA = a.toUpperCase(); // ignore upper and lowercase
            const nameB = b.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
          
            // names must be equal
            return 0;
          });
        for (let i = 0; i< names.length; i++){

        let playerRace = raceMap.get(names[i])
        
        let playerJSX = <TournamentPlayerTableItem  name = {names[i]} scrace = {playerRace}/> ;
        playerArr.push(playerJSX);
        }

        return playerArr;

    }


    function buildRankTable(data: Tournament, raceMap: Map<string, string>){
        let rankArr = [];
        for (let i = 0; i< data.top4.length; i++){
        let playerRace = raceMap.get(data.top4[i])
        let rank = i + 1;
        let rankJSX = <TournamentRank num = {rank} name = {data.top4[i]} scrace = {playerRace}/> ;
        rankArr.push(rankJSX);
        }

        return rankArr;

    }

    function determinePlayerRace(gameData: Game[]){
        let raceMap  = new Map();

        for (let i = 0; i < gameData.length; i++){
            raceMap.set(gameData[i].players[0], gameData[i].scraces[0]);
            raceMap.set(gameData[i].players[1], gameData[i].scraces[1]);
        }

        return raceMap;
     
    }


    
    return(
        <div>
            <Navbar/>
            <br/><br/>
            
           <h2> {tournamentName}</h2>

            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne">
                        Spoiler Free Game List


                        
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body">

                    <table className="table">
                            <thead>
                                <tr>
                                    <th>Game Number</th>
                                    <th>Link</th>



                                </tr>

                            </thead>
                            <tbody>
                            {spoilerFreeTable}

                            </tbody>
                        </table>   

                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Spoiler Game List
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div className="accordion-body">


                       
                            {spoilerTable}

                         
                                
                    </div>
                    </div>
                </div>


                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour">
                        Player List
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingFour">
                    <div className="accordion-body">
                        
                        
                        <table className="table">
                            <thead>
                            <tr>
                                
                                <th>Name</th>
                                <th>Race</th>

                            </tr>
                            </thead>
                            <tbody>
                               
                               {playerTable}



                            </tbody>
                        </table>
                        
                    </div>
                    </div>
                </div>



                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Statistics
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div className="accordion-body">
                
            <div className="container">
                <div className="row justify-content-start">

                    <div className="col-sm-6">

                    <div className="card">
                            <div className="card-header">
                            <strong>Top4</strong>
                            </div>
                            <div className="card-body">
                        
                            <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Race</th>

                            </tr>
                            </thead>
                            <tbody>
                               
                               {rankTable}



                            </tbody>
                        </table>
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


                    <div className="row justify-content-start">

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


                        <div className="col-sm-6">


                         <div className="card">
                            <div className="card-header">
                            <strong>Race Winrate</strong>
                            </div>
                            <div className="card-body">
                        
                             {winBarChart}

                            </div>
                        </div>

                        </div>
                    </div>

                    </div>
                    </div>

   
                    </div>
                    </div>
                </div>
                </div>

            

            
        </div>
    )
}

export default TournamentPage;