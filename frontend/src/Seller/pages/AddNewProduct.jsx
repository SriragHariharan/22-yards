
// add new product

import React, { useState } from 'react';
import {
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
import { MDBInput } from 'mdb-react-ui-kit';
import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';

//fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import {  faBox, faPhotoFilm, faPen   } from "@fortawesome/free-solid-svg-icons";
library.add( faBox, faPhotoFilm, faPen );

import { useSelector } from 'react-redux';
import Error from '../components/general/Error';



export default function AddNewProduct() {
    const [scrollableModal, setScrollableModal] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const Token = useSelector(state => state?.Admin.seller.token)

    //error state
    const [error, setError] = useState(null)

    //code to preview 3 product images image selected using file
    const [image1, setImage1] = useState(null);
    const onChangePicture1 = (e) => {
        setImage1(URL.createObjectURL(e.target.files[0]));
    };
    
    const [image2, setImage2] = useState(null);
    const onChangePicture2 = (e) => {
        setImage2(URL.createObjectURL(e.target.files[0]));
    };
    
    const [image3, setImage3] = useState(null);
    const onChangePicture3 = (e) => {
        setImage3(URL.createObjectURL(e.target.files[0]));
    };
    
    //toast message
    const showToastMessage = () => {
        toast.success('New Product Has been added succcessfully !', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    //submit the modal
    const onSubmit = async(data) => {
        const formData = new FormData();
        formData.append("image1", data.image1[0] );
        formData.append("image2", data.image2[0] );
        formData.append("image3", data.image3[0] );
        formData.append('data', JSON.stringify(data))

        fetch(import.meta.env.VITE_SERVER + 'seller/add-new-product',{
            method:"POST",
            body:formData,
            headers: {
                'Authorization': `Bearer ${Token}`        
            }
        }).then(resp => resp.json())
        .then(data => {
            if(data.success === false){
                setError(data.message)
            }else{
                setScrollableModal(false)
                showToastMessage()
            }
        })
        .catch(err => setError(err))

    } 

    //hard coded values for forms
    let description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda porro ducimus quidem hic excepturi magni, non reprehenderit distinctio labore explicabo, alias officia itaque voluptatum ab suscipit placeat corporis tenetur a iure doloribus? Accusamus ut soluta odio?"
    let specification = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam perferendis dicta rem assumenda. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt repellat aliquid sapiente vel perferendis illum, rerum doloribus, suscipit aliquam fugiat sequi unde. Aperiam facilis non impedit saepe quis ex voluptatem ipsum magni illum praesentium corporis excepturi, doloribus iure ipsa nam eaque quas quisquam reiciendis soluta error cumque accusamus eveniet natus. Tempore cum assumenda vero quis dolor, omnis cupiditate soluta numquam corrupti sequi doloribus illum eligendi deserunt at recusandae, repellat ut hic nesciunt magni culpa ipsam? Cupiditate dolores numquam unde illo?"
  
  
    return (
    <>
        <ToastContainer/>
        <Container>
        <Row>
            <h4 className='text-center mt-3 mb-5 p-5'>
                Things we need to add a product for Sale
            </h4>
            <Col xs={12} sm={6} md={4} className='text-center mb-5'>
                <FontAwesomeIcon icon={faBox} style={{fontSize:'5vmax'}}  className='mb-3'/>
                <h5>A Product to sell</h5>
            </Col>
            <Col xs={12} sm={6} md={4} className='text-center mb-5'>
                <FontAwesomeIcon icon={faPhotoFilm} style={{fontSize:'5vmax'}}  className='mb-3'/>
                <h5>3 photos of the product.</h5>
            </Col>
            <Col xs={12} sm={6} md={4} className='text-center mb-5'>
                <FontAwesomeIcon icon={faPen} style={{fontSize:'5vmax'}} className='mb-3' />
                <h5>A handfull of true information</h5>
            </Col>
        </Row>
        </Container>
        <div className="text-center m-5 p-5">
            <MDBBtn onClick={() => setScrollableModal(!scrollableModal)} className='btn btn-dark p-3' style={{letterSpacing:'5px'}} >
                ADD NEW PRODUCT
            </MDBBtn>
        </div>

        {/* add new product modal starts here */}
        <MDBModal show={scrollableModal} setShow={setScrollableModal} tabIndex='-1'>
            <MDBModalDialog  size='lg' scrollable>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle><b>ADD NEW PRODUCT</b></MDBModalTitle>
                        <MDBBtn
                            className='btn-close'
                            color='none'
                            onClick={() => setScrollableModal(!scrollableModal)}
                        ></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody  className='p-4'>

                    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form data'>

                    <p className='text-center m-5'> 
                        PRODUCT IMAGES
                    </p>

                    <img width='100px' src={image1} alt="" />
                    <div className="mb-4">
                        <MDBInput type='file' size='lg' 
                        {...register("image1", { required: true })}
                        onChange={onChangePicture1}
                        />
                    </div>
                    {errors.image1?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <img width='100px' src={image2} alt="" />
                    <div className="mb-4">
                        <MDBInput type='file' size='lg'
                        {...register("image2", { required: true })}
                        onChange={onChangePicture2}
                        />
                    </div>
                    {errors.image2?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <img width='100px' src={image3} alt="" />
                    <div className="mb-4">
                        <MDBInput type='file' size='lg' 
                        {...register("image3", { required: true })}
                        onChange={onChangePicture3}
                        />
                    </div>
                    {errors.image3?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}
                    

                    <p className='text-center m-5'> 
                        BASIC DETAILS
                    </p>
                    <div className="mb-4">
                        <MDBInput label='Product name' type='text' size='lg'  
                        {...register("productName", { required: true })} 
                        />
                    </div>
                    {errors.productName?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}


                    <div className="mb-4">
                        <MDBInput label='Brand' type='text' size='lg'
                        {...register("brand", { required: true })} 
                        />
                    </div>
                    {errors.brand?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mt-2 mb-4">
                        <Form.Label>Category</Form.Label>
                        <Form.Select size="sm" {...register("category", { required: true })} >
                            <option>Select one</option>
                            <option value="cricket-bat">    Cricket bat     </option>
                            <option value="leg-guard">      Leg guards            </option>
                            <option value="gloves">         Gloves          </option>
                            <option value="cricket-ball">   Balls           </option>
                            <option value="kit-bag">        Bag             </option>
                            <option value="shoes">          Shoes           </option>
                            <option value="helmet">         Helmet          </option>
                            <option value="protection">     Protection      </option>
                            <option value="wearables">      Wearables       </option>
                            <option value="accessories">    Accessories     </option>
                        </Form.Select>
                    </div>
                    {errors.category?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}


                    <div className="mt-4 mb-4">
                        <MDBInput label='MRP (₹)' type='number' size='lg'
                        {...register("mrp", { required: true })} 
                        />
                    </div>
                    {errors.mrp?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Offer Price (₹)' type='number' size='lg'
                        {...register("offerPrice", { required: true })} 
                        />
                    </div>
                    {errors.offerPrice?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Size' type='text' size='lg'
                        {...register("size", { required: true })}              
                        />
                    </div>
                    {errors.size?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-5">
                        <MDBInput label='Stock' type='number' size='lg' value={10}
                        {...register("stock", { required: true })}
                        />
                    </div>
                    {errors.stock?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}
                    
                    <p className='text-center m-5'> 
                        PRODUCT DETAILS
                    </p>

                    <div className="mb-5">
                        <label>Product Description</label>
                        <textarea value={description} className="form-control" placeholder="Enter short description of the product here..." rows="4"
                        {...register("description", { required: true })}
                        ></textarea>
                    </div>
                    {errors.description?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}
                    
                    <div className="mb-5">
                        <label>Product Specification</label>
                        <textarea value={specification} className="form-control" placeholder="Enter detailed description of the product here sa paragraphs..." rows="8"
                        {...register("specification", { required: true })}
                        ></textarea>
                    </div>
                    {errors.specification?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Product feature 01' type='text' size='lg' value="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                        {...register("feature1", { required: true })}
                        />
                    </div>
                    {errors.feature1?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Product feature 02' type='text' size='lg' value="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                        {...register("feature2", { required: true })}
                        />
                    </div>
                    {errors.feature2?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Product feature 03' type='text' size='lg' value="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                        {...register("feature3", { required: true })}
                        />
                    </div>
                    {errors.feature3?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-5">
                        <MDBInput label='Product feature 04' type='text' size='lg' value="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                        {...register("feature4", { required: true })}
                        />
                    </div>
                    {errors.feature4?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <p className='text-center m-5'> 
                        PHYSICAL DETAILS
                    </p>

                    <div className="mb-4">
                        <MDBInput label='Product color' type='text' size='lg' value="White"
                        {...register("productColor", { required: true })}
                        />
                    </div>
                    {errors.productColor?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Product material' type='text' size='lg' value="PU brushed with PVC Inlets"
                        {...register("productMaterial", { required: true })}
                        />
                    </div>
                    {errors.productMaterial?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Items present in the box' type='text' size='lg' value="A pair of batting pads"
                        {...register("itemsInBox", { required: true })}
                        />
                    </div>
                    {errors.itemsInBox?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Warranty of Product' type='text' size='lg' value="No seller or product warranty applied"
                        {...register("warranty", { required: true })}
                        />
                    </div>
                    {errors.warranty?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    <div className="mb-4">
                        <MDBInput label='Weight of Product' type='text' size='lg' value="800g per pad"
                        {...register("weight", { required: true })}
                        />
                    </div>
                    {errors.productName?.type === 'required' && <p style={{color:'red', marginTop:'-24px'}}>This field required</p>}

                    {error && <Error error={error} />}

                    <div className='text-center m-5'>
                        <input type="submit" value='ADD NEW PRODUCT' className="btn btn-dark" />
                    </div>

                </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <MDBBtn color='secondary' onClick={() => setScrollableModal(!setScrollableModal)}>
                        Close
                    </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
        {/* add new product modal ends here */}
    </>
  );
}

