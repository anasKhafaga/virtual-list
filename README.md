# Ticket App - Frontend

> [!CAUTION]
> `.env*.local` files mustn't be committed as it's supposed to contain sensetive information. I've included it here only for demonstration but it must be ignored

> [!CAUTION]
> `./kubernetes` directory contains secrets in this public repo which is used for demonstration purposes but it mustn't be committed

## Description

Our application exemplifies the seamless integration of manual and automated processes in managing virtual lists within a sophisticated ecosystem tailored for frontend development. Built with NextJS, ReactJS, Typescript, AntD, and Tanstack Query, our solution embodies professionalism at every stage.

Utilizing advanced techniques in development such as docker compose, static generation for HTML optimization, meticulous minification, and efficient localization and in deployment like kubernetes, we ensure top-tier performance and user experience.

## Table of Contents

- [Cloning](#cloning)
- [Installation](#installation)
  - [Running with Docker Compose in Development](#running-with-docker-compose)
  - [Running with Kubernetes in Production](#running-with-kube)
  - [Local Development](#local-development)
- [Tech Stack](#tech-stack)
- [Antd and Next.js](#antd-and-nextjs)


## Cloning
1. Clone the repository:

    ```
    $ git@github.com:anasKhafaga/virtual-list.git
    ```

2. Navigate to the project directory:

    ```
    $ cd virtual-list
    ```

## Installation

### Running with Docker Compose in Development
1. Compose up:

    ```
    $ docker compose up
    ```
2. Visit [Server](http://localhost:4000)
### Running with Kubernetes in Production
1. Build the Docker image:

    ```
    $ docker build -t ticket-app .

2. Starting:

    ```
    $ kubectl apply -f kubernetes/mongodb/
    $ kubectl apply -f kubernetes/web/
    $ kubectl apply -f kubernetes/proxy/
    ```
3. Visit [Server](http://localhost:5000)
4. Cleanup after finishing:

    ```
    $ kubectl delete all -l operator=ticket
    ```

### Local Development

1. Start the development server:

    ```
    $ yarn dev
    ```
2. Visit [Server](http://localhost:3000)


## Tech Stack

The Ticket App is built with the following technologies:

- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/) - React framework for server-rendered applications.
- [Ant Design](https://ant.design/) - Antd provides plenty of UI components to enrich the web applications.
- [TanStack Query](https://tanstack.com/query) - TanStack Query makes fetching, caching, synchronizing and updating server state in your web applications a breeze.
- [next-i18next](https://github.com/i18next/next-i18next) - The easiest way to translate your NextJs apps.
## Antd and NextJS
To make the antd component library work better in our Next.js application and provide a better user experience, we used the following method to extract and inject antd's first-screen styles into HTML to avoid page flicker: [Page Router in Next.js and antd](https://ant.design/docs/react/use-with-next#using-pages-router)




