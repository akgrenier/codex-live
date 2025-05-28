import React, { useState, useEffect } from 'react';
import styles from './PromptCards.module.css';
import PromptCard from './PromptCard';
import { PromptCategory, PowerPrompt } from '../data/powerPrompts';

interface PromptCardsProps {
  category: PromptCategory;
}

// Function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Function to select random prompts with constraints
function selectRandomPrompts(prompts: PowerPrompt[]): PowerPrompt[] {
  // Group prompts by role
  const promptsByRole: { [key: string]: PowerPrompt[] } = {};
  prompts.forEach((prompt) => {
    const role = prompt.role || 'default';
    if (!promptsByRole[role]) {
      promptsByRole[role] = [];
    }
    promptsByRole[role].push(prompt);
  });

  // Select max 2 prompts per role
  const selectedPrompts: PowerPrompt[] = [];
  Object.values(promptsByRole).forEach((rolePrompts) => {
    const shuffled = shuffleArray(rolePrompts);
    selectedPrompts.push(...shuffled.slice(0, 2));
  });

  // Shuffle the selected prompts
  let shuffledSelected = shuffleArray(selectedPrompts);

  // Ensure no two cards from the same role are adjacent
  let attempts = 0;
  while (attempts < 10) {
    let hasAdjacent = false;
    for (let i = 0; i < shuffledSelected.length - 1; i++) {
      if (shuffledSelected[i].role === shuffledSelected[i + 1].role) {
        hasAdjacent = true;
        break;
      }
    }

    if (!hasAdjacent) break;

    shuffledSelected = shuffleArray(shuffledSelected);
    attempts++;
  }

  // Return exactly 6 cards
  return shuffledSelected.slice(0, 6);
}

const PromptCards: React.FC<PromptCardsProps> = ({ category }) => {
  const [selectedPrompts, setSelectedPrompts] = useState<PowerPrompt[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Generate random selection only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    setSelectedPrompts(selectRandomPrompts(category.prompts));
  }, [category.prompts]);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{category.title}</h2>
          {category.description && (
            <p className={styles.description}>{category.description}</p>
          )}
        </div>
        <div className={styles.grid}>
          {/* Show placeholder cards during SSR */}
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.cardWrapper}>
              <div className="animate-pulse bg-gray-200 rounded-lg h-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{category.title}</h2>
        {category.description && (
          <p className={styles.description}>{category.description}</p>
        )}
      </div>
      <div className={styles.grid}>
        {selectedPrompts.map((prompt, index) => (
          <div key={`${prompt.role}-${index}`} className={styles.cardWrapper}>
            <PromptCard
              title={prompt.title}
              description={prompt.description}
              href={prompt.href}
              role={prompt.role}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptCards;
