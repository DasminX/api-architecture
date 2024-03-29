# Welcome to API Architecture repo

## This repository is an example of my architectural thinking about creating such API

I have to admit, that I'm pretty new in considerations about architecture, but I'm really into it!

I've made this project to show how I would build such project, using seperation of concerns, DRY principle, clean-coding, Dependency Injection, Object Oriented Paradigm and more.

So far, everything I've learned about Node, Express, Docker, OOP, React, Next, testing, design patterns, architecture, databases and many, many more, I've learned it by myself. I'm so proud of it!

I know it's not perfect, but anything I learn, I try to implement it immadietaly :).

### How is this repository organised?

Repository consists of different branches - each for every big step in refactoring an application.
Branches will be ordered ascending - from simple to more and more complex.
It may change over time!

**NOTE: Usually master branch should be up to date to the newest and most complex version, but I will merge it after some commits - to not merge every little change!**

---

### For now, there are such active branches

1. **1_first_architecture** - basic branch without Dependency Injection - mostly related on functions and concrete class instances - first basic app shape.

2. **2_dep_inj** - second branch, where I've started introducing Dependency Injection - almost all is transformed to OOP approach, but there are some abstractions missing, it's granulated as much as possible - I think not 100% correct, but before breaking changes and cleaning

3. **3_dep_inj_adv** - third branch - basing on second branch, but cleaned up - added more abstractions, wrapped up too much granulated things into more reasonable shape, fixed some errors, made it all injectable in a runtime!

4. **4_awilix** - fourth branch, refactored manual setting up Dependency Injection to IoC Container (Awilix), added docker compose file, changed npm scripts, fixed some issues.

5. **5_simple_smtp** - fifth branch - successfully added simple mail-catching service, glued up with Docker compose file. For now, it's possible to read sent mails! Of course I'm aware that it's a reeaaaallly simple demo but it was a nice experience to check some available mail services, try few ones, read about them and finally choose one! There, of course, is a field to improve it more and more :)

6. **6_user_feature** - sixth branch - I've created user feature! It is responsible for creating new user, getting all users and one user by id. It consists of layers, such route layer with validating incoming request body data, controller layer, service layer, repository layer and model layer. It is done that way, to minimize future work for changing used instance in mentioned layers - for example I could replace InMemoryRepository to another implementation in a production environment, such using real DB. Additionally, I have refactored mail feature a little bit - changed model to validator (it was not 100% correct as model) and changed service response.ts content to DTO (also more descriptive). What's more, I've added prettier rules to keep whole repo consistent in codestyle, and cleaned some things :)

7. **7_db** - seventh branch - its purpose is to add postgres image to compose file, some ORM and add "production-like" database where I will be able to do things, not in memory like so far. There, will refactorings occur in the way of consuming data in data-consumable layers like services. JUST INITIALIZED BRANCH  ***!Still in progress!***

8. **master** - it is the most stable version of the most recent branch. For now, it reflects **7_db** branch, but it may be different in the ***future***

**NOTE: It's not the end! I'm aware of many things to be fixed, to be done more reasonable and human-readable, so to say.**

### Plans for the future

- I certainly must focus more on tests - I'm a novice in this - some refactorings? more tests? Soon :)
- Also, I can see possibilities to add other features, like:
  - Users (registering, logging, sending mails to other users etc? or more granular like auth seperately also? will see)
  - Movies (adding to favourites, commenting, subscribing for newsletter about new movies? I will also think about it)
  - other, which I haven't thought about yet :)

#### All in the name of self-development

---

### How to start?

Firstable, run:

```

git init
git clone 'https://github.com/DasminX/api-architecture.git'
cd api-architecture

```

Then, copy .env.dist file to .env file

```

cp .env.dist .env

```

### Since now, there are two paths

#### Using docker

**For production use:**


    npm run docker:compose-prod


**For devel use:**

    npm run docker:compose-dev

**If you finish using any of above:**

    npm run docker:compose-down


***NOTE: It removes composed containers for both prod and dev modes!***

#### On local machine

*Scripts changed since the last publish, not ready yet*

<!-- **For production use:**

1. Install packages

    ```

    npm i

    ```

2. Run production script

    ```

    npm run start:prod

    ```

**For devel use:**

1. Install packages

    ```

    npm i

    ```

2. Run devel script

    ```

    npm run start:dev

    ``` -->

---

### How to use it?

When successfully run, you can send API calls to localhost:3000!

1. Enter <http://localhost:1080>
2. Send POST Request to <http://localhost:3000/api/mail/send> with a JSON object in shape of:

```

{
    "sender": "testmail@example.com", // Any mail
    "content": "Test content with minimum length of 30 letters or more", // Min content length 30
    "subject": "Test subject" // Min content length 5
}

```

**TEMPORARY**

3. Also, for manipulating user-feature demo, you can do such things:

- Send POST Request to <http://localhost:3000/api/v1/users> (create user)
- Send GET Request to <http://localhost:3000/api/v1/users> (get all users)
- Send GET Request to <http://localhost:3000/api/v1/users/:id> (get user by id)
