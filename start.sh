echo "${DATABASE_SSH_KEY}" > ./id_rsa
chmod 600 ./id_rsa
ssh -o ExitOnForwardFailure=yes -f -N -L 3306:${DATABASE_HOST}:3306 ec2-user@${DATABASE_SSH_HOST} -i ./id_rsa.pem sleep 15

yarn prisma:generate
yarn prisma:migrate
yarn start