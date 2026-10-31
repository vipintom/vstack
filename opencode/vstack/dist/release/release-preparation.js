/**
 * Release preparation and management
 * Handles versioning, changelogs, artifact validation, and release candidate creation
 */
import { readJsonFile, writeJsonFile } from "../persistence/file-store.js";
import { appendEvent, EventPayloads } from "../persistence/event-log.js";
import { resolve } from "node:path";
/**
 * Create release manager
 */
export async function createReleaseManager(paths) {
    return {
        /**
         * Prepare a release candidate
         */
        async prepareRelease(deliveryId, versionType, config) {
            // Get current version
            const currentVersion = await this.getCurrentVersion();
            const newVersion = this.calculateVersion(currentVersion, versionType);
            // Generate changelog
            const changelog = await this.generateChangelog(deliveryId, newVersion);
            // Build and validate artifacts
            const artifacts = await this.buildArtifacts(config);
            const validationResults = await this.validateArtifacts(artifacts, config);
            const releaseCandidate = {
                version: newVersion,
                type: versionType,
                changelog,
                artifacts,
                validationResults,
                status: config.requireApproval ? "pending_approval" : "approved",
                createdAt: new Date().toISOString(),
            };
            // Save release candidate
            const rcPath = resolve(paths.deliveries, deliveryId, "release-candidate.json");
            await writeJsonFile(paths, rcPath, releaseCandidate);
            // Log event
            await appendEvent(paths, EventPayloads.deliveryCreated(deliveryId, "Release Candidate", "release", { type: "plugin", id: "release-prep" }, { type: "delivery", id: releaseCandidate.version }));
            return releaseCandidate;
        },
        /**
         * Get current version from package.json or git tags
         */
        async getCurrentVersion() {
            // Check package.json
            // Check git tags
            return "0.0.0";
        },
        /**
         * Calculate next version
         */
        calculateVersion(current, type) {
            const parts = current.split(".").map(Number);
            if (parts.length !== 3)
                return "1.0.0";
            const major = parts[0] ?? 0;
            const minor = parts[1] ?? 0;
            const patch = parts[2] ?? 0;
            switch (type) {
                case "major": return `${major + 1}.0.0`;
                case "minor": return `${major}.${minor + 1}.0`;
                case "patch": return `${major}.${minor}.${patch + 1}`;
                case "prerelease": return `${major}.${minor}.${patch + 1}-rc.1`;
                default: return current;
            }
        },
        /**
         * Generate changelog from delivery history
         */
        async generateChangelog(deliveryId, version) {
            // Would fetch from delivery history, commits, etc.
            return `# Changelog

## [${version}] - ${new Date().toISOString().split("T")[0]}

### Added
- Feature from delivery

### Changed
- Updates from delivery

### Fixed
- Bug fixes from delivery
`;
        },
        /**
         * Build release artifacts
         */
        async buildArtifacts(config) {
            // Would run build commands
            return [];
        },
        /**
         * Validate release artifacts
         */
        async validateArtifacts(artifacts, config) {
            return [];
        },
        /**
         * Approve release candidate
         */
        async approveRelease(deliveryId, approvedBy) {
            const rcPath = resolve(paths.deliveries, deliveryId, "release-candidate.json");
            const rc = await readJsonFile(paths, rcPath);
            if (!rc)
                throw new Error("No release candidate found");
            rc.status = "approved";
            rc.approvedAt = new Date().toISOString();
            rc.approvedBy = approvedBy;
            await writeJsonFile(paths, resolve(paths.deliveries, deliveryId, "release-candidate.json"), rc);
            return rc;
        },
        /**
         * Publish release
         */
        async publishRelease(deliveryId, config) {
            const rcPath = resolve(paths.deliveries, deliveryId, "release-candidate.json");
            const rc = await readJsonFile(paths, rcPath);
            if (!rc || rc.status !== "approved") {
                throw new Error("Release candidate not approved");
            }
            // Publish to npm registry
            if (config.publishToRegistry) {
                // await executeCommand(["npm", "publish"], { cwd: ".", timeout: 120000 });
            }
            // Create git tag
            // await executeCommand(["git", "tag", `v${rc.version}`], { cwd: "." });
            // await executeCommand(["git", "push", "origin", `v${rc.version}`], { cwd: "." });
            rc.status = "published";
            rc.publishedAt = new Date().toISOString();
            await writeJsonFile(paths, resolve(paths.deliveries, deliveryId, "release-candidate.json"), rc);
            // Log event
            // await appendEvent(paths, EventPayloads.releasePublished(deliveryId, rc.version));
        },
    };
}
//# sourceMappingURL=release-preparation.js.map