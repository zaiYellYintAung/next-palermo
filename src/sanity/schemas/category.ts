export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'subcategories',
      title: 'Subcategories',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
      description: 'Subcategories within this category',
    },
    {
      name: 'extras',
      title: 'Extras',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'extra'}]}],
      description: 'Optional extras applicable to this category',
    },
    {
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'menuItem'}]}],
      description: 'Menu items belonging to this category or subcategory',
    },
  ],
}
