import { useEffect, useState } from "react";
import SCMap from "../Classes/Map";
import MapsTableItem from "./MapsTableItem";
import Navbar from "./Navbar";

function MapsPage(){
    const [mapList, setMapList] = useState<SCMap[]>([]);
    const [mapTable, setMapTable] = useState<JSX.Element[]>();

    useEffect(()=>{
        fetch('/api/allmaps').then(response => response.json()).then(data =>{
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
            setMapList(data);
        }).catch((error)=>{
            console.log('error: ' + error);
        })
    },
    [])

    useEffect(()=>{
        let jsxArr = [];

        for(let i = 0; i < mapList?.length; i++){
            let newJSX = <MapsTableItem name = {mapList[i].name} maxPlayers = {mapList[i].maxPlayers} gamesPlayed = {mapList[i].gamesPlayed} />
            jsxArr.push(newJSX);
        }
        setMapTable(jsxArr);

    },
    [mapList])
    
    return(
        <div>
            <Navbar/>

            <br/>            
            <br/>

            this is the maps page
            <table className='table'>
                        <thead>
                                <tr>
                                        <th>Name</th>
                                        <th>Players</th>
                                        <th>Games</th>
                                </tr>
                                </thead>

                                    <tbody>
                         
                                    {mapTable}
                                    </tbody>

            </table>

        </div>
    )
}

export default MapsPage;