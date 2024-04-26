# Ticket App - Frontend

## Description

Our application exemplifies the seamless integration of manual and automated processes in managing virtual lists within a sophisticated ecosystem tailored for frontend development. Built with NextJS, ReactJS, Typescript, AntD, and Tanstack Query, our solution embodies professionalism at every stage.

Utilizing advanced techniques such as static generation for HTML optimization, meticulous minification, and efficient localization, we ensure top-tier performance and user experience.

## Table of Contents

- [Installation](#installation)
  - [Running with Docker](#running-with-docker)
  - [Local Development](#local-development)
- [Tech Stack](#tech-stack)
- [Antd and Next.js](#antd-and-nextjs)


## Installation

### Running with Docker

You can run the project using Docker containers. Make sure you have Docker installed on your machine.


1. Clone the repository:

    ```
    $ git@github.com:anasKhafaga/virtual-list.git
    ```

2. Navigate to the project directory:

    ```
    $ cd virtual-list
    ```

3. Build the Docker image:

    ```
    $ docker build -t ticket-app .
    ```
4. Run the Docker container:

    ```
    $ docker run -p 3000:3000 ticket-app
    ```
### Local Development

To run the project locally without docker.

1. Clone the repository:

    ```
    $ git@github.com:anasKhafaga/virtual-list.git
    ```

2. Navigate to the project directory:

    ```
    $ cd virtual-list
    ```

3. Start the development server:

    ```
    $ yarn dev
    ```

### Production Build

To run the project locally without docker.

1. Clone the repository:

    ```
    $ git@github.com:anasKhafaga/virtual-list.git
    ```

2. Navigate to the project directory:

    ```
    $ cd virtual-list
    ```

3. Build:

    ```
    $ yarn build
    ```

4. Start:

    ```
    $ yarn start
    ```

## Tech Stack

The Ticket App is built with the following technologies:

- [React.js](https://reactjs.org/) - JavaScript library for building user interfaces.
- [Next.js](https://nextjs.org/) - React framework for server-rendered applications.
- [Ant Design](https://ant.design/) - Antd provides plenty of UI components to enrich the web applications.
- [TanStack Query](https://tanstack.com/query) - TanStack Query makes fetching, caching, synchronizing and updating server state in your web applications a breeze.
- [next-i18next](https://github.com/i18next/next-i18next) - The easiest way to translate your NextJs apps.
## Antd and NextJS
To make the antd component library work better in our Next.js application and provide a better user experience, we used the following method to extract and inject antd's first-screen styles into HTML to avoid page flicker: [Page Router in Next.js and antd](https://ant.design/docs/react/use-with-next#using-pages-router)




