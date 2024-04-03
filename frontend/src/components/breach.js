//Harshit Bansal, 4/12/24, IT302-002, Phase 4 Assignment: Read Node.js Data using React.js, hb33@njit.edu

import React, {useState, useEffect} from 'react'
import BreachDataService from '../service/breachesDataService'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './component.css';

const Breach = (user) => {

  const [breach, setBreach] = useState({
    id: null,
    Name: "",
    Domain:"",
    analyses: []
  })
 let { id } = useParams();
 const getBreach = id => {
  BreachDataService.get(id)
    .then(response => {
      setBreach(response.data)
      console.log(response.data)
    })
    .catch(e => {
      console.log(e);
    })
}
useEffect( () => {
  getBreach(id)
    },[id])

return (
    <div>
    <Container>
      <Row>
      <Col>
        <Image src={breach.LogoPath} fluid className="Imge1"/>
      </Col>
        <Col>
          <Card>
            <Card.Header as="h5">{breach.Name}</Card.Header>
            <Card.Body>
            <Card.Text>
            {"Breach Date: "+ breach.BreachDate}
            <br></br>
            {"Is this breach verified: "+ breach.IsVerified}
            </Card.Text>
            {user &&
              <Link to={"/breaches/" + id + "/analysis"}>
                Add Analysis
              </Link>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    </div>
  );
}

export default Breach;
