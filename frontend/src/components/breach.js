//Harshit Bansal, 4/26/24, IT302-002, Phase 5 Assignment: CUD Node.js Data using React.js, hb33@njit.edu

import React, {useState, useEffect} from 'react'
import BreachDataService from '../service/breachesDataService'
import { Link, useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './component.css';

const Breach = (props) => {

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

  const deleteAnalysis = (analysisId, index) => {
    BreachDataService.deleteAnalysis(analysisId, props.user.id)
      .then(response => {
        setBreach((prevState) => {
          prevState.analyses.splice(index, 1)
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e)
      })
  }


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
            {props.user &&
              <Link to={"/breaches/" + id + "/analysis"}>
                Add Analysis
              </Link>}
            </Card.Body>
          </Card>
          <br></br>
          <h2>Analyses</h2>
          <br></br>
          {breach.analyses.map((analysis, index) => {
            return (
              <Card key={index}>
                <Card.Body>
                  <h5>{analysis.name + " reviewed on " + new Date(Date.parse(analysis.date)).toDateString()}</h5>
                  <p>{analysis.analysis}</p>
                  {props.user && props.user.id === analysis.user_id &&
                    <Row>
                      <Col><Link
                        to={"/breaches/" + id + "/analysis"}
                        state={{ currentAnalysis: analysis }}
                      >Edit</Link>
                      </Col>
                      <Col><Button variant="link" onClick={() => deleteAnalysis(analysis._id, index)}>Delete</Button></Col>
                    </Row>}
                </Card.Body>
              </Card>
            )
          })}
        </Col>
      </Row>
    </Container>

    </div>
  );
}

export default Breach;
