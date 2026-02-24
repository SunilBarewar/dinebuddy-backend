types and validators

- use zod for validation
- use zod-express-validator for middleware
- the types should be named with prefix T eg. TUser and Interfaces with prefix I eg IUser
- All the validation schema should start with UpperCase letter eg: CreateUserBody
- Create the types for each controller in validator like TLoginController and use it routes definition to get the type intellisense
- refer src/validation/floor-table.validation.ts

**Controller**

- controller should also be the class based and should be the singleton
- use services as the dependency injection in constructor. Don't take it as argument in contructor just use it as private member
- refer src/controllers/floor-table controller to understand the practices we follow for a controller

**Repository**

- refer /src/repository/floor-table.repository.ts
- update /src/repository/index.ts
