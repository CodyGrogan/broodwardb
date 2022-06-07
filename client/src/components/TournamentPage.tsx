import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Game from "../Classes/Game";
import GamesTableItem from "./GamesTableItem";

function TournamentPage(props: any){

    const [thisTournament, setThisTournament] = useState();
    const [gameData, setGameData] = useState<Game[]>();
    const [spoilerTable, setSpoilerTable] = useState<JSX.Element[]>();
    let {tournament} = useParams();

    function getTournament(){
        fetch(`/api/getonetournament/${tournament}`).then(response => response.json()).then(data =>{
            console.log('received tournament json');
            console.log(data);
            setThisTournament(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            
        })
    }

    function getGames(){
        fetch(`/api/getallgamesintournament/${tournament}`).then(response => response.json()).then(data =>{
            console.log('received tournament games json');
            console.log(data);
            setGameData(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            
        })
    }


    function buildGameTable(data: Game[]){

        let jsxArr: JSX.Element[] = [];

        for (let i = 0; i < data.length; i++){
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

            let newjsx = <GamesTableItem date = {data[i].date} tournament={data[i].tournament} winner ={winner} loser={loser} map = {data[i].map} gameNum={data[i].gamenum} youtubelink={data[i].youtubelink}/>

            jsxArr.push(newjsx);

        }

        setSpoilerTable(jsxArr);

    }



    useEffect(()=>{

        getTournament();
        getGames();

    },
    []);

    useEffect(()=>{
        if (gameData!=null){
        buildGameTable(gameData);
        }
    },
    [gameData])
    
    return(
        <div>
            <Navbar/>
            <br/><br/>
            this is the Tournament Page 


            <div className="accordion" id="accordionPanelsStayOpenExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        Spoiler Free Game List
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div className="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                        Spoiler Game List
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                    <div className="accordion-body">


                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Tournament</th>
                                    <th>Game Number</th>
                                    <th>Winner</th>
                                    <th>Loser</th>
                                    <th>Link</th>


                                </tr>

                            </thead>
                            <tbody>
                            {spoilerTable}

                            </tbody>
                        </table>   
                                
                    </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                        Statistics
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                    <div className="accordion-body">
                        
                        
                        <strong>Top4</strong>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Race</th>

                            </tr>
                            </thead>
                            <tbody>
                               



                            </tbody>
                        </table>
                        
                    </div>
                    </div>
                </div>
                </div>

            

            
        </div>
    )
}

export default TournamentPage;