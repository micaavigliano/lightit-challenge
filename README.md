# Getting Started with lightit-challenge

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Stack

React, context API, Typescript, TailwindCSS, React Testing Library

## How to run the app

- clone the repo
- run `npm install` to install all the dependencies
- run `npm run start`
- there is a bundle of test if you want to run them and check the coverage you can run `npm run test:coverage`

## What did I do

- This application is a patient data management where the user is able to add and edit the users.
- The application is fully accessible, I added focus management so all the interactive elements can be navigated using the keyboard.
- The application is responsive, can be used on mobile devices.
- When the user creates or edits it appears a Modal with a Form
- When the user creates or edits it appears a notification that announces the user what happened. Also, this notification is accessible because it is a live-region which announces the Accessibilit API that that place on the code must be announced by assistive technologies when appears.
- I used the library `dayjs` to format the date on `created_at`

## What I want to improve

- I want to add more test cases
- I want to create more reusable components
