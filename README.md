# React Movie App

It's a simple movie app using React.js

Checkout the [demo].\
Or if you want to host it yourself, you can follow the [installation guide](#installation) below.

## Features

Basically you can:

- :heavy_check_mark: | See all movies list
- :heavy_check_mark: | Search movie by title
- :heavy_check_mark: | See movie detail
- :heavy_check_mark: | Book ticket for a movie
- :heavy_check_mark: | See transaction detail
- :heavy_check_mark: | See tickets in transaction detail
- :heavy_check_mark: | Top up balance
- :heavy_check_mark: | Withdraw balance
- :heavy_check_mark: | See transaction history
- :heavy_check_mark: | Cancel order/transaction
- :heavy_check_mark: | Cancel ticket
- :x: | Bake a cookie

## Installation

1. Clone this repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Copy `.env.example` and rename it to `.env.local`
4. Change the value of the variables in `.env.local` to match your environment or leave it as it is
   ```env
   VITE_API_ENDPOINT=https://movie-booking-app-production.up.railway.app/api/v1
   VITE_APP_NAME=Sea Cinema
   ```

## Usage

1. Open the [demo]\
   or if you host it yourself, run the app in the development mode and open [http://localhost:5173](http://localhost:5173) to view it in the browser.
   ```bash
   npm run dev
   ```
2. Create an account by navigating to `/register`
3. Login with your account
4. Enjoy the app

## Built with

- [React.js](https://reactjs.org/)
- [Vite.js](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [React Router](https://reactrouter.com/)

## Contributing

Pull requests are welcome. For major changes, please [open an issue] first to discuss what you would like to change.

## Known issues

- Input type date not working on Safari

[demo]: https://seacinema.vercel.app/
[open an issue]: https://github.com/fauzan-radji/react-movie-app/issues/new
