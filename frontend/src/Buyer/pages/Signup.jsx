import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom';
import BuyerProductInstance from '../axios/BuyerProductInstance';
import { useDispatch } from 'react-redux';
import { UserLogin } from '../../redux-tk/reducers/UserReducer';
import '../styles/pages/auth.css'

const LOGO_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s'

export default function Signup() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { register, formState: { errors }, watch, handleSubmit } = useForm();

  const onSubmit = (data) => {
    delete data.confirm_password
    data.address = {}
    BuyerProductInstance.post('/buyer-signup', {...data})
    .then(resp => {
      if(resp.data.success === false){
        setError(resp.data.message)
      }else{
        dispatch(UserLogin(resp.data.data));
        navigate('../../profile/')
      }
    })
  }

  return (
    <section className="buyer-auth">
      <div className="buyer-auth__hero">
        <div className="buyer-auth__hero-content">
          <img className="buyer-auth__logo" src={LOGO_URL} alt="22Yards" />
          <h2 className="buyer-auth__brand"><span>22</span>Yards</h2>
          <p className="buyer-auth__tagline">
            Join thousands of cricketers. Create an account to shop, checkout, and track your orders.
          </p>
          <div className="buyer-auth__accent-line" />
        </div>
      </div>

      <div className="buyer-auth__panel">
        <div className="buyer-auth__card">
          <h1 className="buyer-auth__title">Create your account</h1>
          <p className="buyer-auth__subtitle">Get started in under a minute</p>

          {error && <Alert variant="danger" className="buyer-auth__alert text-center">{error}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="buyer-auth__field" controlId="fullName">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                {...register("fullName", { required: true, minLength: 6, maxLength: 25 })}
                type="text"
                placeholder="Your full name"
                autoComplete="off"
              />
            </Form.Group>
            {errors.fullName?.type === 'required' && <p className="buyer-auth__error">Full name is required</p>}
            {errors.fullName?.type === 'minLength' && <p className="buyer-auth__error">Name must be at least 6 characters</p>}
            {errors.fullName?.type === 'maxLength' && <p className="buyer-auth__error">Name is too long</p>}

            <Form.Group className="buyer-auth__field" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                type="email"
                placeholder="you@example.com"
                autoComplete="off"
              />
            </Form.Group>
            {errors.email?.type === 'required' && <p className="buyer-auth__error">Email is required</p>}
            {errors.email?.type === 'pattern' && <p className="buyer-auth__error">Please enter a valid email</p>}

            <Form.Group className="buyer-auth__field" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="At least 6 characters"
                autoComplete="off"
              />
            </Form.Group>
            {errors.password?.type === 'required' && <p className="buyer-auth__error">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="buyer-auth__error">Password must be at least 6 characters</p>}

            <Form.Group className="buyer-auth__field" controlId="confirm_password">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                {...register("confirm_password", {
                  required: true,
                  validate: (val) => watch('password') === val || "passwords mismatch",
                })}
                type="password"
                placeholder="Re-enter your password"
              />
            </Form.Group>
            {errors.confirm_password?.type === 'validate' && <p className="buyer-auth__error">Passwords do not match</p>}

            <Button type="submit" className="buyer-btn buyer-btn--accent buyer-auth__submit">
              Create account
            </Button>

            <p className="buyer-auth__footer">
              Already have an account? <Link to="../login">Sign in</Link>
            </p>
          </Form>
        </div>
      </div>
    </section>
  )
}
