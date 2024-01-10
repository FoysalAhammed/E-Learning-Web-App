'use client'
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import React,{FC, useEffect, useState} from 'react'
import Loader from '../Leader/Loader'
import Heading from '@/app/utils/Heading'
import Header from '../Header'
import Footer from '../Route/Footer'
import CourseDetails from "./CourseDetails"
import { useCreatePaymentIntentMutation, useGetStripePublishablekeyQuery } from '@/redux/features/orders/orderApi'
import { loadStripe } from '@stripe/stripe-js'
type Props = {
    id:string
}

const CourseDetailsPage:FC<Props> = ({id}) => {
    const [route,setRoute] = useState("Login")
    const [open,setOpen] = useState(false)
    const {data,isLoading} = useGetCourseDetailsQuery(id);
    const {data:config} = useGetStripePublishablekeyQuery({});
    const [createPaymentIntent,{data:paymentIntentdata} ]= useCreatePaymentIntentMutation()
    const [stripePromise,setStripePromise] = useState<any>(null);
    const [clientSecret,setClientSecret] = useState('');
  
    useEffect(() => {
      if (config) {
        const publishableKey = config?.publishableKey
        
        setStripePromise(loadStripe(publishableKey))
      }
      if (data) {
         const amount = Math.round(data.course.price*100)
         createPaymentIntent(amount)
      }
    }, [config,data])

    useEffect(() => {
       if (paymentIntentdata) {
        setClientSecret(paymentIntentdata?.client_secret)
  
        
       }
    }, [paymentIntentdata])

    
    
  return (
    <>
        {
            isLoading ? (
                <Loader/>
            ):(
                <div>
                    <Heading title={data.course.name + "- ElarningBd"} description='ELearningBd is a study community which is developed by foysal for helping the student' keyword={data?.course?.tags} />
                 <Header route={route} setRoute={setRoute} open={open}  setOpen={setOpen} activeItem={1}/>
                 {
                    stripePromise && (
                        <CourseDetails
                        data={data.course}
                        stripePromise={stripePromise}
                        clientSecret={clientSecret}
                       
                        setRoute={setRoute} 
        
                        setOpen={setOpen} 
                       />
                    )
                 }
                 <Footer/>
              </div>
            )
        }
    </>
  )
}

export default CourseDetailsPage