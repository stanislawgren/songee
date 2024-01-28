
# SONGEE

SONGEE is more than just a dating app; it's a platform that harnesses the power of music to bring people together. Our innovative approach focuses on one key element: musical taste.

## Table of contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Database Structure](#database-structure)
4. [Installation](#installation)
5. [Usage/Examples](#usageexamples)

## Features

- Create Your Profile: Start by setting up your profile and let SONGEE know about your musical preferences. Whether you're into indie rock or classical symphonies, SONGEE uses this information to match you with like-minded individuals.
- Discover Matches: Swipe to find your match! Our app delivers to You profiles with information about music taste, and with that You can choose how You like.
- Responsive Design: Platform is fully responsive, making it easy to navigate on various devices.




## Tech Stack

1. Front-End
    - HTML: For pages.
    - CSS: For styling.
    - JavaScript: For handling all user actions at page.

2. Back-End:
    - Node.js: A server built from scratch that handles user requests
    - PosgreSQL: DBMS

3. Server:
    - NGINX

4. Containerization
    - Docker

5. Version Control:
    - Git with GitHub


## Database Structure

User data is stored in a relational database.

1. ERD

   ![image](https://github.com/stanislawgren/songee/assets/74272783/efabc5d9-cbca-4524-8cae-180f49e53dc2)

3. Database Dump

    Database dump is avaliable in `db/init.sql`
   
## Installation

1. Clone repository

```bash
    git clone https://github.com/stanislawgren/songee
```

2. Navigate to project directory

3. Install dependencies

```bash
    npm install
```

4. Add `.env` file to `api`. You need to specify some variables to make Your code run:

   ```bash
       ENCRYPTION_METHOD='aes-128-cbc'
       SECRET_KEY='your-secret-key'
       SECRET_IV='your-secret-iv'
   ```

5. Docker setup: each service has Dockerfile added, docker-compose is already configured, all will be solved by one command. (Database will be seeded automatically)

```bash
    docker compose up -d
```

6. Access: You can access Your app by `localhost:3000`

### For dev purposes

1. Make all steps from Installation

2. Stop web and api containers

3. Change `DevManager.js` to dev
    - (WARNING! There is a chance that You will have to change ports that You are using for front-end Live-Server, if you need to, change them in `DevManager.js` and `api/sever.js`)

5. Run Live-Server for front-end

6. Run `npm start` for back-end
   - nodeamon should be installed


    
## Usage/Examples

### 1. Login/Register Page

Here You can login or register to access our page.

- Desktop
  
  ![image](https://github.com/stanislawgren/songee/assets/74272783/dc8c41d5-728f-4025-856c-c05a278a8e52)

  ![image](https://github.com/stanislawgren/songee/assets/74272783/234e234c-c9a7-4fef-9c0e-4b5601041830)

- Mobile
  
  ![image](https://github.com/stanislawgren/songee/assets/74272783/6b63979b-93f2-4ace-9c1d-7150e22d82da)

  ![image](https://github.com/stanislawgren/songee/assets/74272783/efc0488d-9c00-421b-a90b-d5512b39ddcf)

### 2. User Profile Page

On this page You can customize Your profile. Your profile will be visible for other only if You provide all data.

- Desktop
  
  ![image](https://github.com/stanislawgren/songee/assets/74272783/118cf005-d844-4a2f-9b39-d3bcaf0485b1)

- Mobile
  
  ![image](https://github.com/stanislawgren/songee/assets/74272783/972f5fae-ed87-45a1-a763-e36250219f2e)

### 3. Main Page

On this page You can swipe other profiles, if someone likes You and You like him back, You will be matched!

- Desktop
  
  ![image](https://github.com/stanislawgren/songee/assets/74272783/3c12f657-4144-4237-a88f-3d036120de9a)

- Mobile
  
  ![image](https://github.com/stanislawgren/songee/assets/74272783/dd438872-68dd-45a3-9118-c91386749876)

### 4. Chat Page

On this page in future, You will be able to talk with Your pairs, for now, there are only pairs displayed.

- Desktop
  
  ![image](https://github.com/stanislawgren/songee/assets/74272783/6c54a998-c1aa-4caa-b54e-b455d610e719)


## License
This project is licensed under the MIT License






