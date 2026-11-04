/**
 * Canonical Website Data Types
 * 
 * These types define the website's internal data representation.
 * They are derived from upstream sources but owned by the website.
 * Source provenance is tracked for all technical claims.
 */

// ============================================================================
// Source Provenance
// ============================================================================

export interface SourceProvenance {
  /** Source repository (e.g., 'vipintom/vstack-playbook') */
  repository: string;
  /** Source file or path within repository */
  path: string;
  /** Git commit SHA or release tag */
  revision: string;
  /** Date of verification */
  verifiedAt: string;
  /** Type of data this provenance covers */
  category: 'product' | 'capability' | 'release' | 'installation' | 'editorial';
  /** Any transformations applied during ingestion */
  transformations?: string[];
}

/**
 * Classification of evidence quality
 */
export type EvidenceClassification = 
  | 'verified'           // Directly supported by authoritative evidence
  | 'partially-verified' // Evidence exists but doesn't establish complete claim
  | 'unknown'            // Evidence insufficient
  | 'conflicting'        // Sources disagree
  | 'not-applicable';    // Field doesn't apply

// ============================================================================
// Product Data
// ============================================================================

export interface ProductIdentity {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Short description for listings */
  shortDescription: string;
  /** Full description for product page */
  description: string;
  /** Repository URL */
  repository: string;
  /** Package name (npm or other) */
  packageName?: string;
  /** Current version */
  version: string;
  /** Version context (e.g., 'integrated-release:vstack-2026.11.03') */
  versionContext: string;
  /** Primary purpose/value proposition */
  purpose: string;
  /** Independent value (can be used without other components) */
  independentValue: string;
  /** Known limitations */
  limitations?: string[];
  /** Source provenance */
  provenance: SourceProvenance;
}

export interface ProductDependency {
  /** Dependency name */
  name: string;
  /** Package identifier */
  package?: string;
  /** Version constraint */
  version?: string;
  /** Type of dependency */
  type: 'required' | 'peer' | 'optional' | 'companion' | 'development';
  /** Description of why this dependency exists */
  description: string;
  /** Source provenance */
  provenance: SourceProvenance;
}

export interface ProductCapabilitySummary {
  /** Total capabilities */
  total: number;
  /** By status */
  byStatus: Record<string, number>;
  /** By category */
  byCategory: Record<string, number>;
  /** Source provenance */
  provenance: SourceProvenance;
}

export interface ProductInstallationPath {
  /** Unique identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Installation command */
  command: string;
  /** Prerequisites */
  prerequisites: string[];
  /** Required dependencies */
  dependencies: ProductDependency[];
  /** Verification level */
  verification: 'documentation-verified' | 'execution-verified' | 'not-verified';
  /** Version context */
  versionContext: string;
  /** Official documentation URL */
  documentationUrl: string;
  /** Source provenance */
  provenance: SourceProvenance;
}

export interface ProductData {
  identity: ProductIdentity;
  dependencies: ProductDependency[];
  capabilities: ProductCapabilitySummary;
  installation: ProductInstallationPath[];
  documentationUrls: Array<{
    label: string;
    url: string;
    provenance: SourceProvenance;
  }>;
  releaseContext: string;
}

// ============================================================================
// Release Data
// ============================================================================

export interface ReleaseComponent {
  /** Component identifier */
  id: string;
  /** Display name */
  name: string;
  /** Repository */
  repository: string;
  /** Version */
  version: string;
  /** Git tag */
  tag: string;
  /** Git commit SHA */
  commit: string;
  /** Source provenance */
  provenance: SourceProvenance;
}

export interface ReleaseCompatibility {
  /** Status from integrated release */
  status: string;
  /** Notes from integrated release */
  notes: string;
  /** Evidence summary */
  evidenceSummary: string;
  /** Scope clarification */
  scope: string;
  /** Source provenance */
  provenance: SourceProvenance;
}

export interface ReleaseData {
  /** Schema version */
  schemaVersion: number;
  /** Release identifier */
  release: string;
  /** Release date */
  releasedAt: string;
  /** Components in this release */
  components: ReleaseComponent[];
  /** Protocol version */
  protocolVersion: string;
  /** Compatibility information */
  compatibility: ReleaseCompatibility;
  /** Source provenance for the entire release record */
  provenance: SourceProvenance;
}

// ============================================================================
// Capability Data
// ============================================================================

export interface CapabilityEntry {
  /** Unique identifier (skill ID) */
  id: string;
  /** Display name */
  name: string;
  /** Category */
  category: string;
  /** Component providing this capability */
  component: 'playbook' | 'opencode' | 'openchamber';
  /** Short description */
  description: string;
  /** Availability status per harness */
  status: {
    opencode: 'full' | 'partial' | 'planned' | 'none' | 'unknown';
    codex: 'full' | 'partial' | 'planned' | 'none' | 'unknown';
    claudeCode: 'full' | 'partial' | 'planned' | 'none' | 'unknown';
  };
  /** Notes about support */
  notes?: string;
  /** Documentation reference */
  documentationRef?: string;
  /** Version or release context */
  versionContext: string;
  /** Source provenance */
  provenance: SourceProvenance;
  /** Evidence classification */
  evidence: EvidenceClassification;
}

export interface CapabilityCategory {
  /** Category name */
  name: string;
  /** Capabilities in this category */
  capabilities: CapabilityEntry[];
  /** Total count */
  count: number;
  /** Counts by status per component */
  summary: {
    playbook: Record<string, number>;
    opencode: Record<string, number>;
    openchamber: Record<string, number>;
  };
}

export interface CapabilityData {
  /** All capabilities */
  capabilities: CapabilityEntry[];
  /** Grouped by category */
  byCategory: CapabilityCategory[];
  /** Summary statistics */
  summary: {
    total: number;
    byComponent: Record<string, number>;
    byStatus: Record<string, Record<string, number>>;
    byCategory: Record<string, number>;
  };
  /** Source provenance for the dataset */
  provenance: SourceProvenance;
}

// ============================================================================
// Editorial Data (Website-Owned)
// ============================================================================

export interface EditorialContent {
  /** Unique identifier */
  id: string;
  /** Content type */
  type: 'hero' | 'product-intro' | 'architecture-summary' | 'comparison' | 'getting-started' | 'other';
  /** Target page/section */
  target: string;
  /** Title */
  title: string;
  /** Content body (markdown) */
  body: string;
  /** Source note (for transparency) */
  sourceNote?: string;
}

export interface NavigationItem {
  /** Label */
  label: string;
  /** Href (base-path aware) */
  href: string;
  /** Children for dropdowns */
  children?: NavigationItem[];
  /** Whether this is an external link */
  external?: boolean;
}

// ============================================================================
// Data Validation
// ============================================================================

export interface ValidationResult {
  /** Whether validation passed */
  valid: boolean;
  /** Errors found */
  errors: ValidationError[];
  /** Warnings */
  warnings: ValidationWarning[];
}

export interface ValidationError {
  /** Field path */
  path: string;
  /** Error message */
  message: string;
  /** Error code */
  code: string;
}

export interface ValidationWarning {
  /** Field path */
  path: string;
  /** Warning message */
  message: string;
  /** Warning code */
  code: string;
}