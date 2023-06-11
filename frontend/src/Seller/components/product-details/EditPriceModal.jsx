
import React, {useEffect} from 'react';
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


export default function EditPriceModal({productPriceModal, setProductPriceModal, toggleProductPriceModal }) {
    const { register, formState: { errors }, handleSubmit } = useForm();

    //load details on mount
    useEffect( () => {},[] )

    //submit form to server.
    const onSubmit = (data) => console.log(data);

return (
    <>

      <MDBModal tabIndex='-1' show={productPriceModal} setShow={setProductPriceModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle><b>EDIT PRODUCT PRICE</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleProductPriceModal}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
                <p><b>Current Offer Price :</b> $1299</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <MDBInput label='Example label' size='lg' type='number'
                    {...register("price", { required: true })} 
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