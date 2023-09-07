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
import { loginUser } from "../../app/features/user/userSlice";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup"

import { useNavigate } from "react-router-dom";

import style from "./index.module.css"

const UserSchema = Yup.object().shape({
  username:Yup.string().required().min(6),
  password:Yup.string().required(),
 
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
          <Heading margin={"20px 0"} as={"h3"}> Login </Heading>
        </Center>
        <Formik
          initialValues={{
          
            username:"",
            password:"",
           
          }}
          onSubmit={(values) => {
            
              dispatch(loginUser({
                username:values.username,
                password:values.password,
              }))
              
              toast({
                title: 'Login Success.',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:'top'
              })

              navigate("/")
            
          }}
          validationSchema={UserSchema}

        >
          {({ values, handleChange, handleBlur, errors }) => (<Form>
          
            <FormControl className={style['form-control']}>
              <FormLabel> Username / Email</FormLabel>
              <Input border={errors.username && "1px red solid" } type="text" name="username" onChange={handleChange} onBlur={handleBlur} value={values.username}></Input>
              <ErrorMessage component={"div"} name="username" style={{color:'red'}}></ErrorMessage>
            </FormControl>
            <FormControl className={style['form-control']}>
              <FormLabel> Password </FormLabel>
              <Input border={errors.password && "1px red solid" } type="password" name="password" onChange={handleChange} onBlur={handleBlur} value={values.password}></Input>
              <ErrorMessage component={"div"} name="password" style={{color:'red'}}></ErrorMessage>
            </FormControl>
            <Button type="submit" bgColor={"#1D5D9B"} color={"white"} > Submit </Button>
          </Form>)}
        </Formik>
      </Container>
    </div>
  );
}
