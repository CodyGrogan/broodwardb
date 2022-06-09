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
        let length = PlayerList.length;
        let jsxArr: JSX.Element[] = [];
       
        for (let i = 0; i < length; i++){
            let tablenum = i + 1;
            let newJSX = <PlayersTableItem name = {PlayerList[i].name} scrace = {PlayerList[i].scrace} tablenum = {tablenum} elo ={PlayerList[i].elo} id={PlayerList[i]._id} />
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
                        <th>Elo</th>


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