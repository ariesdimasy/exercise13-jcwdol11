import { useEffect } from "react";
import { fetchTweets, postTweet, getLikeCount } from "../../app/features/tweet/tweetSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Center, 
  Container, Heading ,Flex, FormControl, FormLabel,  Input,
  Textarea } from "@chakra-ui/react";
import TweetCard from "./../../components/TweetCard"
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup"
import style from "./index.module.css"

const PostSchema = Yup.object().shape({
  user_id:Yup.number().required("you must login to tweet"),
  tweet:Yup.string().required().min(5).max(50)
})

const userLogin = JSON.parse(localStorage.getItem("userLogin"))

export default function Index() {

  const dispatch = useDispatch()
  const tweets = useSelector((state) => state.tweet.tweetList)

  useEffect(() => {
    dispatch(fetchTweets({
      _limit:10,
      _sort:'id',
      _order:'desc'
    }))
    dispatch(getLikeCount())
  },[])

  return (
    <>
      <Container maxW='container.lg'>
        <Flex alignContent={"center"} justifyContent={"center"} w={"100%"}>
          <Box w={"25%"}>
           
          </Box>
          <Box w={"60%"}>
            <Center>
              <Heading as='h3' margin={"20px 0"}> Tweet </Heading>
            </Center>
            <Formik
              initialValues={{
                user_id:  userLogin?.id || null,
                name: userLogin?.name || "",
                tweet:""
              }}
              onSubmit={(values) => {
                
                dispatch(postTweet({
                  tweet:values.tweet,
                  "user_id": values.user_id,
                  "name": values.name,
                }))

                dispatch(fetchTweets({
                  _limit:10,
                  _sort:'id',
                  _order:'desc'
                }))

                values.tweet = ""
                
              }}
              
              validationSchema={PostSchema}
            >
              {({values, handleChange, handleBlur }) => (<Form>
                <FormControl>
                  <FormLabel> Tweet: </FormLabel>
                  <Input type={'hidden'} name="user_id" value={values.user_id} />
                  <ErrorMessage name="user_id"  component={"div"} style={{color:'red'}} />
                  <Textarea name="tweet" onChange={handleChange} onBlur={handleBlur}  ></Textarea>
                  <ErrorMessage name="tweet" component={"div"} style={{color:'red'}}  />
                  <div>{values.tweet.length} / 50</div>
                  <Flex justifyContent={"end"}>
                    <Button type='submit'> Submit </Button>
                  </Flex>
                </FormControl>
              </Form>)}
            
            </Formik>
            <Box >
              {tweets?.map((item, index) => (
                <TweetCard key={index} item={item} style={style} />
              ))}
              <Button width={"100%"}> Load More ... </Button>
            </Box>
          </Box>
          <Box width={"25%"} >

          </Box>
        </Flex>
      </Container>
    </>
  );
}
