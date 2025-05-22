import { defineRocketConfig } from 'config-rocket'

export default defineRocketConfig({
  parameters: [{
    id: '$input-DEFAULT_MINIMUM_TOKENS',
    resolver: {
      operation: 'prompt',
      label: 'Set the minimum token count for documentation retrieval:',
      type: 'text',
      initial: '10000',
    },
  }],

  variablesResolver: {
    '{{DEFAULT_MINIMUM_TOKENS}}': '$input-DEFAULT_MINIMUM_TOKENS',
  },
})
