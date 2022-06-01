import { response } from "express";
import { useEffect, useState } from "react";
import Player from "../Classes/Player";


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
    [])

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
                    <tr>
                        <td>1</td>
                        <td>A Player</td>
                        <td>Terran</td>

                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default PlayersTable;