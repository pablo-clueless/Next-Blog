---
title: "Introduction to the Solidity programming language."
date: "24/05/2022"
excerpts: "A comprehensive introduction to Smart Contracts."
author: "Samson Okunola"
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/solidity.jpg'
---
Good to be able to write again. I've got so much to pour out and I can't wait. We're going to be looking at the backend of blockchain/web3 with Solidity. I know some of us are familiar with web3 and blockchain, how could we not be with the cryptocurrency and NFT craze. But have you ever wondered how these kinds of stuff are brought into existence? How are they programmed? What is the programming language used? Well, let's get right into it.

## Prerequisites

This is an introductory article but knowledge of other programming languages will make the whole concept of Solidity easier to understand.

## What is Solidity?

Solidity is a high-level programming language designed for implementing smart contracts. It is statically-typed object-oriented(contract-oriented) language. Solidity is highly influenced by Python, c++, and JavaScript which runs on the Ethereum Virtual Machine(EVM), just like Java which runs on the JVM. Solidity supports complex user-defined programming, libraries, and inheritance. Solidity is the primary language for blockchain-running platforms. Solidity can be used to create contracts like voting, blind auctions, crowdfunding, multi-signature wallets, etc.

It is a backend(server-side) programming language which replicates most programming language's object-oriented class-based paradigm and is used to connect to the blockchain. It was designed in the year 2015 by Ethereum.

## Ethereum Virtual Machine(EVM)

The Ethereum Virtual Machine (EVM) provides a runtime environment for executing Ethereum smart contracts. It focuses on offering security and untrusted code execution through a transnational network of public nodes. EVM is designed to prevent Denial-of-Service attacks by ensuring that no application has access to each other's state and that communication is created without any potential interference.

## What is a Smart Contract?

