import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { ensureVstackDirs, resolveVstackRoot, VstackPaths } from "../src/persistence/repository-root.js";

export interface TestWorkspace {
  root: string;
  paths: VstackPaths;
  cleanup(): void;
}

export async function createTestWorkspace(): Promise<TestWorkspace> {
  const root = mkdtempSync(join(tmpdir(), "vstack-test-"));
  const paths = await resolveVstackRoot(root);
  await ensureVstackDirs(paths);
  return {
    root,
    paths,
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}
