/**
 * @typedef {Object} Product
 * @property {string} id - ID único do produto
 * @property {string} name - Nome do produto
 * @property {string} shortDescription - Descrição curta para o hero
 * @property {string} fullDescription - Descrição completa sobre o produto
 * @property {Array<{title: string, description: string}>} benefits - Lista de benefícios
 * @property {Object<string, string|number>} specs - Especificações técnicas (chave-valor dinâmico)
 * @property {string} image - URL da imagem principal
 * @property {string} category - Categoria do produto (tendas, moveis, box)
 */

/**
 * Exemplo de estrutura de produto
 * @type {Product}
 */
export const productExample = {
  id: 'tenda-cristal-10x10',
  name: 'Tenda Cristal 10x10m',
  shortDescription: 'Eleve seu evento com a sofisticação da nossa Tenda Cristal! Com 100m² de área coberta, ela oferece um ambiente elegante e espaçoso para casamentos, formaturas, eventos corporativos e muito mais.',
  fullDescription: `A Tenda Cristal é a escolha perfeita para quem busca sofisticação e funcionalidade. Com paredes laterais transparentes, ela integra seu evento à beleza do ambiente externo, criando uma experiência única e memorável para seus convidados.

Ideal para casamentos ao ar livre, eventos corporativos elegantes, formaturas, confraternizações e recepções que merecem um toque especial. A estrutura robusta em alumínio garante segurança e estabilidade, enquanto a cobertura em lona cristal proporciona amplitude e beleza, sem perda de visão.

Com 100m² de área útil, a tenda acomoda confortavelmente até [X] pessoas, oferecendo amplo espaço e versatilidade para diferentes layouts de decoração.`,
  benefits: [
    {
      title: 'Visão Panorâmica',
      description: 'Paredes laterais transparentes proporcionam uma vista deslumbrante da paisagem ao redor, integrando o ambiente externo ao seu evento.'
    },
    {
      title: 'Estrutura Elegante',
      description: 'Design moderno e clean, com estrutura em alumínio e cobertura em lona cristal transparente, garantindo um visual sofisticado.'
    },
    {
      title: 'Iluminação Natural',
      description: 'Aproveite a luz natural durante o dia, criando um ambiente acolhedor que valoriza sua decoração.'
    },
    {
      title: 'Versatilidade de Decoração',
      description: 'Personalize a decoração ao máximo com o tema do seu evento, criando uma atmosfera única e inesquecível.'
    },
    {
      title: 'Conforto e Espaço Amplo',
      description: '100m² de área coberta para acomodar seus convidados com conforto e segurança.'
    }
  ],
  specs: {
    'Comprimento': '10 metros',
    'Largura': '10 metros',
    'Área coberta': '100m²',
    'Altura lateral': '[X] metros',
    'Altura central (pico)': '[X] metros',
    'Estrutura': 'Alumínio reforçado',
    'Cobertura': 'Lona cristal transparente (alta resistência)',
    'Paredes laterais': 'Lona cristal transparente (removível)',
    'Pessoas sentadas': 'até [X] pessoas',
    'Pessoas em pé (Coquetel)': 'até [X] pessoas'
  },
  image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  category: 'tendas'
}

export default productExample
