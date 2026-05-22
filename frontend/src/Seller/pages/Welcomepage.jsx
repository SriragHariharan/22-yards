import { useState } from 'react';
import { MDBInputGroup, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';

import '../styles/Welcomepage.css';
import { AdminLogin } from '../../redux-tk/reducers/AdminReducer';
import useSellerAuthInstance from '../axios/useSellerAuthInstance';

const fieldError = (msg) => <p className="field-error">{msg}</p>;

export default function Welcomepage() {
    const dispatch = useDispatch();
    const [sellerAuthInstance] = useSellerAuthInstance();
    const [activeTab, setActiveTab] = useState('login');

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [error, setError] = useState(null);

    const {
        register: registerSignup,
        formState: { errors: errorsSignup },
        handleSubmit: handleSignup,
        reset: resetSignup,
        watch,
    } = useForm();
    const [error2, setError2] = useState(null);

    const onSubmit = (data) => {
        sellerAuthInstance.post('login', { ...data })
            .then(resp => {
                if (resp.data.success === false) {
                    setError(resp.data.message);
                } else {
                    dispatch(AdminLogin(resp.data.data));
                    localStorage.setItem('22YardsAdmin', JSON.stringify(resp.data.data));
                    reset();
                    setError(null);
                }
            })
            .catch(err => setError(err.message));
    };

    const onSubmitSignup = (data) => {
        sellerAuthInstance.post('signup', { ...data })
            .then(resp => {
                if (resp.data.success === false) {
                    setError2(resp.data.message);
                } else {
                    dispatch(AdminLogin(resp.data.data));
                    localStorage.setItem('22YardsAdmin', JSON.stringify(resp.data.data));
                    resetSignup();
                    setError2(null);
                }
            })
            .catch(err => setError2(err.message));
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setError(null);
        setError2(null);
    };

    return (
        <div className="seller-welcome">
            <div className="seller-welcome__hero">
                <div className="seller-welcome__hero-content">
                    <img
                        className="seller-welcome__logo"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s"
                        alt="22Yards"
                    />
                    <h1 className="seller-welcome__title">
                        <span>22Yards</span> Seller Hub
                    </h1>
                    <p className="seller-welcome__tagline">
                        List products, manage orders, grow your shop.
                    </p>
                    <Link to="/" className="seller-welcome__store-link">
                        &larr; Back to store
                    </Link>
                </div>
            </div>

            <div className="seller-welcome__auth">
                <div className="seller-welcome__auth-card">
                    <div className="auth-tabs">
                        <button
                            type="button"
                            className={`auth-tabs__btn ${activeTab === 'login' ? 'auth-tabs__btn--active' : ''}`}
                            onClick={() => switchTab('login')}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={`auth-tabs__btn ${activeTab === 'signup' ? 'auth-tabs__btn--active' : ''}`}
                            onClick={() => switchTab('signup')}
                        >
                            Sign up
                        </button>
                    </div>

                    {activeTab === 'login' ? (
                        <div className="auth-form auth-form--fade">
                            <h2 className="auth-form__heading">Welcome back</h2>
                            <p className="auth-form__sub">Sign in to your seller account</p>

                            {error && <Alert variant="danger">{error}</Alert>}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <MDBInputGroup className="mb-3">
                                    <MDBInput
                                        label="Email"
                                        type="email"
                                        size="lg"
                                        {...register('email', {
                                            required: true,
                                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        })}
                                    />
                                </MDBInputGroup>
                                {errors.email?.type === 'required' && fieldError('Email required')}
                                {errors.email?.type === 'pattern' && fieldError('Invalid email')}

                                <MDBInputGroup className="mb-4">
                                    <MDBInput
                                        label="Password"
                                        type="password"
                                        size="lg"
                                        {...register('password', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 24,
                                        })}
                                    />
                                </MDBInputGroup>
                                {errors.password?.type === 'required' && fieldError('Password required')}
                                {errors.password?.type === 'minLength' && fieldError('Password too short')}
                                {errors.password?.type === 'maxLength' && fieldError('Password too long')}

                                <MDBBtn type="submit" className="auth-form__submit" color="primary" block>
                                    Login
                                </MDBBtn>
                            </form>
                        </div>
                    ) : (
                        <div className="auth-form auth-form--fade">
                            <h2 className="auth-form__heading">Create account</h2>
                            <p className="auth-form__sub">Start selling on 22Yards today</p>

                            {error2 && <Alert variant="danger">{error2}</Alert>}

                            <form onSubmit={handleSignup(onSubmitSignup)}>
                                <MDBInputGroup className="mb-3">
                                    <MDBInput
                                        label="Email"
                                        type="email"
                                        size="lg"
                                        {...registerSignup('email', {
                                            required: true,
                                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        })}
                                    />
                                </MDBInputGroup>
                                {errorsSignup.email?.type === 'required' && fieldError('Email required')}
                                {errorsSignup.email?.type === 'pattern' && fieldError('Invalid email')}

                                <MDBInputGroup className="mb-3">
                                    <MDBInput
                                        label="Seller name"
                                        type="text"
                                        size="lg"
                                        {...registerSignup('sellerName', { required: true, minLength: 6 })}
                                    />
                                </MDBInputGroup>
                                {errorsSignup.sellerName?.type === 'required' && fieldError('Seller name required')}
                                {errorsSignup.sellerName?.type === 'minLength' && fieldError('Seller name too short')}

                                <MDBInputGroup className="mb-3">
                                    <MDBInput
                                        label="Mobile number"
                                        type="tel"
                                        size="lg"
                                        {...registerSignup('mobile', {
                                            required: true,
                                            minLength: 10,
                                            maxLength: 10,
                                        })}
                                    />
                                </MDBInputGroup>
                                {errorsSignup.mobile?.type === 'required' && fieldError('Mobile number required')}
                                {errorsSignup.mobile?.type === 'minLength' && fieldError('Mobile number invalid')}
                                {errorsSignup.mobile?.type === 'maxLength' && fieldError('Mobile number invalid')}

                                <MDBInputGroup className="mb-3">
                                    <MDBInput
                                        label="Address"
                                        type="text"
                                        size="lg"
                                        {...registerSignup('address', { required: true, minLength: 15 })}
                                    />
                                </MDBInputGroup>
                                {errorsSignup.address?.type === 'required' && fieldError('Address required')}
                                {errorsSignup.address?.type === 'minLength' && fieldError('Address too short')}

                                <MDBInputGroup className="mb-3">
                                    <MDBInput
                                        label="Password"
                                        type="password"
                                        size="lg"
                                        {...registerSignup('password', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 24,
                                        })}
                                    />
                                </MDBInputGroup>
                                {errorsSignup.password?.type === 'required' && fieldError('Password required')}
                                {errorsSignup.password?.type === 'minLength' && fieldError('Password too short')}
                                {errorsSignup.password?.type === 'maxLength' && fieldError('Password too long')}

                                <MDBInputGroup className="mb-4">
                                    <MDBInput
                                        label="Confirm password"
                                        type="password"
                                        size="lg"
                                        {...registerSignup('confirmPassword', {
                                            required: true,
                                            validate: (string) => {
                                                if (watch('password') != string) {
                                                    return 'Passwords no match';
                                                }
                                            },
                                        })}
                                    />
                                </MDBInputGroup>
                                {errorsSignup.confirmPassword?.type === 'validate' && fieldError('Passwords do not match')}

                                <MDBBtn type="submit" className="auth-form__submit" color="primary" block>
                                    Sign up
                                </MDBBtn>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <footer className="seller-welcome__footer">
                &copy; {new Date().getFullYear()} 22Yards
            </footer>
        </div>
    );
}
