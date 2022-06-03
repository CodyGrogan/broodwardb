import {useParams} from 'react-router-dom';


function GamePage(){

    let {tournament, gamenum} = useParams();
    
    return(
        <div>
            this is the game page
        </div>
    )
}

export default GamePage;