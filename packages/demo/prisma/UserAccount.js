const { ClassNames } = require('@emotion/react')

// formConfig.js
const wrapper = {
  type: 'FormControl',
  importPath: '@mui/material/FormControl',
}
const label = {
  type: 'FormLabel',
  importPath: '@mui/material/FormLabel',
}
module.exports = {
  props: {
    className: 'container flex flex-col mx-auto py-12 gap-6',
  },
  fields: [
    {
      name: 'profile_picture',
      component: {
        type: 'input',
        props: { type: 'file', accept: 'image/*' },
      },
      wrapper,
      include: true,
    },
    {
      name: 'full_name',
      wrapper,
      component: {
        type: 'TextField',
        props: {
          label: 'Full name',
          variant: 'standard',
        },
        importPath: '@mui/material/TextField',
      },
    },
    {
      name: 'emailAddress',
      wrapper,
      component: {
        type: 'TextField',
        props: {
          label: 'Email',
          variant: 'standard',
        },
        importPath: '@mui/material/TextField',
      },
      include: true,
    },
    {
      name: 'createdAt',
      component: {
        type: 'DatePicker',
        importPath: '@mui/x-date-pickers/DatePicker',
        namedImport: true,
      },
      label: {
        text: 'Created at',
        ...label,
      },
      wrapper,
      include: true,
    },
    {
      name: 'notifications',
      component: {
        type: 'Switch',
        importPath: '@mui/material/Switch',
      },
      label: {
        text: 'Notifications',
        ...label,
      },
      wrapper,
      include: true,
    },
    {
      name: 'rating',
      component: {
        type: 'Rating',
        importPath: '@mui/material/Rating',
      },
      label: {
        text: 'Rating',
        ...label,
      },
      wrapper,
      include: true,
    },
    {
      name: 'category',
      component: {
        type: 'Select',
        importPath: '@mui/material/Select',
        options: {
          enum: 'productCategory',
          component: {
            type: 'MenuItem',
            importPath: '@mui/material/MenuItem',
            label: 'name',
          },
          props: {},
        },
      },
      label: {
        text: 'Category',
        ...label,
      },
      wrapper,
      include: true,
    },
  ],
  additionalImports: [],
  showErrors: true,
  renderController: true,
  submitButton: {
    type: 'Button',
    importPath: '@mui/material/Button',
  },
}
