export function createSkill(data = {}) {
  return {
    name: data.name ?? "",
    xp: data.xp ?? 0,
    stars: data.stars ?? 0,
    title: data.title ?? "",
  };
}

export function createKid(data = {}) {
  return {
    avatar: data.avatar ?? "🧠",

    score: data.score ?? 0,
    availableScore: data.availableScore ?? 0,
    actualScore: data.actualScore ?? 0,
    percent: data.percent ?? 0,
    activeTitle: data.activeTitle ?? "",
    gold: data.gold ?? 0,
    warnings: data.warnings ?? 0,

    skills: (data.skills ?? []).map(createSkill),

    chores: data.chores ?? [],
  };
}

export function normalizeKids(data = {}) {
  return Object.fromEntries(
    Object.entries(data).map(([name, kid]) => [name, createKid(kid)]),
  );
}
