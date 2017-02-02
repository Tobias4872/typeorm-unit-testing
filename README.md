# typeorm-unit-testing

## Setup

### Clone code
```
git clone https://github.com/Tobias4872/typeorm-unit-testing.git
```

### Install packages
```
cd typeorm-unit-test
npm install
```

### Compile code
```
tsc -p .
```

### Run tests
```
node_modules/mocha/bin/mocha **/*.spec.js
```

##  Discussion

So, let's assume I have a dataprovider which provides CRUD methods (create, retrieve, update, delete) methods and I want to unit test some of the functionality. Specifically, I would like to make sure that the "archived" flag in queries to the entity table is taken into account.

The idea is to create a unit test which checks that the "archived = 0" flag is added to the query when running the "get" method on the dataprovider.

As I don't have a real database during the unit tests, I need to make sure that typeorm does not really do any database operations, so I am trying to mock the query builder and spy on the invocation of its methods.

Let me know if there is a better way to do this.
