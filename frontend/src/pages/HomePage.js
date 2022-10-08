import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)

    useEffect(()=> {
        getNotes()
    }, [])

    const [files, setFiles] = useState("");

    const handleChange = e => {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = e => {
        document.getElementById("submit_button").removeAttribute("disabled");

        // console.log("e.target.result", e.target.result);
        setFiles(e.target.result);
      };
     
      
    }
	
    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        
    }
    // let csrftoken = getCookie('csrftoken');
    let upload= async() =>{
        let data1 = JSON.parse(files)
        console.log(data1)
        fetch('http://127.0.0.1:8000/api/upload/', {
            method:'POST',
            body:JSON.stringify(data1),

            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access),
                // "X-CSRFToken": csrftoken 
            },
            
        }).then(response => response.json())

        
    }
    let remove=async()=>{
        document.getElementById("inputfile").value= null;
        document.getElementById("submit_button").setAttribute("disabled", true);

    }
  
    return (
        <div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control id="inputfile" type="file" onChange={handleChange} accept='.json' style={{width:'20rem',margin:'2rem'}} />
                </Form.Group>

              
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Button variant="primary" onClick={upload} disabled id="submit_button"style={{marginRight:'2rem'}}>Submit</Button>
                <Button variant="warning" onClick={remove} id="remove_button">Remove</Button></div>

            {/* <button onClick={upload} disabled id="submit_button">submit</button>
            <button onClick={remove}  id="remove_button">remove</button> */}
          
            <ul>
                {notes.map(note => (
                      <Card key={note.id} style={{ width: '18rem',margin:'1.5%',display:'inline-block',height:"30rem"}}>
                      <ListGroup variant="flush">
                        <ListGroup.Item>userId:{note.userId}</ListGroup.Item>
                        <ListGroup.Item>id:{note.idd}</ListGroup.Item>
                        <ListGroup.Item>title:{note.title}</ListGroup.Item>
                        <ListGroup.Item>body:{note.body}</ListGroup.Item>
                
                      </ListGroup>
                    </Card>
                ))}

            </ul>
        </div>
    )
}

export default HomePage
