//Harshit Bansal, 4/26/24, IT302-002, Phase 5 Assignment: CUD Node.js Data using React.js, hb33@njit.edu

import React, { useState } from 'react'
import BreachDataService from "../service/breachesDataService"
import { Link, useParams, useLocation } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AddAnalysis = (props) => {
  let editing = false
  let initialAnalysisState = ""

  const location = useLocation();
  if (location.state && location.state.currentAnalysis) {
    editing = true
    initialAnalysisState = location.state.currentAnalysis.analysis
  }

  const [analysis, setAnalysis] = useState(initialAnalysisState)
  const [submitted, setSubmitted] = useState(false)

  let { id } = useParams();

  const onChangeAnalysis = e => {
    const analysis = e.target.value
    setAnalysis(analysis);
  }

  const saveAnalysis = () => {
    // Bug Fix: If user is not logged in, check if props.user is null/empty
    // and display error message
    // Test Steps: Clicked on "Add Review", refreshed page (logout), Submit Button
    var data = {
      analysis: analysis,
      name: props.user.name,
      user_id: props.user.id,
      breach_id: id
    }
    if (editing) {
      // get existing review id
      data.analysis_id = location.state.currentAnalysis._id
      BreachDataService.updateAnalysis(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data)
        })
        .catch(e => {
          console.log(e);
        })
    } else {
      BreachDataService.createAnalysis(data)
        .then(response => {
          setSubmitted(true)
        }).catch(e => { })
    }
  }

  return (
    <div>
      {submitted ? (
        <div>
          <h5>Analysis submitted successfully</h5>
          <Link to={"/breaches/" + id}>
            Back to Breach
          </Link>
        </div>
      ) : (
        <Form>
          <Form.Group>
            <Form.Label>{editing ? "Edit" : "Create"} Analysis</Form.Label>
            <Form.Control
              type="text"
              required
              value={analysis}
              onChange={onChangeAnalysis}
            />
          </Form.Group>
          <Button variant="primary" onClick={saveAnalysis}>
            Submit
          </Button>
        </Form>
      )}
    </div>
  )
}

export default AddAnalysis;

