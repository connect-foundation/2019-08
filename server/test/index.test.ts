test("basic", () => {
    const sum = (a: any, b: any) => a + b;
    expect(sum(1, 2)).toBe(3);
});