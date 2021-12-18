import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Container, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { moods } from "../moods";
import "./styles/App.css";

function Home() {
  const schema = yup.object({
    imdb: yup.string().required(),
    mood: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      imdb: "",
      mood: "",
    },
    validationSchema: schema,
  });
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const coordinate = { latitude, longitude };
  const dataToSend = { ...formik.values, coordinate };
  const [permitted, setPermitted] = useState(false);

  function allTrue(obj) {
    for (var o in obj) {
      if (!obj[o]) return false;
    }
    if (!permitted) return false;
    return true;
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function success(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setPermitted(true);
    });
  }, []);

  return (
    <div className="wrapper">
      <Container as={Col} lg="4">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Select
            className="form-select"
            name="imdb"
            value={formik.values.imdb}
            onChange={formik.handleChange}
            aria-label="Default select example"
          >
            <option value="">Select Minimum IMDB Score</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </Form.Select>

          <Form.Select
            className="form-select"
            name="mood"
            value={formik.values.mood}
            onChange={formik.handleChange}
            aria-label="Default select example"
          >
            <option value="">Select Your Currently Mood</option>
            <option value={moods.EXCITED}>Excited</option>
            <option value={moods.CHEERFUL}>Cheerful</option>
            <option value={moods.RELAXED}>Relaxed</option>
            <option value={moods.CALM}>Calm</option>
            <option value={moods.BORED}>Bored</option>
            <option value={moods.SAD}>Sad</option>
            <option value={moods.IRRITATED}>Irritated</option>
            <option value={moods.TENSE}>Tense</option>
          </Form.Select>

          <LinkContainer
            className="link-container"
            to={{ pathname: "/results", state: dataToSend }}
          >
            <Button
              disabled={!allTrue(formik.values)}
              className="btn btn-primary"
              type="submit"
            >
              SUBMIT
            </Button>
          </LinkContainer>
        </Form>
        {!permitted ? (
          <p className="text-alert">Please Allow Locations</p>
        ) : null}
      </Container>
    </div>
  );
}

export default Home;
