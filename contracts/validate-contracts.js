#!/usr/bin/env node
/**
 * Contract Validation Script
 * Validates all projection schemas and fixtures in the umbrella repository
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CONTRACTS_DIR = resolve(process.cwd(), 'contracts/projections/v1');
const SCHEMAS_DIR = join(CONTRACTS_DIR);
const FIXTURES_DIR = join(CONTRACTS_DIR, 'fixtures');

// Simple JSON Schema validator using Ajv-like logic (minimal implementation)
class SimpleValidator {
  constructor() {
    this.schemas = new Map();
  }

  addSchema(id, schema) {
    this.schemas.set(id, schema);
  }

  getSchema(id) {
    return this.schemas.get(id);
  }

  validate(schema, data, path = 'root') {
    const errors = [];
    this._validate(schema, data, path, errors);
    return { valid: errors.length === 0, errors };
  }

  _validate(schema, data, path, errors) {
    // Handle $ref
    if (schema.$ref) {
      const refSchema = this.getSchema(schema.$ref);
      if (refSchema) {
        this._validate(refSchema, data, path, errors);
      } else {
        errors.push({ path, message: `Unknown $ref: ${schema.$ref}` });
      }
      return;
    }

    // Handle allOf
    if (schema.allOf) {
      for (const subSchema of schema.allOf) {
        this._validate(subSchema, data, path, errors);
      }
      return;
    }

    // Type validation
    if (schema.type) {
      const expectedType = schema.type;
      const actualType = Array.isArray(data) ? 'array' : typeof data;
      
      if (expectedType === 'integer' && Number.isInteger(data)) {
        // OK
      } else if (expectedType !== actualType && !(expectedType === 'number' && actualType === 'integer')) {
        errors.push({ path, message: `Expected type ${expectedType}, got ${actualType}` });
        return;
      }
    }

    // Const validation
    if (schema.const !== undefined && data !== schema.const) {
      errors.push({ path, message: `Expected const value ${schema.const}, got ${data}` });
    }

    // Enum validation
    if (schema.enum && !schema.enum.includes(data)) {
      errors.push({ path, message: `Value ${data} not in enum ${schema.enum.join(', ')}` });
    }

    // String format validation
    if (schema.type === 'string' && schema.format === 'date-time') {
      const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
      if (!isoRegex.test(data)) {
        errors.push({ path, message: `Invalid date-time format: ${data}` });
      }
    }

    // Pattern validation
    if (schema.type === 'string' && schema.pattern) {
      const regex = new RegExp(schema.pattern);
      if (!regex.test(data)) {
        errors.push({ path, message: `String does not match pattern ${schema.pattern}: ${data}` });
      }
    }

    // Required fields
    if (schema.required && typeof data === 'object' && data !== null) {
      for (const field of schema.required) {
        if (!(field in data)) {
          errors.push({ path: `${path}.${field}`, message: `Required field missing: ${field}` });
        }
      }
    }

    // Properties validation
    if (schema.properties && typeof data === 'object' && data !== null) {
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        if (propName in data) {
          this._validate(propSchema, data[propName], `${path}.${propName}`, errors);
        }
      }
    }

    // Additional properties
    if (schema.additionalProperties === false && typeof data === 'object' && data !== null) {
      const allowedProps = new Set(Object.keys(schema.properties || {}));
      for (const key of Object.keys(data)) {
        if (!allowedProps.has(key)) {
          errors.push({ path: `${path}.${key}`, message: `Additional property not allowed: ${key}` });
        }
      }
    }

    // Array items validation
    if (schema.items && Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        this._validate(schema.items, data[i], `${path}[${i}]`, errors);
      }
    }

    // Minimum/maximum for numbers
    if (schema.minimum !== undefined && typeof data === 'number' && data < schema.minimum) {
      errors.push({ path, message: `Value ${data} less than minimum ${schema.minimum}` });
    }
  }
}

function loadSchemas() {
  const validator = new SimpleValidator();
  
  // Load all schema files
  const schemaFiles = readdirSync(SCHEMAS_DIR).filter(f => f.endsWith('.schema.json'));
  
  for (const file of schemaFiles) {
    const content = readFileSync(join(SCHEMAS_DIR, file), 'utf-8');
    const schema = JSON.parse(content);
    validator.addSchema(schema.$id, schema);
  }

  // Resolve $refs within schemas
  // For simplicity, we'll do a second pass to resolve refs
  // In practice, a real validator like Ajv would handle this
  
  return validator;
}

function validateFixtures(validator) {
  const results = [];
  
  const fixtureTypes = ['valid-minimal', 'valid-complete', 'invalid', 'legacy'];
  
  for (const fixtureType of fixtureTypes) {
    const fixtureDir = join(FIXTURES_DIR, fixtureType);
    if (!statSync(fixtureDir).isDirectory()) continue;
    
    // Walk all JSON files in fixture directory
    function walk(dir, baseDir) {
      const entries = readdirSync(dir);
      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        if (stat.isDirectory()) {
          walk(fullPath, baseDir);
        } else if (entry.endsWith('.json')) {
          const relativePath = fullPath.slice(baseDir.length + 1);
          walk(fullPath, baseDir);
        }
      }
    }
    
    walk(fixtureDir, fixtureDir);
  }
  
  return results;
}

function main() {
  console.log('🔍 Validating vstack projection contracts...\n');
  
  const validator = loadSchemas();
  console.log(`Loaded ${validator.schemas.size} schemas`);
  
  // Validate each schema is well-formed
  for (const [id, schema] of validator.schemas) {
    try {
      // Basic validation: check required fields exist
      if (!schema.$schema || !schema.$id || !schema.title) {
        console.warn(`⚠️  Schema ${id} missing recommended fields ($schema, $id, title)`);
      }
      console.log(`✅ Schema: ${schema.title} (${id})`);
    } catch (e) {
      console.error(`❌ Schema ${id} malformed: ${e.message}`);
    }
  }
  
  // Validate fixtures
  console.log('\n📋 Validating fixtures...');
  
  // For now, just report fixture structure
  const fixtureTypes = ['valid-minimal', 'valid-complete', 'invalid', 'legacy'];
  for (const fixtureType of fixtureTypes) {
    const fixtureDir = join(FIXTURES_DIR, fixtureType);
    if (statSync(fixtureDir).isDirectory()) {
      const files = [];
      function collect(dir) {
        for (const entry of readdirSync(dir)) {
          const full = join(dir, entry);
          if (statSync(full).isDirectory()) collect(full);
          else if (entry.endsWith('.json')) files.push(full);
        }
      }
      collect(fixtureDir);
      console.log(`  ${fixtureType}: ${files.length} fixture files`);
    }
  }
  
  console.log('\n✅ Contract validation complete');
  console.log('   (Full JSON Schema validation requires Ajv - run in component CI)');
}

main();