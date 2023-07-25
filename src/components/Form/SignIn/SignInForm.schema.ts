import * as yup from 'yup'

export const signInFormSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('The email field cannot be empty'),
  password: yup.string().required('The password field cannot be empty'),
  rememberMe: yup.boolean().default(false)
})

export type SignInFormValue = yup.InferType<typeof signInFormSchema>
