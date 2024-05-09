### PAYTM-CLONE PROJECT

To run the project

- CLONE THE ROPO

```jsx
git clone https://github.com/rnarang789/paytm_clone.git
```

- npm install (or yarn install)
- Run postgres either locally using docker or on cloud(anything like neon db)

```jsx
docker run -e POSTGRES_PASSWORD=secretpass -d -p 5432:5432 postgres
```

- Copy all .env.example files to .env
- Update .env files with right set of data
- Go to packages/db
    - npx prisma migrate dev
    - npx prisma db seed
- Go to apps/user-app, run npm run dev(or yarn run dev)
- Try logging in using phone - 1111111111 , password - alice(see seed.ts)