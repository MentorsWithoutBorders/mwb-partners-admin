import * as yup from 'yup'

export const signUpFormSchema = yup.object({
  name: yup.string().required('The name field cannot be empty'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('The email field cannot be empty'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('The password field cannot be empty'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm password must match password')
    .required('The confirm password field cannot be empty')
})

export type SignUpFormValue = yup.InferType<typeof signUpFormSchema>
