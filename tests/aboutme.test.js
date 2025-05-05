const fs = require('fs');
const path = require("path");
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
const { JSDOM } = require('jsdom');
const { screen } = require("@testing-library/dom");
require('@testing-library/jest-dom');

let dom;
let container;

beforeAll(() => {
  const filePath = path.resolve(__dirname, "../docs/about_me/index.html");
  const html = fs.readFileSync(filePath, "utf8");
  dom = new JSDOM(html, { runScripts: "dangerously" });
  container = dom.window.document.body;
});

describe("About Me Page", () => {
  test("renders the main heading", () => {
    const heading = container.querySelector("h1.heading");
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe("About Me");
  });

  test("renders the navigation links", () => {
    const navLinks = Array.from(container.querySelectorAll("nav a"));
    const linkTexts = navLinks.map(link => link.textContent.trim());

    expect(linkTexts).toEqual(
      expect.arrayContaining(["Resume", "About Me", "Portfolio", "Senior Project"])
    );
  });

  test("includes Claire's headshot image", () => {
    const image = container.querySelector("img.headshot");
    expect(image).not.toBeNull();
    expect(image.getAttribute("alt")).toMatch(/Claire Hurd/i);
  });

  test("includes personal introduction text", () => {
    const text = container.textContent;
    expect(text).toMatch(/Claire Hurd.*graduating from Allegheny College/i);
  });

  test("includes contact buttons and LinkedIn link", () => {
    const phoneButton = container.querySelector(".phone a");
    const emailButton = container.querySelector(".email a");
    const linkedIn = container.querySelector(".linkedin a");

    expect(phoneButton).toHaveAttribute("href", expect.stringContaining("tel"));
    expect(emailButton).toHaveAttribute("href", expect.stringContaining("mailto:"));
    expect(linkedIn).toHaveAttribute("href", expect.stringContaining("linkedin.com"));
  });
});