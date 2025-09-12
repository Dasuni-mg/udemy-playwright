import { chromium, test, expect } from "@playwright/test";

test.beforeAll(async () => {
  console.log(" this is beforeAll ......");
});

test.afterAll(async () => {
  console.log(" this is afterAll ......");
});

test.beforeEach(async () => {
  console.log(" this is beforerEach ......");
});

test.afterEach(async () => {
  console.log(" this is afterEach ......");
});

// Group 1 contains Test1 and Test2
test.describe("Group 1", () => {
  // First test inside Group 1
  test("Test1", async ({ page }) => {
    console.log(" this is Test1 ......");
  });

  // Second test inside Group 1
  test("Test2", async ({ page }) => {
    console.log(" this is Test2 ......");
  });
});

// Group 2 contains Test3 and Test4
test.describe("Group 2", () => {
  // First test inside Group 2
  test("Test3", async ({ page }) => {
    console.log(" this is Test3 ......");
  });

  // Second test inside Group 2
  test("Test4", async ({ page }) => {
    console.log(" this is Test4 ......");
  });
});
