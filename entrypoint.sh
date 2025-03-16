#!/bin/sh
# Crea il file .env dinamicamente utilizzando le variabili d'ambiente
cat <<EOF > .env
DATABASE_URL=$DATABASE_URL
EOF

echo "Created .env file:"
cat .env

# Attendi che il database sia disponibile (usa nc se installato)
while ! nc -z db 1433; do
  echo "Waiting for database connection at db:1433..."
  sleep 2
done

# Applica lo schema al database (push o migrazioni, a seconda della tua configurazione)
npx prisma db push

# Genera il Prisma Client (questo comando utilizza il file .env creato)
npx prisma generate

npm run build

# Avvia l'applicazione
npm start
