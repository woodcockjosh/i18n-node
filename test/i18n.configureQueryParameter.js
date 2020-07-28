var i18n = require('../i18n'),
  should = require("should"),
  path = require("path");

describe('Locale switching should work queryParameter', function() {

  var req;
  var res;

  beforeEach(function() {

    i18n.configure({
      locales: ['en', 'de', 'fr'],
      defaultLocale: 'en',
      queryParameter: 'lang',
      cookiename: 'languageCookie',
      directory: './locales'
    });

    req = {
      request: "GET /test?lang=fr",
      url: "/test?lang=fr",
      headers: {
        'accept-language': 'de'
      },
      cookies:{
        'languageCookie':'de'
      }
    };

    res = {
      locales: {}
    };
  });

  it('getLocale should return same locale for req and res based on ?lang=fr', function() {
    i18n.init(req, res);

    i18n.getLocale(req).should.equal('fr');
    i18n.getLocale(res).should.equal('fr');

    req.getLocale().should.equal('fr');
    res.getLocale().should.equal('fr');
    res.locales.getLocale().should.equal('fr');

    req.__('Hello').should.equal('Bonjour');
    res.__('Hello').should.equal('Bonjour');
    res.locales.__('Hello').should.equal('Bonjour');
  });

  it('should support WHATWG URL API', function() {
    req.url = new URL('/test?lang=fr', 'http://localhost');
    i18n.init(req, res);
    i18n.getLocale(req).should.equal('fr');
    i18n.getLocale(res).should.equal('fr');
  });
});