import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CONTACTO, WHATSAPP_URL } from '@/lib/data/contacto';
import { NAV_LINKS } from '@/lib/data/navegacion';

import { Header } from './header';

const usePathname = vi.hoisted(() => vi.fn<() => string>());
// La animación en sí se prueba en lib/scroll-suave.test.ts; aquí solo importa
// cuándo y hacia dónde se pide.
const scrollSuave = vi.hoisted(() => ({
  scrollSuaveHasta: vi.fn(),
  scrollSuaveAElemento: vi.fn(),
}));

vi.mock('next/navigation', () => ({ usePathname }));
vi.mock('@/lib/scroll-suave', () => scrollSuave);

// El stub genérico de vitest.setup.ts; capturarScrollSpy lo sustituye en
// algunos tests y hay que devolverlo para los siguientes.
const IntersectionObserverDelSetup = globalThis.IntersectionObserver;

beforeEach(() => {
  usePathname.mockReturnValue('/');
});

afterEach(() => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverDelSetup);
  scrollSuave.scrollSuaveHasta.mockClear();
  scrollSuave.scrollSuaveAElemento.mockClear();
  window.history.replaceState(null, '', '/');
  document.body.innerHTML = '';
});

/** El nav de escritorio y el del sheet comparten aria-label; el primero es el de escritorio. */
function navPrincipal() {
  return screen.getAllByRole('navigation', { name: 'Principal' })[0];
}

/**
 * next/link también instancia IntersectionObserver (prefetch), así que el
 * stub reconoce el del scroll-spy por su rootMargin y solo expone ese.
 */
function capturarScrollSpy() {
  const captura = {
    observados: [] as Element[],
    desconectado: false,
    notificar: (() => {}) as (entries: IntersectionObserverEntry[]) => void,
  };

  vi.stubGlobal(
    'IntersectionObserver',
    class {
      esScrollSpy: boolean;
      constructor(
        callback: (entries: IntersectionObserverEntry[]) => void,
        options?: IntersectionObserverInit,
      ) {
        this.esScrollSpy = options?.rootMargin === '-50% 0px -50% 0px';
        if (this.esScrollSpy) captura.notificar = callback;
      }
      observe(el: Element) {
        if (this.esScrollSpy) captura.observados.push(el);
      }
      unobserve() {}
      disconnect() {
        if (this.esScrollSpy) captura.desconectado = true;
      }
      takeRecords() {
        return [];
      }
    },
  );

  return captura;
}

/** Monta en el DOM las secciones de la home con estos ids. */
function montarSecciones(...ids: string[]) {
  return ids.map((id) => {
    const seccion = document.createElement('section');
    seccion.id = id;
    document.body.appendChild(seccion);
    return seccion;
  });
}

