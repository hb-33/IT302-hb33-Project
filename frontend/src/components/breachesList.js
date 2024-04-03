//Harshit Bansal, 4/12/24, IT302-002, Phase 4 Assignment: Read Node.js Data using React.js, hb33@njit.edu

import React, { useState, useEffect } from 'react'
import BreachDataService from "../service/breachesDataService"
import { Link } from "react-router-dom"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import './component.css';

const BreachesList = () => {
  const [breaches, setBreaches] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDomain, setSearchDomain] = useState("");
  useEffect(() => {
    retrieveBreaches();
  }, []);


  const retrieveBreaches = () => {
    BreachDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setBreaches(response.data.breaches);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchName = (e) => {
    const searchName = e.target.value
    setSearchName(searchName);
  };

  const onChangeSearchDomain = (e) => {
    const searchDomain = e.target.value;
    setSearchDomain(searchDomain);
  };
  const find = (query, by) => {
    BreachDataService.find(query, by)
      .then(response => {
        console.log(response.data)
        setBreaches(response.data.breaches)
      })
      .catch(e => {
        console.log(e)
      })
  }
  const findByName =
  () => {
    setSearchDomain("")
    find(searchName, "Name")
  }
const findByDomain =
  () => {
    setSearchName("")
    find(searchDomain, "Domain")
  }

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={onChangeSearchName}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByName}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by domain"
                  value={searchDomain}
                  onChange={onChangeSearchDomain}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByDomain}
              >
                Domain
              </Button>
            </Col>
            
          </Row>
        </Form>
        <Row>
          {breaches.map((breach) => {
            return (
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={breach.LogoPath} className="Imge" />
                  <Card.Body>
                    <Card.Title>{breach.Name}</Card.Title>
                    <Card.Title>{breach.Domain}</Card.Title>
                    <Card.Text>{"Breach Date: " + breach.BreachDate}</Card.Text>
                    <Link to={"/breaches/" + breach._id} >View Analyses</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default BreachesList;