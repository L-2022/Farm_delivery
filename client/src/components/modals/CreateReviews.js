import React, {useState, useContext} from 'react';
import {Button, Form} from "react-bootstrap";
import {useParams, } from "react-router-dom";
import {createReview} from "../../http/deviceAPI";

const CreateReviews = () => {
    const [Review, setReview] = useState('fgd2')

    // const {userId} = useParams()
    const id = {"id": 1}


    // console.log(id)
    // console.log(value)
    const addReview = () => {
        // const formData = new FormData()
        // formData.append('review', value,'userId', id)
        // // formData.append('userId', id)
        // console.log(formData)
        console.log(Review)
        console.log(id)
        // console.log(userId)
        // createReview(formData)
        createReview({deviceId: id, userId: id, Review})
    }


    return (
                <Form>
                    <Form.Control
                        value={Review}
                        onChange={e => setReview(e.target.value)}
                        placeholder={"Введіть ваш відгук"}
                    />
                    <Button variant="outline-success" onClick={addReview}>Дадати</Button>
                </Form>
    );
};
export default CreateReviews;
