'use client'

import { z } from 'zod';
import { ContactSchema } from "@/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form"
import InputError from '@/components/InputError';
import { ChangeEvent, useEffect, useState } from 'react';
import ToastComp from '@/components/ToastComp';

type Inputs = z.input<typeof ContactSchema>;
type formIsValidType = {
  message: boolean;
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  queryType: boolean;
  terms: boolean;
}

export default function Home() {
  const {register, handleSubmit, watch, reset, formState: { errors, isSubmitSuccessful }, } = useForm({
    resolver: zodResolver(ContactSchema)
  });
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  
  const [formIsValid, setFormIsValid] = useState<formIsValidType>({
    firstName: false,
    lastName: false, 
    email: false,
    queryType: false,
    message: false,
    terms: false
  })

  useEffect(() => {
    reset({
      firstName: '',
      lastName: '', 
      email: '',
      queryType: '',
      message: '',
      terms: false
    })
  }, [isSubmitSuccessful, reset])
  
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Mostrar el toast
    setToastMessage("Thanks for completing the form. We'll be in touch soon!");
    setShowToast(true);
    console.log(data);
  }

  const handleChange = () => {
    if (!errors.email?.message && watch().email !== "") {
      setFormIsValid({
        ...formIsValid,
        email: true
      })
    } else {
      setFormIsValid({
        ...formIsValid,
        email: false
      })
    }
  } 

  return (
    <section className="w-full bg-green-lighter-custom min-h-screen grid place-items-center font-display">

      <article className="relative w-full grid place-items-center px-4 mt-10 mb-10">
      <ToastComp
        showMessage={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
        <form
          className="w-full max-w-[700px] bg-white px-6 py-8 rounded-2xl grid gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <legend className="mb-5 text-3xl md:text-3xl font-bold text-grey-900-custom">Contact Us</legend>

          <div className="w-full flex flex-col gap-5 md:flex-row">
            <div className="w-full flex flex-col gap-2">
              <label className="block text-grey-900-custom after:ml-0.5 after:text-green-medium-custom after:content-['*']" htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                className={`${errors.firstName?.message ? 'border-red-custom' : ''} bg-white border border-grey-500-custom rounded-md py-2.5 px-4 outline-0`}
                {...register("firstName", { required: true })}
              />
            {
              errors.firstName?.message && <InputError message={errors.firstName?.message} />
            }
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="block text-grey-900-custom after:ml-0.5 after:text-green-medium-custom after:content-['*']" htmlFor="lastName">Last Name</label>
              <input
                type="text" 
                id="lastName"
                className={`${errors.lastName?.message ? 'border-red-custom' : ''} bg-white border border-grey-500-custom rounded-md py-2.5 px-4 outline-0`}
                {...register("lastName", { required: true })}
              />
                          {
              errors.lastName?.message && <InputError message={errors.lastName?.message} />
            }
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
            <label className="block text-grey-900-custom after:ml-0.5 after:text-green-medium-custom after:content-['*']" htmlFor="email">Email</label>
            <input
              type="email" 
              id="email"
              className={`${errors.email?.message && 'border-red-custom'} ${formIsValid.email && 'border-green-medium-custom'} bg-white border border-grey-500-custom rounded-md py-2.5 px-4 outline-0`}
              {...register("email", { required: true })}
              onBlur={handleChange}
            />
                        {
              errors.email?.message && <InputError message={errors.email?.message} />
            }
          </div>

          <fieldset className="w-full flex flex-col gap-2">
            <p className="block text-grey-900-custom after:ml-0.5 after:text-green-medium-custom after:content-['*']">Query Type</p>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className='w-full flex flex-col md:flex-row items-center gap-4'>
                <div className="has-checked:bg-green-lighter-custom w-full border border-grey-500-custom rounded-md py-2.5 px-4 flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="generalSupport" 
                    value="General Enquiry"
                    className='w-5 h-5 accent-green-medium-custom checked:ring checked:ring-green-medium-custom'
                    {...register("queryType")}
                  />
                  <label htmlFor="generalSupport" className="text-grey-900-custom font-medium">General Enquiry</label>
                </div>

                <div className="has-checked:bg-green-lighter-custom w-full border border-grey-500-custom rounded-md py-2.5 px-4 flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="supportRequest" 
                    value="Support Request"
                    className='w-5 h-5 accent-green-medium-custom checked:ring checked:ring-green-medium-custom'
                    {...register("queryType")}
                  />
                  <label htmlFor="supportRequest" className="text-grey-900-custom font-medium">Support Request</label>
                </div>
              </div>


            </div>
            {
              errors.queryType?.message && <InputError message={errors.queryType?.message} />
            }
          </fieldset>

          <div className="w-full flex flex-col gap-2">
            <label className="after:ml-0.5 after:text-green-medium-custom after:content-['*']" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={4}
              className={`${errors.message?.message ? 'border-red-custom' : ''} bg-white border border-grey-500-custom rounded-md py-2.5 px-4 outline-0`}
              {...register("message")}
            ></textarea>
            {
              errors.message?.message && <InputError message={errors.message?.message} />
            }
          </div>

          <div className="w-full flex-col gap-2 items-center">
            <div className="w-full flex gap-2 items-center">
              <input 
                type="checkbox" 
                id="terms"
                className='w-4 h-4 accent-green-medium-custom'
                {...register("terms")}
              />
              <label htmlFor="terms" className="text-grey-900-custom after:ml-0.5 after:text-green-medium-custom after:content-['*']">I consent to being contacted by the team</label>
            </div>
            {
              errors.terms?.message && <InputError message={errors.terms?.message} />
            }
          </div>

          <button className="bg-green-medium-custom text-white font-bold py-3 px-6 rounded-md text-center" type="submit">Submit</button>
        
        </form>
      </article>

    </section>
  );
}
