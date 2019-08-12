(
  cd client
  npm install
  GENERATE_SOURCEMAP=false && npm run build
  mv build ..
)

(
  node index.js
)