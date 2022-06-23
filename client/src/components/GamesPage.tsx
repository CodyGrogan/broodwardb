import GamesTable from "./GamesTable";
import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import Game from "../Classes/Game";


function GamesPage(){

    const [gameData, setGameData] = useState<Game[]>([]);
    const [gameTable, setGameTable] = useState<JSX.Element[]>([]);

    function getGameData(){
        fetch(`/api/allgames/`).then(response => response.json()).then(data =>{
            console.log('received game data json');
            console.log(data);
            setGameTable([<GamesTable data={data}/>])
            
        }).catch((error)=>{
            console.log('error: ' + error);
            console.log('cannot retrieve game data');
           
            

        })
    }
    
    useEffect(()=>{
      
        getGameData();

    },
    [])

    return(
        <div>
            <Navbar/>

            <br/>            
            <br/>

            {gameTable}
            
        </div>
    )
}

export default GamesPage;