import { response } from "express";
import { useEffect, useState, useMemo } from "react";
import Player from "../Classes/Player";
import PlayersTableItem from "./PlayersTableItem";


interface FilterParams {
    filterText: string;
    onFilter: any;
}




const FilterComponent = ({ filterText, onFilter }: FilterParams) => (
    <div>
        <input className="form-control form-control-lg"
            type="text" 
            autoComplete="off"
            id="search"
            placeholder="Search"
            aria-label="Search Input"
            value={filterText}
            onChange={onFilter}
        />
   
    </div>
);

function PlayersTable(props: any){

    const [PlayerList, setPlayerList] = useState<Player[]>([]);
    const [playerJsxArr, setPlayerJsxArr] = useState<JSX.Element[]>();

    const [sortedByPlayer, setSortedByPlayer] = useState<Boolean>(true);
    const [sortedByElo, setSortedByElo] = useState<Boolean>(false);
    const [sortedByRace, setSortedByRace] = useState<Boolean>(false);

    const [displayedRows, setDisplayedRows] = useState<number>(20);

    const [filterText, setFilterText] = useState<string>('');

    const filteredList = PlayerList.filter(
		player => player.name && player.name.toLowerCase().includes(filterText.toLowerCase()),
	);

    const searchBarMemo = useMemo(() => {
		console.log('usememo fired')
		return (
			<FilterComponent onFilter={
                (e: any) => setFilterText(e.target.value)} filterText={filterText} />
		);
	}, [filterText]);


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

    useEffect(()=>{

        getPlayerList();

    },
    []);

    useEffect(()=>{
        let length: number = filteredList.length;

        //this code should prevent the table from loading more rows than should be currently shown, but never go over the player list length
        if (filteredList.length > displayedRows){
            length = displayedRows;
            let button = document.getElementById('loadMorePlayers') as HTMLElement;
            button.hidden = false;
            let allbutton = document.getElementById('loadAllPlayers') as HTMLElement;
            allbutton.hidden = false;

        }
        else if (displayedRows > filteredList.length){
            let button = document.getElementById('loadMorePlayers') as HTMLElement;
            button.hidden = true;

            let allbutton = document.getElementById('loadAllPlayers') as HTMLElement;
            allbutton.hidden = true;
        }
        let jsxArr: JSX.Element[] = [];
       
        for (let i = 0; i < length; i++){
            let tablenum = i + 1;
            let newJSX = <PlayersTableItem name = {filteredList[i].name} scrace = {filteredList[i].scrace} tablenum = {tablenum} elo ={filteredList[i].elo} id={filteredList[i]._id} />
            jsxArr.push(newJSX);
        }
        setPlayerJsxArr(jsxArr);


    },
    [filteredList, displayedRows]);

    function sortByElo(){

        console.log('sort by elo pressed')

        if (PlayerList != null){
            let sortedList = PlayerList.splice(0);

            if (!sortedByElo){
                setSortedByElo(true);
                setSortedByPlayer(false);
                setSortedByRace(false);
         



            sortedList.sort(function(a: Player, b: Player) {
                const eloA = a.elo; 
                const eloB = b.elo; 
                if (eloA > eloB) {
                  return -1;
                }
                if (eloA < eloB) {
                  return 1;
                }
              
                // elo must be equal
                return 0;
              });
            
            }

            else{
                //if its already sorted by elo, reverse the list

                console.log('already sorted, reversing')
                setSortedByElo(false);
                setSortedByPlayer(false);
                setSortedByPlayer(false);
                sortedList.reverse();
            }

            console.log(sortedList);
            setPlayerList(sortedList);
        }

    }
    function sortByName(){

        console.log('sort by name pressed')

        if (PlayerList != null){
            let sortedList = PlayerList.splice(0);

            if (!sortedByPlayer){
                setSortedByElo(false);
                setSortedByRace(false);
                setSortedByPlayer(true);
         



            sortedList.sort(function(a: Player, b: Player) {
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
            
            }

            else{
                //if its already sorted by elo, reverse the list

                console.log('already sorted, reversing')
                setSortedByElo(false);
                setSortedByPlayer(false);
                setSortedByRace(false);
                sortedList.reverse();
            }

            console.log(sortedList);
            setPlayerList(sortedList);
        }

    }

    function sortByRace(){

        console.log('sort by race pressed')

        if (PlayerList != null){
            let sortedList = PlayerList.splice(0);

            if (!sortedByRace){
                setSortedByElo(false);
                setSortedByRace(true);
                setSortedByPlayer(false);
         



            sortedList.sort(function(a: Player, b: Player) {
                const nameA = a.scrace.toUpperCase(); // ignore upper and lowercase
                const nameB = b.scrace.toUpperCase(); // ignore upper and lowercase
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
                setSortedByElo(false);
                setSortedByPlayer(false);
                setSortedByRace(false);
                sortedList.reverse();
            }

            console.log(sortedList);
            setPlayerList(sortedList);
        }
    }

    function loadMoreRows(){
        setDisplayedRows(displayedRows+20);
    }
    function loadAllRows(){
        setDisplayedRows(10000);
        
    }

    return(
        <div>


            {searchBarMemo}
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th><button onClick={()=>sortByName()}className="btn btn-info">Name</button> </th>
                        <th> <button onClick={()=>sortByRace()}className="btn btn-info">Race</button></th>
                        <th> <button onClick={()=>sortByElo()} className="btn btn-info">Elo</button></th>


                    </tr>

                </thead>
                <tbody>
                {playerJsxArr}

                </tbody>

            </table>

            <button id="loadMorePlayers" onClick={()=>loadMoreRows()} className="btn btn-primary loadBtn">Load More</button>
            <button id="loadAllPlayers" onClick={()=>loadAllRows()} className="btn btn-primary loadBtn">Load All</button>


        </div>
    )
}

export default PlayersTable;