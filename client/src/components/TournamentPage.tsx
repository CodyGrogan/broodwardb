import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Game from "../Classes/Game";
import GamesTableItem from "./GamesTableItem";

function TournamentPage(props: any){

    const [thisTournament, setThisTournament] = useState();
    const [gameData, setGameData] = useState<Game[]>();
    const [spoilerTable, setSpoilerTable] = useState<JSX.Element[]>();
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



    useEffect(()=>{

        getTournament();
        getGames();

    },
    []);

    useEffect(()=>{
        if (gameData!=null){
        buildGameTable(gameData);
        }
    },
    [gameData])
    
    return(
        <div>
            <Navbar/>
            <br/><br/>
            this is the Tournament Page 

            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Tournament</th>
                        <th>Game Number</th>
                        <th>Winner</th>
                        <th>Loser</th>
                        <th>Link</th>


                    </tr>

                </thead>
                <tbody>
                {spoilerTable}

                </tbody>
            </table>

            
        </div>
    )
}

export default TournamentPage;