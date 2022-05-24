---
title: "Creating a simple fetch-hook in React"
date: '26/04/2021'
excerpts: "A more efficient way to use the fetch method."
author: 'Samson Okunola'
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/react-hook.webp'
---

Hi guys, I've been very busy getting things done and it feels great to be here again. I don't like reinventing the wheels, I also like doing things my own way so here is a simple hook using `fetch`, which is similar to Axios but a lot more convenient if you ask me. You skip writing the `.then()` and `.catch` over and over again.

## Prerequisites

You need to be familiar with state management and React hooks. I'm going to use this opportunity to explain some of the React hooks.

## React hooks

> Hooks are functions that let you “hook into” React state and lifecycle features from function components.

Hooks provide a better way to build components because we can use stateful logic without changing our component hierarchy. Below are the hooks we are going to be using for this particular fetch hook.

**NB:  Any data that changes in the application is called state**

- `useState`: It is the most important and often used hook. This hook handles reactive data, it takes two arguments - the current state and a function to update the state, which can be called from an event. Whenever the state changes, React re-renders the UI. Example:

```js
const [count, setCount] = useState(0)
```

- `useEffect`: The `useEffect` hook allows us to perform side effects (an action) in the functional components such as updating the DOM, fetching and consuming data from a server API, and setting up a subscription, etc. It may or may not have dependencies that will determine how the hooks perform. Example:

```js
    const [count, setCount] = useState(0)

    //no dependency array
    //this is will run at each re-render and whenever app state changes
    useEffect(() => {
        alert('Hello world')
    })

    //empty dependency array
    //this will run only once at each render
    useEffect(() => {
        alert('Hello world')
    },[])

    //count is a dependency
    //this will run when the 'count' state changes
    useEffect(() => {
        alert('count changed')
    },[count]
```

- `useRef`: this hook allows us to create a mutable object. It is used, when the value keeps changing like in the case of `useState` hook, but the difference is, that it doesn't trigger a re-render when the value changes. The common use case of this is to grab HTML elements from the DOM. Example

```js
import React, { useEffect, useRef, useState } from 'react'

const App = () => {
    const buttonRef = useRef()
    const handleClick = () => buttonRef.current.click()

  return (
    <div>
        <button ref={buttonRef} onChange={handleClick}>
        </button>
    </div>
  )
}
```

- `useCallback`:  returns a memoized(a cached value so that it does not need to be recalculated) callback function. This allows us to isolate resource-intensive functions so that they will not automatically run on every render but rather only runs when one of its dependencies update.

```js
const [count, setCount] = useState(60);

    const showCount = useCallback(() => {
        alert(`Count ${count}`);
    }, [count])

    return <> <SomeChild handler = {showCount} /> </>
```

## Let's write that custom fetch hook

This is the entire code for the custom hook:

```js
//import the needed react hooks
import { useCallback, useEffect, useRef, useState } from "react"

//create the function
export const useFetch = () => {
    //set the state for loading and error
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    
    //this method helps with when a request is cancel so it can stop the function cleanly
    const activeHttpRequests = useRef([])

    //async funcion to fetch data using 'useCallback' so the function is memoized
    const sendRequest = useCallback(
        //parameters for the function are set and fallbacks are provided
        async (url, method = 'GET', body = null, headers = {}) => {

        //loading is set  to true when the request is sent
        setLoading(true)

        //the abort controller method is initialized
        const httpAbortCtrl = new AbortController()
        activeHttpRequests.current.push(httpAbortCtrl)

        try {
            const res = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            })
    
            const data = await res.json()
            
            activeHttpRequests.current = activeHttpRequests.current.filter(
                      reqCtrl => reqCtrl !== httpAbortCtrl)
    
            if(!res.ok) {
                throw new Error(data.message)
            }
            
            setLoading(false)
            return data
        } catch (err) {
            setError(err.message)
            setLoading(false)
            throw err
        }
    },[])

    const clearError = () => {
        setError(null)
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    },[])

    return { loading, error, sendRequest, clearError }
}
```

The hook can be used like so:

```js
import React, { useState } from 'react'

//import custom dependencies
import { useFetch } from './hooks/fetch-hook'
import { LoadingSpinner, Modal } from './components/index'

const App = () => {
  //set states for payload and response
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [data, setData] = useState([])

  //destructure the needed methods from the fetch hook
  const { loading, error, sendRequest, clearError } = useFetch()
  
  //function to handler form submit
  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      //request url, method, payload, header
      const data = await sendRequest('https://apirequesturl.com',
      'POST',
      JSON.stringify({
        name,
        email
      }),
      { 'Content-Type': 'applcation/json' })
      //set state of data to response received
      setData(data)
    } catch (err) {}
  }

  return(
    <>
    {loading && <LoadingSpinner loading={loading}/>}
    {error && <Modal error={error} clearError={clearError} />}
    {data && <Modal message={data.message} />} 
    <h1>Hello Web3</h1>
    <form onSubmit={sendRequest}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type='submit'>submit</button>
    </form>
    </>
  )
}

export default App
```

I hope this article has been helpful to you in some ways. You can create hooks for several things which ranges from setting the state of a particular element of your project throughout your entire app(referred to as context) to managing user inputs. You can check out the official React docs at [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html) on how you can create your own custom hook. Please drop your comments, suggestions, and questions and I'll be glad to respond as soon as possible. Thanks for reading and happy coding.

%[https://www.buymeacoffee.com/pablo_clueless]
