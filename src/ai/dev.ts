import { config } from 'dotenv';
config();

import '@/ai/flows/categorize-civic-issues.ts';
import '@/ai/flows/summarize-issue-reports.ts';