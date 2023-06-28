import React from 'react'
import { useForm } from "react-hook-form";
import { MDBInput } from 'mdb-react-ui-kit';
import BuyerProductInstance from '../axios/BuyerProductInstance';
import { ToastContainer, toast } from 'react-toastify';

export default function ContactUs() {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        BuyerProductInstance.post('/send-query', {...data})
        .then(resp => {
            showSuccessToastMessage(resp.data.message);
            reset()
        } )
        .catch(err => showErrorToastMessage(err.message))
    } 
    // toast messages
    function showSuccessToastMessage(message){
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER
        });
    };

    function showErrorToastMessage(message){
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER
        });
    };

  return (
    <div>
        <ToastContainer />
        <section className="text-center p-3 mb-5">
            <h3 className="mb-5 mt-3">Contact us</h3>
            <div className="row">
            <div className="col-lg-7">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12094.57348593182!2d-74.00599512526003!3d40.72586666928451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f988156a9%3A0xd54629bdf9d61d68!2sBroadway-Lafayette%20St!5e0!3m2!1spl!2spl!4v1624523797308!5m2!1spl!2spl"
                className="h-100 w-100" style={{border:0}}  loading="lazy"></iframe>
            </div>

            <div className="col-lg-5">
                <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row mb-4">
                            <div className="col-md-6 mb-4 mb-md-0">
                                <MDBInput label='full name '  type='text' className='mt-4'
                                    {...register("fullName", { required: true })}
                                />                                
                            </div>
                            <div className="col-md-6">
                                    <MDBInput label='email'  type='email' className='mt-4'
                                    {...register("email", { required: true })}
                                    />
                            </div>
                        </div>
                        <label>Message</label>
                        <textarea
                        {...register("message", { required: true })}
                        className="form-control border border-2" rows="4"></textarea>
                    
                        <div className="text-center text-md-end mt-5 mb-5">
                            <input type="submit" className="btn btn-warning w-100" value='SEND' />
                        </div>
                    </div>
                </div>
                </form>

            </div>
            </div>
        </section>
    </div>
  )
}
