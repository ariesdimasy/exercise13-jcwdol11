import { useState, useEffect } from "react"

import { Button, Heading, Card, CardHeader, CardBody, CardFooter, Badge } from "@chakra-ui/react"
import { ArrowUpIcon } from "@chakra-ui/icons"

import { deleteLikeCount, likeTweet } from "../../app/features/tweet/tweetSlice"

export default function Index({ style, item, key }) {

    return (<Card key={key} className={style['tweet-card']}>
                <CardHeader backgroundColor={"#1D5D9B"} color={"white"}>
                  <Heading as='h4' fontSize={'18px'}>{item.name}</Heading>
                </CardHeader>
                <CardBody>
                 {JSON.stringify(item?.id)} . {item.tweet}
                
                </CardBody>
                <CardFooter
                  justify='end'
                  flexWrap='wrap'
                  borderTop={"1px solid grey"}
                  padding={"-10px 0"}
                  sx={{
                    '& > button': {
                      minW: '50px',
                    },
                  }}
                >
                  
                  <Button onClick={() => {
                   
                  }} variant='ghost' leftIcon={<ArrowUpIcon />}>
                    <Badge variant={"solid"}>{item?.like || 0}</Badge> {" "}Like
                  </Button>
                
                </CardFooter>
              </Card>)
}