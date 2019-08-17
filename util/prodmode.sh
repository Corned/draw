(
  node index.js
) &

(
  cd client
  npm install
  GENERATE_SOURCEMAP=false && npm run build
  mv build ..
) &

wait