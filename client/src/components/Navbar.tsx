import {Link} from 'react-router-dom';

function Navbar(){


    return(
        <div>
            Hello Navbar
            
        <nav className="navbar fixed-top  navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
        <Link id='homeLink' className="nav-link active" to='/'><a className="navbar-brand navBtn" href="#">Brood War DB</a></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
                     
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
             
              <li className="nav-item">
                <Link id='playersLink' className="nav-link active navBtn" to='/players'>Players</Link>
              </li>
              <li className="nav-item">
                <Link id='gamesLink' className="nav-link active navBtn" to='/games'>Games</Link>
              </li>
              <li className="nav-item">
                <Link id='tournamentsLink' className="nav-link active navBtn" to='/tournaments'>Tournaments</Link>
              </li>
              <li className="nav-item">
                <Link id='mapsLink' className="nav-link active navBtn" to='/maps'>Maps</Link>
              </li>
          
             
             
            </ul>
      
      
      
          
           
          </div>
        </div>
      
      
        
      
      
      
      </nav>

      </div>
    )
}

export default Navbar;