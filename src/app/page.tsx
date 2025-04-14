'use client'

import { z } from 'zod';
import { ContactSchema } from "@/schemas/contact.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form"
import InputError from '@/components/InputError';
import { ChangeEvent, useState } from 'react';

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
  const {register, handleSubmit, watch, formState: { errors, isValid, isDirty, dirtyFields }, } = useForm({
    resolver: zodResolver(ContactSchema)
  });
  
  const [formIsValid, setFormIsValid] = useState<formIsValidType>({
    firstName: false,
    lastName: false, 
    email: false,
    queryType: false,
    message: false,
    terms: false
  })

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log('Data: ', data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
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
    <section className="w-full bg-green-lighter-custom h-screen grid place-items-center font-display">
      <article className="w-full grid place-items-center px-4">
        <form
          className="w-full max-w-[700px] bg-white px-6 py-8 rounded-2xl grid gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <legend className="mb-5 text-3xl md:text-3xl font-bold text-grey-900-custom">Contact Us</legend>

          <div className="w-full flex flex-col gap-5 md:flex-row">
            <div className="w-full flex flex-col gap-2">
              <label className="block text-grey-900-custom" htmlFor="firstName">First Name</label>
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
              <label className="block text-grey-900-custom" htmlFor="lastName">Last Name</label>
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
            <label className="block text-grey-900-custom" htmlFor="email">Email</label>
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
            <p className="block text-grey-900-custom">Query Type</p>

            <div className="w-full flex flex-col md:flex-row gap-4">
              <div className='w-full flex flex-col md:flex-row items-center gap-4'>
                <div className="w-full border border-grey-500-custom rounded-md py-2.5 px-4 flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="generalSupport" 
                    value="General Enquiry"
                    {...register("queryType")}
                  />
                  <label htmlFor="generalSupport" className="text-grey-900-custom font-medium">General Enquiry</label>
                </div>

                <div className="w-full border border-grey-500-custom rounded-md py-2.5 px-4 flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="supportRequest" 
                    value="Support Request"
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
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              rows={5}
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
                {...register("terms")}
              />
              <label htmlFor="terms" className="text-grey-900-custom">I consent to being contacted by the team</label>
            </div>
            {
              errors.terms?.message && <InputError message={errors.terms?.message} />
            }
          </div>

          <button disabled={!isDirty || !isValid} className="bg-green-medium-custom text-white font-bold py-3 px-6 rounded-md text-center" type="submit">Submit</button>
        
        </form>
      </article>

    </section>
  );
}
