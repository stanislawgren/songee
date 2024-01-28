
# SONGEE

SONGEE is more than just a dating app; it's a platform that harnesses the power of music to bring people together. Our innovative approach focuses on one key element: musical taste.




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

2. Database Dump
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
4. Docker setup: each service has Dockerfile added, docker-compose is already configured, all will be solved by one command. (Database will be seeded automatically)

```bash
    docker compose up -d
```

5. Access: You can access Your app by `localhost:3000`

### For dev purposes

1. Make all steps from Installation

2. Stop web and api containers

3. Change `DevManager.js` to dev

4. Run Live-Server for front-end

5. Run `npm start` for back-end


    
## Usage/Examples



