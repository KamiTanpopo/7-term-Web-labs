from datetime import datetime, timedelta
import requests
from aiogram import Bot, types
from aiogram.dispatcher import Dispatcher
from aiogram.utils import executor


TOKEN = '-'
API_KEY = '-'

bot = Bot(TOKEN)
dp = Dispatcher(bot)


def get_current_weather(city: str) -> str:
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&units=metric&appid={API_KEY}'
    response = requests.get(url)
    data = response.json()

    description = data['weather'][0]['description']
    temperature = data['main']['temp']
    feels_like = data['main']['feels_like']
    humidity = data['main']['humidity']
    wind_speed = data['wind']['speed']

    current_weather = (f'💙Поточна погода в місті 📌{city}📌: \n'
                       f'Температура {temperature:.0f}°C, '
                       f'відчувається як {feels_like:.0f}°C. \n'
                       f'Вологість {humidity}%, вітер {wind_speed} м/с.')
    return current_weather


def get_tomorrow_weather(city: str) -> str:
    url = f'https://api.openweathermap.org/data/2.5/forecast?q={city}&units=metric&appid={API_KEY}'
    response = requests.get(url)
    data = response.json()

    forecast_list = data['list']
    tomorrow_date = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')

    for forecast in forecast_list:
        forecast_date = forecast['dt_txt'].split(' ')[0]
        if forecast_date == tomorrow_date:
            description = forecast['weather'][0]
            min_temp = forecast['main']['temp_min']
            max_temp = forecast['main']['temp_max']
            humidity = forecast['main']['humidity']
            wind_speed = forecast['wind']['speed']

            tomorrow_weather = (f'💛Прогноз на завтра: \n'
                                f'Температура від {min_temp:.0f} до {max_temp:.0f}°C. \n'
                                f'Вітер {wind_speed} м/с, вологість {humidity}%.')
            return tomorrow_weather

    return 'На завтра прогноз поки недоступний.'


@dp.message_handler(commands=['weather'])
async def handle_weather_command(message: types.Message):
    try:
        city = message.text.split('/weather ')[1]
        current_weather = get_current_weather(city)
        tomorrow_weather = get_tomorrow_weather(city)
        response = f'{current_weather}\n\n{tomorrow_weather}'
    except:
        response = 'Не вдалося отримати погоду. Будь ласка, перевірте правильність назви міста.'
    await message.reply(response)


@dp.message_handler(commands=['start'])
async def handle_start_command(message: types.Message):
    response = (
        "Привіт!🌟 Я бот, який надає інформацію про погоду.\n"
        "Щоб отримати погоду для конкретного міста, використовуйте команду /weather.\n"
        "Приклад: /weather Київ"
    )
    await message.reply(response)


if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)