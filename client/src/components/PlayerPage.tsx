import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Player from '../Classes/Player';
import Navbar from '../components/Navbar';
import Game from '../Classes/Game';
import PlayerGameTableItem from './PlayerGameTableItem';


//FOR TESTING LAYOUT

let tempPlayer = new Player('Test Player', '2022/06/02','Zerg', 1500, 'notarealid')

//

function PlayerPage(){

    const [thisPlayer, setThisPlayer] = useState<Player>();
    const [gameTableArr, setGameTableArr] = useState<JSX.Element[]>();
    let { id } = useParams();

    function getPlayer(){
        fetch(`/api/player/${id}`).then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
            setThisPlayer(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            setThisPlayer(tempPlayer);
        })
    }

    function getGameTable(){
        fetch(`/api/gamewithplayer/${thisPlayer?.name}`).then(response => response.json()).then(data =>{
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
            let result: string = "";

            //this code will determine who the opponent is
            //this will need to be modified if 2v2 games are later included
            if (data[i].players[0] != thisPlayer?.name){
                opponentName = data[i].players[0];
                
            }
            else{
                opponentName = data[i].players[1];
            }

            //this code check if this player won

            if (data[i].winner[0] == opponentName){
                result = 'Lose';
            }
            else{
                if (thisPlayer?.name !=null){
                result = "Win";
                }
            }

            let newjsx = <PlayerGameTableItem opponent = {opponentName} date = {data[i].date} result ={result} map = {data[i].map} />

            jsxArr.push(newjsx);

        }

        setGameTableArr(jsxArr);

    }

    useEffect(()=>{
        getPlayer();
    
    },
    [])

    useEffect(()=>{

        getGameTable();
    },
    [thisPlayer]);

    
    return(
        <div>
                <Navbar/>

                <br/> <br/>


            this is the player page {id}

          


            <div className="container">
                <div className="row justify-content-start">

                    <div className="col-sm-4">

                        <div className="card">
                            <div className="card-header">
                            {thisPlayer?.name}
                            </div>
                            <div className="card-body">
                        
                            {thisPlayer?.scrace} <br/>
                            {thisPlayer?.dob} <br/>
                            {thisPlayer?.elo} <br/>


                            </div>
                        </div>
                       
                    </div>

                    <div className="col-sm-8">
                        <div className="card">
                                <div className="card-header">
                                Game History
                                </div>
                                <div className="card-body">
                                    <table className='table'>
                                        <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Opponent</th>
                                        <th>Result</th>
                                        <th>Map</th>

                                        

                                    </tr>
                                    </thead>

                                    <tbody>
                                        {gameTableArr}
                                    </tbody>

                                    </table>
                                </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayerPage;