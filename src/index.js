import request from 'request';
import cheerio from 'cheerio'

const Crawler = {
    request: null,
    cheerio: null,
    init: () => {
        Crawler.request = request;
        Crawler.cheerio = cheerio;
        Crawler.getMovies();
    },
    getMovies: () => {
        Crawler.request('http://www.imdb.com/chart/moviemeter', (err, res, body) => {
            err && console.log(`Error: ${err}`)
            const $ = Crawler.cheerio.load(body);
            $('.lister-list tr').slice(0, 10).each(function () {
                const title = $(this).find('.titleColumn a').text().trim();
                const rating = $(this).find('.imdbRating strong').text().trim();
                console.log(`${title} - ${rating}`);
            });
        });
    }
};

Crawler.init();