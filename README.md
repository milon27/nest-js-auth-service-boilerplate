# Auth Micro Service

## How to run

-   make sure you have [pnpm](https://pnpm.io/) install on your system as node package manager
-   run on development
    -   use mysql db from docker (you should have docker install on your machine) `docker compose up -d `
    -   install all dependencies and run the app

```bash

pnpm i
# update .env.sample to .env then update db connection string (DATABASE_URL)
npx prisma migrate deploy
npx prisma generate

# reload / reopen vscode to restart TS server
npm run dev # auth api will run on port 4000

```

## API endpoints

-   BASE url: http://localhost:4000/api/auth
-   Login route: @POST http://localhost:4000/api/auth/login/local - pass body as `json
{
    "identifier": "a@g.com",
    "password": "1234567"
} `
-   Continue with google - @GET http://localhost:4000/api/auth/login/google
-   Protected route(get logged in user) @GET http://localhost:4000/api/auth/user

## Developer guide

-   **Set up vscode**
    -   Install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extention on vscode, then select default formatter to prettier insted of none
    -   Install [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extention
    -   Install [prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) vscode extension
-   **Folder Struture**
    -   All folder name must be singular, e.g. `/guard` not `/guards`
    -   Each feature will have a module
    -   e.g. user module will contain `/user -> user.module.ts + user.controller.ts + user.service.ts (here user module has user module, user controller, user service, etc.)`
-   **File Name Convention (all lower case,separated by -)**
    -   All file name must be singular, e.g. `user.module.ts` not `users.module.ts`
    -   Some other file names
        -   app.module.ts | my-app.module.ts
        -   app.controller.ts | my-app.controller.ts
        -   app.service.ts | my-app.service.ts
        -   create-user.dto.ts
        -   jwt-user.interface.ts
        -   anything.someting.ts
-   **Class, interface and Function name convention**
    -   class: `class MyClass{}`
    -   interface: `interface IMyInterface{}` should start with capital `I`
    -   function: `function myFunction(){}` should be in camelCase

### TODO

-   setup swegger for api doc, also maintain postman
-   setup a prisma exception filter globally

---

@author
[milon27.com](https://milon27.com)
