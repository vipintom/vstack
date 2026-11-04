export const gates = [
  { slug: 'verification', name: 'Verification Gate', description: 'Ensures all verification checks pass before proceeding.' },
  { slug: 'review', name: 'Review Gate', description: 'Requires code review approval before merging.' },
  { slug: 'security', name: 'Security Gate', description: 'Runs security scans and vulnerability checks.' },
  { slug: 'performance', name: 'Performance Gate', description: 'Validates performance benchmarks and regression thresholds.' },
  { slug: 'lint', name: 'Lint Gate', description: 'Enforces code style and linting rules.' },
  { slug: 'test', name: 'Test Gate', description: 'Requires all tests to pass before deployment.' },
];