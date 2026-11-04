import { defineCollection, z } from 'astro:content';

const skills = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum([
      'Foundation',
      'Discovery',
      'Architecture',
      'Planning',
      'Verification',
      'Debug/Recovery',
      'Collaboration',
      'Review',
      'Continuity',
      'Delivery',
      'Extended',
      'Implementation',
      'Utils',
    ]),
    description: z.string(),
    triggers: z.array(z.string()).optional(),
    whenNotToUse: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    procedure: z.array(z.string()).optional(),
    outputs: z.array(z.string()).optional(),
    verification: z.string().optional(),
    failureHandling: z.record(z.string()).optional(),
    dependsOn: z.array(z.string()).optional(),
    related: z.array(z.string()).optional(),
    references: z.array(z.string()).optional(),
    harnessSupport: z.object({
      opencode: z.enum(['full', 'partial', 'planned', 'none']).optional(),
      codex: z.enum(['full', 'partial', 'planned', 'none']).optional(),
      claude: z.enum(['full', 'partial', 'planned', 'none']).optional(),
    }).optional(),
    status: z.enum(['stable', 'beta', 'experimental']).optional(),
  }),
});

const workflows = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    whenToUse: z.array(z.string()).optional(),
    whenNotToUse: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    steps: z.array(z.object({
      name: z.string(),
      description: z.string(),
      skills: z.array(z.string()).optional(),
      decisionPoints: z.array(z.string()).optional(),
    })).optional(),
    verification: z.string().optional(),
    rollback: z.string().optional(),
    related: z.array(z.string()).optional(),
    references: z.array(z.string()).optional(),
    riskLevel: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
    rigour: z.enum(['Quick', 'Standard', 'Advanced']).optional(),
  }),
});

const principles = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    statement: z.string(),
    rationale: z.string().optional(),
    triggers: z.array(z.string()).optional(),
    whenToApply: z.array(z.string()).optional(),
    whenNotToApply: z.array(z.string()).optional(),
    examples: z.array(z.object({
      positive: z.string(),
      negative: z.string(),
    })).optional(),
    related: z.array(z.string()).optional(),
    references: z.array(z.string()).optional(),
  }),
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    signature: z.string().optional(),
    parameters: z.record(z.any()).optional(),
    returns: z.string().optional(),
    examples: z.array(z.object({
      description: z.string(),
      code: z.string(),
    })).optional(),
    related: z.array(z.string()).optional(),
    references: z.array(z.string()).optional(),
  }),
});

const resources = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum([
      'research',
      'specification',
      'decision-record',
      'integration-guide',
      'migration-guide',
      'comparison',
      'reference',
    ]),
    description: z.string(),
    contentType: z.enum(['markdown', 'json', 'yaml', 'diagram']).optional(),
    sourcePath: z.string().optional(),
    related: z.array(z.string()).optional(),
    references: z.array(z.string()).optional(),
  }),
});

export const collections = {
  skills,
  workflows,
  principles,
  tools,
  resources,
};