import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
export default function SignUp() {
    let navigate = useNavigate()


    async function Register(values) {
        let id;
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
                method:"POST",
                data: values,
            }
             id = toast.loading('waiting...')
            const {data} = await axios.request(options)
            toast.dismiss(id)
            toast.success("Account Has been Created")
            setTimeout (()=>{
                if (data?.message === "success") {
                    navigate("/auth/Login")
                }
            },2000)
        } catch (error) {
            toast.dismiss(id)
            toast.error("Account Already Exists")
        }
    }

    let validationSchema = yup.object({
        name: yup.string().required('name must be required').min(3,'min length is 3').max(20,'max length is 20'),
        email: yup.string().required('email must be required').email(),
        password:yup.string().required('password must be required').matches(/^[A-Z][A-Za-z0-9@#$%^&*!]{5,}$/,"Password should be start with capital letter and min length is 7 chars "),
        rePassword:yup.string().required('rePassword must be required').oneOf([yup.ref('password')],"rePassword and Password should be same"),
        phone : yup.string().required('phone must be required').matches(/^(010|011|012|015)\d{8}$/,"mobile phone is not valid")
    })
    let formik = useFormik({
        initialValues: {
            name: "",
            email:"",
            password:"",
            rePassword:"",
            phone:""
        },

        onSubmit : Register,
        validationSchema,
    })

    return <>
          <Helmet>
  <title>Fresh Sign Up</title>
  </Helmet>
      <section>
        <h2 className='flex items-center text-3xl gap-3 font-bold'><i className="fa-solid fa-id-card text-vip "></i> Register</h2>


        <form className='mt-10 flex flex-col gap-5' onSubmit={formik.handleSubmit}>
            <div>
                <span className=''>userName</span>
           <input type="text" className='inputs w-full'
           onChange={formik.handleChange}
           value={formik.values.name}
           name='name'
           onBlur={formik.touched.name}
           />
           {formik.errors.name && formik.touched.name ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 rounded-md capitalize'>{formik.errors.name}</div> :''}            </div>
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
            <div>
                <span className=''>rePassword</span>
           <input type="password" className='inputs w-full'
                onChange={formik.handleChange}
                value={formik.values.rePassword}
                name='rePassword'
                onBlur={formik.touched.rePassword}
           />
           {formik.errors.rePassword && formik.touched.rePassword ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 '>{formik.errors.rePassword}</div> :''}            </div>
            <div>
                <span className=''>phone</span>
           <input type="tel" className='inputs w-full'
                onChange={formik.handleChange}
                value={formik.values.phone}
                name='phone'
                onBlur={formik.touched.phone}
           />
           {formik.errors.phone && formik.touched.phone ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 '>{formik.errors.phone}</div> :''}
            </div>

        <button className='addBtn' type='submit'>Sign Up</button>
             
        </form>
      </section>
  
    </>
}
