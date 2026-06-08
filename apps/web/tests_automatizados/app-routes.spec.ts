import { test, expect, type Page } from "@playwright/test";

// Simula APIs si el backend no está corriendo
async function mockApis(page: Page) {
  await page.route("**/api/**", async (route) => {
    const url = route.request().url();

    if (url.includes("/matches")) {
      return route.fulfill({ json: [] });
    }

    if (url.includes("/offseason/titans-toss/config")) {
      return route.fulfill({
        json: { gameId: 1, gameName: "Titans Toss", puzzleDate: "2026-06-08" },
      });
    }

    if (url.includes("/offseason/titans-toss/leaderboard")) {
      return route.fulfill({
        json: { gameId: 1, puzzleDate: "2026-06-08", entries: [] },
      });
    }

    if (url.includes("/history")) {
      return route.fulfill({
        json: {
          hero: {
            title: "History of the Tennessee Titans",
            subtitle: "A legacy of excellence",
          },
          classicMatches: [],
          legendaryPlayers: [],
          timeline: [],
        },
      });
    }

    if (url.includes("/store") || url.includes("/products")) {
      return route.fulfill({ json: { products: [] } });
    }

    return route.fulfill({ json: {} });
  });
}

test.beforeEach(async ({ page }) => {
  await mockApis(page);
});

test("1. Navbar muestra marca y enlaces principales", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("TITANS CREW")).toBeVisible();
  await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Matches" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Team" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Community" })).toBeVisible();
  await expect(page.getByRole("link", { name: "History" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Store" })).toBeVisible();
  await expect(page.getByRole("link", { name: "News" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Off-Season" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Voice Agent" })).toBeVisible();
});

test("2. Home muestra secciones principales", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Trending News")).toBeVisible();
  await expect(page.getByText("Top Highlights")).toBeVisible();
  await expect(page.getByText("Best Sellers")).toBeVisible();
});

test("3. Matches muestra el calendario", async ({ page }) => {
  await page.goto("/matches");

  await expect(
    page.getByRole("heading", { name: /match calendar/i })
  ).toBeVisible();
});

test("4. Community muestra el foro", async ({ page }) => {
  await page.goto("/community");

  await expect(
    page.getByRole("heading", { name: /community forum/i })
  ).toBeVisible();
});

test("5. Store muestra la tienda", async ({ page }) => {
  await page.goto("/store");

  await expect(page.getByRole("heading", { name: "Store" })).toBeVisible();
  await expect(
    page.getByText(/find the best titans products/i)
  ).toBeVisible();
});

test("6. News muestra noticias", async ({ page }) => {
  await page.goto("/news");

  await expect(
    page.getByRole("heading", { name: /titans news & updates/i })
  ).toBeVisible();
});

test("7. History muestra la historia del equipo", async ({ page }) => {
  await page.goto("/history");

  await expect(
    page.getByText(/history of the tennessee titans/i)
  ).toBeVisible();
});

test("8. Off-Season muestra juegos", async ({ page }) => {
  await page.goto("/offseason");

  await expect(
    page.getByRole("heading", { name: /off-season/i })
  ).toBeVisible();
  await expect(page.getByRole("tab", { name: /titans toss/i })).toBeVisible();
  await expect(page.getByRole("tab", { name: /titans words/i })).toBeVisible();
});

test("9. Voice Agent muestra TitanBot", async ({ page }) => {
  await page.goto("/voice-agent");

  await expect(
    page.getByRole("heading", { name: /titanbot/i })
  ).toBeVisible();
});

test("10. Ruta protegida bloquea usuario invitado", async ({ page }) => {
  await page.goto("/team");

  await expect(
    page.getByRole("heading", { name: /sign in to continue/i })
  ).toBeVisible();
  await expect(page.getByText(/you need an account/i)).toBeVisible();
});