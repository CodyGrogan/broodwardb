import { useEffect, useState } from "react";
import Game from "../Classes/Game";
import GamesTableItem from "./GamesTableItem";

function GamesTable(props: any){

    const [gameTableArr, setGameTableArr] = useState<JSX.Element[]>();
    const [gameData, setGameData] = useState<Game[]>(props.data);

   
    const [sortedByTourny, setSortedByTourny] = useState<Boolean>(false);
    const [sortedByNum, setSortedByNum] = useState<Boolean>(false);
    const [sortedByWinner, setSortedByWinner] = useState<Boolean>(false);
    const [sortedByLoser, setSortedByLoser] = useState<Boolean>(false);
    const [sortedByDate, setSortedByDate] = useState<Boolean>(false);
    const [sortedByMap, setSortedByMap] = useState<Boolean>(false);


    const [displayedRows, setDisplayedRows] = useState<number>(20);

    useEffect(()=>{
        buildGameTable(props.data);
    },
    [])

    useEffect(()=>{
        buildGameTable(gameData);
    },
    [gameData, displayedRows, buildGameTable])

    

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


    function sortByWinner(){

        console.log('sort by winner pressed')

        if (gameData != null){
            let sortedList = gameData.splice(0);

            if (!sortedByWinner){
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(true);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);

         



            sortedList.sort(function(a: Game, b: Game) {
                const nameA = a.winner[0].toUpperCase(); // ignore upper and lowercase
                const nameB = b.winner[0].toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            
            }

            else{
                //if its already sorted by elo, reverse the list

                console.log('already sorted, reversing')
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);

                sortedList.reverse();
            }

            console.log(sortedList);
            setGameData(sortedList);
        }

    }

    function sortByLoser(){

        console.log('sort by winner pressed')

        if (gameData != null){
            let sortedList = gameData.splice(0);

            if (!sortedByLoser){
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByLoser(true);

                setSortedByTourny(false);
                setSortedByDate(false);
         



            sortedList.sort(function(a: Game, b: Game) {

                let winnerA: string = a.winner[0];
                let loserA: string = "";



            //this code check if this player won in game A

            if (a.winner[0] == a.players[0]){
                loserA = a.players[1];
            }
            else{
                loserA = a.players[0];

            }


            let winnerB: string = a.winner[0];
            let loserB: string = "";



        //this code check if this player won in game B

        if (b.winner[0] == b.players[0]){
            loserB = b.players[1];
        }
        else{
            loserB = b.players[0];

        }

                const nameA = loserA.toUpperCase(); // ignore upper and lowercase
                const nameB = loserB[0].toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            
            }

            else{
                //if its already sorted by elo, reverse the list

                console.log('already sorted, reversing')
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);

                sortedList.reverse();
            }

            console.log(sortedList);
            setGameData(sortedList);
        }

    }


    function sortByMap(){

        console.log('sort by map pressed')

        if (gameData != null){
            let sortedList = gameData.splice(0);

            if (!sortedByMap){
                setSortedByMap(true);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);




            sortedList.sort(function(a: Game, b: Game) {
                const nameA = a.map.toUpperCase(); // ignore upper and lowercase
                const nameB = b.map.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            
            }

            else{
                //if its already sorted by elo, reverse the list

                console.log('already sorted, reversing')
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);

                sortedList.reverse();
            }

            console.log(sortedList);
            setGameData(sortedList);
        }

    }


    function sortByTourny(){

        console.log('sort by tournament pressed')

        if (gameData != null){
            let sortedList = gameData.splice(0);

            if (!sortedByTourny){
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(true);
                setSortedByDate(false);
                setSortedByLoser(false);

         



            sortedList.sort(function(a: Game, b: Game) {
                const nameA = a.tournament.toUpperCase(); // ignore upper and lowercase
                const nameB = b.tournament.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            
            }

            else{
                //if its already sorted by elo, reverse the list

                console.log('already sorted, reversing')
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);

                sortedList.reverse();
            }

            console.log(sortedList);
            setGameData(sortedList);
        }

    }

    function sortByNum(){

        console.log('sort by tournament pressed')

        if (gameData != null){
            let sortedList = gameData.splice(0);

            if (!sortedByNum){
                setSortedByMap(false);
                setSortedByNum(true);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);

         



            sortedList.sort(function(a: Game, b: Game) {
                const nameA = a.gamenum; // ignore upper and lowercase
                const nameB = b.gamenum; // ignore upper and lowercase
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            
            }

            else{
                //if its already sorted by elo, reverse the list

                console.log('already sorted, reversing')
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);

                sortedList.reverse();
            }

            console.log(sortedList);
            setGameData(sortedList);
        }

    }


    function sortByDate(){

        console.log('sort by date pressed')

        if (gameData != null){
            let sortedList = gameData.splice(0);

            if (!sortedByDate){
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(true);
                setSortedByLoser(false);

         



            sortedList.sort(function(a: Game, b: Game) {
                let dateA = a.date; // ignore upper and lowercase
                let dateB = b.date; // ignore upper and lowercase

                dateA.replaceAll('-', '');
                dateB.replaceAll('-', '');

                if (dateA > dateB) {
                  return -1;
                }
                if (dateA < dateB) {
                  return 1;
                }
              
                // names must be equal
                return 0;
              });
            
            }

            else{
                //if its already sorted by elo, reverse the list

                console.log('already sorted, reversing')
                setSortedByMap(false);
                setSortedByNum(false);
                setSortedByWinner(false);
                setSortedByTourny(false);
                setSortedByDate(false);
                setSortedByLoser(false);

                sortedList.reverse();
            }

            console.log(sortedList);
            setGameData(sortedList);
        }

    }


    function buildGameTable(data: Game[]){

        let jsxArr: JSX.Element[] = [];

        let length: number = gameData.length;

        //this code should prevent the table from loading more rows than should be currently shown, but never go over the player list length
        if (gameData.length > displayedRows){
            length = displayedRows;
            let button = document.getElementById('loadMorePlayers') as HTMLElement;
            button.hidden = false;
            let allbutton = document.getElementById('loadAllPlayers') as HTMLElement;
            allbutton.hidden = false;

        }
        else if (displayedRows > gameData.length){
            let button = document.getElementById('loadMorePlayers') as HTMLElement;
            button.hidden = true;

            let allbutton = document.getElementById('loadAllPlayers') as HTMLElement;
            allbutton.hidden = true;
        }

        for (let i = 0; i < length; i++){
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

            let listNum = i + 1;

            let newjsx = <GamesTableItem listNum={listNum} date = {data[i].date} tournament={data[i].tournament} winner ={winner} loser={loser} map = {data[i].map} gameNum={data[i].gamenum} youtubelink={data[i].youtubelink}/>

            jsxArr.push(newjsx);

        }

        setGameTableArr(jsxArr);

    }

    function loadMoreRows(){
        setDisplayedRows(displayedRows+20);
    }
    function loadAllRows(){
        setDisplayedRows(10000);
        
    }

    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th><button onClick={()=>sortByDate()} className="btn btn-info">Date</button> </th>
                        <th><button onClick={()=>sortByTourny()} className="btn btn-info">Tournament</button></th>
                        <th><button onClick={()=>sortByNum()} className="btn btn-info">Game Number</button></th>
                        <th><button onClick={()=>sortByWinner()} className="btn btn-info">Winner</button></th>
                        <th><button onClick={()=>sortByLoser()} className="btn btn-info">Loser</button></th>
                        <th><button onClick={()=>sortByMap()}className="btn btn-info">Map</button></th>
                        <th>Link</th>


                    </tr>

                </thead>
                <tbody>
                {gameTableArr}

                </tbody>
            </table>
            <button id="loadMorePlayers" onClick={()=>loadMoreRows()} className="btn btn-primary">Load More</button>
            <button id="loadAllPlayers" onClick={()=>loadAllRows()} className="btn btn-primary">Load All</button>

        </div>
    )
}

export default GamesTable;