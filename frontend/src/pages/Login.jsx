import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
//css
import '../styles/pages/auth.css'


export default function Login() {
    const { register, formState: { errors }, watch, handleSubmit } = useForm(); //a part of react-hook-form
    const onSubmit = (data) => console.log(data);
  return (
    <div>
      <Container fluid={true} className='login-form'>
        <Row className=" d-flex justify-content-center align-items-center">
          <Col  xl={4} lg={5} md={6} sm={11} xs={11} >
          <div className="border border-3 border-info"></div>
            <Card className="shadow px-3">
              <Card.Body>
                <div className="login-title text-center">LOGIN</div>
                <div className="mb-0 mt-md-5">
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit(onSubmit)}>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email" placeholder="Enter email" autocomplete="off" />
                      </Form.Group>
                      {errors.email?.type === 'required' && <p style={{color:'red', marginTop:'-17px'}}>email required</p>}
                      {errors.email?.type === 'pattern' && <p style={{color:'red', marginTop:'-17px'}}>Please check your email</p>}

                      <Form.Group className="mb-3" controlId="formBasicPassword" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register("password", { required: true, minLength:6 })} type="password" placeholder="Password" autocomplete="off" />
                      </Form.Group>
                      {errors.password?.type === 'required' && <p style={{color:'red', marginTop:'-17px'}}>Password required</p>}
                      {errors.password?.type === 'minLength' && <p style={{color:'red', marginTop:'-17px'}}>Password should me 6 or more characters</p>}

                      <div className="d-grid mt-4">
                        <Button variant="info" type="submit">
                          L O G I N
                        </Button>
                      </div>

                      <div className='mt-5 text-center'>
                        New User ? Create an account
                      </div>

                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}