import "jest-canvas-mock";

// No test uses enzyme today, and enzyme → cheerio → undici@7 needs web
// globals jsdom lacks (TextDecoder, ReadableStream, ...). Configure it lazily
// in the tests that need it:
//   const {configure} = require("enzyme");
//   configure({adapter: new (require("enzyme-adapter-react-16"))()});
