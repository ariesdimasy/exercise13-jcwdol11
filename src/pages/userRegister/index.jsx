import { useEffect } from "react";

import {
  Button,
  Center,
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  useToast
} from "@chakra-ui/react";

import { useDispatch } from "react-redux";
import { addUser } from "../../app/features/user/userSlice";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";

import style from "./index.module.css"

const UserSchema = Yup.object().shape({
  name:Yup.string().required().min(5),
  username:Yup.string().required().min(6),
  email:Yup.string().required().email(),
  password:Yup.string().required(),
  password_confirm:Yup.string().required()
  .oneOf([Yup.ref('password')], 'Your passwords do not match.')
})

export default function UserRegister() {

  const dispatch = useDispatch()
  const toast = useToast()
  let navigate = useNavigate();

  useEffect(() => {

  },[])

  return (
    <div>
      <Container maxW='container.lg'>
        <Center>
          <Heading margin={"20px 0"} as={"h3"}> User Register </Heading>
        </Center>
        <Formik
          initialValues={{
            name:"",
            username:"",
            email:"",
            password:"",
            password_confirm:""
          }}
          onSubmit={(values) => {
            
              dispatch(addUser({
                name:values.name,
                username:values.username,
                email:values.email,
                password:values.password,
              }))
              toast({
                title: 'Account created.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })

              values.name = ""
              values.username = ""
              values.email = ""
              values.password = ""
              values.password_confirm = ""

              navigate("/login")

          }}
          validationSchema={UserSchema}

        >
          {({ values, handleChange, handleBlur, errors }) => (<Form>
            <FormControl className={style['form-control']}>
              <FormLabel> Name </FormLabel>
              <Input border={errors.name && "1px red solid" } type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name}></Input>
              <ErrorMessage component={"div"} name="name" style={{color:'red'}}></ErrorMessage>
             
            </FormControl>
            <FormControl className={style['form-control']}>
              <FormLabel> Username </FormLabel>
              <Input border={errors.username && "1px red solid" } type="text" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username}></Input>
              <ErrorMessage component={"div"} name="username" style={{color:'red'}}></ErrorMessage>
              
            </FormControl>
            <FormControl className={style['form-control']}>
              <FormLabel> Email </FormLabel>
              <Input border={errors.email && "1px red solid" }  type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email}></Input>
              <ErrorMessage component={"div"} name="email" style={{color:'red'}}></ErrorMessage>
            </FormControl>
            <FormControl className={style['form-control']}>
              <FormLabel> Password </FormLabel>
              <Input border={errors.password && "1px red solid" } type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password}></Input>
              <ErrorMessage component={"div"} name="password" style={{color:'red'}}></ErrorMessage>
            </FormControl>
            <FormControl className={style['form-control']}>
              <FormLabel> Password Confirm </FormLabel>
              <Input border={errors.password_confirm && "1px red solid" } type="password" name="password_confirm" onChange={handleChange} onBlur={handleBlur} value={values.password_confirm}></Input>
              <ErrorMessage component={"div"} name="password_confirm" style={{color:'red'}}></ErrorMessage>
            </FormControl>
            <Button type="submit" bgColor={"#1D5D9B"} color={"white"} > Submit </Button>
          </Form>)}
        </Formik>
      </Container>
    </div>
  );
}
