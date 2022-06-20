npm i nodemon --save-dev
npm i crypto-js --save
npm i jest --save-dev

npm run dev-test
npm run test

$ HTTP_PORT=3002 npm run dev
c:\> set HTTP_PORT=3002

npm i body-parser --save (i use express.json())

npm i ws --save

//$HTTP_PORT=3002 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev

set HTTP_PORT=3002 && set P2P_PORT=5002 && set PEERS=ws://localhost:5001 && npm run dev
set HTTP_PORT=3003 && set P2P_PORT=5003 && set PEERS=ws://localhost:5001,ws://localhost:5002 && npm run dev


https://github.com/15Dkatz/sf-chain-guides

npm i elliptic --save
npm i uuid --save

npm i jsonwebtoken


set NODE_NAME=NODE2 && set HTTP_PORT=3002 && set P2P_PORT=5002 && set PEERS=ws://localhost:5001 && npm run dev 
set NODE_NAME=NODE3 && set HTTP_PORT=3003 && set P2P_PORT=5003 && set PEERS=ws://localhost:5001,ws://localhost:5002 && npm run dev


for fakeData testing
set NODE_NAME=NODE4 && set HTTP_PORT=3004 && set P2P_PORT=5004 && set PEERS=ws://localhost:5001,ws://localhost:5002 && npm run dev

node
set NODE_NAME=NODE2 && set HTTP_PORT=3001 && set P2P_PORT=5001 && set PEERS=ws://localhost:5001,ws://localhost:5002 && npm run dev