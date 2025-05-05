
const fs = require('fs');
const path = require('path');
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
const { JSDOM } = require('jsdom');

describe('Portfolio Page', () => {
  let dom;
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../docs/portfolio/index.html'), 'utf8');
    dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
    document = dom.window.document;
  });

  test('has the correct page title', () => {
    expect(document.title).toBe('Claire Hurd Portfolio Page');
  });

  test('contains multiple show sections', () => {
    const sections = document.querySelectorAll('.show-section');
    expect(sections.length).toBeGreaterThan(1); // or exact count if you know it
  });

  test('each carousel has images', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => {
      const images = container.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  test('carousel buttons exist', () => {
    const prevButtons = document.querySelectorAll('.prev');
    const nextButtons = document.querySelectorAll('.next');
    expect(prevButtons.length).toBeGreaterThan(0);
    expect(nextButtons.length).toBeGreaterThan(0);
  });

  test('lightbox element exists and is initially hidden', () => {
    const lightbox = document.getElementById('lightbox');
    expect(lightbox).not.toBeNull();
    expect(lightbox.style.display).toBe('');
  });
});
