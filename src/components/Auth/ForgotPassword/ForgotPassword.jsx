import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
export default function ForgotPassword() {
    let navigate = useNavigate()
    let valid = yup.object({
        email : yup.string().email("email is not valid").required("email is required")
    })
    async function Verify(values) {
        let toastId = toast.loading("Waiting...")
        try {

            const options = {
                url : "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",
                data : values
            }
            let {data} = await axios.request(options)
            toast.success("We Have Sent Code for Your Email")
            console.log(data);
            setTimeout(()=>{
                if (data?.statusMsg === "success") {
                    navigate("/auth/ResetCode")
                }

            },2000)

        } catch (error) {
            toast.error("Email Is Not Exist")
        } finally {
            toast.dismiss(toastId)
        }
    }
    let formik = useFormik({
        initialValues : {
            email : ""
        },
        onSubmit:Verify,
        validationSchema :valid
    })
return <>
          <Helmet>
  <title>Fresh Forgot</title>
  </Helmet>
<div className='flex justify-center'><h1 className='text-2xl font-bold pb-1 w-fit relative before:absolute before:bottom-0 before:w-1/2 before:left-1/2 before:-translate-x-1/2 before:h-[4px] before:bg-vip rounded-md'>Forgot Password</h1></div>
  <form onClick={formik.handleSubmit}>
  <div>
        <span className=''>email</span>
           <input type="email" className='inputs w-full'
                onChange={formik.handleChange}
                value={formik.values.email}
                name='email'
                onBlur={formik.touched.email}
           />
           {formik.errors.email && formik.touched.email ? <div className='bg-red-600 text-white rounded-md  px-5 py-2 w-fit mx-auto mt-2 '>{formik.errors.email}</div> :''}            </div>
           <button className='addBtn mt-5' type='submit' onSubmit={formik.handleSubmit}>Verify</button>
  </form>
  
  
  </>
}
