import React, { useEffect, useState } from 'react'
import useBuyerAuthInstance from '../axios/useBuyerAuthInstance'
//for modal
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput
  } from 'mdb-react-ui-kit';
  import { useForm } from "react-hook-form";
  import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { useDispatch } from 'react-redux';
import { UserLogout } from '../../redux-tk/reducers/UserReducer';

export default function Profile() {
    const [BuyerAuthInstance] = useBuyerAuthInstance()
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    // for modal
    const [staticModal, setStaticModal] = useState(false);
    const toggleModal = () => setStaticModal(!staticModal);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = (data) => {
        BuyerAuthInstance.post('/update-profile', {...data})
        .then(resp => {
            console.log(resp.data.success);
            if(resp.data.success === false){
                setError(resp.data.message)
            }else{
                setStaticModal(false)
                showToastMessage();
            }
        })
        .catch(err => setError(err.message))
    }

    useEffect(() => {
        BuyerAuthInstance.get('/profile')
        .then(resp => setProfile(resp.data.data.user))
        .catch(err => setError(err.message))
    },[])

    //for toast messages
    function showToastMessage(){
        toast('User details updated successfully', {
            position: toast.POSITION.TOP_CENTER
        });
    };

    //logout user
    const handleLogout = () => {
        dispatch(UserLogout());
    }


  return (
    <div>
        <section style={{backgroundColor: "peachpuff"}}>
            <div className="container py-5">
            <ToastContainer />
                {/* for error */}
                {error && <Alert variant={'danger'} className='text-center'>{error}</Alert>}
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                            className="rounded-circle img-fluid" style={{width: "150px"}} />
                            <h5 className="my-3">{profile?.fullName}</h5>
                            <p className="text-muted mb-1">{profile?.address?.mobile || null}</p>
                            <p className="text-muted mb-5">{profile?.email}</p>
                            
                        </div>
                                <div className="d-flex justify-content-center mb-5">
                                    <button onClick={handleLogout}  className="btn btn-secondary w-50">LOGOUT</button>
                                </div>
                        </div>
                        <div className="card mb-4 mb-lg-0">
                            <div className="card-body p-0">
                                <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa-solid fa-user fa-lg text-warning"></i>
                                        <p className="mb-0">{profile?.fullName}</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa-solid fa-envelope fa-lg"></i>
                                        <p className="mb-0">{profile?.email}</p>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                        <i className="fa-solid fa-mobile-screen-button fa-lg"  style={{color: "#55acee"}}></i>
                                        <p className="mb-0">{profile?.address?.mobile || "Add mobile number"}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className="card-body">
                                
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Phone</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{profile?.address?.mobile || 'Add mobile number'}</p>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">House name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{profile?.address?.house || 'Add house details'}</p>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">City</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{profile?.address?.city || 'Add city'}</p>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">State</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{profile?.address?.state || 'Add state'}</p>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Pincode</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{profile?.address?.pincode || 'Add pincode'}</p>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Landmark</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{profile?.address?.landmark || 'Add landmark'}</p>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="d-flex justify-content-center mb-2">
                                    <button onClick={toggleModal}  type="button" className="btn btn-secondary w-100">
                                        UPDATE PROFILE
                                    </button>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <Link to={'/orders'} className="col-md-6">
                                <div className="btn btn-light border border-5 border-secondary w-100 p-2">
                                GO TO ORDERS SECTION
                                </div>
                            </Link> 
                            <Link to={'/'} className="col-md-6">
                                <div className="btn btn-light border border-5 border-secondary w-100 p-2">
                                GO TO HOMEPAGE
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal code statrts here*/}
            <MDBModal staticBackdrop tabIndex='-1' show={staticModal} setShow={setStaticModal}>
                <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                    <MDBModalTitle>UPDATE PROFILE</MDBModalTitle>
                    <MDBBtn className='btn-close' color='none' onClick={toggleModal}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                    {error && <div className="text-danger h1 text-center">{error}</div> }
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <MDBInput label='Mobile number'  type='tel' className='mt-3'
                            {...register("mobile", { required: true, minLength:10, maxLength:10 })} />
                            {errors.mobile && <span className="text-danger">Mobile number invalid</span>}

                            <MDBInput label='House name'  type='text' className='mt-4'
                            {...register("house", { required: true })} />
                            {errors.house &&  <span className="text-danger">required field</span>}

                            <MDBInput label='City '  type='text' className='mt-4'
                            {...register("city", { required: true })} />
                            {errors.city &&  <span className="text-danger">required field</span>}

                            <MDBInput label='State '  type='text' className='mt-4'
                            {...register("state", { required: true })} />
                            {errors.state &&  <span className="text-danger">required field</span>}

                            <MDBInput label='Pincode '  type='number' className='mt-4'
                            {...register("pincode", { required: true,  minLength:6, maxLength:6 })} />
                            {errors.pincode &&  <span className="text-danger">pincode invalid</span>}

                            <MDBInput label='Landmark '  type='text' className='mt-4'
                            {...register("landmark", { required: true })} />
                            {errors.landmark &&  <span className="text-danger">required field</span>}
                        

                        
                        <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleModal}>
                            Close
                        </MDBBtn>
                        <input type="submit" className='btn btn-warning' value='UPDATE' />
                        </MDBModalFooter>
                        </form>
                    </MDBModalBody>
                </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            {/* modal code ends here */}

        </section>
    </div>
  )
}
