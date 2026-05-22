import React, { useEffect, useState } from 'react'
import useBuyerAuthInstance from '../axios/useBuyerAuthInstance'
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

function getInitials(name) {
    if (!name) return '?'
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
}

function formatValue(value, emptyText) {
    return value ? value : emptyText
}

export default function Profile() {
    const [BuyerAuthInstance] = useBuyerAuthInstance()
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    const [staticModal, setStaticModal] = useState(false);
    const toggleModal = () => setStaticModal(!staticModal);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        BuyerAuthInstance.post('/update-profile', {...data})
        .then(resp => {
            if(resp.data.success === false){
                setError(resp.data.message)
            }else{
                setStaticModal(false)
                showToastMessage();
                BuyerAuthInstance.get('/profile')
                    .then(r => setProfile(r.data.data.user))
            }
        })
        .catch(err => setError(err.message))
    }

    useEffect(() => {
        BuyerAuthInstance.get('/profile')
        .then(resp => setProfile(resp.data.data.user))
        .catch(err => setError(err.message))
    }, [])

    function showToastMessage(){
        toast('User details updated successfully', {
            position: toast.POSITION.TOP_CENTER
        });
    }

    const handleLogout = () => {
        dispatch(UserLogout());
    }

    const addr = profile?.address

  return (
    <section className="buyer-profile buyer-section">
        <ToastContainer />
        <div className="container buyer-container">
            {error && !staticModal && (
                <Alert variant="danger" className="buyer-profile__alert text-center">{error}</Alert>
            )}

            <div className="buyer-section__header">
                <h1 className="buyer-section-title">My Account</h1>
                <p className="buyer-section-subtitle">Manage your profile and delivery details</p>
            </div>

            {!profile ? (
                <div className="buyer-profile__loading">
                    <div className="buyer-profile__spinner" aria-hidden="true" />
                    <p className="buyer-profile__loading-text">Loading your profile...</p>
                </div>
            ) : (
                <div className="buyer-profile__grid">
                    <aside>
                        <div className="buyer-profile__card">
                            <div className="buyer-profile__sidebar-header">
                                <div className="buyer-profile__avatar" aria-hidden="true">
                                    {getInitials(profile?.fullName)}
                                </div>
                                <h2 className="buyer-profile__name">{profile?.fullName}</h2>
                                <p className="buyer-profile__meta">{profile?.email}</p>
                                <p className="buyer-profile__meta">
                                    {addr?.mobile || 'No phone added'}
                                </p>
                            </div>
                            <div className="buyer-profile__logout-wrap">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="buyer-btn buyer-btn--outline buyer-profile__logout"
                                >
                                    <i className="fa-solid fa-right-from-bracket" /> Log out
                                </button>
                            </div>
                            <ul className="buyer-profile__contact-list">
                                <li className="buyer-profile__contact-item">
                                    <i className="fa-solid fa-user" />
                                    <span>{profile?.fullName}</span>
                                </li>
                                <li className="buyer-profile__contact-item">
                                    <i className="fa-solid fa-envelope" />
                                    <span>{profile?.email}</span>
                                </li>
                                <li className="buyer-profile__contact-item">
                                    <i className="fa-solid fa-mobile-screen-button" />
                                    <span>{addr?.mobile || 'Add mobile number'}</span>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    <main>
                        <div className="buyer-profile__card">
                            <div className="buyer-profile__details-header">
                                <h3 className="buyer-profile__details-title">Delivery address</h3>
                                <button
                                    type="button"
                                    onClick={toggleModal}
                                    className="buyer-btn buyer-btn--primary"
                                >
                                    <i className="fa-solid fa-pen" /> Edit address
                                </button>
                            </div>
                            <div className="buyer-profile__details-body">
                                <div className="buyer-profile__row">
                                    <p className="buyer-profile__label">Phone</p>
                                    <p className={`buyer-profile__value ${!addr?.mobile ? 'buyer-profile__value--empty' : ''}`}>
                                        {formatValue(addr?.mobile, 'Add mobile number')}
                                    </p>
                                </div>
                                <div className="buyer-profile__row">
                                    <p className="buyer-profile__label">House name</p>
                                    <p className={`buyer-profile__value ${!addr?.house ? 'buyer-profile__value--empty' : ''}`}>
                                        {formatValue(addr?.house, 'Add house details')}
                                    </p>
                                </div>
                                <div className="buyer-profile__row">
                                    <p className="buyer-profile__label">City</p>
                                    <p className={`buyer-profile__value ${!addr?.city ? 'buyer-profile__value--empty' : ''}`}>
                                        {formatValue(addr?.city, 'Add city')}
                                    </p>
                                </div>
                                <div className="buyer-profile__row">
                                    <p className="buyer-profile__label">State</p>
                                    <p className={`buyer-profile__value ${!addr?.state ? 'buyer-profile__value--empty' : ''}`}>
                                        {formatValue(addr?.state, 'Add state')}
                                    </p>
                                </div>
                                <div className="buyer-profile__row">
                                    <p className="buyer-profile__label">Pincode</p>
                                    <p className={`buyer-profile__value ${!addr?.pincode ? 'buyer-profile__value--empty' : ''}`}>
                                        {formatValue(addr?.pincode, 'Add pincode')}
                                    </p>
                                </div>
                                <div className="buyer-profile__row">
                                    <p className="buyer-profile__label">Landmark</p>
                                    <p className={`buyer-profile__value ${!addr?.landmark ? 'buyer-profile__value--empty' : ''}`}>
                                        {formatValue(addr?.landmark, 'Add landmark')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="buyer-profile__actions">
                            <Link to="/orders" className="buyer-profile__action-tile">
                                <span>
                                    <i className="fa-solid fa-box" />
                                    Your orders
                                </span>
                                <i className="fa-solid fa-chevron-right" />
                            </Link>
                            <Link to="/" className="buyer-profile__action-tile">
                                <span>
                                    <i className="fa-solid fa-store" />
                                    Continue shopping
                                </span>
                                <i className="fa-solid fa-chevron-right" />
                            </Link>
                        </div>
                    </main>
                </div>
            )}
        </div>

        <MDBModal staticBackdrop tabIndex="-1" show={staticModal} setShow={setStaticModal} className="buyer-profile-modal">
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Update delivery address</MDBModalTitle>
                        <MDBBtn className="btn-close" color="none" onClick={toggleModal} />
                    </MDBModalHeader>
                    <MDBModalBody>
                        {error && staticModal && (
                            <div className="buyer-profile-modal__error">{error}</div>
                        )}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <MDBInput label="Mobile number" type="tel" className="mt-2"
                                {...register("mobile", { required: true, minLength: 10, maxLength: 10 })} />
                            {errors.mobile && <span className="buyer-profile-modal__field-error">Mobile number invalid</span>}

                            <MDBInput label="House name" type="text" className="mt-4"
                                {...register("house", { required: true })} />
                            {errors.house && <span className="buyer-profile-modal__field-error">Required field</span>}

                            <MDBInput label="City" type="text" className="mt-4"
                                {...register("city", { required: true })} />
                            {errors.city && <span className="buyer-profile-modal__field-error">Required field</span>}

                            <MDBInput label="State" type="text" className="mt-4"
                                {...register("state", { required: true })} />
                            {errors.state && <span className="buyer-profile-modal__field-error">Required field</span>}

                            <MDBInput label="Pincode" type="number" className="mt-4"
                                {...register("pincode", { required: true, minLength: 6, maxLength: 6 })} />
                            {errors.pincode && <span className="buyer-profile-modal__field-error">Pincode invalid</span>}

                            <MDBInput label="Landmark" type="text" className="mt-4"
                                {...register("landmark", { required: true })} />
                            {errors.landmark && <span className="buyer-profile-modal__field-error">Required field</span>}

                            <MDBModalFooter>
                                <MDBBtn color="secondary" onClick={toggleModal}>Close</MDBBtn>
                                <button type="submit" className="buyer-btn buyer-btn--primary">Save changes</button>
                            </MDBModalFooter>
                        </form>
                    </MDBModalBody>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    </section>
  )
}