describe('Header', () => {
  it('enlaza el logo a la home', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: 'Maderolux' })).toHaveAttribute(
      'href',
      '/',
    );
  });

  it('en la home, el logo sube al inicio sin navegar y limpia el #', async () => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', '/#contacto');
    render(<Header />);

    await user.click(screen.getByRole('link', { name: 'Maderolux' }));

    expect(scrollSuave.scrollSuaveHasta).toHaveBeenCalledWith(0);
    expect(window.location.hash).toBe('');
  });

  it('con Ctrl+clic o fuera de la home, el logo se comporta como enlace normal', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Header />);

    await user.keyboard('{Control>}');
    await user.click(screen.getByRole('link', { name: 'Maderolux' }));
    await user.keyboard('{/Control}');
    unmount();

    usePathname.mockReturnValue('/tarifas');
    render(<Header />);
    await user.click(screen.getByRole('link', { name: 'Maderolux' }));

    expect(scrollSuave.scrollSuaveHasta).not.toHaveBeenCalled();
  });

  it('en la home, una opción del menú anima el scroll hasta su sección sin navegar', () => {
    const [, tarifas] = montarSecciones('inicio', 'tarifas');
    render(<Header />);

    const link = within(navPrincipal()).getByRole('link', { name: 'Tarifas' });
    // fireEvent.click devuelve false si el clic se canceló (preventDefault).
    const sinCancelar = fireEvent.click(link);

    expect(sinCancelar).toBe(false);
    expect(scrollSuave.scrollSuaveAElemento).toHaveBeenCalledWith(tarifas);
    expect(window.location.hash).toBe('#tarifas');
  });

  it('al saltar a una sección le da el foco para que el Tab siga desde ahí', () => {
    const [, tarifas] = montarSecciones('inicio', 'tarifas');
    render(<Header />);

    fireEvent.click(
      within(navPrincipal()).getByRole('link', { name: 'Tarifas' }),
    );

    expect(tarifas).toHaveFocus();
    expect(tarifas).toHaveAttribute('tabindex', '-1');
  });

  it('si la sección no está en la página, la opción del menú sigue su curso normal', () => {
    render(<Header />);

    const sinCancelar = fireEvent.click(
      within(navPrincipal()).getByRole('link', { name: 'Tarifas' }),
    );

    expect(sinCancelar).toBe(true);
    expect(scrollSuave.scrollSuaveAElemento).not.toHaveBeenCalled();
  });

  it('con Ctrl+clic o fuera de la home, las opciones del menú son enlaces normales', () => {
    montarSecciones('inicio', 'tarifas');
    const { unmount } = render(<Header />);

    const conCtrl = fireEvent.click(
      within(navPrincipal()).getByRole('link', { name: 'Tarifas' }),
      { ctrlKey: true },
    );
    unmount();

    usePathname.mockReturnValue('/cobertura');
    render(<Header />);
    const fueraDeLaHome = fireEvent.click(
      within(navPrincipal()).getByRole('link', { name: 'Tarifas' }),
    );

    expect(conCtrl).toBe(true);
    expect(fueraDeLaHome).toBe(true);
    expect(scrollSuave.scrollSuaveAElemento).not.toHaveBeenCalled();
  });

  it('en la home, cada opción del menú salta a su sección', () => {
    render(<Header />);

    const enlaces = within(navPrincipal()).getAllByRole('link');

    expect(
      enlaces.map((el) => [el.textContent, el.getAttribute('href')]),
    ).toEqual(NAV_LINKS.map((link) => [link.label, `#${link.id}`]));
  });

  it('fuera de la home, cada opción lleva a su página', () => {
    usePathname.mockReturnValue('/tarifas');
    render(<Header />);

    const enlaces = within(navPrincipal()).getAllByRole('link');

    expect(
      enlaces.map((el) => [el.textContent, el.getAttribute('href')]),
    ).toEqual(NAV_LINKS.map((link) => [link.label, link.href]));
  });

  it('al entrar en la home marca Inicio como sección actual', () => {
    render(<Header />);

    const nav = navPrincipal();
    expect(within(nav).getByRole('link', { name: 'Inicio' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(
      within(nav).getByRole('link', { name: 'Tratamientos' }),
    ).not.toHaveAttribute('aria-current');
  });

  it('observa solo las secciones del menú que existen en la página', () => {
    const spy = capturarScrollSpy();
    const [inicio, tarifas] = montarSecciones('inicio', 'tarifas');

    render(<Header />);

    expect(spy.observados).toEqual([inicio, tarifas]);
  });

  it('marca la sección que cruza el centro de la pantalla al hacer scroll', () => {
    const spy = capturarScrollSpy();
    const [inicio, tarifas] = montarSecciones('inicio', 'tarifas');
    render(<Header />);

    act(() => {
      spy.notificar([
        { isIntersecting: false, target: inicio },
        { isIntersecting: true, target: tarifas },
      ] as unknown as IntersectionObserverEntry[]);
    });

    const nav = navPrincipal();
    expect(within(nav).getByRole('link', { name: 'Tarifas' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(
      within(nav).getByRole('link', { name: 'Inicio' }),
    ).not.toHaveAttribute('aria-current');
  });

  it('deja de observar al desmontarse', () => {
    const spy = capturarScrollSpy();
    montarSecciones('inicio');

    const { unmount } = render(<Header />);
    unmount();

    expect(spy.desconectado).toBe(true);
  });

  it('fuera de la home no activa el scroll-spy', () => {
    usePathname.mockReturnValue('/tarifas');
    const spy = capturarScrollSpy();
    montarSecciones('inicio', 'tarifas');

    render(<Header />);

    expect(spy.observados).toEqual([]);
  });

  it('enlaza al perfil de Instagram en una pestaña nueva', () => {
    render(<Header />);

    // Es un enlace de verdad (rol link, no button): navega fuera del sitio.
    const instagram = screen.getByRole('link', { name: 'Instagram' });
    expect(instagram).toHaveAttribute('href', CONTACTO.instagram);
    expect(instagram).toHaveAttribute('target', '_blank');
    expect(instagram).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('en una subruta marca su página y nunca Inicio', () => {
    usePathname.mockReturnValue('/tratamientos/maderoterapia');
    render(<Header />);

    const nav = navPrincipal();
    expect(
      within(nav).getByRole('link', { name: 'Tratamientos' }),
    ).toHaveAttribute('aria-current', 'page');
    expect(
      within(nav).getByRole('link', { name: 'Inicio' }),
    ).not.toHaveAttribute('aria-current');
  });

  it('abre WhatsApp en una pestaña nueva y segura', () => {
    render(<Header />);

    const whatsapp = screen.getByRole('link', {
      name: 'Reservar por WhatsApp',
    });
    expect(whatsapp).toHaveAttribute('href', WHATSAPP_URL);
    expect(whatsapp).toHaveAttribute('target', '_blank');
    expect(whatsapp).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('abre el menú móvil con la página actual marcada y lo cierra al navegar', async () => {
    usePathname.mockReturnValue('/tarifas');
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    const menu = await screen.findByRole('dialog');

    expect(within(menu).getByRole('link', { name: 'Tarifas' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(
      within(menu).getByRole('link', { name: 'Inicio' }),
    ).not.toHaveAttribute('aria-current');
    expect(
      within(menu).getByRole('link', { name: 'Reservar por WhatsApp' }),
    ).toHaveAttribute('href', WHATSAPP_URL);

    await user.click(within(menu).getByRole('link', { name: 'Contacto' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(scrollSuave.scrollSuaveAElemento).not.toHaveBeenCalled();
  });

  it('en la home, el menú móvil salta a la sección cuando el panel termina de cerrarse', async () => {
    const user = userEvent.setup();
    const [, tarifas] = montarSecciones('inicio', 'tarifas');
    render(<Header />);

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    const menu = await screen.findByRole('dialog');
    await user.click(within(menu).getByRole('link', { name: 'Tarifas' }));

    await waitFor(() =>
      expect(scrollSuave.scrollSuaveAElemento).toHaveBeenCalledWith(tarifas),
    );
    expect(scrollSuave.scrollSuaveAElemento).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(window.location.hash).toBe('#tarifas');
  });

  it('el menú móvil no salta si se cierra sin elegir sección', async () => {
    const user = userEvent.setup();
    montarSecciones('inicio', 'tarifas');
    render(<Header />);

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    await screen.findByRole('dialog');
    await user.keyboard('{Escape}');

    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    expect(scrollSuave.scrollSuaveAElemento).not.toHaveBeenCalled();
  });

  it('en el menú móvil, si la sección no está en la página el enlace sigue su curso normal', async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    const menu = await screen.findByRole('dialog');
    const sinCancelar = fireEvent.click(
      within(menu).getByRole('link', { name: 'Tarifas' }),
    );

    expect(sinCancelar).toBe(true);
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    expect(scrollSuave.scrollSuaveAElemento).not.toHaveBeenCalled();
  });

  it('en el menú móvil, Ctrl+clic en una opción es un enlace normal', async () => {
    const user = userEvent.setup();
    montarSecciones('inicio', 'tarifas');
    render(<Header />);

    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    const menu = await screen.findByRole('dialog');
    const sinCancelar = fireEvent.click(
      within(menu).getByRole('link', { name: 'Tarifas' }),
      { ctrlKey: true },
    );

    expect(sinCancelar).toBe(true);
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument(),
    );
    expect(scrollSuave.scrollSuaveAElemento).not.toHaveBeenCalled();
  });
});
