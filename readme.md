# Welcome to API Architecture repo

## This repository is an example of my architectural thinking about creating such API

I have to admit, that I'm pretty new in considerations about architecture, but I'm really into it!

I've made this project to show how I would build such project, using seperation of concerns, DRY principle, clean-coding and Object Oriented Paradigm.

Also, you can find descriptions of my flow of thinking in the code.

I know it's not perfect, I'm learning a lot about it and immadietaly try to implement anything I learn.

### How is this repository organised?

Repository consists of different branches - each for every big step in refactoring an application.
They will be ordered ascending - from simple to more and more complex.
It may change over time!

**NOTE: Usually master branch should be up to date to the newest and most complex version, but I will merge it after some commits - to not merge every little change!**

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
