# Creando Cariño

## Description

It's an ecommerce that provides personalized gifts according to the preferences of the user or request a gift that is already shown in the catalog of the platform, which has a great diversity of types of gifts for different special moments.

## Tech Stack

- Angular
- TypeScript
- Firebase
- Material UI

## Migration to Angular 17

This project was originally created with Angular 13, so I decided to migrate it to Angular 17 to take advantage of the new features and improvements of the framework and here are the steps I followed:

- Update Angular CLI to the latest version
- Update Angular to the latest version
- Update all the dependencies to the latest version
- Update the Firebase version
- Update the Angular Material version
- Update the Angular Fire version
- Migrate from traditional NgModules to StandaloneComponents

Also, I left both versions of the project in different branches:

- **Angular 13:** master branch
- **Angular 17:** v17 branch

### Before and after the migration:

- **Before the migration:**

<img src="./screenshots/page-speed-before.png" alt="Page speed before the migration">

<img src="./screenshots/bundle-size-before.png" alt="Bundle size before the migration">

- **After the migration:**

<img src="./screenshots/page-speed-after.png" alt="Page speed after the migration">

<img src="./screenshots/bundle-size-after.png" alt="Bundle size after the migration">

## User stories

- I can sign up and login with email and password for admin
- Users can't register to the platform
- I can see select a gift from the catalog
- I can see the details of the gift
- I can request a gift via WhatsApp
- As admin I can add a new category
- As admin I can edit a category
- As admin I can delete a category
- As admin I can add a new gift
- As admin I can edit a gift
- As admin I can delete a gift

## Development environment setup

- Clone the repository
- Install dependencies by running `npm install`
- Copy `.env.template` and rename to `.env` file and add the environment variables
- Run `npm start` to start the development server
- Navigate to `http://localhost:4200/`

## Screenshots

<img src="./screenshots/login.png" alt="Login Page">
<img src="./screenshots/home-desktop.png" alt="Home Page">
<img src="./screenshots/categories.png" alt="Categories Page">
<img src="./screenshots/product.png" alt="Product Page">
<img src="./screenshots/guide.png" alt="Guide Page">
<img src="./screenshots/admin.png" alt="Admin Page">
<img src="./screenshots/add-category.png" alt="Add category modal">
<img src="./screenshots/edit-category.png" alt="Edit category modal">
<img src="./screenshots/add-product.png" alt="Add product modal">
<img src="./screenshots/edit-product.png" alt="Edit product modal">

### Responsive

<img src="./screenshots/home-phone.png" alt="Home (Phone)" width="400">
<img src="./screenshots/home-tablet.png" alt="Home (Tablet)" width="650">
