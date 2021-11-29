# Zendesk Ticket Viewer

Our company has built Ticket Viewer for Zendesk. This application displays all the tickets for user's account and also gives you individual ticket details.

# Setup guide

## Install the dependencies:

```
npm install
```

## Export environment variables

You need to export 2 environment variables before running the code or authentication with zendesk API. I tried seeting up the token based authentication but for some reason, API complained that my token is expired or invalid even though I tried to generate the token multiple times. I am resorting to username/password based authentication as a last resort.

```
export USERNAME_ZENDESK={your zendesk account username}
export PASSWORD={your zendesk account password}
```

## Running instructions:

```
npm start
```

## Executing tests:

```
npm test
```

# Endpoints

## View all tickets

http://localhost:3000/tickets

## View details of a ticket

http://localhost:3000/tickets/{id}

# Demo

![1](/demo/1.png)
![2](/demo/2.png)
![3](/demo/3.png)
![4](/demo/4.png)
![5](/demo/5.png)
![6](/demo/6.png)
![7](/demo/7.png)
![8](/demo/8.png)
![9](/demo/9.png)
![10](/demo/10.png)
![11](/demo/11.png)
![12](/demo/12.png)
