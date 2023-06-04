import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Row } from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
  const [todo, setPerson] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/basket/")
      .then((res) => res.json())
      .then((todo) => {
        setPerson(todo);
        console.log(todo);
      })
      .catch((error) => console.log(error.messge));
  }, []);

  return (
    <Row className="d-flex">
      {todo && (
        <>
          {todo.map((device) => (
            <DeviceItem key={device.id} device={device} />
          ))}
        </>
      )}
    </Row>
  );
});

export default DeviceList;
