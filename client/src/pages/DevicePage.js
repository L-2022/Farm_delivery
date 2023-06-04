import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import BasketButton from "../components/BasketButton";

const DevicePage = () => {
  const [device, setDevice] = useState({ info: [] });
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "3px solid lightgray",
            }}
          >
            <h3>Вартість {device.price} грн.</h3>

            <BasketButton />

            <div className="text-right">Рейтинг: {device.rating}</div>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Параметри {device.name}</h1>
      </Row>
    </Container>
  );
};

export default DevicePage;
