// // sanity.config.ts

// import { defineConfig } from 'sanity';
// import { deskTool } from 'sanity/desk';
// import { visionTool } from '@sanity/vision';
// import { schemaTypes } from './schemas';
// import { documentInternationalization } from '@sanity/document-internationalization';
// import { i18n } from '../i18n-config';

// export default defineConfig({
//   basePath: '/admin',
//   name: 'palermo',
//   title: 'Palermo Admin',
//   projectId: '3yge6exu',
//   dataset: 'production',

//   plugins: [
//     deskTool(),
//     visionTool(),
//     documentInternationalization({
//       supportedLanguages: i18n.languages,
//       schemaTypes: schemaTypes,
//     }),
//   ],

//   schema: {
//     types: schemaTypes,
//   },
// });

// // sanity.client.ts

// import { createClient } from 'next-sanity';

// export const projectId = '3yge6exu';
// export const dataset = 'production';
// const apiVersion = '2022-11-25';
// const useCdn = process.env.NODE_ENV === 'production';

// export const client = createClient({
//   projectId,
//   dataset,
//   apiVersion,
//   useCdn,
// });
