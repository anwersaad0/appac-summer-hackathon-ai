# appac-summer-hackathon-ai

to open frontend
npm install
npm run dev


to open backend 
npm run dev

===================

to open cypress
npx cypress open 

to run all the tests
npm cypress run

to make a branch up to date 
1. switch to the branch --> git checkout your-branch-name
2. Fetch the latest changes from the remote repository --> git fetch origin
3. Merge the latest changes from the main branch into your branch --> git merge origin/main
4. Push the updated branch to the remote repository --> git push origin your-branch-name
====================


## Script Notes
The script runs `nodemon --watch backend/src --exec ts-node backend/src/index.ts`. That means that whenever a change happens in the `backend/src` directory, it will execute the command `ts-node backend/src/index.ts`. Notice we use `ts-node` instead of `node` because we are using TypeScript.  

We use `ts-node` during development. Later we'll use `tsc` which is typescript compiler. This will be used during the build process to compile TS to JS. These compiled JS files are what we run in a production environment.  


## ORM Used

We are using Prisma for our ORM(Object Relation Mapping). We install prisma for us and also @prisma/client so it can run on the client's side. 
Once we've done that we cd into the backend and run `npx prisma init` which gives us the prisma folder with the schema file. We create our tables and to connect it we run `npx prisma db push`.

If Prisma Client gives you problems, make sure to run `npx prisma generate --schema ./backend/prisma/schema.prisma` from the root folder

## Database

We are using PostgreSQL and we're setting it up on Neon. It only allows for one free project.  



