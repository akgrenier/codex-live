import React from 'react';
import Link from 'next/link';
import styles from './ThirdPartyCard.module.css';

interface ThirdPartyCardProps {
  title: string;
  author?: string;
  source_type: string;
  url: string;
  sentiment: string;
  credibility: string;
  key_insights: string[];
  summary: string;
  isExpanded?: boolean;
  onExpandToggle?: () => void;
}

const ThirdPartyCard: React.FC<ThirdPartyCardProps> = ({
  title,
  author,
  source_type,
  url,
  sentiment,
  credibility,
  key_insights,
  summary,
  isExpanded = false,
  onExpandToggle,
}) => {
  // Get sentiment color
  const getSentimentColor = (sentiment: string) => {
    if (sentiment.includes('positive')) return 'text-green-600';
    if (sentiment.includes('negative')) return 'text-red-600';
    if (sentiment.includes('mixed')) return 'text-yellow-600';
    return 'text-gray-600';
  };

  // Get credibility badge
  const getCredibilityBadge = (credibility: string) => {
    if (credibility.includes('highest'))
      return { text: 'Official', class: 'bg-blue-100 text-blue-800' };
    if (credibility.includes('high'))
      return { text: 'Trusted', class: 'bg-green-100 text-green-800' };
    if (credibility.includes('medium'))
      return { text: 'Community', class: 'bg-yellow-100 text-yellow-800' };
    return { text: 'Source', class: 'bg-gray-100 text-gray-800' };
  };

  // Get source type icon
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'review':
        return '📝';
      case 'discussion':
        return '💬';
      case 'tutorial':
        return '📚';
      case 'official':
        return '🏢';
      default:
        return '📄';
    }
  };

  const credibilityBadge = getCredibilityBadge(credibility);
  const visibleInsights = isExpanded ? key_insights : key_insights.slice(0, 2);
  const hasMoreInsights = key_insights.length > 2;

  const handleExpandToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onExpandToggle) {
      onExpandToggle();
    }
  };

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.header}>
        <div className={styles.sourceInfo}>
          <span className={styles.sourceIcon}>
            {getSourceIcon(source_type)}
          </span>
          <span className={styles.sourceType}>
            {source_type}
            {author ? ` by ${author}` : ''}
          </span>
        </div>
        <span
          className={`${styles.credibilityBadge} ${credibilityBadge.class}`}
        >
          {credibilityBadge.text}
        </span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>

        <div className={styles.insights}>
          <h4 className={styles.insightsTitle}>Key Insights:</h4>
          <ul className={styles.insightsList}>
            {visibleInsights.map((insight, index) => (
              <li key={index} className={styles.insightItem}>
                {insight}
              </li>
            ))}
          </ul>
          {isExpanded && (
            <div className={styles.expandedContent}>
              <h4 className={styles.summaryTitle}>Summary:</h4>
              <p className={styles.expandedSummary}>{summary}</p>
            </div>
          )}
          {hasMoreInsights && (
            <button
              onClick={handleExpandToggle}
              className={`${styles.expandButton} ${isExpanded ? styles.expanded : ''}`}
            >
              {isExpanded
                ? 'Show less'
                : `Show ${key_insights.length - 2} more + summary`}
              <span className={styles.expandCaret}></span>
            </button>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <span className={`${styles.sentiment} ${getSentimentColor(sentiment)}`}>
          {sentiment}
        </span>
        <span className={styles.readMore}>Read full review →</span>
      </div>
    </Link>
  );
};

export default ThirdPartyCard;
