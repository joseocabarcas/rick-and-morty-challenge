# Rick and Morty

Challenge 

- [Nextjs 14 with App Router](https://nextjs.org/docs/app/building-your-application/routing)
- [TailwindCSS](https://tailwindcss.com/)
- [React Query](https://react-query.tanstack.com/)


## Getting Started

First, install dependencies with pnpm or yarn:

```bash
pnpm install
# or
yarn install
```

Second, create .env.local file:

```bash
touch .env.local
```

And add the following content to it:

```bash
NEXT_PUBLIC_API_BASE_URL="https://rickandmortyapi.com/api"
```

Third one, run the development server:

```bash
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Rick And Morty

- API Docs: [`R & M`](https://rickandmortyapi.com/)
- Excalidraw share [`Live`](https://excalidraw.com/#room=ce074148f82794b6fb20,oLA3q3OLxDJYZs66C-Y3OA)

## Mockup

![Mockup Characters](docs/images/mockup_characters.png)
![Mockup Character](docs/images/mockup_character.png)

## Component Architecture

Server vs Client composition

![Components](docs/images/init_render.png)

### Characters

- Character List

![Character List](docs/images/component_characters.png)

### Character

- Character Details

![Character Detail](docs/images/component_character.png)