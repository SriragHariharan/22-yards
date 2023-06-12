import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
//css
import '../styles/pages/auth.css'

export default function Signup() {
    const { register, formState: { errors }, watch, handleSubmit } = useForm(); //a part of react-hook-form
    const onSubmit = (data) => console.log(data);
  return (
    <div>
      <Container className='signup-form' fluid={true}>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col xl={4} lg={5} md={6} sm={11} xs={11}>
          <div className="border border-3 border-primary"></div>
            <Card className="shadow px-3">
              <Card.Body>
                <div className="login-title text-center">SIGNUP</div>
                <div className="mb-0 mt-md-4">
                  <div className="mb-3">
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Name
                        </Form.Label>
                        <Form.Control {...register("firstName", { required: true, minLength:4, maxLength:15 })} type="text" placeholder="Enter Name" autocomplete="off" />
                      </Form.Group>
                      {errors.firstName?.type === 'required' && <p style={{color:'red', marginTop:'-17px'}}>First name is required</p>}
                      {errors.firstName?.type === 'minLength' && <p style={{color:'red', marginTop:'-17px'}}>First name should have atleast 4 characters</p>}
                      {errors.firstName?.type === 'maxLength' && <p  style={{color:'red', marginTop:'-17px'}}>First name too long</p>}

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

                      <Form.Group className="mb-3" controlId="formBasicPassword" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control {...register("confirm_password", {
                              required: true,
                              validate: (val) => {
                                if (watch('password') !== val) {
                                  return "passwords mismatch";
                                }
                              },
                            })} type="password" placeholder="Password" />
                      </Form.Group>
                      {errors.confirm_password?.type === 'validate' && <p style={{color:'red', marginTop:'-17px'}}>Passwords doesnt match</p>}
                      
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Create Account
                        </Button>
                      </div>

                      <div className='mt-5 text-center'>
                        Existing User ? then Login
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