# Stock Symbol Viewer

Stock Symbol Viewer is a small React + Next.js project that lets you visualize stock symbol data through API calls.

## Features

* Fetch stock symbol data from Alpha Vantage
* Display company logos using Logo.dev
* Simple interface to view stock information
* Demo mode available for IBM stock if API limits are reached

## Prerequisites

You need API keys from the following services:

1. **Alpha Vantage** (for stock data)
   Get your free API key: [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)

2. **Logo.dev** (for company logos)
   Get your token: [https://www.logo.dev/dashboard](https://www.logo.dev/dashboard)

## Setup

1. **Clone the repository**

```sh
   git clone symbol-view
   cd symbol-view
```

2. **Install dependencies**

```sh
   npm install
```

3. **Set environment variables**
   Create a `.env` file in the root folder and add:

```sh
   NEXT_PUBLIC_API_KEY=your_alpha_vantage_key
   NEXT_PUBLIC_LOGO_TOKEN=your_logo_dev_token
```

4. **Run the development server**

```sh
   npm run dev
```

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Notes

* The project does **not handle API call limits**. If the API stops working, you can switch to demo mode (setting API key to "demo"), which only shows IBM stock data.
* Keep your API keys private and do **not** commit them to any repository.

## Future Improvements

* Add stock search history or favorites
* Implement Table logic to be able to sort by different metrics.
* Multiple resolution charts for day, week or month settings.
