/**
 * Canonical Website Data - Main Export
 * 
 * This is the single entry point for all website data.
 * All data is derived from verified upstream sources (Phase 1)
 * and follows the data architecture defined in Phase 2.
 */

// Types
export * from './types.js';

// Products
export {
  playbookProduct,
  opencodePluginProduct,
  openchamberProduct,
  allProducts,
  type ProductId,
  getProductById,
} from './products.js';

// Releases
export {
  integratedRelease,
  releaseComponents,
  releaseCompatibility,
  releaseTerminology,
  getComponentById,
  getComponentRepositoryUrl,
  getComponentTagUrl,
  getComponentCommitUrl,
  formatReleaseContext,
  getReleaseBadgeText,
} from './releases.js';

// Capabilities
export {
  allCapabilities,
  capabilityCategories,
  capabilitySummary,
  harnessSummary,
  capabilityData,
  getCapabilitiesByComponent,
  getCapabilitiesByCategory,
  getCapabilityById,
  getCapabilitiesByStatus,
} from './capabilities.js';

// Editorial
export {
  primaryNavigation,
  footerNavigation,
  heroContent,
  productIntros,
  architectureSummary,
  productComparison,
  gettingStarted,
  releaseInfo,
  allEditorialContent,
  getEditorialContentById,
  getEditorialContentByTarget,
} from './editorial.js';

// ============================================================================
// Data Validation Functions
// ============================================================================

import type {
  ValidationResult,
  ValidationError,
  ValidationWarning,
  ProductData,
  ReleaseData,
  CapabilityData,
} from './types.js';
import { playbookProduct, opencodePluginProduct, openchamberProduct } from './products.js';
import { integratedRelease } from './releases.js';
import { capabilityData } from './capabilities.js';

/**
 * Validate product data integrity
 */
export function validateProductData(product: ProductData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Required identity fields
  if (!product.identity.id) errors.push({ path: 'identity.id', message: 'Product ID is required', code: 'MISSING_ID' });
  if (!product.identity.name) errors.push({ path: 'identity.name', message: 'Product name is required', code: 'MISSING_NAME' });
  if (!product.identity.version) errors.push({ path: 'identity.version', message: 'Product version is required', code: 'MISSING_VERSION' });
  if (!product.identity.versionContext) errors.push({ path: 'identity.versionContext', message: 'Version context is required', code: 'MISSING_VERSION_CONTEXT' });
  if (!product.identity.provenance) errors.push({ path: 'identity.provenance', message: 'Provenance is required', code: 'MISSING_PROVENANCE' });

  // Provenance completeness
  if (product.identity.provenance) {
    if (!product.identity.provenance.repository) warnings.push({ path: 'identity.provenance.repository', message: 'Provenance missing repository', code: 'INCOMPLETE_PROVENANCE' });
    if (!product.identity.provenance.revision) warnings.push({ path: 'identity.provenance.revision', message: 'Provenance missing revision', code: 'INCOMPLETE_PROVENANCE' });
    if (!product.identity.provenance.verifiedAt) warnings.push({ path: 'identity.provenance.verifiedAt', message: 'Provenance missing verification date', code: 'INCOMPLETE_PROVENANCE' });
  }

  // Installation paths
  if (product.installation.length === 0) {
    warnings.push({ path: 'installation', message: 'No installation paths defined', code: 'NO_INSTALLATION_PATHS' });
  }

  // Capabilities summary consistency
  if (product.capabilities.total < 0) {
    errors.push({ path: 'capabilities.total', message: 'Capability total cannot be negative', code: 'INVALID_CAPABILITY_COUNT' });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate release data integrity
 */
export function validateReleaseData(release: ReleaseData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  if (!release.release) errors.push({ path: 'release', message: 'Release identifier is required', code: 'MISSING_RELEASE_ID' });
  if (!release.releasedAt) errors.push({ path: 'releasedAt', message: 'Release date is required', code: 'MISSING_RELEASE_DATE' });
  if (release.components.length === 0) errors.push({ path: 'components', message: 'At least one component is required', code: 'NO_COMPONENTS' });

  // Validate each component
  for (let i = 0; i < release.components.length; i++) {
    const comp = release.components[i];
    if (!comp.id) errors.push({ path: `components[${i}].id`, message: 'Component ID is required', code: 'MISSING_COMPONENT_ID' });
    if (!comp.version) errors.push({ path: `components[${i}].version`, message: 'Component version is required', code: 'MISSING_COMPONENT_VERSION' });
    if (!comp.commit) warnings.push({ path: `components[${i}].commit`, message: 'Component missing commit SHA', code: 'MISSING_COMMIT' });
  }

  // Compatibility scope clarification
  if (!release.compatibility.scope) {
    warnings.push({ path: 'compatibility.scope', message: 'Compatibility scope not explicitly defined', code: 'MISSING_SCOPE' });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate capability data integrity
 */
export function validateCapabilityData(data: CapabilityData): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check for duplicate IDs
  const idSet = new Set<string>();
  for (const cap of data.capabilities) {
    if (idSet.has(cap.id)) {
      errors.push({ path: `capabilities[${cap.id}]`, message: `Duplicate capability ID: ${cap.id}`, code: 'DUPLICATE_ID' });
    }
    idSet.add(cap.id);

    // Validate status values
    const validStatuses = ['full', 'partial', 'planned', 'none', 'unknown'];
    for (const [harness, status] of Object.entries(cap.status)) {
      if (!validStatuses.includes(status)) {
        errors.push({ path: `capabilities[${cap.id}].status.${harness}`, message: `Invalid status: ${status}`, code: 'INVALID_STATUS' });
      }
    }

    // Provenance
    if (!cap.provenance) {
      warnings.push({ path: `capabilities[${cap.id}].provenance`, message: 'Capability missing provenance', code: 'MISSING_PROVENANCE' });
    }
  }

  // Category consistency
  for (const cat of data.byCategory) {
    if (cat.capabilities.length !== cat.count) {
      warnings.push({ path: `byCategory[${cat.name}].count`, message: 'Category count mismatch', code: 'COUNT_MISMATCH' });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate all data
 */
export function validateAllData(): {
  products: {
    playbook: ValidationResult;
    opencode: ValidationResult;
    openchamber: ValidationResult;
  };
  releases: ValidationResult;
  capabilities: ValidationResult;
} {
  return {
    products: {
      playbook: validateProductData(playbookProduct),
      opencode: validateProductData(opencodePluginProduct),
      openchamber: validateProductData(openchamberProduct),
    },
    releases: validateReleaseData(integratedRelease),
    capabilities: validateCapabilityData(capabilityData),
  };
}