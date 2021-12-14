---
title: "JavaScript Modules"
date: 'Dec 4 2021'
excerpts: 'An introduction to modules'
author: 'Samson Okunola'
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/modules.jpg'
---
## Summary

In this article we will learn what modules are and, how and when to use to them.

-----------------------------------------------------------------------------------------------------

Modules became a necessity when JavaScript files began to grow larger than intended and when files get too large it becomes a breeding ground for bugs . The scripts were initially intended to be small and simple, to provide interactivity to webpages where needed. But over the years, entire applications are running on a lot of JavaScript, and it's being used in other contexts too like Nodejs for example.

To reduce the amount of redundancy and repetition, it was imperative to provide a way of splitting large programs into separate smaller modules that can be called upon and used when needed. This is where modules come in -  help make our codes more organized and easier to maintain.

## What is a Module

A module is simply a file. It doesn't get bigger than that, one script is one module, it doesn't matter the amount of function it has in it. Modules were created to help split larger files into smaller units which are:

- independent: they have to be as separate from other dependencies as possible.
- specific: a module has to be able to perform a specific task or related group of tasks. It makes absolutely no sense if a module does the the task an other function in your application does. It should be for a particular kind of task.
- reusable: one other core essence of creating a module is reusability. A module should be easy to integrate into other parts of your application or program to perform its task.

A module may contain a variable, function, class, array etc. Modules can load each other and use special directives `export` and `import` to interchange functionality, call functions of one module from another one:

- export keyword labels variables and functions that should be accessible from outside the current module.
- import allows the import of functionality from other modules.

Let's say you want a function that greets users, you could create a module and export the function, like so:

```js
//Function to greet users
export const greeting = (user) => {
   alert(`Welcome, ${user}`)
}
```

And import it to use in another modulelike so:

```js
import { greeting } from './greeting.js'
import { getCurrentUser } from './getCurrentUser.js'

const user = getCurrentUser()
greeting(user)
```

The `import` directive loads the module by a path which is relative to the current file, and assigns exported function sayHi to the corresponding variable. `getCurrentUser` is also a module. As modules support special keywords and features, we must tell the browser that a script should be treated as a module, by using the attribute `<script type="module">`, like so:

```js
<!DOCTYPE html>
<body>
<p id="demo"></p>
   <script type="module">
     import { greeting } from './greeting.js'

      document.getElementById("demo").innerHTML = greeting('John')
   </script>
</body>
```

The browser automatically fetches and evaluates the imported module (and its imports if needed), and then runs the script.

**NOTE: Modules work only via HTTP(s), not locally
If you try to open a web-page locally, via `file://` protocol, you’ll find that import/export directives don’t work. Use a local web-server, such as static-server or use the “live server” capability of your editor, such as VS Code Live Server Extension or use XAMPP(it has an Apache HTTP server) to test modules.**

## Core Modules Features

What’s different in modules, compared to “regular” scripts? There are core features, valid both for browser and server-side JavaScript.

### Always `use strict`

Modules always work in strict mode. E.g. assigning to an undeclared variable will give an error.

```js
<script type="module">
  a = 5 //this will throw an error
  let a = 5 //this is valid
</script>
```

### Module level scope

Each module has its own top-level scope. In other words, top-level variables and functions from a module are not seen in other scripts. Modules should export what they want to be accessible from outside and import what they need.
It is also imperative to note that in the browser, we can make a variable window-level global by explicitly assigning it to a window property, e.g. `window.user = "John"`. Then all scripts will see it, both with type="module" and without it. That said, making such global variables is frowned upon. Please try to avoid them.

### A module code is evaluated only the first time when imported

If the same module is imported into multiple other modules, its code is executed only once, upon the first import. Then its exports are given to all further importers. The one-time evaluation has important consequences, that we should be aware of.

First, if executing a module code brings side-effects, like showing a message, then importing it multiple times will trigger it only once – the first time:

```js
// 📁 alert.js
alert("Module is evaluated!")
// Import the same module from different files
```

```js
// 📁 1.js
import `./alert.js` // Module is evaluated!

// 📁 2.js
import `./alert.js` // (shows nothing)
```

The second import shows nothing, because the module has already been evaluated.

There’s a rule: top-level module code should be used for initialization, creation of module-specific internal data structures. If we need to make something callable multiple times – we should export it as a function, like we did with `greeting` above.

