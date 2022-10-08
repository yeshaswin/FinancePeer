import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import fp from '../static/FP.png'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const LoginPage = () => {
  let { loginUser } = useContext(AuthContext)
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh'
  }} >
      <Card style={{ width: '30rem' }} border="info" >
        <Card.Img variant="top" src={fp} />
        <Card.Body>
          <Card.Title style={{ justifyContent:'center',alignItems:'center',display:'flex' }}>Login</Card.Title>
          <Card.Text>
            <form onSubmit={loginUser}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Username
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type='text'
                  name='username'
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Password
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  type='password'
                  name='password'
                />
              </InputGroup>
              {/* <input type="text" name="username" placeholder="Enter Username" />
              <input type="password" name="password" placeholder="Enter Password" /> */}
              {/* <input type="submit"/> */}
              <div  style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
     
  }}>              <Button variant="primary" type='submit'>Sign In</Button>
</div>
            </form>
          </Card.Text>

        </Card.Body>
      </Card>

    </div>
  )
}

export default LoginPage
