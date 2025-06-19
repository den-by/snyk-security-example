#!/usr/bin/env node

import express, { Request, Response } from 'express';
import _ from 'lodash';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

interface ApiResponse {
  message: string;
  version: string;
  timestamp: string;
  lodashVersion: string;
}

interface HealthResponse {
  status: string;
  uptime: number;
  memory: NodeJS.MemoryUsage;
}

interface ProcessDataRequest {
  data?: Record<string, unknown>[];
}

interface ProcessedItem {
  processed: boolean;
  timestamp: number;
  [key: string]: unknown;
}

interface ProcessDataResponse {
  original: Record<string, unknown>[];
  processed: ProcessedItem[];
  count: number;
}

app.get('/', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    message: 'Snyk Security Example API',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    lodashVersion: _.VERSION,
  });
});

app.get('/health', (req: Request, res: Response<HealthResponse>) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// Example endpoint using lodash (potentially vulnerable version)
app.post(
  '/process-data',
  (
    req: Request<
      Record<string, never>,
      ProcessDataResponse,
      ProcessDataRequest
    >,
    res: Response<ProcessDataResponse | { error: string }>
  ): void => {
    const { data } = req.body;

    if (!data) {
      res.status(400).json({ error: 'Data is required' });
      return;
    }

    // Using lodash to process data
    const processed: ProcessedItem[] = _.map(
      data,
      (item: Record<string, unknown>) => ({
        ...item,
        processed: true,
        timestamp: Date.now(),
      })
    );

    res.json({
      original: data,
      processed: processed,
      count: _.size(processed),
    });
  }
);

export default function main(): void {
  app.listen(PORT, () => {
    console.log(`🚀 Snyk Security Example running on port ${PORT}`);
    console.log(`📊 Using lodash version: ${_.VERSION}`);
    console.log('🔒 This project demonstrates Snyk vulnerability scanning');
  });
  return;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
