/**
 * Fuzzy Search — Simple fuzzy string matching
 */
export class FuzzySearch {
    /** Score a query against a target (higher = better match) */
    static score(query: string, target: string): number {
        const q = query.toLowerCase(); const t = target.toLowerCase();
        if (t === q) return 100;
        if (t.startsWith(q)) return 90;
        if (t.includes(q)) return 70;
        let qi = 0; let score = 0; let consecutive = 0;
        for (let ti = 0; ti < t.length && qi < q.length; ti++) {
            if (t[ti] === q[qi]) { score += 10 + consecutive * 5; consecutive++; qi++; } else { consecutive = 0; }
        }
        return qi === q.length ? score : 0;
    }

    /** Filter and sort items by fuzzy match */
    static filter<T>(query: string, items: T[], getText: (item: T) => string): T[] {
        if (!query) return items;
        return items.map((item) => ({ item, score: this.score(query, getText(item)) }))
            .filter((r) => r.score > 0).sort((a, b) => b.score - a.score).map((r) => r.item);
    }
}
