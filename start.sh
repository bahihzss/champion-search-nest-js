ssh -N -L 3306:$DATABASE_HOST:3306 ec2-user@$DATABASE_SSH_HOST -i /secret/id_rsa.pem

yarn prisma:generate
yarn prisma:migrate
yarn start