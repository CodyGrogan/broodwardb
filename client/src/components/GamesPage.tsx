import GamesTable from "./GamesTable";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import Game from "../Classes/Game";

function GamesPage(){

    const [gameData, setGameData] = useState<Game[]>([]);

    function getGameData(){
        fetch(`/api/allgames/`).then(response => response.json()).then(data =>{
            console.log('received game data json');
            console.log(data);
            setGameData(data)
            
        }).catch((error)=>{
            console.log('error: ' + error);
            console.log('cannot retrieve game data');
           
            

        })
    }
    
    useEffect(()=>{
      

    },
    [])

    return(
        <div>
            <Navbar/>

            <br/>            
            <br/>

            this is the games page
            <GamesTable data={gameData} />
            
        </div>
    )
}

export default GamesPage;