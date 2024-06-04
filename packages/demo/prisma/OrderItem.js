module.exports = {
  fields: [
    {
      name: 'ProductName',
      component: {
        type: 'TextField',
        importPath: '@mui/material/TextField',
        props: { variant: 'outlined', fullWidth: true },
      },
      include: true,
    },
    {
      name: 'quantity',
      component: {
        type: 'TextField',
        importPath: '@mui/material/TextField',
        props: { variant: 'outlined', fullWidth: true },
      },
      include: true,
    },
  ],
  showErrors: true,
  renderController: true,
  submitButton: {
    type: 'Button',
    importPath: '@mui/material/Button',
    props: { variant: 'contained', color: 'primary' },
  },
}
