import axios from 'axios'
import React, { useContext, useState } from 'react'
import { UserCart } from '../../Context/CaryContext'
import { user } from '../../Context/UserContext'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import * as yup from "yup"
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

export default function CheckOut() {
    let {State} = useContext(UserCart)
    let {token} = useContext(user)
    let [HandleCheckOut,setHandleCheckOut] = useState(null)
    let router = useNavigate()
    console.log(State);
    
    
  async function CheckNow(values) {
      const toestId = toast.loading("Waiting ...") 
    try {
        const options = {
          url : `https://ecommerce.routemisr.com/api/v1/orders/${State.cartId}`,
          method : "POST",
          headers : {
            token
          },
          data : values
        }
        let {data} = await axios.request(options)
        console.log(data);
        if (data.status === "success") router("/allorders")
        toast.success("Payment process was completed successfully")
    } catch (error) {
      console.log(error);
      toast.error("Payment process was not completed successfully")
    } finally {
        toast.dismiss(toestId)
    }
  } 
  async function CheckNowOnline(values) {
      const toestId = toast.loading("transfering to Strip ...") 
    try {
        const options = {
          url : `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${State.cartId}?url=${location.origin}`,
          method : "POST",
          headers : {
            token
          },
          data : values
        }
        let {data} = await axios.request(options)
        toast.success("transfering process was completed successfully")
        if (data.status === "success") {
          setTimeout (()=>{
            window.open(data.session.url)
          },2000)
        }
    } catch (error) {
      console.log(error);
      toast.error("transfering process was not completed successfully")
    } finally {
        toast.dismiss(toestId)
    }
  } 
  
  const validationSchema = yup.object({
    shippingAddress: yup.object({
      phone: yup.string().required('Phone must be required').matches(/^(010|011|012|015)\d{8}$/, "Mobile phone is not valid"),
      city: yup
      .string()
      .required("City is required")
      .matches(
        /\b(Cairo|Alexandria|Giza|Port Said|Suez|Luxor|Aswan|Asyut|Beheira|Beni Suef|Dakahlia|Damietta|Faiyum|Gharbia|Ismailia|Kafr El Sheikh|Matrouh|Minya|Monufia|New Valley|North Sinai|Qalyubia|Qena|Red Sea|Sharqia|Sohag|South Sinai)\b/i,
        "There is no city with this name in Egypt"
      ),
      details: yup.string().max(200, "* max length is 200").min(10, "* min length is 10")
    })
  });
let formik = useFormik({

  initialValues: {
    shippingAddress: {
      details: "",
      phone: "",
      city: ""
    }
  },
    onSubmit : (values)=>{
            if (HandleCheckOut === false)  CheckNow(values) 
              else {CheckNowOnline(values)}
    },
    validationSchema,
  })


  return <>
    <Helmet>
    <title>Fresh Payment</title>
  </Helmet>
  <section>
    <h2 className='flex items-center text-3xl gap-3 font-bold'><i className="fa-solid fa-basket-shopping text-vip"></i> Payment</h2>


    <form className='mt-10 flex flex-col gap-5' onSubmit={formik.handleSubmit}>

        <div>
            <span className=''>Details</span>
       <input type="text" className='inputs w-full'
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.details}
            name='shippingAddress.details'
            onBlur={formik.handleBlur}
       />
       </div>
 
{formik.errors.shippingAddress?.details && formik.touched.shippingAddress?.details ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 rounded-md '>{formik.errors.shippingAddress?.details}</div> :''}      

<div>
            <span className=''>Phone</span>
       <input type="tel" className='inputs w-full'
            onChange={formik.handleChange}
            value={formik.values.shippingAddress.phone}
            name='shippingAddress.phone'
            onBlur={formik.handleBlur}
       />
       </div>
       {formik.errors.shippingAddress?.phone && formik.touched.shippingAddress?.phone ?<div className='bg-red-600 text-white  px-5 py-2 w-fit mx-auto mt-2 rounded-md '>{formik.errors.shippingAddress?.phone}</div> :''}      

<div>
  <span className="">City</span>
  <select
    className="inputs w-full"
    name="shippingAddress.city"
    value={formik.values.shippingAddress.city}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  >
    <option value="" disabled>
      Select your city
    </option>
    <option value="Cairo">Cairo</option>
    <option value="Alexandria">Alexandria</option>
    <option value="Giza">Giza</option>
    <option value="Port Said">Port Said</option>
    <option value="Suez">Suez</option>
    <option value="Luxor">Luxor</option>
    <option value="Aswan">Aswan</option>
    <option value="Asyut">Asyut</option>
    <option value="Beheira">Beheira</option>
    <option value="Beni Suef">Beni Suef</option>
    <option value="Dakahlia">Dakahlia</option>
    <option value="Damietta">Damietta</option>
    <option value="Faiyum">Faiyum</option>
    <option value="Gharbia">Gharbia</option>
    <option value="Ismailia">Ismailia</option>
    <option value="Kafr El Sheikh">Kafr El Sheikh</option>
    <option value="Matrouh">Matrouh</option>
    <option value="Minya">Minya</option>
    <option value="Monufia">Monufia</option>
    <option value="New Valley">New Valley</option>
    <option value="North Sinai">North Sinai</option>
    <option value="Qalyubia">Qalyubia</option>
    <option value="Qena">Qena</option>
    <option value="Red Sea">Red Sea</option>
    <option value="Sharqia">Sharqia</option>
    <option value="Sohag">Sohag</option>
    <option value="South Sinai">South Sinai</option>
  </select>
  {formik.errors.shippingAddress?.city && formik.touched.shippingAddress?.city ? (
    <div className="bg-red-600 text-white px-5 py-2 w-fit mx-auto mt-2 rounded-md">
      {formik.errors.shippingAddress?.city}
    </div>
  ) : null}
</div>

    <div className=' flex gap-5'>
    <button className='addBtn ' type='submit' onClick={()=>{setHandleCheckOut(true)}}>Pay Online</button>
    <button className='addBtn' type='submit' onClick={()=>{setHandleCheckOut(false)}}>Pay Now</button>

    </div>
         
    </form>
  </section>

</>
}
