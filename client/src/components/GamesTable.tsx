import { useEffect, useState } from "react";
import Game from "../Classes/Game";
import GamesTableItem from "./GamesTableItem";

function GamesTable(props: any){

    const [gameTableArr, setGameTableArr] = useState<JSX.Element[]>();


    useEffect(()=>{
        getGameTable();
    },
    [])

    function getGameTable(){
        fetch(`/api/allgames/`).then(response => response.json()).then(data =>{
            console.log('received game data json');
            console.log(data);
            buildGameTable(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            console.log('cannot retrieve game data');

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

        setGameTableArr(jsxArr);

    }



    return(
        <div>
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
                {gameTableArr}

                </tbody>
            </table>
        </div>
    )
}

export default GamesTable;