// Única fuente de verdad del contacto: JSON-LD, header, footer, /contacto y
// todos los CTA de WhatsApp importan de aquí. Nunca dupliques estos datos.
// TODO(Fase 2): el email sigue siendo provisional; confirmarlo.
const USUARIO_INSTAGRAM = 'maderolux_madrid';

export const CONTACTO = {
  nombre: 'Lucía Sánchez',
  email: 'hola@maderolux.com',
  telefonoWhatsapp: '+34613569064',
  zonaServicio: 'Madrid, España',
  instagram: `https://www.instagram.com/${USUARIO_INSTAGRAM}`,
  /** Cómo se muestra la cuenta en pantalla: "@maderolux_madrid". */
  instagramUsuario: `@${USUARIO_INSTAGRAM}`,
} as const;

export const WHATSAPP_URL = `https://wa.me/${CONTACTO.telefonoWhatsapp.replace(/\D/g, '')}`;
