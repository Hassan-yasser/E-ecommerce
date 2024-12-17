import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import { user } from '../../../Context/UserContext';
import { Helmet } from 'react-helmet';

export default function Login() {
   let Navigate = useNavigate()
   let {token,setToken} = useContext(user)
    async function SignIn(values) {
      let id;
      try {
          const options = {
              url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
              method:"POST",
              data: values,
          }
          id = toast.loading('waiting...')
          const {data} = await axios.request(options)
          toast.dismiss(id)
          toast.success("User Logged Successfully")
          console.log(data);
          
          setTimeout (()=>{
              if (data?.message === "success") {
                localStorage.setItem("token",data.token)
                setToken(data.token)
                Navigate("/")
              }
          },2000)
      } catch (error) {
          toast.dismiss(id)
          toast.error("Incorrect email or password")
      }
    }

    let validationSchema = yup.object({
        email: yup.string().required('email must be required').email(),
        password:yup.string().required('password must be required').matches(/^[A-Z][A-Za-z0-9@#$%^&*!]{5,}$/,"Password should be start with capital letter and min length is 7 chars "),
    })
    let formik = useFormik({
        initialValues: {
            email:"",
            password:"",
        },
        onSubmit : SignIn,
        validationSchema,
    })

    return <>
              <Helmet>
  <title>Fresh Login</title>
  </Helmet>
      <section>
        <h2 className='flex items-center text-3xl gap-3 font-bold'><i className="mt-1 fa-solid fa-arrow-right-to-bracket text-vip"></i> Login</h2>


        <form className='mt-10 flex flex-col gap-5' onSubmit={formik.handleSubmit}>

            <div>
                <span className=''>email</span>
           <input type="email" className='inputs w-full'
                onChange={formik.handleChange}
                value={formik.values.email}
                name='email'
                onBlur={formik.touched.email}
           />
           {formik.errors.email && formik.touched.email ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 '>{formik.errors.email}</div> :''}            </div>
            <div>
                <span className=''>password</span>
           <input type="password" className='inputs w-full'
                onChange={formik.handleChange}
                value={formik.values.password}
                name='password'
                onBlur={formik.touched.password}
           />
           {formik.errors.password && formik.touched.password ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 '>{formik.errors.password}</div> :''}            </div>
           <Link to="/auth/ForgotPassword">Forgtten Password ?</Link>


        <button className='addBtn' type='submit'>Login</button>
             
        </form>
      </section>
  
    </>
}
