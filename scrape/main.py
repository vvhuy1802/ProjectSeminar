from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from firebase_admin import credentials
from firebase_admin import firestore,firestore_async
import firebase_admin

credpath = 'scrape/web-scraping-67540-firebase-adminsdk-5qm46-d1a7fa09d5.json'

#initialize firebase

firebase_admin.initialize_app(credentials.Certificate(credpath))

db=firestore.client()

#reading data from firebase
data = {"name": "Los Angeles", "state": "CA", "country": "USA"}

# Add a new doc in collection 'cities' with ID 'LA'
db.collection("cities").document("LA").set(data)



def Find_Jobs_In_TopCV():
    url = "https://www.topcv.vn/"
    search = input("Enter your job: ")
    search = search.strip().replace(" ", "-")
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    driver = webdriver.Chrome(options=options)

    url = url + "tim-viec-lam-"+search+"?page=1"

    driver.get(url)

    html_text = requests.get(url).text
    soup = BeautifulSoup(html_text, 'lxml')

    jobs = soup.find_all('div', class_='job-item-default job-ta')
    jobs_highlight = soup.find_all(
        'div', class_='job-item-default bg-highlight job-ta')

    if (len(jobs) > 0):
        linkJob = jobs[0].find('a').get('href')
        companyJob = jobs[0].find('a', class_='company').text
        print(f'- Link: {linkJob} \n- Company: {companyJob}')
    if (len(jobs_highlight) > 0):
        linkJob_highlight = jobs_highlight[0].find('a').get('href')
        companyJob_highlight = jobs_highlight[0].find(
            'a', class_='company').text
        print(
            f'- Link: {linkJob_highlight} \n- Company: {companyJob_highlight}')


if __name__ == '__main__':
    while True:
        Find_Jobs_In_TopCV()
        time_wait = 1
        print(f"Waiting {time_wait} minutes...")
        time.sleep(time_wait * 60)
