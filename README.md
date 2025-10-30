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

## Setup

1. **Clone the repository**

```sh
   git clone https://github.com/gustavoSo3/Symbol-View.git
   cd Symbol-View
```

2. **Install dependencies**

```sh
   npm install
```

3. **Set environment variables**
   Create a `.env` file in the root folder and add:

```sh
   NEXT_PUBLIC_API_KEY=your_alpha_vantage_key
```

   If API Keys are not set you would get the demo request that would give you IBM data only

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
