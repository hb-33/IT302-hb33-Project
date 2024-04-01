import React, {useState, useEffect} from 'react'
import BreachDataService from '../service/breachesDataService'
import { useParams } from 'react-router-dom'


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
      <Image src={breach.LogoPath} fluid className = "Imge"/>
      </Col>
      <Col>
      <Card>
      <Card.Header as="h5">{breach.Name}</Card.Header>
      <Card.Body>
      <Card.Text>
      {breach.BreachDate}
      </Card.Text>
      {user}
      </Card.Body>
      </Card>
      </Col>
      </Row>
    </Container>

    </div>
  );
}

export default Breach;
