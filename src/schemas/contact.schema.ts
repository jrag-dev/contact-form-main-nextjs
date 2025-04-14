import { z } from 'zod';


export const ContactSchema = z.object(
  {
    firstName: z.string().nonempty({ message: 'This field is required'}),
    lastName: z.string().nonempty({ message: 'This field is required'}),
    email: z.string().email({ message: 'Please enter a valid email address'}),
    queryType: z.string({ message: 'Please select a query type'}),
    message: z.string({ message: 'Please select a query type'}).nonempty({ message: 'This field is required'}),
    terms: z.boolean().refine(value => value === true, { message: 'To submit this form, please consent to being contacted'})
  }
)