import React from 'react'
import {
    MDBInputGroup,
    MDBInput,
    MDBBtn,    
} from 'mdb-react-ui-kit';

import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import '../styles/Homepage.css'

function Signup() {
    const { register, formState: { errors }, handleSubmit, reset, watch } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        reset()
    }
  return (
    <div>
        {/* header starts here */}
        <div className="header">
            <div className="brand-name">
                <img width='60px' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s" alt="" />
                <p> <b>22Yards</b>  <br /> Seller Hub</p>
            </div>
            <div className="auth">
                <MDBBtn className='me-5 p-3 btn' color='secondary'>
                    <div>Go to Homepage</div>
                </MDBBtn>
            </div> 
        </div>
        {/* header ends here */}

        {/* signup form logo*/}
        <div className="text-center mb-5">
            <img width='130px' src="https://www.svgrepo.com/show/334967/user-circle.svg" alt="" />
            <h3 style={{letterSpacing:'6px'}} className='mt-3'>SELLER SIGNUP</h3>
        </div>

        {/* signup form starts here*/}
        <Container>  
            <Row className='d-flex align-items-center justify-content-center'>  
                <Col xs={11} sm={10} md={6} lg={5} xl={5}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <MDBInputGroup className='mb-3'>
                            <MDBInput label='email id' type='email' 
                            {...register("email", { required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} 
                            />                        
                        </MDBInputGroup>
                        {errors.email?.type === 'required'  && <p style={{color:'red', marginTop:'-17px'}}>email required</p>}
                        {errors.email?.type === 'pattern'   && <p style={{color:'red', marginTop:'-17px'}}>email too short</p>}
                        
                        <MDBInputGroup className='mb-3'>
                            <MDBInput label='Seller name' type='text' 
                            {...register("sellerName", { required: true, minLength:6 })} 
                            />                        
                        </MDBInputGroup>
                        {errors.sellerName?.type === 'required'  && <p style={{color:'red', marginTop:'-17px'}}>Seller name required</p>}
                        {errors.sellerName?.type === 'minLength' && <p style={{color:'red', marginTop:'-17px'}}>Seller name too short</p>}

                        <MDBInputGroup className='mb-3' textBefore='+ 91 '>
                            <MDBInput label='mobile number' type='tel' 
                            {...register("mobile", { required: true, minLength:10, maxLength:10 })} 
                            />                        
                        </MDBInputGroup>
                        {errors.mobile?.type === 'required'  && <p style={{color:'red', marginTop:'-17px'}}> Mobile number required</p>}
                        {errors.mobile?.type === 'minLength' && <p style={{color:'red', marginTop:'-17px'}}> Mobile number invalid</p>}
                        {errors.mobile?.type === 'maxLength'  && <p style={{color:'red', marginTop:'-17px'}}> Mobile number invalid</p>}

                        <MDBInputGroup className='mb-3'>
                            <MDBInput label='Address' id='address' rows={4}
                                {...register("address", { required: true, minLength:15 })} 
                                />                      
                        </MDBInputGroup>
                        {errors.address?.type === 'required'  && <p style={{color:'red', marginTop:'-17px'}}> Address required</p>}
                        {errors.address?.type === 'minLength' && <p style={{color:'red', marginTop:'-17px'}}> Address too short</p>}

                        <MDBInputGroup className='mb-3'>
                            <MDBInput label='password' type='password' 
                            {...register("password", { required: true, minLength:6, maxLength:16 })}                                 
                            />                        
                        </MDBInputGroup>
                        {errors.password?.type === 'required'  && <p style={{color:'red', marginTop:'-17px'}}>Password required</p>}
                        {errors.password?.type === 'minLength' && <p style={{color:'red', marginTop:'-17px'}}>Password too short</p>}
                        {errors.password?.type === 'maxLength' && <p style={{color:'red', marginTop:'-17px'}}>Password too long</p>}

                        <MDBInputGroup className='mb-4'>
                            <MDBInput label='confirm password' type='password' 
                            {...register("confirmPassword", { required: true, validate: (string) => {
                                if (watch('password') != string) {
                                return "Passwords no match";
                                }
                            } })}                                 
                            />                        
                        </MDBInputGroup>
                        {errors.confirmPassword?.type === 'validate'  && <p style={{color:'red', marginTop:'-17px'}}>Password doesnot match</p>}

                        <div className="d-grid">
                            <input type="submit" className="btn btn-primary" value='BECOME A SELLER' style={{letterSpacing:'5px'}}/>
                        </div>

                    </form>
                </Col>  
            </Row>  
        </Container>
        {/* signupform ends here */}

        {/* footer for seller */}
        <div className="mt-5">
            <Footer/>
        </div>
    </div>
  )
}

export default Signup