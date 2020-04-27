This project reads data from the NY Times repository [covid-19-data](https://github.com/nytimes/covid-19-data/blob/master/README.md) into a json file. It is updated manually from the NY Times repository, which contains information on the number of cases and deaths for every single US county each from whenever each county started tracking the data.

The json file contains the number of Coronavirus confirmed cases and deaths for every Massachusetts county and every day since 2020-02-01. A sample entry is shown below:

```
{"Suffolk": [
    {
      "date": "2020-02-01",
      "confirmed": 1,
      "deaths": 0,
      "recovered": null
    },
    {
      "date": "2020-02-02",
      "confirmed": 1,
      "deaths": 0,
      "recovered": null
    },
```
This project was built on top of the work done by https://github.com/pomber/covid19. Whereas the original work sourced information from Johns Hopkins university and focused on country by country statistics, my work utlizes the NY Times data and focuses on statistics at the county level within the Commonwealth of Massachusetts.
