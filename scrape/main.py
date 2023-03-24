from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
import webbrowser
# URL to scrape

# driver = webdriver.Chrome()

chrome_path = "C:\Program Files\Google\Chrome\Application\chrome.exe"




# Get the HTML content


def Find_Jobs_In_TopCV():
    search = input("Enter your job: ")
    search = search.strip().replace(" ", "-")
    url = "https://www.topcv.vn/tim-viec-lam-"+search+"?page=1"

    # driver.get(url)
    webbrowser.register('chrome',
                        None,
                        webbrowser.BackgroundBrowser(chrome_path))
    webbrowser.get('chrome').open(url)

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

        

