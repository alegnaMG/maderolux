import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CONTACTO, WHATSAPP_URL } from '@/lib/data/contacto';
import { NAV_LINKS } from '@/lib/data/navegacion';

import { Header } from './header';

const usePathname = vi.hoisted(() => vi.fn<() => string>());

vi.mock('next/navigation', () => ({ usePathname }));

// El stub genérico de vitest.setup.ts; capturarScrollSpy lo sustituye en
// algunos tests y hay que devolverlo para los siguientes.
const IntersectionObserverDelSetup = globalThis.IntersectionObserver;

beforeEach(() => {
  usePathname.mockReturnValue('/');
});

afterEach(() => {
  vi.stubGlobal('IntersectionObserver', IntersectionObserverDelSetup);
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
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    window.history.replaceState(null, '', '/#contacto');
    render(<Header />);

    await user.click(screen.getByRole('link', { name: 'Maderolux' }));

    expect(scrollTo).toHaveBeenCalledWith({ top: 0 });
    expect(window.location.hash).toBe('');
    scrollTo.mockRestore();
  });

  it('con Ctrl+clic o fuera de la home, el logo se comporta como enlace normal', async () => {
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const { unmount } = render(<Header />);

    await user.keyboard('{Control>}');
    await user.click(screen.getByRole('link', { name: 'Maderolux' }));
    await user.keyboard('{/Control}');
    unmount();

    usePathname.mockReturnValue('/tarifas');
    render(<Header />);
    await user.click(screen.getByRole('link', { name: 'Maderolux' }));

    expect(scrollTo).not.toHaveBeenCalled();
    scrollTo.mockRestore();
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
  });
});
