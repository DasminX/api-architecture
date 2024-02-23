# Welcome to API Architecture repo

## This repository is an example of my architectural thinking about creating such API

I have to admit, that I'm pretty new in considerations about architecture, but I'm really into it!

I've made this project to show how I would build such project, using seperation of concerns, DRY principle, clean-coding and Object Oriented Paradigm etc.

So far, everything I've learned about Node, Express, Docker, OOP, React, Next, testing and many, many more, I've learned it by myself. I'm so proud about it!

I know it's not perfect, but anything I learn, I try to implement it immadietaly :).

### How is this repository organised?

Repository consists of different branches - each for every big step in refactoring an application.
Branches will be ordered ascending - from simple to more and more complex.
It may change over time!

**NOTE: Usually master branch should be up to date to the newest and most complex version, but I will merge it after some commits - to not merge every little change!**

---

### For now, there are 4 active branches

1. **1_first_architecture** - basic branch without Dependency Injection - mostly related on functions and concrete class instances - first basic app shape.

2. **2_dep_inj** - second branch, where I've started introducing Dependency Injection - almost all is transformed to OOP approach, but there are some abstractions missing, it's granulated as much as possible - I think not 100% correct, but before breaking changes and cleaning

3. **3_dep_inj_adv** - third branch - basing on second branch, but cleaned up - added more abstractions, wrapped up too much granulated things into more reasonable shape, fixed some errors, made it all injectable in a runtime!

4. **master** - it is the most stable version of the most recent branch. For now, it reflects **third branch**, but it may be different in the ***future***

**NOTE: It's not the end! I'm aware of many things to be fixed, to be done more reasonable and human-readable, so to say.**

### Plans for the future

- I'd like to implement my own mail server, which "talks" with this backend (using docker things, such compose etc.)
- I defenitely will create development and production builds seperately (maybe runtime variables also?), which also comes with creating more class instances based on current classes (woohooo, more OOP!!)
- I will consider using IOC container (Awilix, Inversify?) - will see
- I certainly must focus more on tests - I'm a novice in this - some refactorings? more tests? Soon :)
- Also, when it grows, I will add more and more features

**All in the name of science!**

---

### How to start it?

Firstable, run:

```

git init &&
git clone 'https://github.com/DasminX/api-architecture.git' &&
cd api-architecture

```

### Since now, there are two paths

#### Using docker

1. Create an image

    ```

    npm run docker:build

    ```

2. Run the container

    ```

    npm run docker:start

    ```

3. After development, stop and remove container

    ```

    npm run docker:destroy

    ```

#### On local machine

1. Install packages

    ```

    npm i

    ```

2. Run development script

    ```

    npm run start:dev

    ```

---

### How to use it?

When successfully run, you can send API calls to localhost:3000!

1. Send POST Request to localhost:3000/api/mail/send
2. With object of shape:

```

{
    "sender": "testmail@example.com",
    "content": "Test test test test test test test test test test test test",
    "subject": "Test subject"
}

```

**NOTE: Valid credentials don't work yet! One thing you can do is to send invalid credentials!**

## STILL IN PROGRESS!!! MORE SOON