A Smart contract is high-level program code that is compiled to EVM byte code and deployed to the Ethereum blockchain for further execution. It allows us to perform credible transactions without any interference from a third party, these transactions are trackable and irreversible. The file extension of a smart contract written in Solidity is `.sol`. One of the most popular IDE for writing smart contracts is the Remix IDE which is available on [here](https://remix.ethereum.org). You can also use your preferred IDE from your local machine using Hardhat(I'm gonna do a tutorial n this soon).

This is a smart contract I wrote for minting ERC20 Tokens, otherwise known as crypto coins.

```sol
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MemeCoin is ERC20, Ownable, ERC20Burnable {
    event tokensBurned(address indexed owner, uint256 amount, string message);
    event tokensMinted(address indexed owner, uint256 amount, string message);
    event additionalTokensMinted(address indexed owner, uint256 amount, string message);

    constructor() ERC20("PabloCoin", "PBC") {
        _mint(msg.sender, 100 * 10**decimals());
        emit tokensMinted(msg.sender, 100 * 10**decimals(), "Initial supply of tokens minted");
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        emit additionalTokensMinted(msg.sender, amount, "Additional tokens minted");
    }

    function burn(uint256 amount) public override onlyOwner {
        _burn(msg.sender, amount);
        emit tokensBurned(msg.sender, amount, "Tokens burned");
    }
}
```

I know what you're wondering - this amount of code is somewhat too small for that! Well, as mentioned earlier, Solidity is influenced by languages that support inheritance so you can import needed 'classes' and use them in your code. Let's examine the contents of this smart contract:

- The first statement albeit a comment is used to specify the license in use. If you do not include it, the compiler will 'complain'.
- The `pragma` key work specifies the version of Solidity in use and it helps with compatibility issues, especially when importing third-party libraries.
- The `contract` keyword is used to create a smart contract. By convention, the name of the contract is usually the name of the Solidity file. Every function and variable declaration in the file will be encapsulated within the smart contract.
- `event`: as in any other programming language, events work the same way in Solidity. When an event is emitted, it keeps the arguments supplied in the transaction logs as an inheritable member of the contract. With the help of EVM's logging function, events are typically utilized to tell the calling application about the current state of the contract. Changes to contracts and apps that can be utilized to execute dependent logic are notified through events. To write to an event, you use the `emit` keyword
- The `constructor` keyword also works the same way it does in other programming languages. A constructor is a special function that is used to initialize state variables in a contract. The constructor is called when a contract is first created and can be used to set initial values.
- The `function` keyword is used to declare an executable function. It can accept parameters just like every other programming language.
- *Modifiers*: modifiers are used with either variables or functions. In the `mint` function in the code above, the `public` keyword is a function modifier that makes the function visible externally and internally and creates a getter function that is accessible on the client-side for storage/state variables. The `override` keyword states that this function, modifier, or public state variable changes the behavior of a function or modifier in a base contract, i.e, the contracts we imported at the top.

### Variable declaration and data types

Variables are reserved memory locations to store value. Based on the data type, the operating system allocates memory and decides what can be stored in the reserved memory. Variables can be declared by writing their data types and the variable name:

```sol
address owner
uint256 amount
string message
```

Data types in Solidity include:

- booleans
- integers
- unsigned integers
- addresses
- fixed-size byte arrays (bytes1 to bytes32)
- enums

#### Booleans

Booleans, of course, can hold two values true or false. Solidity supports all your regular boolean operators, such as !, &&, ||, ==, !=, etc. They only take up 1 byte of storage.

```sol
bool public isOwner;
```

#### Signed and Unsigned Integers

Signed integers are declared with the `int` keyword, unsigned integers with the `uint` and both take up 32 bytes by default. If you know your variable will never hold that many bytes you can always make it smaller by explicitly specifying the number of bits. For example int128 or uint128. You can specify this in steps of 8s starting from 8 up till 256. You can use regular comparison, arithmetic, and bitwise operators on both `int` and `unit`.

```sol
int age;
uint256 amount;
```

#### Address

Addresses are special and there are two types of addresses, Externally Owned Addresses (EOA) and contract addresses. An EOA is an address to an Ethereum account, just like an inbox has an email address. You can use this to send/receive funds. The contract address is the address associated with a smart contract, and it is used to send/receive money to and from that contract. In both cases, the address is in the format of a 42-character hexadecimal address. The address is derived from the first 20 bytes of the public key controlling the account (if it’s an EOA), or deploying the contract (if it’s a smart contract). So every address takes up 20 bytes of storage. You declare an address like this:

```sol
address public owner;
```

#### Fixed-size byte arrays

A sequence of bytes is stored in a fixed-size byte array. The array's length must be given in the type declaration at all times. They are named `bytes1`, `bytes2`, `bytes3`, and so on, all the way up to `bytes32`. `byte` is the alias for `bytes1`. On this type, you can use your standard Boolean operators, comparison operators, and bitwise operators. It's worth noting that there's another type called bytes that's different from the others in that it's a dynamically sized array rather than a value type. It's essentially shorthand for byte[]. When you can limit the length of your data to a predefined amount of bytes, it is always good practice to use some of bytes1 to bytes32 because it is much cheaper.

#### Enums

`enum` is a way to create user-defined types. Enums are explicitly convertible to integer types, but not implicitly. Enum values are numbered in the order they are defined, starting from 0.

Enums are not part of the ABI (Application Binary Interface — more on this in a later lesson, but it’s basically how you encode Solidity code for the Ethereum Virtual Machine, and how you get data back). This means that if your function returns an `enum`, for example, it will be automatically converted to a uint8 behind the scenes. The integer returned is just large enough to hold all enum values. With more values, the size gets increased too (uint16 and up). The below code, taken from the Solidity docs, defines an `enum` with four possible values, creates a variable of that enum named `choice` and a constant called `defaultChoicethat` will hold a default value.

```sol
enum ActionChoices { GoLeft, GoRight, GoStraight, SitStill }
ActionChoices choice;
ActionChoices constant defaultChoice = ActionChoices.GoStraight;
```

Now we can define some functions to interact with our enum.

```sol
function setGoStraight() public {
    choice = ActionChoices.GoStraight;
}
    
function setChoice(ActionChoices newChoice) public {
    choice = newChoice;
}
```

The first one simply sets the choice to `GoStraight` while the second one sets it to the choice that the caller passes into the function. As we can see after deployment, the `setChoice`function expects a uint8 value, which corresponds to the enum value declared at that number. If we want to get the value of `choice` and `defaultChoice`, we can define the following functions:

```sol
function getChoice() public view returns (ActionChoices) {
    return choice;
}
function getDefaultChoice() public pure returns (uint) {
    return uint(defaultChoice);
}
```

## Conclusion

In this article, we looked at Solidity, its data types, and how it works.

Thank you for staying till the end. If you enjoyed reading this piece please keep in touch and follow to keep up with my articles on Web Development. In the upcoming articles, we will deep dive into setting up a local environment for Solidity and writing a smart contract. You can also check out [Cadena](https://cadena.dev), they help developers transition into Web3 for free.

You can also check the official docs of [Solidity](https://docs.soliditylang.org) for more information.
