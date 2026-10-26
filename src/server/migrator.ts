import fs from 'fs';
import path from 'path';
import pg from 'pg';

export interface MigrationResult {
  version: string;
  filename: string;
  status: 'applied' | 'skipped' | 'failed';
  error?: string;
}

export class DatabaseMigrator {
  private pool: pg.Pool;

  constructor(pool: pg.Pool) {
    this.pool = pool;
  }

  async runMigrations(migrationsDir?: string): Promise<MigrationResult[]> {
    const dir = migrationsDir || path.resolve(process.cwd(), 'migrations');
    if (!fs.existsSync(dir)) {
      console.warn(`[Migrator] Directory ${dir} not found. Skipping SQL migrations.`);
      return [];
    }

    const files = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.sql'))
      .sort();

    const results: MigrationResult[] = [];
    const client = await this.pool.connect();

    try {
      // 1. Ensure schema_migrations exists
      await client.query(`
        CREATE TABLE IF NOT EXISTS schema_migrations (
          version VARCHAR(128) PRIMARY KEY,
          applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // 2. Fetch already applied versions
      const { rows: appliedRows } = await client.query<{ version: string }>(
        'SELECT version FROM schema_migrations'
      );
      const appliedVersions = new Set(appliedRows.map((r) => r.version));

      // 3. Process each migration file
      for (const file of files) {
        const version = file.replace(/\.sql$/, '');

        if (appliedVersions.has(version)) {
          results.push({ version, filename: file, status: 'skipped' });
          continue;
        }

        const sql = fs.readFileSync(path.join(dir, file), 'utf-8');

        try {
          await client.query('BEGIN');
          await client.query(sql);
          await client.query(
            'INSERT INTO schema_migrations (version, applied_at) VALUES ($1, CURRENT_TIMESTAMP)',
            [version]
          );
          await client.query('COMMIT');

          console.log(`[Migrator] Applied migration: ${file}`);
          results.push({ version, filename: file, status: 'applied' });
        } catch (err: any) {
          await client.query('ROLLBACK');
          console.error(`[Migrator] Failed applying ${file}:`, err);
          results.push({ version, filename: file, status: 'failed', error: err.message });
          throw err;
        }
      }

      return results;
    } finally {
      client.release();
    }
  }
}
