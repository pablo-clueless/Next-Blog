---
title: "Callback Functions"
date: '20/12/2021'
excerpts: "The what, how, why and when of callback function."
author: 'Samson Okunola'
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/callback.png'
---
If you've been a while in JavaScript, you definitely know what a function is and how it is used. Well callback functions are an important part of JavaScript and knowing them is a plus for you. You might have even been using them without knowing. Let's see what this ruckus is about.

![callbacks](/images/inline/callbacks.jpg)

## What is a Callback Function?

From my favorite source, MDN:

> A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.

So, a callback function is only executed when certain conditions are met.

Let's break it down: since functions are objects, and objects can be passed into other objects and objects can be passed as parameters into functions. So, it makes sense that we can pass a function into another. And it important to note that callbacks can be synchronous or asynchronous. Here's an example:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const isEvenNumber = num => num % 2 === 0

const evenNumber = numbers.filter(isEvenNumber)

console.log(evenNumber)
   
```

In the above example, `isEvenNumber` is passed as a callback funtion into the `filter` function. Callbacks are used when we want one function to be executed only after another is executed. Here is another popular example:

```js
const reload_button = document.querySelector('#reload-button')

reload_button.addEventListener('click', () => {
    window.location.reload()
})

//some might write their code like this

reload_button.addEventListener('click', reloadPage)

const reloadPage = () => {
  window.location.reload()
}
```

When we pass a function to an event listener, we use a callback that makes the function executable under certain conditions, and in this case, when the button is clicked.

Now we have an understanding of what callbacks are, let's see how to use them *synchronously* and *asynchronously*.

## Synchronous Callback Function

If a piece of code runs sequentially from top to bottom, it is synchronous. The above example where we checked for even numbers is synchronous.

In the following example, the arrow function is a callback used in a synchronous function.

The `sort()` method completes first before the console.log() executes:

```js
const anotherSetOfNumbers = [10, 4, 5, 1, 9, 2, 7, 3, 6, 8]

const sortedArray = anotherSetOfNumbers.sort((a, b) => a - b)

console.log(sortedArray)
```

## Asynchronous Callback Function

When we say something is *asynchronous* in JavaScript, it means that JavaScript has to wait for an operation to complete, it will execute the rest of the code while waiting.

It is noteworthy to know that JavaScript is a single-threaded programming language. It carries asynchronous operations via the callback queue and event loop.(See more [here](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing#the_event_queue))

Let's say we want to download a file from a remote server to our machine, and we want our program to do something after downloading that file, we could try something like this:

```js
const downloadFile = (url) => {
   //code to download file
   console.log(`downloading from ${url}`)
}

const processFile = (file) => {
   //code to process file
   console.log(`processing file ${file}`)
}

le

downloadFile(url)
processFile(file)
```

In the code above, an error is bound to occur because we didn't factor in time to download the file depending on the file size and network strength. So we're going to get the result of the `processFile` function before the actual download completes which will lead to an error since the `processFile` function will have nothing to work with. We could use an inbuilt function called `setTimeout` to set a waiting period for the `downloadFile` function to simulate the downloading period like so:

```js
const downloadFile = (url) => {
    setTimeout(() => {
        // code to download file
   console.log(`downloading from ${url}`)
   }, 3000)
}

const processFile = (file) => {
   //code to process file
   console.log(`processing file ${file}`)
}

downloadFile(url)
processFile(file)
```

The above example will still bring same result the first one as the browser will keep the `downloadFile` function in the event loop and execute `proessFile`. Definitely not the result we wanted. So, how do we handle it so that `processFile` only runs when `downloadFile`is done executing? We could pass `processFile` as a callback function into `downloadFile` like so:

```js
const downloadFile = (url, callback) => {
    setTimeout(() => {
        // code to download file
   console.log(`downloading from ${url}`)
   callback(url)
   }, 3000)
}

const processFile = (file) => {
   //code to process file
   console.log(`processing file ${file}`)
}

downloadFile(url, processFile )
```

Now, it works as expected. In this example, the `processFile()` is a callback passed into an asynchronous function. When you use callbacks to continue code execution after asynchronous operations, these callbacks are called asynchronous callbacks. By using asynchronous callbacks, you can register an action in advance without blocking the entire operation.

### Anonymous and Arrow Functions

We could make our code cleaner nd more readable by using either an anonymous function or an arrow function. Let's try to clean up the code above.

```js
const downloadFile = (url) => {
    setTimeout(() => {
        // code to download file
   console.log(`downloading from ${url}`)
   callback(url)
   }, 3000)
}

//using an anonymous function
downloadFile(url, function (file) {
   //code to process file
   console.log(`processing file ${file}`)
})

//using an arrow function
downloadFile(url, (file) => {
   //code to process file
   console.log(`processing file ${file]`0
})
```

### Nesting Callbacks and Callback Hell

![callback hell](/images/inline/callback_hell.jpg)

As much as callbacks are useful, they can become a breeding ground for bugs, isn't well scalable as the program becomes more complex and hard to maintain. If you try to deal with multiple files at once, you might want to this:

```js
let url1 = 'http://localhost:3001'
let url2 = 'http://localhost:3002'
let url3 = 'http://localhost:3003'

downoladFile(url1, function(file) {
    setTimeout(() => {
        console.log(`anonymous function ${file}`)
    }, 4000)
    downoladFile(url2, function(file) {
        setTimeout(() => {
            console.log(`anonymous function ${file}`)
        }, 4000)
    })
        downoladFile(url3, function(file) {
            setTimeout(() => {
                console.log(`anonymous function ${file}`)
            }, 4000)
        })
    
})

```

It will work perfectly but it becomes harder to maintain and scale. And it leads to what is known as **callback hell** or **pyramid of doom**. There are newer methods like `async & await` and `promises`  that can be used to handle bigger programs.

## Summary

At this point, we should be able to:

- define what a callback function is
- identify a callback function
- use a callback and most importantly,
- avoid a callback hell

## Conclusion

Take time out to practice, and also rest. I've been under the weather hence the delay in my article. Take time out to be with your loved ones, do something else you love other than coding, relax properly and recuperate for the new year.

Please leave your reviews, comments, questions and suggestion, it is very appreciated and I'll try as much as possible to reply to them ASAP. Thanks for reading and happy holidays.
