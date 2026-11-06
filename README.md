# EB Movies Library

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.29.

## Description
Web application for discovering and searching movies using The Movie Database (TMDB) API.
Developed with Angular and TypeScript as part of a technical assessment.
Currently a backend is not required to execute the project. Just follow next steps to set up and can run the project.

## Technologies
- Angular 21 LTS
- Angular Material
- TypeScript
- RxJS
- CSS
- TMDB API

## Features
- Popular movies listing
- Movie search
- Movie details
- Responsive design
- New features soon

## Requirements
- Node.js v20.19.0 or newer
- npm

## Installation
Clone the repository:
  - git clone <repository-url>

Navigate to the project:
  - cd EB-movies-library-client

Install dependencies:
  - install Angular 21 if you doesn't have installed yet: npm i --save-dev @angular/cli@21
  - NOTE: in this case was installed with a version of node 22.22.3, just in case you get any error during installation
  - Once done you can check if Angular was installed correctly with: "npx ng version" or "ng version"
  - npm install

## Configuration - TMDB credentials
  - Go to TMDB Api official page https://developer.themoviedb.org/ and create a free developer account or just log in if you already have an account.
  - If you create a new account you must confirm your account by email and once done, you should be redirected to your profile info. Anyway you can access with next link: https://www.themoviedb.org/
  - To get your credentials yo must click in your profile icon > API. You must register some personal data like address, project name, application name, an application summary, application url if you already have one for your project, otherwise http://localhost:4200 is also accepted.
  - Just finish the process with mandatory data and then you will receive a couple of keys (if you can't see it you can follow route from previous step to go to API information and there should be). In this moment we only need the "API Read Access Token".

## Configuration - environment file
  - Create a new file for environment configurations in "EB-movies-library-client\src\environments".
  - File must be named as "environment.ts", you can copy content from "environment.example.ts" in same path.
  - Api url are already declared, so you only need enter your "API Read Access Token" from previous section and assign to variable "apiToken"
  - Once everything is done, you only need run the project.

## Development server
Run:
  - npm start

Navigate to:
  - http://localhost:4200/

## Production build
Run:
  - npm run build

## Security considerations

Document how API credentials are handled
and the limitations of a frontend-only application.
