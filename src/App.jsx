import React, { Suspense } from "react"

import './App.css'

import { Routes, Route} from "react-router"

import MyNavbar from './components/MyNavbar';
// import Tweet from '';
const UserRegister = React.lazy(() => import("./pages/userRegister"))
const Tweet = React.lazy(() => import("./pages/tweets")) // dynamic import
const Login = React.lazy(() => import("./pages/login")) // dynamic import

function App() {

  return (
    <>
      <MyNavbar></MyNavbar>
      <Suspense fallback={<div> Loading ...</div>}>
      <Routes>
        <Route path='/' Component={Tweet}></Route>
        <Route path='/register' Component={UserRegister}></Route>
        <Route path='/login' Component={Login}></Route>
        
      </Routes>
      </Suspense>
    </>
  )
}

export default App