Now, say a module exports an object:

```js
export let admin = {
   name: "John Doe"
}
```

If this module is imported from multiple files, the module is only evaluated the first time, admin object is created, and then passed to all further importers. All importers get exactly the one and only admin object:

```js
// 📁 1.js
import { admin } from './admin.js'

admin.name = "Peter Pan"

// 📁 2.js
import { admin } from './admin.js'

alert(admin.name) // Peter Pan

// Both 1.js and 2.js reference the same admin object
// Changes made in 1.js are visible in 2.js
```

As you can see, when 1.js changes the name property in the imported admin, then 2.js can see the new admin.name. That’s exactly because the module is executed only once. Exports are generated, and then they are shared between importers, so if something changes the admin object, other modules will see that. Such behavior is actually very convenient, because it allows us to configure modules. In other words, a module can provide a generic functionality that needs a setup. E.g. authentication needs credentials. Then it can export a configuration object expecting the outer code to assign to it. Here’s the classical pattern:

- A module exports some means of configuration, e.g. a configuration object.
- On the first import we initialize it, write to its properties. The top-level application script may do that.
- Further imports use the module.

For instance, the admin.js module may provide certain functionality (e.g. authentication), but expect the credentials to come into the config object from outside:

```js
// 📁 admin.js
export let config = { };

export const greeting = () => {
  alert(`Ready to serve, ${config.user}!`)
}
```

Here, admin.js exports the config object . Then in `init.js`, the first script of our app, we import config from it and set `config.user`:

```js
// 📁 init.js
import { config } from './admin.js'

config.user = "John Doe"
```

Now the module admin.js is configured. Further importers can call it, and it correctly shows the current user:

```js
// 📁 another.js
import { greeting } from './admin.js';

greeting(); // Ready to serve, John Doe
```

### import.meta

The object import.meta contains the information about the current module. Its content depends on the environment. In the browser, it contains the URL of the script, or a current webpage URL if inside HTML:

```js
<script type="module">
  console.log(import.meta.url) // script URL
  // for an inline script - the URL of the current HTML-page
</script>
```

### In a module, “this” is undefined

That’s kind of a minor feature, but for completeness we should mention it. In a module, top-level `this` is undefined. Compare it to non-module scripts, where `this` is a global object:

```js
<script>
  alert(this); // window
</script>

<script type="module">
  alert(this); // undefined
</script>
```

### import all public function (*) in a module

You can import all exports in another module with the`*` keyword, just like in CSS where it targets all elements. We can create multiple functions in a module like so:

```js
//📁 module.js
export function calculateVat(num) {
   return (num * 7.5) / 100
}

export function calculateTip(num) {
   return (num * 5) / 100
}

export function calculateTotal(num) {
   return num + calculateVat(num) + calculateTip(num)
}
```

If we wanted to import all at once, we culd use the `*` keyword and use, like so:

```js
import * from './module.js'

function printVat() {
   console.log(`$ ${calculateVat(100)})
}

function printTotal(){
   console.log(`$ ${calculateTotal(5000)})
}
```

### Renaming modules

we can rename modules for convenience at the point of import or export.

```js
import { calculateTotal as Total } from './module.js
```

Here we are importing `calculateTotal` with a new name called `Total`, so the function imported is referenced and used under that new name. We can also do same for export:

```js
function calculateTotal(num) {
   return num + calculateVat(num) + calculateTip(num)
}

export {
   calculateTotal as Total
}
```

### Default export

We can also perform a default export. For example:

```js
//📁 module.js
export default function greeting(user) {
   alert(`Welcome, ${user}`)
}

export const admin = { name: "Bruce Wayne", id: 12345 }

export const user = "John Doe"
```

If we try to import with a random name from `module.js`, `greeting` will be imported as it is the default export in the file.

## Conclusion

This is just a basic introduction to modules, there is still very much to learn. Try to practice on your own and get better. If you use a framework like React, then you've been using modules already. It is impossible to know it all but what I advice is know the basics so you know where to look when you get stuck or have bugs in your code.
Please leave your reviews, questions, comments and suggestions and I'll be sure to reply ASAP. Thanks for reading and happy coding.

[https://www.buymeacoffee.com/pablo_clueless]
