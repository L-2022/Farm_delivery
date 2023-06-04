import React, {useContext, useState} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password, userName);
            }
            user.setUser(user)
            user.setIsAuth(true)

            history.push(SHOP_ROUTE)
        } catch (e) {
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 550}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизація' : "Реєстрація"}</h2>
                <Form className="d-flex flex-column">
                    {isLogin ? "":
                        <Form.Control
                            className="mt-3"
                            placeholder="Введіть ваше ім'я..."
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        />
                    }

                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нема акаунта? <NavLink to={REGISTRATION_ROUTE}>Реєстрація!</NavLink>
                            </div>
                            :
                            <div>
                                Є аккаунт? <NavLink to={LOGIN_ROUTE}>Увійти!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Увійти' : 'Реєстрація'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
