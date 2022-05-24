---
title: 'JavaScript Objects'
date: '23/11/2021'
excerpts: 'Introduction to JavaScript Object Syntax for beginners.'
author: 'Samson Okunola'
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/js-objects.png'
---

If you are into web development and JavaScript, you would have heard of the the term *Object-Oriented Programming (OOP)*. **Object-oriented programming** is a programming paradigm built on the concept of objects that contain both data and code to modify the data.  This refers to a way of writing code that allows you to invoke distinct objects from a common object. The common object is usually called a blueprint while the created objects are called instances. Each instance has properties that are not shared with other instances. According to [Mozilla Developers' Network](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS):

> The basic idea of OOP is that we use objects to model real world things that we want to represent inside our programs, and/or provide a simple way to access functionality that would otherwise be hard or impossible to make use of.

We will looking into how to create objects and how they work.

## Prerequisite

This article is assuming you're familiar with data types and initializing variables.

--------------------------------------------------------------------------------------------------

### Objects

Objects are a cornerstone of the JavaScript language. Many built in data types such as errors, regular expressions, and functions are represented as objects in JavaScript. In order to be a successful JavaScript developer, you must have a firm grasp on how objects work. Objects are composite data types which are built from primitives and other objects. An object’s building blocks are commonly referred to as its fields or properties. Properties are used to describe some aspect of an object. For example, a property can describe the length of a list, the color of a dog, or a person’s date of birth.

#### Some benefits of object-oriented programming

- OOP is faster and easier to execute
- OOP provides a clear structure for the programs
- OOP helps to keep the Java code DRY "Don't Repeat Yourself", and makes the code easier to maintain, modify and debug
- OOP makes it possible to create full reusable applications with less code and shorter development time

### Creating Objects

Creating objects in JavaScript is easy. The language provides syntax known as object literal notation for quickly creating objects. Object literals are denoted by curly braces. The following example creates an empty object with no properties.

```js
const object = {}
```

Inside of the curly braces, properties and their values are specified as a list of key/value pairs. Keys can be strings or identifiers, while values can be any valid expression. The list of key/value pairs is comma delimited, with each key and value separated by a colon. The example below creates an object with three properties using literal notation. The first property, `foo`, holds the number one. The second property, `bar`, is specified using a string, and also stores a string value. The third property, `baz`, stores an empty object.

```js
const object = {
   foo: 1,
   bar: "string",
   baz: { }
}
```

Note that we could have written the above ode like this:

```js
const object = { foo: 1, bar: "string", baz: {}}
```

Indentation and whitespaces have no effects on how we write the code but the code is more readable in this format. This is considered as best practice especially for objects with many properties or nested objects.

### Accessing the properties of an object

There are two notations for accessing the properties (or props) of an object in JavaScript:

1. Dot notation
The dot notation is the most common way of accessing the props of an object.  Under dot notation, a prop is accessed by giving the host object’s name, followed by a period (or dot), followed by the prop name. Using the object we created earlier, let's log the object's props how dot notation is used to read from and write to a property.

```js
console.log(object.foo)
// Expected output is 1
```

1. Bracket Notation

Bracket notation is more expressive than dot notation because it allows a variable to specify all or part of the property name. This is possible because the JavaScript interpreter automatically converts the expression within the square brackets to a string, and then retrieves the corresponding property. We can access the props in our object using bracket notation like so:

```js
console.log(object["foo"])
//Expected output is 1
```

Bracket notation also allows property names to contain characters that are forbidden in dot notation. say we wanted to add a new prop to the object, the statement in the example below is completely legal in bracket notation. However, if you tried to create the same property name in dot notation, you would encounter a syntax error.

```js
object["!@#$%&*."] = true
```

### Accessing Nested Properties

Properties of nested objects can be accessed by chaining dot and/or bracket references together. First, let's create a nested object:

```js
const object = {
   foo: {
      bar: 1,
      baz: {
         fool: "string"
         }
      }
}
```

To access the value of `bar`, we can chain either the dot or bracket notation like so:

```js
//Using the dot notation
console.log(object.foo.bar)

//Using the bracket notation
console.log(object["foo"]["bar"]

//Using both
console.log(object["foo"].bar)
```

All the above are valid syntax and will output the value of bar to the console. However, the expressions above can cause performance to suffer if used improperly. Evaluating each dot or bracket expression takes time. If the same property is used multiple times, then it makes more sense to access the property once, and then store the value in a local variable for all future uses like so:

```js
let bar = object.foo.bar
let count = 0

for (var i = 0; i < 10; i++0 {
      count += bar
      //instead of doing count += object.foo.bar
   }
```

### Methods

A method is a function which is a property of an object. There are two kind of methods: *Instance Methods* which are built-in tasks performed by an object instance and *Static Methods* which are tasks that are called directly on an object constructor. Like properties, methods can also be specified in object literal notation. Like so:

```js
const object = {
    sum: function (foo, bar) {
         return foo + bar 
      }
   }
```

Methods can also be invoked using dot and bracket `sum()` notation like so:

```js
object.sum(15, 27)
```

### Adding Props & Methods to an Object

Object literal notation is useful for creating new objects, but it cannot add properties or methods to existing objects. But since an object is a data type with a variable name, adding new data to an object can be done using the assignment operator, `=` like so:

```js
//Create an empty object
const object = {}

//Add foo = 1, bar = "string" and baz = function(name)
object.foo = 1
object.bar = "string"
object.baz = function(name){
         return `Hi, I'm ${name}`
         }
```

If you log any of the props of the `object` object (funny I named the object "object"), you will find the hold the values assigned.

## Conclusion

This article covers the basics of objects in JavaScript but there's still more to learn. Try playing around with objects - you could create an entire array of objects just like an API and try to access to access it props.
