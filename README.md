# Auth Micro Service

## How to run

-   make sure you have [pnpm](https://pnpm.io/) install on your system as node package manager

## Developer guide

-   **Set up vscode**
    -   install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extention on vscode, then select default formatter to prettier insted of none
    -   install [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extention
    -   install [prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) vscode extension
-   **Folder Struture**
    -   each feature will have a module
    -   /user -> user.module.ts + user.controller.ts + user.service.ts (here user module has user module, user controller, user service)
-   **File Name Convention (all lower case,separated by -)**
    -   app.module.ts | my-app.module.ts
    -   app.controller.ts | my-app.controller.ts
    -   app.service.ts | my-app.service.ts
    -   create-user.dto.ts
    -   anything.someting.ts
