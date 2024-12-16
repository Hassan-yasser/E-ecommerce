import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet'
import toast from 'react-hot-toast'
import {  useNavigate } from 'react-router-dom'
import * as yup from 'yup'
export default function ResetCode() {
    let navigate = useNavigate()
    let valid = yup.object({
        resetCode : yup.string().matches(/^[0-9]{6}$/,"Code Is Invalid").required("Code Is Required")
    })
    async function Verify(values) {
        let toastId = toast.loading("Waiting...")
        try {

            const options = {
                url : "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                method: "POST",
                data : values
            }
            let {data} = await axios.request(options)
            toast.success("Code is matching")
            console.log(data);
            setTimeout(()=>{
                if (data.status === 'Success') {
                    navigate("/auth/PutNewPassword")
                }
            },2000)

        } catch (error) {
            toast.error("Code is not matching")
            console.log(error);
            
        } finally {
            toast.dismiss(toastId)
        }
    }
    let formik = useFormik({
        initialValues : {
            resetCode : ""
        },
        onSubmit:Verify,
        validationSchema :valid
    })
return <>
          <Helmet>
  <title>Fresh Reset</title>
  </Helmet>
<div className='flex justify-center'><h1 className='text-2xl font-bold pb-1 w-fit relative before:absolute before:bottom-0 before:w-1/2 before:left-1/2 before:-translate-x-1/2 before:h-[4px] before:bg-vip rounded-md'>Forgot Password</h1></div>
  <form onClick={formik.handleSubmit}>
  <div>
        <span className=' mb-4 block'>Check your email</span>
           <input type="tel" className='inputs w-full'
                onChange={formik.handleChange}
                value={formik.values.resetCode}
                name='resetCode'
                onBlur={formik.handleBlur}
                maxLength="6"
           />
           {formik.errors.resetCode && formik.touched.resetCode ? <div className='bg-red-600 text-white rounded-md  px-5 py-2 w-fit mx-auto mt-2 '>{formik.errors.resetCode}</div> :''}            </div>
           <button className='addBtn mt-5' type='submit' onSubmit={formik.handleSubmit}>Verify</button>
  </form>
  
  
  </>
}
