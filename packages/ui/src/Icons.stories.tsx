import React, { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from './Icons';

const meta = {
  title: 'Alejandria/Icons',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type IconItem = { name: string; category: string };

const iconGroups: { title: string; items: IconItem[] }[] = [
  {
    title: 'Cards',
    items: [
      { name: 'CerrarIcon', category: 'Cards' },
      { name: 'EditarIcon', category: 'Cards' },
      { name: 'EliminarIcon', category: 'Cards' }
    ]
  },
  {
    title: 'Investigations',
    items: [
      { name: 'ArchivoIcon', category: 'Investigations' },
      { name: 'AutoIcon', category: 'Investigations' },
      { name: 'AvionIcon', category: 'Investigations' },
      { name: 'ColectivoIcon', category: 'Investigations' },
      { name: 'DocumentoIcon', category: 'Investigations' },
      { name: 'DriveIcon', category: 'Investigations' },
      { name: 'InstagramIcon', category: 'Investigations' },
      { name: 'PersonaIcon', category: 'Investigations' },
      { name: 'TelefonoIcon', category: 'Investigations' }
    ]
  },
  {
    title: 'Menu',
    items: [
      { name: 'AyudaIcon', category: 'Menu' },
      { name: 'MenuBandejaIcon', category: 'Menu' },
      { name: 'BuscarIcon', category: 'Menu' },
      { name: 'CerrarSesionIcon', category: 'Menu' },
      { name: 'ConfiguracionIcon', category: 'Menu' },
      { name: 'MenuEditarIcon', category: 'Menu' },
      { name: 'FiltroIcon', category: 'Menu' },
      { name: 'HamburguesaIcon', category: 'Menu' },
      { name: 'HistorialIcon', category: 'Menu' },
      { name: 'NuevaEntidadIcon', category: 'Menu' },
      { name: 'NuevaRelacionIcon', category: 'Menu' },
      { name: 'PersonalizarIcon', category: 'Menu' },
      { name: 'ReportsIcon', category: 'Menu' },
      { name: 'RelacionarEntidadesIcon', category: 'Menu' },
      { name: 'UsuarioIcon', category: 'Menu' }
    ]
  },
  {
    title: 'Modules',
    items: [
      { name: 'ModulesBandejaIcon', category: 'Modules' },
      { name: 'CatastrofesIcon', category: 'Modules' },
      { name: 'CiberseguridadIcon', category: 'Modules' },
      { name: 'DespliegueIcon', category: 'Modules' },
      { name: 'EvidenciasIcon', category: 'Modules' },
      { name: 'GeneroIcon', category: 'Modules' },
      { name: 'InvestigacionesIcon', category: 'Modules' }
    ]
  }
];

const containerStyles: React.CSSProperties = {
  display: 'grid',
  gap: 20,
  padding: 20
};

const headerStyles: React.CSSProperties = { display: 'grid', gap: 8 };

const searchStyles: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid var(--ds-color-border-muted)',
  background: 'var(--ds-color-surface-subtle)',
  width: 360,
  maxWidth: '100%'
};

const accordionStyles: React.CSSProperties = {
  background: 'var(--ds-color-surface)',
  border: '1px solid var(--ds-color-border-muted)',
  borderRadius: 12,
  padding: 12
};

const accordionHeaderStyles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  cursor: 'pointer',
  padding: '6px 8px'
};

const gridStyles: React.CSSProperties = {
  display: 'grid',
  gap: 12,
  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))'
};

const cardBaseStyles: React.CSSProperties = {
  height: 120,
  borderRadius: 10,
  border: '1px solid var(--ds-color-border-muted)',
  background: 'var(--ds-color-surface-subtle)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: 8,
  transition: 'box-shadow 160ms ease, transform 160ms ease, border-color 160ms ease'
};

const iconImgStyles: React.CSSProperties = { width: 40, height: 40, objectFit: 'contain' };

