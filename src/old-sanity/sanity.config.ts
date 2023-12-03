import {defineConfig } from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import { documentInternationalization } from '@sanity/document-internationalization';
import {i18n} from '../i18n-config'


export default defineConfig({
  basePath: '/admin',
  name: 'palermo',
  title: 'Palermo Admin',
  projectId: '3yge6exu',
  dataset: 'production',

  plugins: [deskTool(), visionTool(),
  documentInternationalization({
    supportedLanguages: i18n.languages,
    schemaTypes: schemaTypes
  })
  
  ],

  schema: {
    types: schemaTypes,
  },
})
