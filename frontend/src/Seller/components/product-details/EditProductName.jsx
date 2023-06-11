
import React, { useEffect } from 'react';
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


export default function EditProductName({productNameModal, setProductNameModal, toggleProductNameModal}) {

    const { register, formState: { errors }, handleSubmit } = useForm();

    //load details on mount
    useEffect( () => {},[] )

    //submit form to server.
    const onSubmit = (data) => console.log(data);
return (
    <>
      <MDBModal tabIndex='-1' show={productNameModal} setShow={setProductNameModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle><b>EDIT PRODUCT NAME</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleProductNameModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <p>
                <b>Current Name : </b> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, repudiandae?
              </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBInput label='Example label' size='lg' type='text'
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
