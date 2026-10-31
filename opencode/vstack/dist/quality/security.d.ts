/**
 * Security checks and validation
 * Handles dependency scanning, secret detection, and security reviews
 */
import { VstackPaths } from "../persistence/repository-root.js";
export interface SecurityConfig {
    dependencyScan: boolean;
    secretScan: boolean;
    licenseScan: boolean;
    sastScan: boolean;
    timeout: number;
}
export interface SecurityResult {
    dependencyVulnerabilities: VulnerabilityResult[];
    secrets: SecretResult[];
    licenses: LicenseResult[];
    sastFindings: SastFinding[];
    overallRisk: "low" | "medium" | "high" | "critical";
}
export interface VulnerabilityResult {
    package: string;
    version: string;
    vulnerabilityId: string;
    severity: "critical" | "high" | "medium" | "low";
    title: string;
    description: string;
    fixedVersion?: string;
    references: string[];
}
export interface SecretResult {
    file: string;
    line: number;
    type: string;
    entropy: number;
    redactedValue: string;
}
export interface LicenseResult {
    package: string;
    version: string;
    license: string;
    licenseType: "permissive" | "copyleft" | "unknown" | "problematic";
    issues: string[];
}
export interface SastFinding {
    file: string;
    line: number;
    ruleId: string;
    severity: "critical" | "high" | "medium" | "low" | "info";
    message: string;
    category: string;
}
/**
 * Create security manager
 */
export declare function createSecurityManager(paths: VstackPaths): Promise<{
    /**
     * Run all security checks
     */
    runSecurityChecks(config: SecurityConfig, deliveryId: string, taskId: string | null, phaseRunId: string | null, commitRef: string, projectRoot: string): Promise<SecurityResult>;
    /**
     * Scan for dependency vulnerabilities
     */
    scanDependencies(projectRoot: string): Promise<VulnerabilityResult[]>;
    /**
     * Scan for secrets
     */
    scanSecrets(projectRoot: string): Promise<SecretResult[]>;
    /**
     * Scan licenses
     */
    scanLicenses(projectRoot: string): Promise<LicenseResult[]>;
    /**
     * Run SAST scan
     */
    runSastScan(projectRoot: string): Promise<SastFinding[]>;
    /**
     * Calculate overall risk
     */
    calculateOverallRisk(results: SecurityResult): "low" | "medium" | "high" | "critical";
}>;
//# sourceMappingURL=security.d.ts.map