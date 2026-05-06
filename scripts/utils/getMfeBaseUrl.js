const APP_ENV = process.env.NODE_ENV ?? 'local';

const BASES = {
  'enterprise-scalable-practice-auth-mfe': {
    local: 'http://localhost:9001',
    staging:
      'https://stage.app.enterprise.io/enterprise-scalable-practice-auth-mfe',
    production:
      'https://app.enterprise.io/enterprise-scalable-practice-auth-mfe',
  },
  'enterprise-scalable-practice-design-mfe': {
    local: 'http://localhost:9002',
    staging:
      'https://stage.app.enterprise.io/enterprise-scalable-practice-design-mfe',
    production:
      'https://app.enterprise.io/enterprise-scalable-practice-design-mfe',
  },
  'enterprise-scalable-practice-data-mfe': {
    local: 'http://localhost:9003',
    staging:
      'https://stage.app.enterprise.io/enterprise-scalable-practice-data-mfe',
    production:
      'https://app.enterprise.io/enterprise-scalable-practice-data-mfe',
  },
  'enterprise-scalable-practice-dashboard-mfe': {
    local: 'http://localhost:9004',
    staging:
      'https://stage.app.enterprise.io/enterprise-scalable-practice-dashboard-mfe',
    production:
      'https://app.enterprise.io/enterprise-scalable-practice-dashboard-mfe',
  },
};

export function getMfeBaseUrl(name) {
  const env = APP_ENV === 'development' ? 'local' : APP_ENV;
  const map = BASES[name];
  if (!map) throw new Error(`Unknown MFE: ${name}`);
  return map[env];
}
