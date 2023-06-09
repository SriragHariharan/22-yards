import React, { useState } from 'react';
import {
    MDBInputGroup,
    MDBInput,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-bootstrap';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import {     faSeedling, faHandHoldingDollar, faHandPeace, faMagnifyingGlass, faBoxesPacking, faLocationDot } from "@fortawesome/free-solid-svg-icons";
library.add( faSeedling, faHandHoldingDollar, faHandPeace, faMagnifyingGlass, faBoxesPacking, faLocationDot);

import '../styles/Homepage.css'
import Footer from '../components/Footer';


export default function Homepage() {
    const [loginModal, setLoginModal] = useState(false);
    const toggleLoginModal = () => setLoginModal(!loginModal);
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        reset()
    }
     

    return (
        <>
        {/* header starts here */}
            <div className="header">
                <div className="brand-name">
                    <img width='60px' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s" alt="" />
                    <p> <b>22Yards</b>  <br /> Seller Hub</p>
                </div>
                <div className="auth">
                    <MDBBtn className='me-5 p-3 btn' color='warning'>
                        <div>Signup</div>
                    </MDBBtn>
                    <MDBBtn className='me-5 p-3 btn' color='info' onClick={toggleLoginModal}>
                        <div>Login</div>
                    </MDBBtn>
                </div> 
            </div>
            {/* header ends here */}

            {/* login modal starts here */}
            <MDBModal show={loginModal} setShow={setLoginModal} tabIndex='-1'>
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                    <MDBModalTitle><b> SELLER LOGIN </b></MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleLoginModal}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <div className="text-center mb-5">
                            <img width='130px' src="https://www.svgrepo.com/show/334967/user-circle.svg" alt="" />
                        </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    
                        <MDBInputGroup className='mb-3'>
                            <MDBInput label='email id' type='email' size='lg' 
                                {...register("email", { required: true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })} 
                            />
                        </MDBInputGroup>
                        {errors.email?.type === 'required' && <p style={{color:'red', marginTop:'-17px'}}>email id required</p>}
                        {errors.email?.type === 'pattern'  && <p style={{color:'red', marginTop:'-17px'}}>invalid email</p>}
                        
                        <MDBInputGroup className='mb-3'>
                            <MDBInput label='password' type='password' size='lg'
                            {...register("password", { required: true, minLength:6, maxLength:16 })}
                            />
                        </MDBInputGroup>
                        {errors.password?.type === 'required'   && <p style={{color:'red', marginTop:'-17px'}}>password required</p>}
                        {errors.password?.type === 'minLength'  && <p style={{color:'red', marginTop:'-17px'}}>Password too short</p>}
                        {errors.password?.type === 'maxLength'  && <p style={{color:'red', marginTop:'-17px'}}>Password too long</p>}
                        
                        <MDBModalFooter>
                        <MDBBtn color='secondary' className='me-3' onClick={toggleLoginModal}>
                            Close
                        </MDBBtn>
                        <input className='btn btn-primary' type="submit" value='LOGIN' />
                        </MDBModalFooter>
                    </form>
                    </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/* login modal ends here */}

            {/* quotes section starts here*/}
            <Container className='p-5'>
                <Row>
                    <Col xs={6} sm={6} md={3}>
                        <img className='quote-image' width='82%' src="data:image/jpeg;base64,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" alt="" />
                    </Col>
                    <Col xs={6} sm={6} md={7}>
                        <p className='quote-text'>" The best salespeople are the ones who genuinely care about helping their customers."</p>
                    </Col>
                </Row>
            </Container>
            {/* quotes section ends here */}

            {/* advantages section */}
            <Container>
                <p className="advantages text-center mt-5 mb-5">Advantages of selling on <span style={{color:'#4D84FA'}}><b>22Yards</b></span></p>
                <Row className="d-flex justify-content-center align-items-center">
                    
                    <Col  xs={12} sm={6} md={3} className='mb-4'>
                        <FontAwesomeIcon icon={faSeedling} style={{fontSize:'6vw', marginBottom:'25px'}} />
                        <h5>GROWTH</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quisquam, recusandae officiis asperiores deserunt esse optio minus, nesciunt ali, illum maiores.</p>
                    </Col>

                    <Col  xs={12} sm={6} md={3} className='mb-4'>
                        <FontAwesomeIcon icon={faHandHoldingDollar}  style={{fontSize:'6vw', marginBottom:'25px'}} />
                        <h5>LOW COST BUSSINESS</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quisquam, recusandae officiis asperiores deserunt esse optio minus, nesciunt ali, illum maiores.</p>
                    </Col>

                    <Col  xs={12} sm={6} md={3} className='mb-4'>
                        <FontAwesomeIcon icon={faMagnifyingGlass}  style={{fontSize:'6vw', marginBottom:'25px'}} />
                        <h5>EASE</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quisquam, recusandae officiis asperiores deserunt esse optio minus, nesciunt ali, illum maiores.</p>
                    </Col>

                    <Col  xs={12} sm={6} md={3} className='mb-4'>
                        <FontAwesomeIcon icon={faHandPeace}  style={{fontSize:'6vw', marginBottom:'25px'}} />
                        <h5>TRANSPARENCY</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quisquam, recusandae officiis asperiores deserunt esse optio minus, nesciunt ali, illum maiores.</p>
                    </Col>
                    
                    <Col xs={12} sm={6} md={4}>
                    {/* Content */}
                    </Col>
                </Row>
            </Container>

             {/* seller tips */}
             <Container>
                <p className="advantages text-center mt-5 mb-5">You just need 2 things to become a seller on <span style={{color:'#4D84FA'}}><b>22Yards</b></span></p>
                <Row className="d-flex justify-content-center align-items-center">
                    
                    <Col  xs={12} sm={6} md={3} className='mb-4'>
                        <FontAwesomeIcon icon={faBoxesPacking} style={{fontSize:'6vw', marginBottom:'25px'}} />
                        <h5>A Product to sell</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quisquam, recusandae officiis asperiores deserunt esse optio minus, nesciunt ali, illum maiores.</p>
                    </Col>

                    <Col  xs={12} sm={6} md={3} className='mb-4'>
                        <FontAwesomeIcon icon={faLocationDot}  style={{fontSize:'6vw', marginBottom:'25px'}} />
                        <h5>Pickup Address</h5>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam quisquam, recusandae officiis asperiores deserunt esse optio minus, nesciunt ali, illum maiores.</p>
                    </Col>

                    
                </Row>
            </Container>

            {/* become a seller now */}
            <div className="text-center mt-5 p-5 mb-5">
                <p  className='btn p-4 btn-info' style={{color:"black", letterSpacing:'5px'}}>BECOME A SELLER NOW</p>
            </div>

            <Footer/>
            
        </>
    
  );
}