const FIPE = require("./controllers/fipe");

// Test get types
test("should return vehicle types", () => {
  expect(FIPE.getTypes()).toEqual(
    expect.objectContaining({
      success: expect.any(Boolean),
      data: expect.any(Array),
    })
  );
});

// Test get brands
test("should return vehicle brands", async () => {
  expect(await FIPE.getBrands(1)).toEqual(
    expect.objectContaining({
      success: expect.any(Boolean),
      data: expect.any(Array),
    })
  );
});

// Test get models
test("should return vehicle models", async () => {
  expect(await FIPE.getModels(1, 1)).toEqual(
    expect.objectContaining({
      success: expect.any(Boolean),
      data: expect.any(Array),
    })
  );
});

// Test get years
test("should return vehicle years", async () => {
  expect(await FIPE.getYears(1, 1, 1)).toEqual(
    expect.objectContaining({
      success: expect.any(Boolean),
      data: expect.any(Array),
    })
  );
});

// Test get details
test("should return vehicle details", async () => {
  expect(await FIPE.getDetails(1, 1, 1, 1992)).toEqual(
    expect.objectContaining({
      success: expect.any(Boolean),
      data: expect.any(Object),
    })
  );
});