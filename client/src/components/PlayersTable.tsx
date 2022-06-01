import { response } from "express";
import { useEffect, useState } from "react";
import Player from "../Classes/Player";
import PlayersTableItem from "./PlayersTableItem";


function PlayersTable(props: any){

    const [PlayerList, setPlayerList] = useState<Player[]>([]);
    const [playerJsxArr, setPlayerJsxArr] = useState<JSX.Element[]>();

    function getPlayerList(){
        fetch('/api/allplayers').then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
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
        let length = PlayerList.length;
        let jsxArr: JSX.Element[] = [];
       
        for (let i = 0; i < length; i++){
            let tablenum = i + 1;
            let newJSX = <PlayersTableItem name = {PlayerList[i].name} scrace = {PlayerList[i].scrace} tablenum = {tablenum} />
            jsxArr.push(newJSX);
        }
        setPlayerJsxArr(jsxArr);


    },
    [PlayerList]);

    return(
        <div>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Race</th>

                    </tr>

                </thead>
                <tbody>
                {playerJsxArr}

                </tbody>
            </table>
        </div>
    )
}

export default PlayersTable;