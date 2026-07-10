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

    mood: data.mood ?? "Unknown",

    streak: data.streak ?? 0,
    gold: data.gold ?? 0,
    warnings: data.warnings ?? 0,

    activeTitle: data.activeTitle ?? "",

    skills: (data.skills ?? []).map(createSkill),

    chores: data.chores ?? [],
  };
}

export function normalizeKids(data = {}) {
  return Object.fromEntries(
    Object.entries(data).map(([name, kid]) => [name, createKid(kid)]),
  );
}
