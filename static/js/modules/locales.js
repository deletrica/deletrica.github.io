import profile from './profile.js';

const locales = {
  'pt-br': {

    phone: 'Telefone',
    share: 'Compartilhar',
    brazil: 'Brasil',
    qr_code: 'QR code',
    translate: 'Traduzir',
    powered_by: 'Desenvolvido por',
    coming_soon: 'Em breve…',
    translate_to: 'Traduzir para',
    show_comments: 'Mostrar comentários?',
    summary_message: 'Instalação e manutenção elétrica.',
    loading_comments: 'Carregando comentários…',
    description_message: 'Iluminando a sua vida com segurança e eficiência. Instalação, manutenção e soluções elétricas seguras e eficientes, do seu jeito!'
  }
};

locales.es = {
  phone: 'Teléfono',
  share: 'Compartir',
  brazil: 'Brasil',
  qr_code: 'QR code',
  translate: 'Traducir',
  powered_by: 'Desarrollado por',
  coming_soon: 'En breve…',
  translate_to: 'Traducir a',
  show_comments: '¿Mostrar comentarios?',
  summary_message: 'Instalación y mantenimiento eléctrico.',
  loading_comments: 'Cargando comentarios…',
  description_message: 'Iluminando tu vida de forma segura y eficiente. Instalación, mantenimiento y soluciones eléctricas seguras y eficientes, ¡a tu manera!'
};

locales.en = {
  phone: 'Phone',
  share: 'Share',
  brazil: 'Brazil',
  qr_code: 'QR code',
  translate: 'Translate',
  powered_by: 'Powered by',
  coming_soon: 'Coming soon…',
  translate_to: 'Translate to',
  show_comments: 'Show comments?',
  summary_message: 'Electrical installation and maintenance.',
  loading_comments: 'Loading comments…',
  description_message: 'Lighting up your life safely and efficiently. Safe and efficient installation, maintenance and electrical solutions, your way!'
};

for (let locale in locales) {
  locales[locale] = Object.assign(locales[locale], profile);
}

export default locales;