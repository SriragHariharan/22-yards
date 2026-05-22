import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import '../styles/pages/auth.css'
import { Link, useNavigate } from 'react-router-dom';
import BuyerProductInstance from '../axios/BuyerProductInstance';
import { useDispatch } from 'react-redux';
import { UserLogin } from '../../redux-tk/reducers/UserReducer';
import Alert from 'react-bootstrap/Alert';

const LOGO_URL =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH-196UvngLppQ7fGE1-TQfG75ZKli2l6IdAkNCgK83g&s'

export default function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data) => {
      BuyerProductInstance.post('/buyer-login', {...data})
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
            Premium cricket gear. Sign in to track orders and manage your delivery details.
          </p>
          <div className="buyer-auth__accent-line" />
        </div>
      </div>

      <div className="buyer-auth__panel">
        <div className="buyer-auth__card">
          <h1 className="buyer-auth__title">Welcome back</h1>
          <p className="buyer-auth__subtitle">Sign in to your account</p>

          {error && <Alert variant="danger" className="buyer-auth__alert text-center">{error}</Alert>}

          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="buyer-auth__field" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                type="email"
                placeholder="you@example.com"
              />
            </Form.Group>
            {errors.email?.type === 'required' && <p className="buyer-auth__error">Email is required</p>}
            {errors.email?.type === 'pattern' && <p className="buyer-auth__error">Please enter a valid email</p>}

            <Form.Group className="buyer-auth__field" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Enter your password"
              />
            </Form.Group>
            {errors.password?.type === 'required' && <p className="buyer-auth__error">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="buyer-auth__error">Password must be at least 6 characters</p>}

            <Button type="submit" className="buyer-btn buyer-btn--accent buyer-auth__submit">
              Sign in
            </Button>

            <p className="buyer-auth__footer">
              New here? <Link to="../signup">Create an account</Link>
            </p>
          </Form>
        </div>
      </div>
    </section>
  )
}
