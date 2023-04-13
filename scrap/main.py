import os
from bs4 import BeautifulSoup
import requests
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from firebase_admin import credentials
from firebase_admin import firestore, firestore_async
import firebase_admin
from selenium.webdriver.common.by import By
from time import sleep
import pandas as pd

credpath = 'scrap/web-scraping-67540-firebase-adminsdk-5qm46-d1a7fa09d5.json'

# initialize firebase

firebase_admin.initialize_app(credentials.Certificate(credpath))

db = firestore.client()

totalJobs = []


def formatContent(text):
    return text.replace('\n', '').replace('\xa0', ' ').replace('\t', ' ')


def Get_Data(jobs, search):
    if (len(jobs) > 0):
        for job in jobs:
            # Link Image Company
            linkImageCompany = job.find('img').get('src')

            # Name Job
            nameJob = job.find('h3', class_='title')
            nameJob = nameJob.find('span').text

            # Company Name
            companyJobName = job.find('a', class_='company').text

            # Detail Job Link
            detailJobLink = job.find('a').get('href')

            # Link to Company
            linkToCompany = job.find('a', class_='company').get('href')

            # Website
            website = 'TopCV'

            # Simple info
            infos = job.find('div', class_='label-content')
            infos = infos.find_all('label')
            simpleInfo = []
            address = ''
            for info in infos:
                temp = info.text
                if info.get('class') == ['address']:
                    address = formatContent(info.text)

                if info.get('class') == ['deadline']:
                    temp = formatContent(info.text)
                simpleInfo.append(temp)

            # Job Description
            html_text = requests.get(detailJobLink).text
            soup = BeautifulSoup(html_text, 'lxml')
            companyDescription = soup.find(
                'div', class_='box-info-company box-white')
            arrCompanyDescription = ''
            if (companyDescription != None):
                introduce = companyDescription.find('span', class_='content')
                if (introduce != None):
                    company = introduce.find_all('p')
                    if (len(company) > 0):
                        for i in range(len(company)):
                            # decompose <br> tag
                            for br in company[i].find_all("br"):
                                br.replace_with("| ")
                            # check p text includes any character
                            if (company[i].text.strip()):
                                if i == len(company)-1:
                                    arrCompanyDescription += company[i].text
                                else:
                                    arrCompanyDescription += company[i].text + '| '

            Description = []
            jobDescription = soup.find('div', class_='job-data')
            salary = soup.find('div', class_="box-item")
            if salary != None:
                salary = formatContent(salary.find('span').text)

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

            totalJobs.append({
                'tag': search,
                'image': linkImageCompany,
                'job_name': nameJob,
                'company_name': companyJobName,
                'company_description': arrCompanyDescription,
                'link_job': detailJobLink,
                'link_company': linkToCompany,
                'salary': salary,
                'web_name': website,
                'location': address,
                'require': simpleInfo,
                'description': Description
            })


def Find_Jobs_In_TopCV(job_name):
    totalJobs.clear()
    search = job_name.strip().replace(" ", "-").lower()
    url = 'https://www.topcv.vn/tim-viec-lam-'+search+"?page=1"

    try:
        html_text = requests.get(url).text
        soup = BeautifulSoup(html_text, 'lxml')
    except:
        print("Không kết nối được server")
        return

    jobs = soup.find_all('div', class_='job-item-default job-ta')
    jobs_highlight = soup.find_all(
        'div', class_='job-item-default bg-highlight job-ta')

    Get_Data(jobs, job_name)
    Get_Data(jobs_highlight, job_name)


