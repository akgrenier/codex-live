import React from 'react';
import Link from 'next/link';
import styles from './PromptCard.module.css';

interface PromptCardProps {
  title: string;
  description: string;
  href: string;
  role?: string;
}

// Role icon mapping with emoji icons and titles
const roleConfig = {
  'solo-founder': { icon: '🧑‍💻', title: 'Solo Founder' },
  'engineering-manager': { icon: '🏢', title: 'Engineering Manager' },
  'scrum-master': { icon: '🧭', title: 'Scrum Master' },
  tpm: { icon: '📅', title: 'Technical Program Manager' },
  'qa-engineer': { icon: '🧪', title: 'QA Engineer' },
  'solutions-architect': { icon: '🏗️', title: 'Solutions Architect' },
};

const PromptCard: React.FC<PromptCardProps> = ({
  title,
  description,
  href,
  role,
}) => {
  const config = role ? roleConfig[role as keyof typeof roleConfig] : null;

  return (
    <Link
      href={href}
      className={styles.card}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.content}>
        <div className={styles.header}>
          {config && (
            <div className={styles.roleIcon} title={config.title}>
              {config.icon}
            </div>
          )}
          <div className={styles.headerText}>
            <h3 className={styles.title}>{title}</h3>
            {config && <span className={styles.roleTitle}>{config.title}</span>}
          </div>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.details}>Try it</div>
    </Link>
  );
};

export default PromptCard;
