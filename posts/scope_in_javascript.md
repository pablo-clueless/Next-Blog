---
title: 'Scope in JavaScript'
date: 'Nov 29 2021'
excerpts: 'A concise article on Scope and how it affects your code.'
author: 'Samson Okunola'
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/scope.jpg'
---
For those of us who are beginners in JavaScript, we might find that we sometimes try access some variables or work through some functions but your code is not working. Sometimes, it may be a typo but most times, it's because you're calling a function where it is inaccessible.

## Prerequisite

Knowledge of declaring and initializing variables in JavaScript.

## Summary

At the end of this article, we should:

- know how scope works,
- know what kind of scope we have in any given variable,
- know how to use variables to reduce errors.

## What is Scope

Scope in JavaScript refers to the current context of code, which determines the accessibility of variables to JavaScript. According to MDN:

> Scope is the current context of execution. The context in which values and expressions are "visible" or can be referenced. If a variable or other expression is not "in the current scope," then it is unavailable for use. Scopes can also be layered in a hierarchy, so that child scopes have access to parent scopes, but not vice versa.

Which simply means a scope is a given area of code in which a variable is available for use and that variables in higher level are accessible to objects in the lower level but variables in the lower level are not accessible in the higher level. To demonstrate:

```js
function one(){
   let x = 2
//x is accessible here
   console.log(x)
}
//this will cause an error when the function is called
console.log(x)
```

The 3 types of scope are:

- Global scope are those declared outside of a block.
- Local scope are those declared inside of a block.
- Block scope which was added in ECMAScript 2015(ES6).

### Global Scope

Variables declared Globally (outside any function) have Global Scope. Global variables can be accessed from anywhere in a JavaScript program. Variables declared with var, let and const are quite similar when declared outside a block except const which is immutable.

```js
var userName = "Bruce"
function modifyUsername(){
   userName = "Wayne"
}

function showUsername(){
   alert(userName)
}

//this will show Bruce
alert(userName)

modifyUsername()
//this will show Wayne
showUsername()
```

The userName variable is available throughout the entire script and can be modified so it is has a global scope. The first alert shows Bruce but once modifyUsername has been called the alert shows Wayne. There is a gimmick though - if you assign a value to a variable that has not been declared, it will automatically become a GLOBAL variable. Example:

```js
function createUsername(){
   userName = "Bruce"
}

function modifyUserName() {
   if(userName)
      userName = "Bruce"
}

function showUserName() {
   alert(userName)
}

createUserName()
showUserName() // Bruce

modifyUserName();
showUserName() // Wayne
```

### Local Variables

Variables declared inside any function with var keyword are called local variables. Local variables cannot be accessed or modified outside the function declaration.

```js
function createUsername(){
   var userName = “Bruce”
   console.log(userName)
}

function showUsername(){
   alert(userName)
}

//logs Bruce to the console
createUsername()
//throws an error that "userName" has not been declared
showUsername()
```

In the above example, `userName` is local to `createUserName()` function. It cannot be accessed in `showUserName()` function or any other functions. It will throw an error if you try to access a variable which is not in the local or global scope. JavaScript has an error handling method, called “try catch block” (I'm going to write about it soon), which is good for handling error like this. A jig with local variables is that if local variable and global variable have same name, changing value of one variable does not affect on the value of another variable. Example:

```js
var userName = "Bruce"

function ShowUserName(){
   var userName = "Wayne"
   console.log(userName)
}

//this logs “Wayne” to the console
ShowUserName()
//this logs “Bruce” to the console
console.log(userName)
```

### Block Scope

Before ES6 (2015), JavaScript had only Global Scope and Function Scope. ES6 introduced two important new JavaScript keywords: `let` and `const`. These two keywords provide Block Scope in JavaScript. Variables declared inside a { } block cannot be accessed from outside the block. Like so:

```js
{
  let userName = “Bruce”
  //this logs “Bruce” to the console
  console.log(UserName)
}
//this throws an error
console.log(userName)
```

But,

```js
{ 
   var userName = “Bruce”
   console.log(userName)
}
//this is valid and logs “Bruce” to the console
console.log(userName)
```

This is because only `let` and `const` create block level scope and variables declared using them are inaccessible outside the block.

One more thing to note is that a function serves as a closure in JavaScript, and consequently creates a scope. So, when a variable is defined exclusively within a function, it cannot be accessed from outside the function or within other functions. Like so:

```js
function createUsername(){
   var userName = “Bruce”
   console.log(userName)
}
//this logs "Bruce" to the console
createUsername()
//this throws an error
console.log(userName)
```

## Conclusion

DO NOT create global variables unless you intend to.

Your global variables (or functions) can overwrite window variables (or functions). Any function, including the window object, can overwrite your global variables and functions.

Hope you had fun reading this and my advice evrytime is that practicing is the best form of learning. Keep coding, keep making mistakes and keep learning from them. Mistakes are made s we can learn from them and we know not to make them again. Please leave your review, comments, questions and suggestions, and I will be glad to respond to them as soon as possible. Thanks for reading.
