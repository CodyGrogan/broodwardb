import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import Player from '../Classes/Player';
import Navbar from '../components/Navbar';



//FOR TESTING LAYOUT

let tempPlayer = new Player('Test Player', '2022/06/02','Zerg', 1500, 'notarealid')

//

function PlayerPage(){

    const [thisPlayer, setThisPlayer] = useState<Player>();
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

    useEffect(()=>{
        getPlayer();
    
    },
    [])

    
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
                            {thisPlayer?.name} <br/>
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