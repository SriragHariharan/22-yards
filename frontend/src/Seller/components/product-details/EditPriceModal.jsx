
import React, {useEffect, useState} from 'react';
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
import { useForm } from 'react-hook-form';
import useSellerProductInstance from '../../axios/useSellerProductInstance';


export default function EditPriceModal({productPriceModal, setProductPriceModal, toggleProductPriceModal, productID, showToastMsg }) {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [productPrice, setProductPrice] = useState(null)
    const [error, setError] = useState(null)
    const [sellerProductInstance] = useSellerProductInstance()
  
    //load details on mount
   useEffect( () => {
    sellerProductInstance.get('/get-product/'+productID)
    .then(resp => setProductPrice(resp.data.data.product.offerPrice))
    },[] )

    //submit form to server.
    const onSubmit = (data) => {
      sellerProductInstance.patch('/edit-product/'+productID, {...data})
      .then(resp => {
        if(resp.data.success === false){
          setError(resp.data.message)
        }else{
          toggleProductPriceModal(false)
          setTimeout(()=>showToastMsg(true), 1000)
        }
      })
    }
return (
    <>
      {error && <p className="text-center text-danger">{error}</p> }
      <MDBModal tabIndex='-1' show={productPriceModal} setShow={setProductPriceModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle><b>EDIT PRODUCT PRICE</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleProductPriceModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <p><b>Current Offer Price :</b> {productPrice}</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBInput label='Example label' size='lg' type='number'
                    {...register("offerPrice", { required: true })} 
                    />
                    {errors.price?.type === 'required' && <p style={{color:'red'}}>Product price can't be empty</p>}
                        <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={toggleProductPriceModal}>
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