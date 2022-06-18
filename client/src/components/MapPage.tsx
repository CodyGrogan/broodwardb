import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import SCMap from '../Classes/Map';
import Game from '../Classes/Game';
import GamesTableItem
 from './GamesTableItem';
import { parse } from 'node:path/win32';
import GamesTable from './GamesTable';

function MapPage(){

    interface WinRateData{
        tvz: number,
        tvp: number,
        pvz: number
    }

    let {mapName} = useParams();

    let defaultMap = new SCMap('unknown',0, 0)

    const [thisMap, setThisMap] = useState(defaultMap);
    const [gameTableArr, setGameTableArr] = useState<JSX.Element[]>([]);
    const [winData, setWinData] = useState<WinRateData>();
    const [gameData, setGameData] = useState<Game[]>([]);

 
    useEffect(()=>{
        console.log(mapName);
        getGameTable();
        getMap();
    },
    []);

    function getMap(){
        fetch(`/api/getmap/${mapName}`).then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
            setThisMap(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            setThisMap(defaultMap);
        })
    }


    function getGameTable(){
        fetch(`/api/gameswithmap/${mapName}`).then(response => response.json()).then(data =>{
            console.log('received game data json');
            console.log(data);
            //buildGameTable(data);
            setGameData(data);
            setGameTableArr([<GamesTable data={data} />]);
            parseGameData(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            console.log('cannot retrieve game data');

        })
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

       let windata: WinRateData = {tvp: tvpWin, tvz: tvzWin, pvz: pvzWin};

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

        setGameTableArr(jsxArr);

    }
    
    return(
        <div>
            <Navbar/>
            <br/>            <br/>

            
            <div className="container">
                <div className="row justify-content-start">

                    <div className="col-sm-3">

                        <div className="card">
                            <div className="card-header">
                            {thisMap?.name}
                            </div>
                            <div className="card-body">
                        
                            Max Players: {thisMap?.maxPlayers} <br/>
                            Games Played: {gameData.length} <br/>
                            TvP Win Rate: {winData?.tvp}% <br/>
                            TvZ Win Rate: {winData?.tvz}% <br/>
                            PvZ Win Rate: {winData?.pvz}% <br/>

                         
                            </div>
                        </div>
                       
                    </div>

                    <div className="col-sm-9">
                  

            <div className="card">
                                <div className="card-header">
                                Game History
                                </div>
                                <div className="card-body">
                                    
                                    {gameTableArr}
                                </div>
                        </div>

                        </div>
                        </div>

        </div>

        </div>
    )
}

export default MapPage;