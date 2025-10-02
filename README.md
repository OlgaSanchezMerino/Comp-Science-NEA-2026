# NEA Project - WHAT2WATCH

## Overview
A movie recommendation system that suggests films taking into account a user’s previous ratings. The program will use recommendation algorithms to offer tailored suggestions based on genre preferences and ratings, helping users discover movies they are likely to enjoy.

## What does it consist off
- **1 FRONT END:** Webb App
- **2 BACK END:** Back App
- **3 EXTERNAL DATABASE:** Mongo DB Atlas -->(https://cloud.mongodb.com/v2/6839e73d5e382b0d9e14bffc#/clusters/detail/Cluster0)


## What the Program does
- **Basic Authorisation Process**
- **Recommends Films**
- **Displays a Movie's Info**
- **Rating Feature**
- **Look at Reviews**
- **Profile**
- **Search for Films**

## How the Layers Communicate
The Program operates with a clear separation between the front end, back end, and database layers:

- The **Front End (Web App)** interacts with the user, collecting inputs such as movie ratings, and search queries. It sends these requests to the back end via HTTP API calls.
- The **Back End (Back App)** handles logic, processing user requests, running recommendation algorithms, and managing sessions. It communicates with the database to retrieve or store user data, movie information, and reviews.
- The **Database (MongoDB Atlas)** stores all persistent data(e.g. movie details) and data that is editted such as user profiles and reviews. The back end queries the database and updates records as needed.

This way of connecting the layers keeps things organized and flexible, making it easier to build, update, and fix each part without affecting the others.
