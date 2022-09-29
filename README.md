# Northwest Arkansas Tabletop Gaming

This app was designed with the intention of letting users find, create, and manage Tabletop Gaming groups located in Northwest Arkansas.
Create gaming groups that support the adding/removal of members, along with their pertinent information.

## NwaTabletopGaming

This project was generated with:
[Angular CLI](https://github.com/angular/angular-cli) version 14.1.0
FontAwesome version 6.2.0
PrimeNG version 14.1.1
PrimeIcons version 6.0.1
PrimeFlex version 3.2.1
RxJS version 7.5.0

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Authentication

App requires a user to login to access most features.  User can register a new account, or make use of test credentials:
username: testusername
password: testpassword

## Running the backend server

Navigate to `\src\assets\server` and run `npm start`.

## API Endpoint Details

GET features are provided for organizations at /api/cities

GET/POST/PUT/DELETE features are provided for a group at /api/groups
GET /api/groups
GET /api/groups/group-id
POST /api/groups
PUT /api/groups
DELETE /api/groups/group-id

GET/POST/PUT/DELETE features are provided for members in a group at 
GET /api/groups/group-id/members/member-id
POST /api/groups/group-id/members
PUT /api/groups/group-id/members
DELETE /api/groups/group-id/members/member-id

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
