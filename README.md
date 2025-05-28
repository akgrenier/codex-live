# Codex Live

AI prompt library with role-based cards and intelligent categorization. A curated collection of power prompts organized by professional roles and use cases.

## Features

- 🎯 **Role-based prompts** - Organized by Solo Founder, Engineering Manager, Scrum Master, TPM, QA Engineer, Solutions Architect
- 🎲 **Smart randomization** - Ensures variety while preventing adjacent cards from the same role
- 🎨 **Modern UI** - Clean, responsive design with hover effects and tooltips
- 📱 **Mobile-first** - Responsive grid layout that works on all devices
- 🔗 **Deep links** - Direct links to ChatGPT with pre-filled prompts

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **CSS Modules** - Scoped styling
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
app/
├── components/          # React components
│   ├── PromptCard.tsx   # Individual prompt card
│   ├── PromptCards.tsx  # Card grid container
│   └── ThirdPartyCard.tsx # External resource cards
├── data/               # Data definitions
│   ├── powerPrompts.ts # Prompt definitions
│   ├── codexSources.ts # Third-party resources
│   └── codexIntelligence.ts # AI insights
└── api/               # API routes
    └── chat/          # Chat endpoints
```

## Adding New Prompts

1. Edit `app/data/powerPrompts.ts`
2. Add your prompt to the appropriate category
3. Include role, title, description, and ChatGPT link

```typescript
{
  role: 'solo-founder',
  title: 'Your Prompt Title',
  description: 'Brief description of what this prompt does',
  href: 'https://chatgpt.com/g/g-...'
}
```

## Contributing

1. Fork the repo
2. Create a feature branch
3. Add your prompts or improvements
4. Submit a pull request

## License

MIT License - feel free to use this for your own prompt collections!
