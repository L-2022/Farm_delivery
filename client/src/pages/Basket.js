import {Col, Container, Row } from "react-bootstrap";

import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceListBasket from "../components/DeviceListBasket";
import Pages from "../components/Pages";

const Basket = () => {
  return (
    <Container className="mt-4">
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceListBasket />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
};

export default Basket;

