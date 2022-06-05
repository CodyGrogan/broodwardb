import {useParams} from 'react-router-dom';

//not sure if this page will be necessary
function GamePage(){

    let {tournament, gamenum} = useParams();
    
    return(
        <div>
            this is the game page
        </div>
    )
}

export default GamePage;