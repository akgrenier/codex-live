export interface PowerPrompt {
  title: string;
  description: string;
  href: string;
  role?: string; // Role for icon and tooltip
}

export interface PromptCategory {
  title: string;
  description?: string;
  prompts: PowerPrompt[];
}

export const powerPrompts: PromptCategory[] = [
  {
    title: 'Power Prompts for Codex',
    description:
      "Role-based prompts that leverage Codex's PR generation capabilities",
    prompts: [
      // Solo Founder
      {
        title: 'Feature Implementation PR',
        description:
          'Create a GitHub PR that adds a new `/api/register` endpoint in FastAPI with validation and tests',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Create+a+GitHub+PR+that+adds+a+new+/api/register+endpoint+in+FastAPI',
        role: 'solo-founder',
      },
      {
        title: 'Bug Fix & Test Update PR',
        description:
          'Fix the KeyError in `user_data.py` when `email` is missing with proper error handling',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Fix+the+KeyError+in+user_data.py+when+email+is+missing',
        role: 'solo-founder',
      },
      {
        title: 'Documentation Generation',
        description:
          'Generate a README.md for the Flask app repository with setup and example requests',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Generate+a+README.md+for+the+Flask+app+repository',
        role: 'solo-founder',
      },

      // Engineering Manager
      {
        title: 'Async Refactor & PR',
        description:
          'Refactor the `process_data` function to use `asyncio` with compatibility adapters',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Refactor+the+process_data+function+to+use+asyncio',
        role: 'engineering-manager',
      },
      {
        title: 'Structured Logging Integration PR',
        description:
          'Add structured logging to `user_authentication` module using `structlog`',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Add+structured+logging+to+user_authentication+module',
        role: 'engineering-manager',
      },
      {
        title: 'Code Review Summary',
        description:
          'Summarize changes in PR #456, noting performance implications and race conditions',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Summarize+the+changes+in+PR+456+noting+performance+implications',
        role: 'engineering-manager',
      },

      // Scrum Master
      {
        title: 'Sprint Goal Update PR',
        description:
          'Update `docs/sprint_goal.md` to reflect new OKRs with user engagement metrics',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Update+docs/sprint_goal.md+to+reflect+new+OKRs',
        role: 'scrum-master',
      },
      {
        title: 'Automated Retro Report PR',
        description:
          'Create a Python script to parse JIRA retrospective comments and generate reports',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Create+a+Python+script+to+parse+JIRA+retrospective+comments',
        role: 'scrum-master',
      },
      {
        title: 'Definition of Done Draft',
        description:
          'Draft `docs/definition_of_done.md` with code review and testing requirements',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Draft+docs/definition_of_done.md+with+code+review+requirements',
        role: 'scrum-master',
      },

      // Technical Program Manager
      {
        title: 'Gantt Chart Generator PR',
        description:
          'Create a PR that adds `scripts/gantt_generator.py` to read backlog and calculate dates',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Create+a+PR+that+adds+scripts/gantt_generator.py',
        role: 'tpm',
      },
      {
        title: 'Migration Script PR',
        description:
          'Implement `migrations/mysql_to_pg.py` with data validation and rollback capability',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Implement+migrations/mysql_to_pg.py+with+data+validation',
        role: 'tpm',
      },
      {
        title: 'Resource Allocator Script PR',
        description:
          'Add `scripts/allocate_resources.py` to distribute tasks evenly based on team capacity',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Add+scripts/allocate_resources.py+to+distribute+tasks+evenly',
        role: 'tpm',
      },

      // QA Engineer
      {
        title: 'Error Handling & User Feedback',
        description:
          'Implement graceful error recovery with user-friendly messages and retry logic',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Implement+graceful+error+recovery+with+user-friendly+messages',
        role: 'qa-engineer',
      },
      {
        title: 'Form Validation & UX',
        description:
          'Build real-time validation with helpful error states and mobile optimization',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Build+real-time+validation+with+helpful+error+states',
        role: 'qa-engineer',
      },
      {
        title: 'Accessibility Improvements',
        description:
          'Add ARIA labels, keyboard navigation, and screen reader support throughout app',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Add+ARIA+labels+keyboard+navigation+and+screen+reader+support',
        role: 'qa-engineer',
      },

      // Solutions Architect
      {
        title: 'Performance Optimizations',
        description:
          'Implement caching layers, query optimization, and performance monitoring',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Implement+caching+layers+query+optimization+and+performance+monitoring',
        role: 'solutions-architect',
      },
      {
        title: 'Search & Filtering Systems',
        description:
          'Build Elasticsearch integration with full-text search and faceted filtering',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Build+Elasticsearch+integration+with+full-text+search',
        role: 'solutions-architect',
      },
      {
        title: 'Multi-tenancy & Permissions',
        description:
          'Implement RBAC with team workspaces, data isolation, and granular permissions',
        href: 'https://chat.openai.com/?q=Please+use+thoughtful+codex+prompt+design+to+write+a+meaningful+prompt+to+send+our+engineering+AI+agent+to+accomplish+the+task%3A+Implement+RBAC+with+team+workspaces+and+data+isolation',
        role: 'solutions-architect',
      },
    ],
  },
];
