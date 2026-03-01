/**
 * Command Palette — Ctrl+K launcher for Chrome extensions
 */
export interface PaletteCommand { id: string; title: string; description?: string; icon?: string; shortcut?: string; action: () => void; category?: string; }

export class CommandPalette {
    private commands: PaletteCommand[] = [];
    private overlay: HTMLElement | null = null;
    private isOpen = false;
    private hotkey: string;

    constructor(hotkey: string = 'k') {
        this.hotkey = hotkey;
        this.bindHotkey();
    }

    /** Register a command */
    register(command: PaletteCommand): this { this.commands.push(command); return this; }

    /** Register multiple commands */
    registerAll(commands: PaletteCommand[]): this { this.commands.push(...commands); return this; }

    /** Open the palette */
    open(): void {
        if (this.isOpen) return;
        this.isOpen = true;
        this.render();
    }

    /** Close */
    close(): void {
        this.overlay?.remove();
        this.overlay = null;
        this.isOpen = false;
    }

    /** Toggle */
    toggle(): void { this.isOpen ? this.close() : this.open(); }

    private bindHotkey(): void {
        document.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === this.hotkey) { e.preventDefault(); this.toggle(); }
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    private render(): void {
        this.overlay = document.createElement('div');
        this.overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:flex-start;justify-content:center;padding-top:15vh;z-index:999999;';
        this.overlay.onclick = (e) => { if (e.target === this.overlay) this.close(); };

        const modal = document.createElement('div');
        modal.style.cssText = 'background:white;border-radius:12px;width:90%;max-width:520px;box-shadow:0 20px 60px rgba(0,0,0,0.3);overflow:hidden;';

        const input = document.createElement('input');
        input.placeholder = 'Type a command...';
        input.style.cssText = 'width:100%;padding:16px 20px;border:none;outline:none;font-size:16px;box-sizing:border-box;border-bottom:1px solid #eee;';
        modal.appendChild(input);

        const list = document.createElement('div');
        list.style.cssText = 'max-height:320px;overflow-y:auto;';
        modal.appendChild(list);

        const renderList = (filter: string) => {
            list.innerHTML = '';
            const q = filter.toLowerCase();
            const filtered = q ? this.commands.filter((c) => c.title.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q)) : this.commands;
            filtered.forEach((cmd, i) => {
                const item = document.createElement('div');
                item.style.cssText = `padding:12px 20px;cursor:pointer;display:flex;align-items:center;gap:10px;border-bottom:1px solid #f5f5f5;${i === 0 ? 'background:#f0f6ff;' : ''}`;
                item.onmouseenter = () => { item.style.background = '#f0f6ff'; };
                item.onmouseleave = () => { item.style.background = ''; };
                item.innerHTML = `${cmd.icon ? `<span style="font-size:18px">${cmd.icon}</span>` : ''}<div><div style="font-size:13px;font-weight:500">${cmd.title}</div>${cmd.description ? `<div style="font-size:11px;color:#888">${cmd.description}</div>` : ''}</div>${cmd.shortcut ? `<span style="margin-left:auto;font-size:11px;color:#aaa;background:#f0f0f0;padding:2px 6px;border-radius:4px">${cmd.shortcut}</span>` : ''}`;
                item.onclick = () => { this.close(); cmd.action(); };
                list.appendChild(item);
            });
        };

        input.oninput = () => renderList(input.value);
        renderList('');

        this.overlay.appendChild(modal);
        document.body.appendChild(this.overlay);
        input.focus();
    }
}
