
# KisanSeva

An innovative app designed to empower farmers with advanced technology. Key features include real-time monitoring of soil conditions, automated irrigation based on machine learning predictions, access to up-to-date agricultural news, a personalized chatbot for farming advice, real-time weather updates, and AI-powered plant disease diagnosis through camera technology. 

This comprehensive app offers farmers a range of tools to optimize their farming practices and improve yields.
 


## Screenshots

![App Screenshot](https://github.com/user-attachments/assets/db934cfd-74e9-46b4-867e-040314d582dc)

![App Screenshot](https://github.com/user-attachments/assets/0cfe9a2a-8f04-4748-813c-f5b654f0935c)

![App Screenshot](https://github.com/user-attachments/assets/14754862-4f13-4d28-a597-026eaa8ee9dd)

# Project Goal:

AgriAssist is a mobile application designed to provide farmers with essential tools and information to enhance their agricultural productivity and efficiency. The app aims to empower farmers by offering real-time data, intelligent recommendations, and timely alerts.

# Key Features:

## Plant Watering Alerts:

Utilizes geospatial data and weather information to determine optimal watering times.
Sends timely notifications to farmers, preventing overwatering or underwatering.

## Plant Disease Detection:

Leverages Gemini's image recognition capabilities to identify plant diseases based on visual cues.
Provides recommendations for treatment and prevention.

## Chatbot Assistance:

Offers a virtual assistant to answer farmers' queries related to agriculture, pests, diseases, and best practices.
Provides personalized advice based on the farmer's specific needs and location.

## Real-time Weather Updates:

Delivers accurate and up-to-date weather forecasts, including temperature, humidity, rainfall, and wind speed.
Helps farmers plan their agricultural activities accordingly.
Sensor Data Integration:

Connects with IoT sensors to monitor soil moisture, temperature, and other environmental factors.
Provides farmers with real-time insights into their crops' health and conditions.

## Agricultural News and Updates:

Curates relevant news articles, market trends, and government policies related to agriculture.
Keeps farmers informed about the latest developments in the industry.

## Fertilizer Prediction:

Employs machine learning algorithms to predict optimal fertilizer requirements based on soil analysis, crop type, and weather conditions.
Helps farmers optimize fertilizer usage and reduce costs.

## Benefits for Farmers:

Increased crop yields and quality
Improved resource management (water, fertilizer)
Reduced crop losses due to diseases and pests
Enhanced decision-making based on data-driven insights
Access to timely information and expert advice

## Technology Stack:

Mobile App Development: React Native expo
Image Recognition: Gemini-pro
Chatbot: Gemini-pro
Weather API: OpenWeatherMap 
Sensor Integration: IoT platforms (e.g., Arduino, Raspberry Pi)
Machine Learning: Python libraries (e.g., TensorFlow, Scikit-learn)
Database: Cloud-based database (e.g., Firebase)
## API Reference

#### Post For Irrigation Prediction

```http
  POST https://national-nadiya-vincetq-d573248a.koyeb.app/predict
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `SoilHumidity` | `string` | **Required**.  |
| `Temperature` | `string` | **Required**.  |
| `SoilMoisture` | `string` | **Required**.  |


#### Post for Fertilizer Prediction

```http
  POST https://crop-prediction-g71p.onrender.com/predict
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `temperature`      | `string` | **Required**.  |
| `humidity`      | `string` | **Required**.  |
| `rainfall`      | `string` | **Required**.  |
| `label`      | `string` | **Required**.|

#### Get for news

```http
GET https://newsapi.org/v2/everything?q=farming&apiKey=${apiKey}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `apiKey`      | `string` | **Required**.  |

#### Get for Weather

```http
GET https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `apiKey`      | `string` | **Required**.  |
| `latitude`      | `string` | **Required**.  |
| `longitude`      | `string` | **Required**.  |


#### Get for Gemini

```http
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `apiKey`      | `string` | **Required**.  |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`

`EXPO_PUBLIC_GEMINI_KEY`

`EXPO_PUBLIC_FIREBASE_KEY`

`EXPO_PUBLIC_WEATHER_KEY`

`EXPO_PUBLIC_NEWS_KEY`


## Installation

Install this project with npm

1. Install dependencies
```bash
  npm install
```
2. Run the project

```bash
npx expo start
```
## Run Locally

Clone the project

```bash
  git clone https://github.com/rakshitdabral/farmer-help
```

Go to the project directory

```bash
  cd farmer-help
```

Install dependencies

```bash
  npm install
```

Start the app

```bash
  npm run start
```


## Authors

- [@DivyaGoel]()
- [@AbhigyanRanjan](https://github.com/Abhigyan-RA)
- [@YashPandey](https://github.com/Yash16p)
- [@AmanSingh](https://github.com/aman-singh73)
- [@JaivalBhatia](https://github.com/jaival-bhatia)
- [@RakshitDabral](https://github.com/rakshitdabral/farmer-help)






## Badges
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

