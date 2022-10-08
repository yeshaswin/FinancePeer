import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

const Header = () => {
    let {user, logoutUser} = useContext(AuthContext)
    return (
        <div>
                <Nav fill variant="tabs" defaultActiveKey="/" >
      <Nav.Item>
        <Nav.Link href="/">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1"> {user ? (
             <Button variant="primary" onClick={logoutUser}>Logout</Button>
                //  <button  onClick={logoutUser}>Logout</button>
            ): (
                <Link to="/login" >Login</Link>
            )}
            </Nav.Link>
      </Nav.Item>
     
    </Nav>
    <Nav className="justify-content-end" >
    
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
          <Nav.Link eventKey="disabled" disabled>
        {user &&   <p>Hello {user.username}</p>}
        </Nav.Link>          </Nav.Link>
        </Nav.Item>
      </Nav>   
           
           
           
        </div>
    )
}

export default Header
