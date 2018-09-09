import { Router } from 'express';
import puppeteer from 'puppeteer';

const router = Router();

router.get('/data', async (req, res, next) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(`
      <h1>Hello world</h1>
      <p>This is test PDF Page</p>
    `);
    await page.emulateMedia('screen');
    const file = await page.pdf({
      format: 'A4',
      printBackground: true
    });

    res.set('Content-Type: application/pdf');

    res.send(file);
  } catch (error) {
    res.json({
      success: false,
      message: `${JSON.stringify(error)}`
    });
  }
});

export default router;
