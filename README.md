# Active Web Client

React web client for Active app.

## Features

- Search and filter drop-in activity schedules offered by City of Ottawa
- Sort schedules by distance or time
- Search facilities for a specific activity

## Limitations

- Data may not always be accurate, complete, or up-to-date
- Does not reflect facility closures, holidays or last-minute changes
- Missing information for some activities or facilities
- Does not handle registrations or bookings

## Setup

1. Clone the repository
2. Install dependencies:

```bash
   npm install
```

3. Create a `.env` file in the root directory and add:

```
   VITE_API_KEY=your_api_key_here
   VITE_API_BASE_URL=your_api_base_url_here
```

4. Start the development server:

```bash
   npm run dev
```

## Build

```bash
npm run build
```

## Technology Stack

- React
- Vite

## Data Source

Active REST API. Activity schedules information is collected from the City of Ottawa's public website.

## License

This is an independent community project for Ottawa residents.