export const Catalog: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [expanded, setExpanded] = useState<Record<string, boolean>>(() => ({ [iconGroups[0].title]: true }));
    const [copiedName, setCopiedName] = useState<string | null>(null);

    const lowered = query.trim().toLowerCase();

    const groups = useMemo(() => {
      if (!lowered) return iconGroups;
      return iconGroups
        .map((g) => ({ ...g, items: g.items.filter((it) => it.name.toLowerCase().includes(lowered)) }))
        .filter((g) => g.items.length > 0);
    }, [lowered]);

    const handleToggle = (title: string) => {
      setExpanded((s) => ({ ...s, [title]: !s[title] }));
    };

    const handleCopy = async (name: string) => {
      try {
        await navigator.clipboard.writeText(name);
        setCopiedName(name);
        window.setTimeout(() => setCopiedName(null), 1800);
      } catch (e) {
        // ignore
      }
    };

    return (
      <div style={containerStyles}>
        <header style={headerStyles}>
            <h1 style={{ margin: 0, fontFamily: 'var(--ds-font-display)', fontSize: '1.6rem', color: 'var(--ds-color-ink)' }}>Icon Catalog</h1>
              <p style={{ margin: 0, color: 'var(--ds-color-ink-soft)', maxWidth: 760 }}>
            A reference browser for designers and developers. Search, preview, and copy icon export names.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 6 }}>
            <input
              aria-label="Search icons"
              placeholder="Search icons by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ ...searchStyles, color: 'var(--ds-color-ink)' }}
            />
            <div style={{ color: 'var(--ds-color-ink-soft)' }}>{groups.reduce((acc, g) => acc + g.items.length, 0)} icons</div>
          </div>
        </header>

        <main style={{ display: 'grid', gap: 12 }}>
          {groups.map((group) => (
            <section key={group.title} style={accordionStyles}>
              <div style={accordionHeaderStyles} onClick={() => handleToggle(group.title)}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                  <h2 style={{ margin: 0, fontFamily: 'var(--ds-font-display)', fontSize: '1.05rem', color: 'var(--ds-color-ink)' }}>{group.title}</h2>
                  <span style={{ color: 'var(--ds-color-ink-soft)', fontSize: '.9rem' }}>{group.items.length} icons</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button
                    aria-label={expanded[group.title] ? 'Collapse' : 'Expand'}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      transform: expanded[group.title] ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 160ms ease'
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>

              {expanded[group.title] && (
                <div style={{ marginTop: 10 }}>
                  <div style={gridStyles}>
                    {group.items.map((item) => {
                      const iconUrl = Icons[item.name as keyof typeof Icons] as string;
                      return (
                        <div
                          key={item.name}
                          role="button"
                          onClick={() => handleCopy(item.name)}
                          title={`Click to copy ${item.name}`}
                          style={{
                            ...cardBaseStyles,
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLDivElement;
                            el.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
                            el.style.borderColor = 'rgba(0,0,0,0.08)';
                            el.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLDivElement;
                            el.style.boxShadow = 'none';
                            el.style.borderColor = 'var(--ds-color-border-muted)';
                            el.style.transform = 'none';
                          }}
                        >
                          <img src={iconUrl} alt={item.name} style={iconImgStyles} />
                          <div style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--ds-color-ink)' }}>{item.name}</div>
                          <div style={{ color: 'var(--ds-color-ink-soft)', fontSize: '.75rem' }}>{item.category}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>
          ))}
        </main>

        {copiedName && (
          <div
            style={{
              position: 'fixed',
              right: 20,
              top: 20,
              background: 'var(--ds-color-surface)',
              border: '1px solid var(--ds-color-border-muted)',
              padding: '8px 12px',
              borderRadius: 8,
              boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              color: 'var(--ds-color-ink)'
            }}
          >
            Copied: {copiedName}
          </div>
        )}
      </div>
    );
  }
};
