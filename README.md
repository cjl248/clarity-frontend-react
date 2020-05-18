<h1 align="center">Clarity - Frontend (React)</h1>

<div align="center">
A mindfulness hub for users to find inspiration, journal, and search for guided meditation videos. This guide walks through the steps needed to get the UI up and running.
</div>

<div align="center">
  <sub>Built with ❤️ by 
  <a href="https://github.com/cjl248">Chris Liendo</a>
  </sub>
</div>

<br>

## Features
- Video search using the YouTube API that lets the use find guided meditations, mindfulness teachers, calming music and more
- Allows users to chose a personally inspiring picture/quote combination on their landing that persists through pageUnsplash API and an inspiration quote API
- CRUD-eneabled journaling that updates optimistically and persists through the backend
- Widget for recording and tracking timed meditation sessions of different lengths

## Tech Stack
<h3>This web app makes use of the following: </h3>

**Backend**
- Ruby \[2.6.1\]
- Rails API \[~> 5.2.4.2\]
- Custom Serailizer
- PostgreSQL \[>= 0.18, < 2.0\]
- bcrypt \[~> 3.1.7\]
- jwt \[~> 2.2\]

**Frontend** 
- React \[^16.10.2\]
- Material-UI \[^4.5.1\]
- Custom CSS

**API Keys**
<h3>This web app uses API keys from: </h3>
- <a href="https://developers.google.com/youtube/v3">YouTube API</a> <br>
- <a href="https://unsplash.com/developers">Unsplash API</a> <br>
- <a href="https://rapidapi.com/HealThruWords/api/universal-inspirational-quotes/details">HealThruWords API</a>

## Prerequisites
<h3>Before you begin, please make sure you have installed the latest versions of: </h3>
- <a href="https://www.ruby-lang.org/en/">Ruby</a> <br>
- Rails <br>
- PostgreSQL <br>
- Node <br>
- NPM

## Installation
<p>
  <i>For information on backend installation please click here: <a href="https://github.com/cjl248/clarity-backend-rails-api">Clarity Backend</a></i>
</p>

**Frontend Instalation**
- Clone this repo to your local machine git clone `<this-repo-url>`
- Ensure your backend is running localy at `http://localhost:3000/`
- `cd` to frontend directory
- Run `npm install` to install all dependencies
- Run `npm start` to to start the server
- Press `y` when prompted to run at `http://localhost:3001`

## Video
(to include video examples of app functionality)