def Write_To_File(job_name):
    with open(f'scrap/jobs/{job_name}.txt', 'w', encoding='utf-8') as f:
        f.writelines(f"Total Jobs Found: {len(totalJobs)} \n")
        f.writelines(f"Create at: {time.ctime()} \n")
        f.writelines(f"{'-' * 20} \n")
        for job in totalJobs:
            f.writelines(f"Tag: {job.get('tag')} \n")
            f.writelines(
                f"Image Company: {job.get('image')} \n")
            f.writelines(f"Job Name: {job.get('job_name')} \n")
            f.writelines(f"Company Name: {job.get('company_name')} \n")
            f.writelines(
                f"Company Description: {job.get('company_description')} \n")
            f.writelines(f"Job Link: {job.get('link_job')} \n")
            f.writelines(f"Link Company: {job.get('link_company')} \n")
            f.writelines(f"Salary: {job.get('salary')} \n")
            f.writelines(f"Website: {job.get('web_name')} \n")
            f.writelines(f"Location: {job.get('location')} \n")
            f.writelines(f"Require: {job.get('require')} \n")
            f.writelines(f"Description: {job.get('description')} \n")
            f.writelines(f"{'-' * 50} \n")


def Find_Job_In_ITVIEC(search_key):
    driver = webdriver.Chrome()
    urlmain = "https://itviec.com/"
    url = "https://itviec.com/sign_in"
    driver.get(url)

    credential = open("login_credential.txt")
    line = credential.readlines()
    email = line[0]
    password = line[1]

    email_field = driver.find_element(By.ID, "user_email")
    email_field.send_keys(email)

    password_field = driver.find_element(By.ID, "user_password")
    password_field.send_keys(password)

    login_button = driver.find_element(
        By.XPATH, "/html/body/div[2]/div[3]/div/div[2]/form/div[4]/div/button")
    login_button.click()

    sleep(2)

    button_close = driver.find_element(
        By.XPATH, "/html/body/div[3]/div/div/div/button")
    button_close.click()

    sleep(1)

    while True:
        btn_check = driver.find_elements(
            By.XPATH, "/html/body/div[2]/div[3]/div/div[2]/form/div[3]/div/div/div")

        if len(btn_check) > 0:
            print("Đã tìm thấy phần tử Tôi không phải là robot!")
            # Đóng trình duyệt
            driver.quit()
            # Khởi tạo lại trình duyệt
            driver = webdriver.Chrome()
            driver.get(url)
            credential = open("login_credential.txt")
            line = credential.readlines()
            email = line[0]
            password = line[1]

            email_field = driver.find_element(By.ID, "user_email")
            email_field.send_keys(email)

            password_field = driver.find_element(By.ID, "user_password")
            password_field.send_keys(password)

            login_button = driver.find_element(
                By.XPATH, "/html/body/div[2]/div[3]/div/div[2]/form/div[4]/div/button")
            login_button.click()

            sleep(3)

            button_close = driver.find_element(
                By.XPATH, "/html/body/div[3]/div/div/div/button")
            button_close.click()

        else:
            # Thoát vòng lặp và tiếp tục đăng nhập vào ITviec
            break
    sleep(2)
    button_setlocation = driver.find_element(
        By.XPATH, "/html/body/div[2]/div[3]/div/form/div[1]/div/div")
    button_setlocation.click()

    sleep(1)

    set_all_city = driver.find_element(
        By.XPATH, "/html/body/div[2]/div[3]/div/form/div[1]/div/div/div[2]/div/div[1]")
    set_all_city.click()

    search_field = driver.find_element(
        By.XPATH, "/html/body/div[2]/div[3]/div/form/div[2]/div/input")
    # search=input("Enter your job: ")
    search_field.send_keys(search_key)
    search_field.send_keys(Keys.RETURN)

    urlsearch = driver.current_url  # lấy URL mới sau khi đăng nhập thành công
    driver.get(urlsearch)  # mở URL mới
    html_text = driver.page_source  # lấy mã HTML trang web hiện tại
    soup = BeautifulSoup(html_text, 'lxml')

    jobs = soup.find_all('div', class_='job_content')
    total_data = []

    for job in jobs:
        imagejob = job.find(
            'div', class_='logo-wrapper job-details-link-wrapper')
        image = imagejob.find('img')
        src = image['data-src']
        get_location = job.find('div', class_='address')
        location = get_location.find('div', class_="text").text
        namejob = job.find('h3', class_='title job-details-link-wrapper')
        name = namejob.find('a').text
        salary = job.find('div', class_='svg-icon__text').text
        link_job = urlmain+namejob.find('a').get('href')
        driver.get(link_job)
    # lưu lại data ở trang mới
        html_new_page = driver.page_source  # lấy mã HTML trang web hiện tại
        bt_soup = BeautifulSoup(html_new_page, 'lxml')
        detail_job = bt_soup.find('div', class_='job-details')
        detail_company = bt_soup.find('div', class_='employer-long-overview')
        get_require = detail_job.find_all('a', class_='big ilabel mkt-track')
        require = []
        for i in range(0, len(get_require)):
            require.append(get_require[i].find('span').text.strip())
        title = detail_job.find_all('h2', class_='job-details__second-title')
        content_one = detail_job.find(
            'div', class_='job-details__top-reason-to-join-us')
        content = detail_job.find_all('div', class_='job-details__paragraph')
        company = bt_soup.find('div', class_="jd-page__employer-overview")
        company_find = company.find(
            'h3', class_="employer-long-overview__name hidden-xs d-none d-sm-block")
        company_name = company_find.find('a').text
        company_description = detail_company.find(
            'div', class_='employer-long-overview__short-desc').text
        link_company = urlmain+company_find.find('a').get('href')
        description = []
        for i in range(0, len(title)):
            get_content = ""
            if (i == 0):
                get_title = title[i].text
                if content_one is None:
                    print("Không tìm thấy li nào!")
                else:
                    for j in range(0, 3):
                        get_content += content_one.find_all('li')[j].text+"| "
                new_content = get_content.replace("\xa0", "").replace("\n", "")
                description.append({
                    "title": get_title,
                    "content": new_content
                })
            else:
                get_title = title[i].text
                find = content[i-1].find_all('li')
                if not find:
                    print("Không tìm thấy li nào!")
                    findp = content[i-1].find_all('p')
                    for k in range(0, len(findp)):
                        for br in findp[k].find_all("br"):
                            br.replace_with("| ")
                        get_content += findp[k].text+"| "
                    new_content = get_content.replace(
                        "\xa0", "").replace("\n", "")
                    description.append({
                        "title": get_title,
                        "content": new_content
                    })
                else:
                    for k in range(0, len(find)):
                        get_content += find[k].text+"| "
                    new_content = get_content.replace(
                        "\xa0", "").replace("\n", "")
                    description.append({
                        "title": get_title,
                        "content": new_content
                    })
        sleep(5)
    # trở về trang đầu tiên để lặp tiếp-
        data = {
            "description": description,
            "image": src,
            "job_name": name,
            "web_name": "ITViec",
            "salary": salary,
            "company_name": company_name,
            "company_description": company_description,
            "link_job": link_job,
            "link_company": link_company,
            "tag": search_key,
            "location": location,
            "require": require
        }
        totalJobs.append(data)
        driver.back()
    totalJobs.extend(total_data)
    data_total = {
        'data': totalJobs
    }
    docs = search_key.replace(" ", "_")
    db.collection("Totals").document(docs).set(data_total)


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


def Write_To_Excel(job):
    df = pd.DataFrame(data=totalJobs)
    df.to_excel(f'scrap/excels/{job}.xlsx', index=False, sheet_name='Sheet1')


if __name__ == '__main__':
    while True:
        for job in Job_Need_To_Scrap:
            print(f"Scraping {job}...")
            try:
                Find_Jobs_In_TopCV(job)
                Find_Job_In_ITVIEC(job)
            except Exception as e:
                print(f"Scraping {job} failed!")
                print(e)
                continue
            print(f"Scraping {job} done!")
            try:
                Write_To_File(job)
            except Exception as e:
                print(f"Writing to file {job} failed!")
                print(e)
                continue
            print(f"Writing to file {job} done!")
            try:
                Write_To_Excel(job)
            except Exception as e:
                print(f"Writing to excel {job} failed!")
                print(e)
                continue
            print(f"Writing to excel {job} done!")

        time_wait = 24
        print(f"Waiting {time_wait} hours to scrap again")
        time.sleep(time_wait * 60 * 60)