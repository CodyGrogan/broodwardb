import { useEffect, useState } from "react";
import Player from "../Classes/Player";


function PlayersTable(props: any){

    const StudentList = useState<Player[]>([]);


    useEffect(()=>{

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