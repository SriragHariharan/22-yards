import React, { useState } from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import BuyerProductInstance from '../axios/BuyerProductInstance';
import { useDispatch } from 'react-redux';
import { UserLogin } from '../../redux-tk/reducers/UserReducer';

//css
import '../styles/pages/auth.css'

export default function Signup() {

  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, formState: { errors }, watch, handleSubmit } = useForm(); //a part of react-hook-form
  
  //submitting a form to a backed api
  const onSubmit = (data) => {
    delete data.confirm_password
    data.address = {}
    console.log(data);
    BuyerProductInstance.post('/buyer-signup', {...data})
    .then(resp => {
      if(resp.data.success === false){
        setError(resp.data.message)
      }else{
        dispatch(UserLogin(resp.data.data));
        navigate('../../profile/')
      }
    })
  } 
  return (
    <div>
      <Container className='signup-form' fluid={true}>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col xl={4} lg={5} md={6} sm={11} xs={13}>
          <div className="border border-5 border-dark p-5">
                <div className="login-title text-center">SIGNUP</div>
                <div className="mb-0 mt-md-4">
                  <div className="mb-3">
                    {/* for error */}
                    {error && <Alert variant={'danger'} className='text-center'>{error}</Alert>}
        
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <Form.Group className="mb-3" controlId="Name">
                        <Form.Label className="text-center">
                          Full name
                        </Form.Label>
                        <Form.Control {...register("fullName", { required: true, minLength:6, maxLength:25 })} type="text"  autoComplete="off" />
                      </Form.Group>
                      {errors.firstName?.type === 'required' && <p style={{color:'red', marginTop:'-17px'}}>First name is required</p>}
                      {errors.firstName?.type === 'minLength' && <p style={{color:'red', marginTop:'-17px'}}>First name should have atleast 4 characters</p>}
                      {errors.firstName?.type === 'maxLength' && <p  style={{color:'red', marginTop:'-17px'}}>First name too long</p>}

                      <Form.Group className="mb-3">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                        <Form.Control {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i})} type="email"  autoComplete="off" />
                      </Form.Group>
                      {errors.email?.type === 'required' && <p style={{color:'red', marginTop:'-17px'}}>email required</p>}
                      {errors.email?.type === 'pattern' && <p style={{color:'red', marginTop:'-17px'}}>Please check your email</p>}

                      <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register("password", { required: true, minLength:6 })} type="password" autoComplete="off" />
                      </Form.Group>
                      {errors.password?.type === 'required' && <p style={{color:'red', marginTop:'-17px'}}>Password required</p>}
                      {errors.password?.type === 'minLength' && <p style={{color:'red', marginTop:'-17px'}}>Password should me 6 or more characters</p>}

                      <Form.Group className="mb-3" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control {...register("confirm_password", {
                              required: true,
                              validate: (val) => {
                                if (watch('password') !== val) {
                                  return "passwords mismatch";
                                }
                              },
                            })} type="password" />
                      </Form.Group>
                      {errors.confirm_password?.type === 'validate' && <p style={{color:'red', marginTop:'-17px'}}>Passwords doesnt match</p>}
                      
                      <div className="d-grid mt-4">
                        <Button variant="dark" type="submit">
                          Create Account
                        </Button>
                      </div>

                      <div className='mt-5 text-center'>
                        Existing User ? then <Link to={'../login'}> Login</Link>
                      </div>

                    </Form>
                  </div>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}