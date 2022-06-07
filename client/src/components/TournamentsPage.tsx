import Navbar from "./Navbar";

import { useEffect, useState } from "react";
import Tournament from "../Classes/Tournament";
import TournamentTableItem from "./TournamentTableItem";

function TournamentsPage(props: any){
    const [tournamentData, setTournamentData] = useState<Tournament[]>();
    const [tournamentJsx, setTournamentJsx] = useState<JSX.Element[]>();


    function spoilerButton(){
        let winnerNames = Array.from(document.getElementsByClassName('spoiler') as HTMLCollectionOf<HTMLElement>)
        for (let i = 0; i < winnerNames.length; i++){
         winnerNames[i].hidden = false;
        }
    }

    function buildTournamentTable(data: Tournament[]){
        let jsxArr: JSX.Element[] = [];
        for (let i = 0; i < data.length; i++){
            let newitem = <TournamentTableItem winnerrace={data[i].winnerrace} name = {data[i].name} startDate = {data[i].startDate} endDate ={data[i].endDate} winner = {data[i].top4[0]} runnerup = {data[i].top4[1]} />
            jsxArr.push(newitem)
        }
        setTournamentJsx(jsxArr);
    }
    useEffect(()=>{
        fetch(`/api/alltournaments`).then(response => response.json()).then(data =>{
            console.log('received player json');
            console.log(data);
            setTournamentData(data);
        }).catch((error)=>{
            console.log('error: ' + error);
            
        })
    },
    []);

    useEffect(()=>{
        if (tournamentData != undefined){
        buildTournamentTable(tournamentData);
        }
    },
    [tournamentData])

    return(
        <div>
            <Navbar/>
            <br/><br/>

            <button className="btn btn-primary" onClick={()=>spoilerButton()}>Reveal Spoilers</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Winner</th>
                        <th>Runner-up</th>



                    </tr>

                </thead>
                <tbody>
                {tournamentJsx}

                </tbody>
            </table>
        </div>
    )
}

export default TournamentsPage;