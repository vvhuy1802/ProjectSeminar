from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from firebase_admin import credentials
from firebase_admin import firestore, firestore_async
import firebase_admin

credpath = 'scrap/web-scraping-67540-firebase-adminsdk-5qm46-d1a7fa09d5.json'

# initialize firebase

firebase_admin.initialize_app(credentials.Certificate(credpath))

db = firestore.client()

# reading data from firebase
data = {"name": "Los Angeles", "state": "CA", "country": "USA"}

# Add a new doc in collection 'cities' with ID 'LA'
# db.collection("cities").document("LA").set(data)

totalJobs = []


def formatContent(text):
    return text.replace('\n', '').replace('\xa0', ' ').replace('\t', ' ')


def Get_Data(jobs, search):
    if (len(jobs) > 0):
        for job in jobs:
            # Link Image Company
            linkImageCompany = job.find('img').get('src')
            # print(f'Link Image Company: {linkImageCompany}' + '\n')
            # Name Job
            nameJob = job.find('h3', class_='title')
            nameJob = nameJob.find('span').text
            # print(f'Job Name: {nameJob}' + '\n')
            # Company Name
            companyJobName = job.find('a', class_='company').text
            # print(f'Company Name: {companyJobName}' + '\n')
            # Detail Job Link
            detailJobLink = job.find('a').get('href')
            # print(f'Detail Job Link: {detailJobLink}' + '\n')
            # Link to Company
            linkToCompany = job.find('a', class_='company').get('href')
            # print(f'Link to Company: {linkToCompany}' + '\n')
            # Website
            website = 'TopCV'
            # print(f'Website: {website}' + '\n')
            # Simple info
            infos = job.find('div', class_='label-content')
            infos = infos.find_all('label')
            simpleInfo = []
            address = ''
            for info in infos:
                temp = info.text
                if info.get('class') == ['address']:
                    address = info.text
                    # print(f'Address: {address}' + '\n')
                if info.get('class') == ['deadline']:
                    temp = info.text.replace('\n', '')
                simpleInfo.append(temp)
            # print(f'Simple Info: {simpleInfo}' + '\n')
            # Job Description
            html_text = requests.get(detailJobLink).text
            soup = BeautifulSoup(html_text, 'lxml')
            Description = []
            jobDescription = soup.find('div', class_='job-data')
            titles = jobDescription.find_all('h3')
            if (len(titles) == 0):
                titles = jobDescription.find_all('h2')
            contents = jobDescription.find_all('div', class_='content-tab')
            count = 0
            for content in contents:
                if (count > len(titles)-1):
                    break
                # in li tag will be in a new line
                if (content.find('li')):
                    arrLi = ''
                    liTags = content.find_all('li')
                    for li in liTags:
                        if li == liTags[-1]:
                            arrLi += li.text
                        else:
                            arrLi += li.text + '| '
                    Description.append({
                        'title': titles[count].text,
                        'content': formatContent(arrLi)
                    })
                # in p have <br> tag will be in a new line
                elif (content.find('p')):
                    arrP = ''
                    pTags = content.find_all('p')
                    for i in range(len(pTags)):
                        # decompose <br> tag
                        for br in pTags[i].find_all("br"):
                            br.replace_with("| ")
                        if i == len(pTags)-1:
                            arrP += pTags[i].text
                        else:
                            arrP += pTags[i].text + '| '
                    Description.append({
                        'title': titles[count].text,
                        'content': formatContent(arrP)
                    })
                elif content.find('strong') != None:
                    content.find('strong').decompose()
                    Description.append({
                        'title': titles[count].text,
                        'content': formatContent(content.text)
                    })
                else:
                    Description.append({
                        'title': titles[count].text,
                        'content': formatContent(content.text)
                    })
                count += 1
            # print(f'Description: {Description}' + '\n')
            totalJobs.append({
                'tag': search,
                'linkImageCompany': linkImageCompany,
                'nameJob': nameJob,
                'companyJobName': companyJobName,
                'detailJobLink': detailJobLink,
                'linkToCompany': linkToCompany,
                'website': website,
                'address': address,
                'simpleInfo': simpleInfo,
                'description': Description
            })


def Find_Jobs_In_TopCV(job_name):
    totalJobs.clear()
    search = job_name.strip().replace(" ", "-").lower()
    # options = webdriver.ChromeOptions()
    # options.add_experimental_option('excludeSwitches', ['enable-logging'])
    # driver = webdriver.Chrome(options=options)

    url = 'https://www.topcv.vn/tim-viec-lam-'+search+"?page=1"

    # driver.get(url)

    try:
        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, 'lxml')
    except:
        print("Không kết nối được server")
        return

    jobs = soup.find_all('div', class_='job-item-default job-ta')
    jobs_highlight = soup.find_all(
        'div', class_='job-item-default bg-highlight job-ta')

    Get_Data(jobs, search)
    Get_Data(jobs_highlight, search)

def Write_To_File(job_name):
    with open(f'scrap/jobs/{job_name}.txt', 'w', encoding='utf-8') as f:
        f.writelines(f"Total Jobs Found: {len(totalJobs)} \n")
        f.writelines(f"Create at: {time.ctime()} \n")
        f.writelines(f"{'-' * 20} \n")
        for job in totalJobs:
            f.writelines(f"Tag: {job.get('tag')} \n")
            f.writelines(
                f"Link Image Company: {job.get('linkImageCompany')} \n")
            f.writelines(f"Job Name: {job.get('nameJob')} \n")
            f.writelines(f"Company Name: {job.get('companyJobName')} \n")
            f.writelines(f"Detail Job Link: {job.get('detailJobLink')} \n")
            f.writelines(f"Link to Company: {job.get('linkToCompany')} \n")
            f.writelines(f"Website: {job.get('website')} \n")
            f.writelines(f"Address: {job.get('address')} \n")
            f.writelines(f"Simple Info: {job.get('simpleInfo')} \n")
            f.writelines(f"Description: {job.get('description')} \n")
            f.writelines(f"{'-' * 50} \n")


Job_Need_To_Scrap = [
    "React Native",
    "ReactJS",
    "NodeJS",
    "VueJS",
    "Angular",
    "Laravel",
    "PHP",
    "Python",
    "Java",
]

if __name__ == '__main__':
    while True:
        for job in Job_Need_To_Scrap:
            print(f"Scraping {job}...")
            try:
                Find_Jobs_In_TopCV(job)
            except Exception as e:
                print(f"Scraping {job} failed!")
                print(e)
                continue
            print(f"Scraping {job} done!")
            print(f"Writing to file {job}...")
            try:
                Write_To_File(job)
            except Exception as e:
                print(f"Writing to file {job} failed!")
                print(e)
                continue
            print(f"Writing to file {job} done!")

        time_wait = 24
        print(f"Waiting {time_wait} hours to scrap again")
        time.sleep(time_wait * 60 * 60)
