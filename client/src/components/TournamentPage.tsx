import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Game from "../Classes/Game";
import GamesTableItem from "./GamesTableItem";
import Tournament from "../Classes/Tournament";
import TournamentRank from "./TournamentRank";
import SpoilerFreeTableItem from "./SpoilerFreeTableItem";
import TournamentPlayerTableItem from "./TournamentPlayerTableItem";

function TournamentPage(props: any){

    const [thisTournament, setThisTournament] = useState();
    const [gameData, setGameData] = useState<Game[]>();
    const [spoilerTable, setSpoilerTable] = useState<JSX.Element[]>();
    const [spoilerFreeTable, setSpoilerFreeTable] = useState<JSX.Element[]>();

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


    useEffect(()=>{

        getTournament();
        getGames();

    },
    []);

    useEffect(()=>{
        if (gameData!=null && thisTournament!=null){
        let raceMap = determinePlayerRace(gameData);
        buildSpoilerFreeTable(gameData);
        buildGameTable(gameData);
        setPlayerTable(buildPlayerTable(raceMap));
        setRankTable(buildRankTable(thisTournament, raceMap));

        }
    },
    [gameData, thisTournament])

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
            this is the Tournament Page 


            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Spoiler Free Game List


                        
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
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


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Tournament</th>
                                    <th>Game Number</th>
                                    <th>Winner</th>
                                    <th>Loser</th>
                                    <th>Map</th>
                                    <th>Link</th>


                                </tr>

                            </thead>
                            <tbody>
                            {spoilerTable}

                            </tbody>
                        </table>   
                                
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
                        
                        
                        <strong>Top4</strong>
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
                </div>

            

            
        </div>
    )
}

export default TournamentPage;