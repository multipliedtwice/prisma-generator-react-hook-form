export function generatePropsString(props?: { [key: string]: any }) {
  if (!props) {
    return ''
  }

  return Object.entries(props)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `${key}="${value.replace(/"/g, '&quot;')}"` // Escape double quotes
      } else if (
        typeof value === 'boolean' ||
        typeof value === 'number' ||
        value === null
      ) {
        return `${key}={${value}}`
      } else {
        // JSON.stringify can be used here, but we need to ensure it’s escaped properly for JSX
        const stringifiedValue = JSON.stringify(value).replace(/"/g, '&quot;')
        return `${key}={${stringifiedValue}}`
      }
    })
    .join(' ')
}
