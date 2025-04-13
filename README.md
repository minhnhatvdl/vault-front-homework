# Ledger Vault - Frontend Homework

![illustration](https://i.imgur.com/AuJ6B7T.png)

### Figma Design

Here’s the design you’ll be implementing: **[Figma prototype](https://www.figma.com/proto/AwC58Mqda2ZOjqzadPdiso/LES---Front-end-homework?page-id=&node-id=1-4741&p=f&t=Dx21H0F2ytviGHvl-0&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A4741)**

All the available material can be found from this link: **[Figma components](https://www.figma.com/design/AwC58Mqda2ZOjqzadPdiso/LES---Front-end-homework?node-id=0-1)**

The password will be provided to you by email.

## Features

- Search through notifications with debounced input
- Matches the figma design with clean UI
- Test coverage
- Type-safe with strict TypeScript types

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Vite

### Running the Backend

```sh
# Build the server image
docker build -t vault-front-homework:latest server

# Run the server container
docker run -p 5000:5000 vault-front-homework:latest
```

### Running the frontend

```
# Install dependencies
pnpm install

# Start the development server
pnpm dev

# Run tests
pnpm test

# Run the linter
pnpm lint

# Format code
pnpm format
```

### Future improvements

- Add pagination for larger datasets
- Add more advanced filtering options
- Implement notification grouping by date
- All test coverage
- Caching formatted notification data
- Light/dark mode support
