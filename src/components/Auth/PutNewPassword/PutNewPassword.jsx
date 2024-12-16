import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { user } from '../../../Context/UserContext'
import { Helmet } from 'react-helmet'
export default function PutNewPassword() {
    let {token,setToken} = useContext(user)
    console.log(token);
    
    let navigate = useNavigate()
    let validationSchema = yup.object({
        email : yup.string().required('Email Is required').email("Email Is Not Valid"),
        newPassword : yup.string().required('Password Is required').matches(/^[A-Z][A-Za-z0-9@#$%^&*!]{5,}$/,"Password should be start with capital letter and min length is 7 chars "),
    })
    async function Updating(values) {
        let toastId = toast.loading("Updaiting Password ...")
        try {

            const options = {
                url : "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                method: "PUT",
                data : values
            }
            let {data} = await axios.request(options)
            toast.success("Password Has been Updated Successfully")
            console.log(data);
            setToken(data?.token)
            navigate("/")
        } catch (error) {
            toast.error("Password Has been Updated UnSuccessfully")
        } finally {
            toast.dismiss(toastId)
        }
    }
    let formik = useFormik({
        initialValues : {
            email : "",
            newPassword : "",
        },
        onSubmit:Updating,
        validationSchema,
    })
    return <>
      <Helmet>
  <title>Fresh Update Password</title>
  </Helmet>
    <div className='flex justify-center'>
      <h1 className='text-2xl font-bold pb-1 w-fit relative before:absolute before:bottom-0 before:w-1/2 before:left-1/2 before:-translate-x-1/2 before:h-[4px] before:bg-vip rounded-md'>New Password</h1>
    </div>
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div>
          <span className=''>Email</span>
          <input 
            type="text" 
            className='inputs w-full'
            onChange={formik.handleChange}
            value={formik.values.email}
            name='email'
            onBlur={formik.handleBlur}
          />
           {formik.errors.email && formik.touched.email ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 rounded-md capitalize'>{formik.errors.email}</div> :''}
        </div>
        <div>
          <span className=''>New Password</span>
          <input 
            type="password" 
            className='inputs w-full'
            onChange={formik.handleChange}
            value={formik.values.newPassword} 
            name='newPassword'
            onBlur={formik.handleBlur}
          />
           {formik.errors.newPassword && formik.touched.newPassword ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 rounded-md capitalize'>{formik.errors.newPassword}</div> :''}
        </div>
        <button className='addBtn mt-5' type='submit'>Update</button>
      </div>
    </form>
  </>;
}

