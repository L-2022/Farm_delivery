import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const AddToBasketButton = () => {
  const { id } = useParams();
  const [statusBasket, setBasket] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/basket/chekbasket/" + id)
      .then((res) => res.json())
      .then((statusBasket) => {
        setButtonClicked(false);
        setBasket(statusBasket);
      });
  }, [id, buttonClicked]);

  const addToBasket = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/basket/add/${id}`,
        {
          method: "POST",
        }
      );
      console.log(response);
      if (response.ok) {
        console.log("Product added to basket successfully!");
        setButtonClicked(true);
      } else {
        console.error("Failed to add product to basket.");
      }
    } catch (error) {
      console.error(
        "An error occurred while adding the product to the basket.",
        error
      );
    }
  };

  const dellToBasket = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/basket/dell/${id}`,
        {
          method: "DELETE",
        }
      );

      console.log(response);
      if (response.ok) {
        setButtonClicked(true);
        console.log("Product delete to basket successfully!");
      } else {
        console.error("Failed to add product to basket.");
      }
    } catch (error) {
      console.error(
        "An error occurred while adding the product to the basket.",
        error
      );
    }
  };

  return (
    <Container>
      {statusBasket && (
        <>
          <h2>
            {!statusBasket.length  ? (
              <Button variant="outline-success" onClick={addToBasket}>
                <h1>Додати в корзину</h1>
              </Button>
            ) : (
              <Button variant="outline" onClick={dellToBasket}>
                <h1>Видалити з корзирни</h1>
              </Button>
            )}
          </h2>
        </>
      )}
    </Container>
  );
};

export default AddToBasketButton;
