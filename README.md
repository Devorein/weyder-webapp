## weyder webApp
A basic weather web app, that utilizes the darksky and mapbox api to get weather dat. 

### 1. Basic Usage
Download the github repo 

```cmd
cd src/  
node index
```
or 

```cmd
npm run dev
```

Visit `http://localhost://3000` to use the web app

---
### 2. Obtaining json data
Visit `http://localhost://3000/weather?address="location"` to get a json response

```json
{   
    "summary":"Humid and Partly Cloudy",
    "place":"Austin, Texas, USA",
    "temperature":"26.8°C",
    "rainChance":"0.00%"
}
```

### 3.Heroku app
The app is hosted at heroku in case you dont want all the hassle of downloading the repo and starting manually

Visit `https://weyder-devorein.herokuapp.com/` to use the web app

**TODO**: 
--
1. Currently I'm using my access token for darksky and mapbox api, in the future I'll create a system to integrate your own access token
2. Get customized data, instead of hard coded json response values
3. Give user much more control over the darksky and mapbox api, by configuring the endpoints.