# Delivery Admin

[![node](https://img.shields.io/badge/node-6.7.0-brightgreen.svg)]()

```
$ mongoimport -d delivery-admin -c postalcodes --type csv  --file ~/Downloads/ceps.csv --headerline
```

# Run application
```
$ mongod &
$ gulp; npm start
```

## mongolab config
process.env    | value
---------------|-----------------------
MONGO_DATABASE | dragons-api
MONGO_HOST     | ds037272.mongolab.com
MONGO_PASSWORD | UeP-XNS-2vf-nvm
MONGO_PORT     | 37272
MONGO_USERNAME | dragons-api
