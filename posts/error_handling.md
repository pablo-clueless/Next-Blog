---
title: "Error Handling in JavaScript"
date: 'Dec 13 2021'
excerpts: 'Handling errors using the "try..
catch" block.'
author: 'Samson Okunola'
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/error_handling.png'
---
Errors are inevitable when executing codes. Different errors will occur for different reasons - typos, bad network connection, invalid user inputs and so on. We can't control all variables in our app but we can control our app's response to them. We will learn how to handle errors in this article.

## Prerequisite

-----------------------------------------------------------------------------------------

## What is an Error??

Errors are statements that don't let the program run properly. They could be syntax error, runtime error, input error etc. Not to be confused with the `Error` object which is thrown to halt a program when our scripts encounter an error. Basically, an `Error` object is thrown when our scripts encounter errors in our program. You can create an `Error` object like so:

```js
const err = new Error("Something went wrong")
```

The `new` keyword can be omitted.

## The "try...catch" block

The `try...catch` block has 2 main blocks: the `try` and then `catch`.

```js
try{
   //some logic here...
} catch (err) {
   //what to do if it goes wrong
   }
```

Basically, the code in `try{...}` is executed. If there were no errors, then `catch(err)` is ignored: the execution reaches the end of try and goes on, skipping catch. If an error occurs, then the try execution is stopped, and control flows to the beginning of catch `(err)`. The `err` variable (we can use any name for it) will contain an error object with details about what happened.

### `try...catch` works on runtime errors

It is important to note that `try...catch`` only works for runtime errors, the code must be runnable. In other words, it should be valid JavaScript. So, it won’t work if the code is syntactically wrong:

```js
try {
   function doWork(work) {
         alert(`i am doing ${work}`)
} catch (err) {
         alert(`Error`: ${err.message})
}
```

The above code won't work because it is missing a curly brace. The JavaScript engine first reads the code, and then runs it. The errors that occur on the reading phase are called “parse-time” errors and are unrecoverable (from inside that code). That’s because the engine can’t understand the code. So, `try...catch` can only handle errors that occur in valid code. Such errors are called “runtime errors” or, sometimes, “exceptions”.

### it works synchronously

If an exception happens in an asynchronous(or scheduled) function, `try...catch` won’t catch it.

```js
try{
   async function () {
         //some logic here...
   }
} catch (err) {
        //error is uncaught
}
```

That’s because the function itself is executed later, when the engine has already left the `try...catch` construct. To catch an exception inside a scheduled function, `try...catch` must be inside that function:

```js
async function () {
   try {
      //await logic here...
   } catch (err) {
      //error is caught
   }
}
```

## The `Error` object

I mentioned an `Error` object which is thrown to halt the program. When an error occurs, JavaScript generates an object containing the details about it. The object is then passed as an argument to catch. Once the `Error` object is created, it has 3 props:

- name: the error's type,
- message: a string with the error message,
- stack: a stack trace of function executions.
From the example above, the `name` of our error is `Error` and the `message` is "something went wrong".

## Using “try…catch”

Let’s use `try...catch` in an asynchronous fetch request:

```js
async function fetchData () {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
        const data = await res.json()
        console.log(data)
    } catch (error) {
        alert(`Error: ${error.message}`)
    }
}

fetchData()
```

This is good way of handling error coming from a fetch request. This way, if an error occurs, the we know what went wrong and can help us debug accordingly. Here we use the `catch` block only to show the message, but we can do much more, we could send a new network request, suggest an alternative to the visitor, send information about the error to a logging facility and so much more. All much better than just dying.

## Throwing custom errors

We could actually throw our own error messages using the `throw` keyword. Throw creates a new `Error` object and is used to unify error handling. Using the fetch example above, we could add the `throw` keyword like so:

```js
async function fetchData () {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')

        if(!res.ok){
            throw new Error("Something went wrong")
        }
        
        const data = await res.json()
        console.log(data)
    } catch (error) {
        alert(`Error: ${error.message}`)
    }
}

fetchData()
```

The `throw` keyword operator generates an `Error` object with the given message, the same way as JavaScript would generate it itself. The execution of try immediately stops and the control flow jumps into catch. Now catch became a single place for all error handling.

## Rethrowing

In the example above we use `try...catch` to handle any given error. What if we wanted to handle a given type of error in a different way from the others? We would just use the "rethrowing" technique. It rules are pretty simple: catch should only process errors that it knows and “rethrow” all others.

What we do is simply catch gets all errors. In the `catch (err) {...}` block we analyze the error object `err`, if we don’t know how to handle it, we do throw `err`.

Usually, we can check the error type using the `instanceof` operator. Let's say we want to throw a custom message for `SyntaxError`, we would do it like so:

```js
doSomething () {
    try {
         //some logic here...
    } catch (error) {
        if(error instanceof SyntaxError) {
          alert(`This is a ${error.name}`)
         } else {
            throw error              //<---line 8
         }
    }
}

doSomething()
```

The error throwing on line 8 from inside `catch` block “falls out” of `try...catch` and can be either caught by an outer `try...catch` construct (if it exists), or it kills the script. So the `catch` block actually handles only errors that it knows how to deal with and “skips” all others.

## `try...catch...finally`

There is one more code clause that is used to make sure something happens at the end of the day, `finally`, and it runs no matter what. It looks like this:

```js
try {
    //try to execute code
} catch (err) {
    //handle errors
} finally {
    //executes always
}
```

The code below is perfect to test it out:

```js
try {
  alert( 'try' )
  if (confirm('Make an error?')){
   }
} catch (err) {
  alert( 'catch' )
} finally {
  alert( 'finally' )
}
```

You see that the `finally` block runs no matter your choice. The `finally` clause is often used when we start doing something and want to finalize it in any case of outcome.

## Summary

- `try...catch` allows is to handle runtime errors. It literally allows to “try” running the code and “catch” errors that may occur in it.
- There may be no `catch` or `finally`, so `try...catch` and `try...finally` are also valid.
- Error objects have following properties: message, name, stack.
- If an error object is not needed, we can omit it by using `catch` instead of `catch (err)`
- We can generate our own errors using the `throw` operator.
- Rethrowing is good to use in error handling as it helps in handling error unknown to the `catch` block.

## Conclusion

Like I always say, practice is everything. If you read docs, articles and watch tutorials videos but you don't practice, you might as well stop. Learn in little chunks and practice what you learn, be consistent about it. Happy holidays to you and keeping coding.

<https://buymeacoffee.com/pablo_clueless>
