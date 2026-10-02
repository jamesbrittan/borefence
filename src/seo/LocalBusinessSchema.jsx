import { localBusinessSchema } from './structuredData';

const LocalBusinessSchema = () => (
  <script type="application/ld+json">{JSON.stringify(localBusinessSchema())}</script>
);

export default LocalBusinessSchema;
