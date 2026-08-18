How to Run Project:
Docker is Needed.
docker compose up -d
npx prisma migrate deploy
or during dev, if you're actively changing the schema:
npx prisma migrate dev
then :
npm run start:dev