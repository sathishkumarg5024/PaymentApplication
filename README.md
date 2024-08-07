This is a financial management, this app allows users to log in, check, transfer, and add money from their bank to their wallet. Users can also transfer money to peers and review recent transactions.

- npm install
- Run postgres either locally or on the cloud

- Update .env files everywhere with the right db url

- Go to `packages/db`
  - npx prisma migrate dev
  - npx prisma db seed
- Go to `apps/user-app` , run `npm run dev`

- Try logging in using phone - as a default user 1111111111 , password - alice (See `seed.ts`)

![Screenshot 2024-08-05 124652](https://github.com/user-attachments/assets/3685eacb-7807-4aa7-8141-f68fc469472e)
![Screenshot 2024-08-05 124719](https://github.com/user-attachments/assets/40f7c9aa-fd12-40a8-9a4c-885f4f33910d)
![Screenshot 2024-08-05 124738](https://github.com/user-attachments/assets/f1eed6b3-dded-4e14-b8b5-ac0114fdb567)
![Screenshot 2024-08-05 124755](https://github.com/user-attachments/assets/c29d0b33-89db-40cc-bc4d-0500ca24780e)
