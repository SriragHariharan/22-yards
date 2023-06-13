
import React, { useEffect, useState } from 'react';
import {
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
import useSellerProductInstance from '../../axios/useSellerProductInstance';


export default function EditProductName({productNameModal, setProductNameModal, toggleProductNameModal, productID, showToastMsg}) {

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [sellerProductInstance] = useSellerProductInstance()
    const [productName, setProductName] = useState(null)
    const [error, setError] = useState(null)

    //load details on mount
    useEffect( () => {
      sellerProductInstance.get('/get-product/'+productID)
      .then(resp => setProductName(resp.data.data.product.productName))
    },[] )
    
    

    //submit form to server.
    const onSubmit = (data) => {
      sellerProductInstance.patch('/edit-product/'+productID, {...data})
      .then(resp => {
        if(resp.data.success === false){
          setError(resp.data.message)
        }else{
          toggleProductNameModal(false)
          setTimeout(()=>showToastMsg(true), 1000)
        }
      })
    }




return (
    <>
      <MDBModal tabIndex='-1' show={productNameModal} setShow={setProductNameModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle><b>EDIT PRODUCT NAME</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleProductNameModal}></MDBBtn>
            </MDBModalHeader>
            {error && <p>{error}</p>}
            
            <MDBModalBody>
              <p>
                <b>Current Name : </b> {productName}
              </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBInput label=' New product name ' size='lg' type='text'
                    {...register("productName", { required: true })} 
                    />
                    {errors.productName?.type === 'required' && <p style={{color:'red'}}>Product name can't be empty</p>}
                        <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleProductNameModal}>
                            Close
                        </MDBBtn>
                        <input className='btn btn-primary' type='submit' value='Save changes' />
                        </MDBModalFooter>
                </form>
                <div className='form-text'>
                    You need to refresh the page to see changes applied.
                </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
