/**
 * Check discovery.
 *
 * Reads project manifests and task files to infer runnable checks. No
 * hard-coded commands: every check comes from the project's own config.
 */
import { EvidenceType } from "../schemas/types.js";
export type CheckSource = "package.json" | "turbo.json" | "makefile" | "justfile" | "ci";
export interface DiscoveredCheck {
    id: string;
    type: EvidenceType;
    command: string[];
    workingDirectory: string;
    source: CheckSource;
    description?: string;
}
export declare function discoverChecks(projectRoot: string): Promise<DiscoveredCheck[]>;
//# sourceMappingURL=check-discovery.d.ts.map